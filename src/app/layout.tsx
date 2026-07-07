import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://demetripappas.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Demetri Pappas",
    template: "%s | Demetri Pappas",
  },
  description:
    "Portfolio of Demetri Pappas — software engineer, full-stack developer, and ML engineer.",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Demetri Pappas",
    title: "Demetri Pappas",
    description:
      "Portfolio of Demetri Pappas — software engineer, full-stack developer, and ML engineer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
