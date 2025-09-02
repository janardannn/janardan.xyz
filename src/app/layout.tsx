import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "janardan.xyz",
    template: "%s | Janardan Hazarika"
  },
  description: "Software Engineer exploring how to build reliable, scalable, and human-focused digital products. I work with React, Next.js, TypeScript, and Node.js.",
  keywords: [
    "Janardan Hazarika",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js Developer",
    "TypeScript",
    "Web Development",
    "Backend Developer"
  ],
  authors: [{ name: "Janardan Hazarika", url: "https://janardan.xyz" }],
  creator: "Janardan Hazarika",
  publisher: "Janardan Hazarika",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://janardan.xyz"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://janardan.xyz",
    title: "Janardan Hazarika - Software Engineer",
    description: "Software Engineer exploring how to build reliable, scalable, and human-focused digital products. I work with React, Next.js, TypeScript, and Node.js.",
    siteName: "janardan's personal website & blog",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Janardan Hazarika - Full-Stack Developer",
      },
    ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
