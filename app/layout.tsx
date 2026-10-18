import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Jomari | Fullstack Engineer & UI Architect",
  description:
    "Personal developer portfolio of Jomari — Fullstack software engineer sculpting technical performance into immersive, high-speed digital products with TypeScript, Next.js, and Google Sheets CMS.",
  keywords: [
    "Fullstack Developer",
    "TypeScript",
    "Next.js",
    "React",
    "Google Sheets CMS",
    "Serverless",
    "Vercel",
    "Tailwind CSS",
  ],
  authors: [{ name: "Jomari" }],
  creator: "Jomari",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jomari.dev",
    title: "Jomari | Fullstack Engineer & UI Architect",
    description:
      "Sculpting technical performance into immersive digital art. Minimalist, high-density portfolio built on Next.js, TypeScript, and Google Sheets CMS.",
    siteName: "Jomari Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jomari | Fullstack Engineer & UI Architect",
    description: "Fullstack engineering portfolio built with TypeScript, Next.js, and Google Sheets CMS.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#08080a] text-[#f4f4f5] selection:bg-zinc-800 selection:text-white">
        <div className="fixed inset-0 pointer-events-none bg-tech-grid z-0 opacity-40" />
        <div className="fixed inset-0 pointer-events-none bg-radial-vignette z-0" />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
