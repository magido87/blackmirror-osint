import type { Metadata, Viewport } from "next";
import "./globals.css";
import PostHogProvider from "@/components/PostHogProvider";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "PROJECT BLACKMIRROR - OSINT Challenge",
  description: "Can you uncover the whistleblower? A forensic OSINT challenge.",
  openGraph: {
    title: "PROJECT BLACKMIRROR - OSINT Challenge",
    description: "The FBI couldn't crack this. Can you?",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <PostHogProvider>
          {children}
        </PostHogProvider>
        {/* Console Easter Eggs */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.warn("%c MERIDIAN SYSTEMS ", "background: #ff0000; color: white; font-size: 14px; padding: 4px;");
              console.warn("Internal Build 7.4.2 – Unauthorized Access Prohibited");
              console.log("%cSomeone was here.", "color: #00d4ff; font-style: italic;");
              console.log("%cThe truth is hidden in plain sight.", "color: #666;");
              console.log("// TODO: Remove debug endpoints before production - D.R.");
            `,
          }}
        />
      </body>
    </html>
  );
}
