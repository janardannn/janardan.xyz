// Granular Tracking System — Client-Side Core
// Zero dependencies, ~4KB gzipped

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
  // Hardware signals
  colorDepth: number;
  pixelRatio: number;
  deviceMemory: number | null;
  maxTouchPoints: number;
  platform: string;
  cpuCores: number | null;
  connectionType: string | null;
  // Advanced fingerprint signals (raw)
  canvasData: string;
  webglVendor: string;
  webglRenderer: string;
  audioData: string;
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

  // Advanced signal results (populated async)
  private canvasData = "";
  private webglVendor = "";
  private webglRenderer = "";
  private audioData = "";

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    try {
      this.fingerprint = await this.generateFingerprint();
      this.sessionId = this.getOrCreateSession();
      this.device = this.collectDeviceInfo();
      this.acquisition = this.collectAcquisition();

      // Fire advanced fingerprinting in parallel, non-blocking
      this.computeAdvancedSignals().catch(() => {});

      this.setupScrollTracking();
      this.setupVisibilityTracking();
      this.setupBeforeUnload();
      this.startFlushTimer();
    } catch {
      this.initialized = false;
    }
  }

  // --- Hashing ---

  private async hashString(input: string): Promise<string> {
    if (typeof crypto !== "undefined" && crypto.subtle) {
      const encoded = new TextEncoder().encode(input);
      const hash = await crypto.subtle.digest("SHA-256", encoded);
      return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
    // Fallback simple hash for HTTP
    let h = 0;
    for (let i = 0; i < input.length; i++) {
      h = ((h << 5) - h + input.charCodeAt(i)) | 0;
    }
    return Math.abs(h).toString(16).padStart(16, "0");
  }

  // --- Fingerprinting (stable — do NOT change signal order) ---

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
    return this.hashString(raw);
  }

  // --- Advanced Fingerprinting ---

  private async computeAdvancedSignals(): Promise<void> {
    const results = await Promise.allSettled([
      this.computeCanvasData(),
      this.computeWebGLInfo(),
      this.computeAudioData(),
    ]);

    if (results[0].status === "fulfilled") this.canvasData = results[0].value;
    if (results[1].status === "fulfilled") {
      this.webglVendor = results[1].value.vendor;
      this.webglRenderer = results[1].value.renderer;
    }
    if (results[2].status === "fulfilled") this.audioData = results[2].value;
  }

  private computeCanvasData(): Promise<string> {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 50;
      const ctx = canvas.getContext("2d");
      if (!ctx) return Promise.resolve("");

      ctx.textBaseline = "top";
      ctx.font = "14px 'Arial'";
      ctx.fillStyle = "#f60";
      ctx.fillRect(125, 1, 62, 20);
      ctx.fillStyle = "#069";
      ctx.fillText("GTS fingerprint", 2, 15);
      ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
      ctx.fillText("GTS fingerprint", 4, 17);

      ctx.beginPath();
      ctx.arc(50, 30, 10, 0, Math.PI * 2);
      ctx.fill();

      return Promise.resolve(canvas.toDataURL());
    } catch {
      return Promise.resolve("");
    }
  }

  private computeWebGLInfo(): Promise<{ vendor: string; renderer: string }> {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return Promise.resolve({ vendor: "", renderer: "" });

      const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
      if (!debugInfo) return Promise.resolve({ vendor: "", renderer: "" });

      return Promise.resolve({
        vendor: (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "",
        renderer: (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "",
      });
    } catch {
      return Promise.resolve({ vendor: "", renderer: "" });
    }
  }

  private async computeAudioData(): Promise<string> {
    try {
      const AudioCtx = window.OfflineAudioContext ||
        (window as unknown as Record<string, unknown>).webkitOfflineAudioContext as typeof OfflineAudioContext;
      if (!AudioCtx) return "";

      const context = new AudioCtx(1, 44100, 44100);
      const oscillator = context.createOscillator();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(10000, context.currentTime);

      const compressor = context.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-50, context.currentTime);
      compressor.knee.setValueAtTime(40, context.currentTime);
      compressor.ratio.setValueAtTime(12, context.currentTime);
      compressor.attack.setValueAtTime(0, context.currentTime);
      compressor.release.setValueAtTime(0.25, context.currentTime);

      oscillator.connect(compressor);
      compressor.connect(context.destination);
      oscillator.start(0);

      const buffer = await context.startRendering();
      const data = buffer.getChannelData(0);
      const samples = Array.from(data.slice(4500, 5000));
      return samples.join(",");
    } catch {
      return "";
    }
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
    const nav = navigator as unknown as Record<string, unknown>;
    const conn = (nav.connection ?? nav.mozConnection ?? nav.webkitConnection) as
      { effectiveType?: string } | undefined;

    return {
      userAgent: navigator.userAgent,
      screenWidth: screen.width,
      screenHeight: screen.height,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      colorDepth: screen.colorDepth ?? 0,
      pixelRatio: window.devicePixelRatio ?? 1,
      deviceMemory: (nav.deviceMemory as number) ?? null,
      maxTouchPoints: navigator.maxTouchPoints ?? 0,
      platform: navigator.platform ?? "",
      cpuCores: (navigator.hardwareConcurrency as number) ?? null,
      connectionType: conn?.effectiveType ?? null,
      // Placeholders — real values merged at flush time
      canvasData: "",
      webglVendor: "",
      webglRenderer: "",
      audioData: "",
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

    // Merge latest advanced signals into device snapshot
    const device: DeviceInfo = {
      ...this.device,
      canvasData: this.canvasData,
      webglVendor: this.webglVendor,
      webglRenderer: this.webglRenderer,
      audioData: this.audioData,
    };

    const payload: TrackingPayload = {
      fingerprint: this.fingerprint,
      sessionId: this.sessionId,
      device,
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
