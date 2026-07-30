import React from "react";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { ShieldCheck, Lock, Eye, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Rashedul Islam",
  description: "Privacy Policy for Rashedul Islam's personal portfolio and developer blog.",
};

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-border/40 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy & Data Protection</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last Updated: July 30, 2026
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-muted-foreground leading-relaxed text-sm md:text-base">
          {/* Section 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold text-lg md:text-xl font-serif">
              <Lock className="w-5 h-5 text-primary" />
              <h2>1. Overview</h2>
            </div>
            <p>
              Welcome to the official portfolio and blog of Rashedul Islam. Your privacy is deeply important to me. This Privacy Policy outlines the types of information collected when you visit this website and how that information is handled.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold text-lg md:text-xl font-serif">
              <Eye className="w-5 h-5 text-primary" />
              <h2>2. Information Collection & Usage</h2>
            </div>
            <p>
              We collect minimal information necessary to deliver a fast, interactive experience:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong className="text-foreground">Guestbook & Contact Entries:</strong> When you submit a message or sign the Guestbook, your provided name, message, and timestamp are stored to display on the public digital wall or send a response.
              </li>
              <li>
                <strong className="text-foreground">Theme & Preferences:</strong> Your browser local storage stores user interface settings (such as dark/light mode preference) locally on your device.
              </li>
              <li>
                <strong className="text-foreground">Telemetry & Analytics:</strong> Aggregated, non-personally identifiable pageview statistics to monitor site traffic and improve performance.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold text-lg md:text-xl font-serif">
              <FileText className="w-5 h-5 text-primary" />
              <h2>3. Data Protection & Copyright</h2>
            </div>
            <p>
              As outlined in our site guidelines, all content, graphics, and source code are copyrighted under intellectual property protection (© 2026 Rashedul Islam). Personal details submitted through forms will never be sold, rented, or shared with unauthorized third parties.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold text-lg md:text-xl font-serif">
              <Mail className="w-5 h-5 text-primary" />
              <h2>4. Contact & Inquiries</h2>
            </div>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request removal of a Guestbook entry, please contact me directly at{" "}
              <a
                href="mailto:rashedulraha.bd@gmail.com"
                className="text-primary underline font-medium hover:text-primary/80 transition-colors"
              >
                rashedulraha.bd@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
