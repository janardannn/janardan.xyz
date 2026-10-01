import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist_Mono, Bricolage_Grotesque, Inter } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TrackerProvider } from "@/components/TrackerProvider";
import NoiseOverlay from "@/components/NoiseOverlay";
import "./globals.css";

/** Prose only — the homepage carries no body sans at all. */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/** Display face. Headlines only, set large and tight. */
const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

/**
 * Hero headline only.
 *
 * A Bastardica hybrid splicing Times New Roman with CyrillicGothSHA. Subset to
 * Latin and converted to woff2, taking it from 1.2 MB / 4,976 glyphs down to
 * ~20 kB / 208 — it only ever has to set one sentence.
 */
const bastardica = localFont({
  src: "./fonts/bastardica-hero.woff2",
  variable: "--font-hero",
  display: "swap",
  weight: "400",
  style: "normal",
  // Falls back to the display face rather than a system serif, so a failed
  // load degrades into the rest of the design instead of out of it.
  fallback: ["Bricolage Grotesque", "ui-sans-serif", "system-ui", "sans-serif"],
});

/** The structural voice: labels, metadata, numerals, navigation, telemetry. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "Software engineer building reliable systems at scale. Full-stack, AI/agentic engineering, and the observability to prove it works.";

export const metadata: Metadata = {
  title: {
    default: "Janardan Hazarika — Software Engineer",
    template: "%s · Janardan Hazarika",
  },
  description: DESCRIPTION,
  keywords: [
    "Janardan Hazarika",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js Developer",
    "TypeScript",
    "AI Engineering",
    "Backend Developer",
  ],
  authors: [{ name: "Janardan Hazarika", url: "https://janardan.xyz" }],
  creator: "Janardan Hazarika",
  publisher: "Janardan Hazarika",
  metadataBase: new URL("https://janardan.xyz"),
  formatDetection: { email: false, address: false, telephone: false },
  // Note: no `alternates.canonical` here. Setting it on the root layout makes
  // every page inherit it, which previously told search engines that each blog
  // post was a duplicate of the homepage. Pages declare their own.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://janardan.xyz",
    title: "Janardan Hazarika — Software Engineer",
    description: DESCRIPTION,
    siteName: "janardan.xyz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Janardan Hazarika — Software Engineer",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d10" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} ${bricolage.variable} ${bastardica.variable} antialiased`}
      >
        <ThemeProvider>
          <Suspense fallback={null}>
            <TrackerProvider />
          </Suspense>
          <NoiseOverlay />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
