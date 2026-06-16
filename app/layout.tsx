import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "Fayshal & Juthy | 9 Years of Love",
  description:
    "Celebrate the beautiful love story of Fayshal and Juthy — 9 years of love, friendship, growth, and togetherness, culminating in their wedding on 26 June 2026.",
  keywords: [
    "Fayshal",
    "Juthy",
    "wedding",
    "love story",
    "anniversary",
    "Bangladesh",
  ],
  authors: [{ name: "Fayshal & Juthy" }],
  openGraph: {
    title: "Fayshal & Juthy | 9 Years of Love",
    description:
      "A digital love story — from first meeting on 22 June 2017 to wedding on 26 June 2026.",
    type: "website",
    locale: "en_GB",
    siteName: "Fayshal & Juthy",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Fayshal and Juthy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fayshal & Juthy | 9 Years of Love",
    description:
      "Celebrate 9 years of love and an upcoming wedding.",
    images: ["/og-image.svg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a4d2e" },
    { media: "(prefers-color-scheme: dark)", color: "#2C2C2C" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
