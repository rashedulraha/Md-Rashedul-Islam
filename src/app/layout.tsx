import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Geist, Outfit, Satisfy, Playfair_Display, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import TrafficTracker from "@/components/TrafficTracker";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const satisfy = Satisfy({ subsets: ["latin"], weight: ["400"], variable: "--font-fancy" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto" });

export const metadata: Metadata = {
  title: "Rashedul Islam | Full-Stack Software Engineer & Web Developer",
  description:
    "Full-Stack Software Engineer with 2+ years of experience specializing in Next.js 15, React 19, Node.js 22, Express, TypeScript, and PostgreSQL. Building high-performance web applications and scalable APIs.",
  keywords: [
    "Rashedul Islam",
    "Rashedul Raha",
    "Full-Stack Developer",
    "Next.js Developer Bangladesh",
    "TypeScript Developer",
    "Software Engineer",
    "Node.js Backend Developer",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Rashedul Islam", url: "https://rashedulraha.com" }],
  creator: "Rashedul Islam",
  metadataBase: new URL("https://rashedulraha.com"),
  alternates: {
    canonical: "https://rashedulraha.com",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rashedulraha.com",
    title: "Rashedul Islam | Full-Stack Software Engineer",
    description: "Full-Stack Software Engineer specializing in Next.js 15, React 19, TypeScript, and Node.js backend services.",
    siteName: "Rashedul Islam Portfolio",
    images: [
      {
        url: "/personal_img/rashedul-about.jpeg",
        width: 1200,
        height: 630,
        alt: "Rashedul Islam - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rashedul Islam | Full-Stack Software Engineer",
    description: "Full-Stack Software Engineer specializing in Next.js 15, React 19, TypeScript, and Node.js backend services.",
    images: ["/personal_img/rashedul-about.jpeg"],
    creator: "@rashedulraha",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rashedul Islam",
  alternateName: "Rashedul Raha",
  url: "https://rashedulraha.com",
  image: "https://rashedulraha.com/personal_img/rashedul-about.jpeg",
  jobTitle: "Full-Stack Software Engineer",
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Prisma ORM",
    "Tailwind CSS",
    "Docker"
  ],
  sameAs: [
    "https://github.com/rashedulraha",
    "https://linkedin.com/in/rashedulraha",
    "https://twitter.com/rashedulraha"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", geist.variable, outfit.variable, satisfy.variable, playfair.variable, roboto.variable)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster />
          <TrafficTracker />
        </ThemeProvider>
      </body>
    </html>
  );
}
