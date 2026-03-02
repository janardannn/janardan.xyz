// Granular Tracking System — Client-Side Core
// Zero dependencies, ~3KB gzipped

interface QueuedEvent {
  type: "pageview" | "event" | "pageupdate";
  name: string;
  category: string;
  path: string;
  title?: string;
  properties?: Record<string, unknown>;
  timestamp: number;
}

interface DeviceInfo {
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  language: string;
  timezone: string;
}

interface AcquisitionInfo {
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

interface TrackingPayload {
  fingerprint: string;
  sessionId: string;
  device: DeviceInfo;
  acquisition: AcquisitionInfo;
  events: QueuedEvent[];
}

const ENDPOINT = "/api/track";
const BATCH_INTERVAL = 7000;
const SESSION_TIMEOUT = 30 * 60 * 1000;
const SCROLL_MILESTONES = [25, 50, 75, 100];

class Tracker {
  private queue: QueuedEvent[] = [];
  private fingerprint = "";
  private sessionId = "";
  private currentPath = "";
  private pageEnteredAt = 0;
  private maxScrollDepth = 0;
  private reachedMilestones = new Set<number>();
  private flushTimer: ReturnType<typeof setInterval> | null = null;
  private device!: DeviceInfo;
  private acquisition!: AcquisitionInfo;
  private initialized = false;

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    try {
      this.fingerprint = await this.generateFingerprint();
      this.sessionId = this.getOrCreateSession();
      this.device = this.collectDeviceInfo();
      this.acquisition = this.collectAcquisition();

      this.setupScrollTracking();
      this.setupVisibilityTracking();
      this.setupBeforeUnload();
      this.startFlushTimer();
    } catch {
      this.initialized = false;
    }
  }

  // --- Fingerprinting ---

  private async generateFingerprint(): Promise<string> {
    const raw = [
      navigator.userAgent,
      screen.width,
      screen.height,
      screen.colorDepth,
      Intl.DateTimeFormat().resolvedOptions().timeZone,
      navigator.language,
      navigator.hardwareConcurrency ?? "",
    ].join("|");

    // crypto.subtle unavailable on HTTP — fallback to simple hash
    if (typeof crypto !== "undefined" && crypto.subtle) {
      const encoded = new TextEncoder().encode(raw);
      const hash = await crypto.subtle.digest("SHA-256", encoded);
      return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }

    let h = 0;
    for (let i = 0; i < raw.length; i++) {
      h = ((h << 5) - h + raw.charCodeAt(i)) | 0;
    }
    return Math.abs(h).toString(16).padStart(16, "0");
  }

  // --- Session Management ---

  private getOrCreateSession(): string {
    try {
      const stored = sessionStorage.getItem("_trk_session");
      const lastActivity = sessionStorage.getItem("_trk_last");
      const now = Date.now();

      if (
        stored &&
        lastActivity &&
        now - parseInt(lastActivity) < SESSION_TIMEOUT
      ) {
        sessionStorage.setItem("_trk_last", now.toString());
        return stored;
      }

      const newId = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem("_trk_session", newId);
      sessionStorage.setItem("_trk_last", now.toString());
      return newId;
    } catch {
      return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }
  }

  // --- Device & Acquisition ---

  private collectDeviceInfo(): DeviceInfo {
    return {
      userAgent: navigator.userAgent,
      screenWidth: screen.width,
      screenHeight: screen.height,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  }

  private collectAcquisition(): AcquisitionInfo {
    const params = new URLSearchParams(window.location.search);
    return {
      referrer: document.referrer,
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
      utmTerm: params.get("utm_term") || undefined,
      utmContent: params.get("utm_content") || undefined,
    };
  }

  // --- Public API ---

  track(
    name: string,
    category: string,
    properties?: Record<string, unknown>
  ): void {
    try {
      if (!this.initialized) return;
      this.queue.push({
        type: "event",
        name,
        category,
        path: window.location.pathname,
        properties,
        timestamp: Date.now(),
      });
    } catch {}
  }

  trackPageView(): void {
    try {
      if (!this.initialized) return;

      // Send update for previous page before tracking new one
      if (this.currentPath) {
        this.sendPageUpdate();
      }

      this.currentPath = window.location.pathname;
      this.pageEnteredAt = Date.now();
      this.maxScrollDepth = 0;
      this.reachedMilestones.clear();

      this.queue.push({
        type: "pageview",
        name: "page_view",
        category: "navigation",
        path: this.currentPath,
        title: document.title,
        timestamp: Date.now(),
      });
    } catch {}
  }

  // --- Scroll Tracking ---

  private setupScrollTracking(): void {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollTop = window.scrollY;
            const docHeight =
              document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
              const pct = Math.round((scrollTop / docHeight) * 100);
              if (pct > this.maxScrollDepth) this.maxScrollDepth = pct;

              for (const m of SCROLL_MILESTONES) {
                if (pct >= m && !this.reachedMilestones.has(m)) {
                  this.reachedMilestones.add(m);
                  this.track("scroll_depth", "engagement", { depth: m });
                }
              }
            }
            ticking = false;
          });
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // --- Visibility & Unload ---

  private setupVisibilityTracking(): void {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.sendPageUpdate();
        this.flush(true);
      }
    });
  }

  private setupBeforeUnload(): void {
    window.addEventListener("beforeunload", () => {
      this.sendPageUpdate();
      this.flush(true);
    });
  }

  // --- Page Update (duration + scroll) ---

  private sendPageUpdate(): void {
    if (!this.currentPath || !this.pageEnteredAt) return;

    const duration = Math.round((Date.now() - this.pageEnteredAt) / 1000);
    const scrollMilestone = [0, 25, 50, 75, 100].reduce(
      (prev, m) => (this.maxScrollDepth >= m ? m : prev),
      0
    );

    this.queue.push({
      type: "pageupdate",
      name: "page_update",
      category: "engagement",
      path: this.currentPath,
      properties: { duration, scrollDepth: scrollMilestone },
      timestamp: Date.now(),
    });
  }

  // --- Batching & Flushing ---

  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => this.flush(false), BATCH_INTERVAL);
  }

  private flush(useBeacon: boolean): void {
    if (this.queue.length === 0) return;

    const payload: TrackingPayload = {
      fingerprint: this.fingerprint,
      sessionId: this.sessionId,
      device: this.device,
      acquisition: this.acquisition,
      events: [...this.queue],
    };

    this.queue = [];
    const body = JSON.stringify(payload);

    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, body);
    } else {
      fetch(ENDPOINT, {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
    }

    try { sessionStorage.setItem("_trk_last", Date.now().toString()); } catch {}
  }

  destroy(): void {
    if (this.flushTimer) clearInterval(this.flushTimer);
    this.sendPageUpdate();
    this.flush(true);
  }
}

// --- Singleton ---

let tracker: Tracker | null = null;

export function getTracker(): Tracker {
  if (!tracker) {
    tracker = new Tracker();
  }
  return tracker;
}

export function track(
  name: string,
  category: string,
  properties?: Record<string, unknown>
): void {
  tracker?.track(name, category, properties);
}
