import React from "react";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { FileCode2, Scale, Copyright, AlertTriangle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Rashedul Islam",
  description: "Terms of Service and copyright licensing agreement for Rashedul Islam's portfolio and software projects.",
};

export default function TermsPage() {
  return (
    <PageWrapper>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-border/40 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Terms of Service
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
              <FileCode2 className="w-5 h-5 text-primary" />
              <h2>1. Agreement to Terms</h2>
            </div>
            <p>
              By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use or access this site.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold text-lg md:text-xl font-serif">
              <Copyright className="w-5 h-5 text-primary" />
              <h2>2. Copyright & Intellectual Property</h2>
            </div>
            <p className="font-medium text-foreground">
              © 2026 Rashedul Islam. All Rights Reserved.
            </p>
            <p>
              As documented in our repository guidelines (<code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono border border-border">README.md</code>), this website, including all source code, custom graphics, text content, design elements, and architecture, is the intellectual property of Rashedul Islam.
            </p>
            <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
              <p className="font-semibold text-foreground text-xs uppercase tracking-wider">
                Usage Restrictions:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm">
                <li>You may <strong>NOT</strong> copy, clone, or duplicate this website&apos;s design or code for commercial use.</li>
                <li>You may <strong>NOT</strong> distribute, modify, or create derivative works without explicit written permission.</li>
                <li>You may <strong>NOT</strong> use personal branding or images found in this repository.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold text-lg md:text-xl font-serif">
              <AlertTriangle className="w-5 h-5 text-primary" />
              <h2>3. Disclaimer & Limitation of Liability</h2>
            </div>
            <p>
              The content and software projects on this site are provided &quot;as is&quot; for informational and demonstration purposes without warranties of any kind. Rashedul Islam shall not be liable for any damages resulting from the use of content or links provided herein.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-foreground font-semibold text-lg md:text-xl font-serif">
              <Mail className="w-5 h-5 text-primary" />
              <h2>4. Inquiries & Written Permission</h2>
            </div>
            <p>
              For permissions, collaboration requests, or copyright inquiries, please contact Rashedul Islam at{" "}
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
