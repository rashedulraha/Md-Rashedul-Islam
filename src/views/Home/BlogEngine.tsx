"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Calendar, Clock, X, ChevronRight, CornerDownRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  readTime: string;
  date: string;
  tags: string[];
  status?: "draft" | "published";
}

const DEFAULT_ARTICLES: Article[] = [
  {
    id: "docker-multistage",
    title: "Architecting Multi-Stage Docker Builds for Production Node.js Services",
    excerpt: "Reduce image size by up to 90%, secure runtime permissions, and prevent dependency bloating using advanced multi-stage caching.",
    date: "June 24, 2026",
    readTime: "5 min read",
    tags: ["Docker", "DevOps", "Security", "Node.js"],
    status: "published",
    content: `
### The Challenge of Large Container Images
In traditional Docker setups for Node.js, we often copy the entire project workspace (including \`devDependencies\`, lock files, and compiler caches) into the final container. This leads to image sizes exceeding 1.2 GB, slower deployment pipeline speeds, and an increased security vulnerability attack surface.

### The Multi-Stage Architecture Solution
Multi-stage builds allow us to separate our build environment (where we compile TypeScript, run linters, and pull dev-dependencies) from the actual runtime environment (where we only need the compiled JavaScript outputs and production packages).

Below is the production-grade, hardened Docker configuration utilized in my microservice deployments:

\`\`\`dockerfile
# --- Stage 1: Dependency Collector ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Stage 2: Application Builder ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
# Prune devDependencies to keep final image clean
RUN npm prune --production

# --- Stage 3: Hardened Runtime ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only compiled outputs and production dependencies
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER nextjs
EXPOSE 3000
CMD ["node", "dist/main.js"]
\`\`\`

### Verification & Performance Metrics
By utilizing this three-stage model:
1. **Size Optimization**: Image footprint reduced from **1.15 GB** to **124 MB** (a ~89.2% reduction).
2. **Security Hardening**: The process executes under a non-root user (\`nextjs\`), rendering root privileges invalid inside host kernels.
3. **Deployment Speeds**: Average build-cache validation times dropped to under **3.5 seconds** in Git pipelines.
    `
  },
  {
    id: "jwt-rotation",
    title: "Implementing JWT Access & Refresh Token Rotation with Secure Cookies",
    excerpt: "A deep dive into cross-site scripting (XSS) mitigation, CSRF protection, and token validation synchronization using Next.js Middleware and App Router.",
    date: "June 18, 2026",
    readTime: "4 min read",
    tags: ["Next.js", "JWT", "Security", "TypeScript"],
    status: "published",
    content: `
### Authentication Security Constraints
When building modern web applications, storing authentication tokens directly in client-side storage (\`localStorage\`) is highly dangerous due to vulnerability to XSS attacks. The standard solution is utilizing **HTTP-Only, Secure, SameSite** cookies. 

However, stateless JWT tokens expire. To maintain user sessions without forcing frequent logins, we must implement a secure **Access/Refresh Token Rotation** pipeline.

### The Lifecycle Pipeline
1. **Access Token**: Short life (15 minutes). Sent in requests to authorize API actions.
2. **Refresh Token**: Long life (7 days). Saved in an HTTP-Only cookie, stored in a database session store. Used to generate a new Access Token.
3. **Replay Detection**: If a compromised Refresh Token is reused, the entire token family is immediately revoked, forcing all devices to re-authenticate.

### Next.js Middleware Validation Sample
Here is how we validate the incoming tokens on-the-fly inside Next.js edge runtime layers:

\`\`\`typescript
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT, signJWT } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // 1. Verify access token
  if (accessToken) {
    const verified = await verifyJWT(accessToken);
    if (verified) return NextResponse.next();
  }

  // 2. Fallback: Verify refresh token & rotate
  if (refreshToken) {
    const session = await db.session.findUnique({ where: { token: refreshToken } });
    if (session && new Date() < session.expiresAt) {
      // Generate new token pair
      const newAccess = await signJWT({ userId: session.userId }, "15m");
      const newRefresh = generateSecureRandomBytes();
      
      // Update DB session store
      await db.session.update({
        where: { id: session.id },
        data: { token: newRefresh }
      });

      const response = NextResponse.next();
      response.cookies.set("access_token", newAccess, { httpOnly: true, secure: true });
      response.cookies.set("refresh_token", newRefresh, { httpOnly: true, secure: true });
      return response;
    }
  }

  // 3. Unauthorized: Redirect to login gate
  return NextResponse.redirect(new URL("/login", req.url));
}
\`\`\`

### Key Security Benefits
- **XSS Immunity**: JS scripts running in the browser cannot read cookie values.
- **CSRF Immunity**: Adding custom headers (\`X-Requested-With\`) paired with \`SameSite=Strict\` rules locks down cross-site scripting vulnerabilities.
    `
  },
  {
    id: "nginx-vps-loadbalancing",
    title: "Configuring Nginx Reverse Proxy with SSL Termination on Linux VPS",
    excerpt: "Orchestrate your application gateway. Set up Let's Encrypt certificates, configure secure HTTPS redirection, and implement basic load balancing parameters.",
    date: "May 29, 2026",
    readTime: "6 min read",
    tags: ["Nginx", "Linux", "SysAdmin", "DevOps"],
    status: "published",
    content: `
### Gateway Architecture for Scale
For application deployments, we avoid exposing development processes directly to the public web (port 3000/8000). Instead, Nginx sits at the edge of the VPS, handling SSL decryption, routing requests, compressing static assets, and balancing traffic across multiple Node.js instances.

### The Production Nginx Configuration
Below is the hardened server config block (\`/etc/nginx/sites-available/default\`) mapped on my Linux deployments:

\`\`\`nginx
# Define upstream server pool for load balancing
upstream app_cluster {
    server 127.0.0.1:3000 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:3001 max_fails=3 fail_timeout=10s;
    keepalive 32;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name rashedul.dev www.rashedul.dev;
    return 301 https://$server_name$request_uri;
}

# HTTPS Configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name rashedul.dev;

    # SSL Certificates managed by Certbot
    ssl_certificate /etc/letsencrypt/live/rashedul.dev/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rashedul.dev/privkey.pem;
    
    # Secure SSL Protocols
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers on;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        proxy_pass http://app_cluster;
        proxy_http_version 1.1;
        
        # Connection Headers for WebSockets/SSE
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        
        # Networking headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeouts for SSE connections
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}
\`\`\`

### Systemd Process Governance
To keep application instances running continuously behind Nginx, we configure **PM2** or native systemd services:

\`\`\`ini
[Unit]
Description=Next.js Web Service
After=network.target

[Service]
Type=simple
User=nextjs
WorkingDirectory=/var/www/portfolio
ExecStart=/usr/bin/node dist/main.js
Restart=always
Environment=NODE_ENV=production PORT=3000

[Install]
WantedBy=multi-user.target
\`\`\`
    `
  }
];

export default function BlogEngine() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const loadArticles = () => {
    const stored = localStorage.getItem("site_blog_articles");
    if (stored) {
      try {
        setArticles(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored articles", e);
        setArticles(DEFAULT_ARTICLES);
      }
    } else {
      localStorage.setItem("site_blog_articles", JSON.stringify(DEFAULT_ARTICLES));
      setArticles(DEFAULT_ARTICLES);
    }
  };

  useEffect(() => {
    loadArticles();
    window.addEventListener("storage", loadArticles);
    window.addEventListener("blog-updated", loadArticles);
    return () => {
      window.removeEventListener("storage", loadArticles);
      window.removeEventListener("blog-updated", loadArticles);
    };
  }, []);

  const publishedArticles = articles.filter(a => a.status === "published" || !a.status);

  return (
    <div className="space-y-8 select-text">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {publishedArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="group bg-card text-card-foreground hover:bg-accent/40 border border-border/85 hover:border-primary/40 p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 relative shadow-xs"
          >
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-transparent group-hover:border-primary/60 transition-all duration-300" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              <h3 className="text-sm font-bold font-mono tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-relaxed">
                {article.title}
              </h3>
              
              <p className="text-xs text-muted-foreground font-sans font-normal leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/60 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[9px] bg-muted border border-border/80 text-muted-foreground px-2 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="font-mono text-[10px] text-muted-foreground group-hover:text-foreground flex items-center gap-1 transition-colors shrink-0">
                Read Node <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-xs p-4 sm:p-6 md:p-10">
            <div className="absolute inset-0 cursor-crosshair" onClick={() => setSelectedArticle(null)} />

            <motion.div
              initial={{ x: "100%", opacity: 0.95 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl h-full bg-card text-card-foreground border-l border-border shadow-2xl flex flex-col font-sans z-10"
            >
              <div className="p-5 border-b border-border flex items-center justify-between bg-card shrink-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-muted border border-border text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest block">TELEMETRY_LOG</span>
                    <span className="text-[10px] font-mono text-primary uppercase tracking-wider font-bold">ARTICLE_ENGINE_CONNECTED</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 text-muted-foreground hover:text-foreground bg-muted border border-border hover:border-border-foreground/20 transition-all cursor-pointer"
                  title="Close Article"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-thin select-text">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] bg-muted border border-border text-muted-foreground px-2.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-foreground leading-snug">
                    {selectedArticle.title}
                  </h1>

                  <div className="flex gap-4 font-mono text-[11px] text-muted-foreground border-b border-border pb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {selectedArticle.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {selectedArticle.readTime}
                    </span>
                  </div>
                </div>

                <div className="text-foreground/90 space-y-6 text-sm leading-relaxed font-normal font-sans max-w-none">
                  {selectedArticle.content.trim().split("\n\n").map((block, idx) => {
                    const line = block.trim();
                    if (line.startsWith("### ")) {
                      return (
                        <h3 key={idx} className="text-sm font-bold font-mono text-foreground pt-4 flex items-center gap-2 uppercase tracking-wide border-b border-border/40 pb-2">
                          <CornerDownRight className="w-4 h-4 text-primary shrink-0" />
                          {line.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (line.startsWith("1. ") || line.startsWith("- ")) {
                      return (
                        <ul key={idx} className="list-disc pl-5 space-y-2 text-muted-foreground font-mono text-[11px] leading-relaxed">
                          {line.split("\n").map((li, lIdx) => (
                            <li key={lIdx}>
                              {li.replace(/^[0-9]\.\s*|^- \s*/, "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (line.startsWith("```")) {
                      const lines = line.split("\n");
                      const language = lines[0].replace("```", "");
                      const code = lines.slice(1, -1).join("\n");
                      return (
                        <div key={idx} className="my-6 font-mono text-xs border border-border bg-muted/50 overflow-x-auto shadow-inner rounded-md">
                          <div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2 text-[9px] text-muted-foreground select-none uppercase tracking-wider">
                            <span>{language || "code_log"}</span>
                            <span>READ_ONLY</span>
                          </div>
                          <pre className="p-4 text-foreground/85 leading-relaxed overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                        </div>
                      );
                    }
                    return (
                      <p key={idx} className="leading-relaxed text-[13px] text-foreground/90" style={{ lineHeight: "1.8" }}>
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 border-t border-border bg-muted/30 font-mono text-[10px] text-muted-foreground flex justify-between shrink-0 select-none">
                <span>SYSTEM: RENDER_OK_200</span>
                <span>AUTHOR: MD. RASHEDUL ISLAM</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
