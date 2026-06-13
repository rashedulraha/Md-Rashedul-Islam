import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/themeProvider";
import RealTimeChatWidget from "@/components/RealTimeChatWidget/RealTimeChatWidget";

export const metadata: Metadata = {
  title: "Rashedul Islam | Full-Stack Architect",
  description:
    "Personal Portfolio of Rashedul Islam - Full-Stack Web Developer, Software Engineer, and System Architect. Specializing in React, Next.js, Node.js, and cloud architecture.",
  keywords: [
    "Rashedul Islam",
    "Rashed Dev",
    "Full-Stack Developer",
    "Next.js Portfolio",
    "React Developer",
    "System Architect",
    "Bangladesh Developer",
  ],
  authors: [{ name: "Rashedul Islam", url: "https://github.com/rashedulraha" }],
  icons: {
    icon: "/Rashed_Hossen.svg",
  },
  openGraph: {
    title: "Rashedul Islam | Full-Stack Architect",
    description:
      "Personal Portfolio of Rashedul Islam - Full-Stack Web Developer, Software Engineer, and System Architect.",
    url: "https://github.com/rashedulraha",
    siteName: "Rashedul Islam Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="relative min-h-screen">
            {children}
            <RealTimeChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
