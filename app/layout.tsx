import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppInit from "@/components/AppInit";
import SyncProvider from "@/components/SyncProvider";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Squad Builder",
  description: "Monte seu time dos sonhos com devs e influencers da bolha dev",
  icons: {
    icon: "/camisa-de-futebol.png",
    shortcut: "/camisa-de-futebol.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root { --c-bg: #0d0d1a; --c-modal: #0d0d1a; }
          [data-theme="light"] {
            --c-bg: #EFF6FF;
            --c-modal: #FFFFFF;
            --color-white: #1E3A8A;
            --color-gray-400: #4B5563;
            --color-gray-500: #374151;
            --color-gray-600: #1F2937;
          }
        `}} />
        {/* Anti-FOUC: apply persisted theme before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=JSON.parse(localStorage.getItem('dev-squad-theme')||'{}');document.documentElement.setAttribute('data-theme',t.state?.theme||'dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-(--c-bg)">
        <ThemeProvider />
        <AppInit />
        <SyncProvider />
        {children}
      </body>
    </html>
  );
}
