"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  Lock, 
  Zap, 
  Cpu, 
  GitCommit,
  ExternalLink,
  ChevronDown,
  Terminal,
  Activity,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import Responsive from "../Responsive/Responsive";
import CommonBg from "@/components/CommonBg/CommonBg";

interface EngineeringPhase {
  name: string;
  icon: React.ReactNode;
  summary: string;
  techDetails: string;
  codeSnippet: string;
}

interface PipelineProject {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  role: string;
  liveUrl: string;
  phases: EngineeringPhase[];
}

const pipelineData: PipelineProject[] = [
  {
    id: "blood-bridge",
    title: "Blood Bridge Platform",
    subtitle: "Enterprise MERN Emergency System",
    duration: "3 Months (Production Deploy)",
    role: "Lead Full-Stack & DevOps Engineer",
    liveUrl: "https://bloodbond-red.vercel.app/",
    phases: [
      {
        name: "Data Modeling",
        icon: <Database className="w-4 h-4 text-primary" />,
        summary: "MongoDB Geospatial Indexes & Schema Design",
        techDetails: "Designed a Mongoose-based relational schema linking emergency blood request posts, volunteer profiles, and donor history. Configured 2dsphere location indexes for local radial searches.",
        codeSnippet: `const donorSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true } // [Longitude, Latitude]
  },
  lastDonationDate: { type: Date }
}, { timestamps: true });

donorSchema.index({ location: "2dsphere" });`
      },
      {
        name: "Route Security",
        icon: <Lock className="w-4 h-4 text-emerald-500" />,
        summary: "Double-Token Rotation & RBAC Middleware",
        techDetails: "Implemented silent refresh token rotations stored in HttpOnly cookies and access tokens in client memory. Created decoupled middleware to enforce strict Role-Based Access Control (RBAC).",
        codeSnippet: `// Verify Access Token + Role Enforcement
export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded: any) => {
      if (err) return res.sendStatus(403);
      if (!roles.includes(decoded.role)) return res.sendStatus(403);
      
      req.user = decoded;
      next();
    });
  };
};`
      },
      {
        name: "Client Caching",
        icon: <Zap className="w-4 h-4 text-amber-500" />,
        summary: "TanStack Query Optimized Mutations & Invalidation",
        techDetails: "Prevented duplicate fetches by setting precise staleTime parameters. Built optimistic UI updates during donor check-ins, tracking local mutations and rolling back automatically upon api failure.",
        codeSnippet: `const queryClient = useQueryClient();

export const useCheckInDonor = () => {
  return useMutation({
    mutationFn: (donorId: string) => axios.post(\`/api/donors/\${donorId}/checkin\`),
    onMutate: async (donorId) => {
      await queryClient.cancelQueries({ queryKey: ['donors', donorId] });
      const previous = queryClient.getQueryData(['donors', donorId]);
      queryClient.setQueryData(['donors', donorId], (old: any) => ({ ...old, checkedIn: true }));
      return { previous };
    },
    onError: (err, donorId, context) => {
      queryClient.setQueryData(['donors', donorId], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['donors'] });
    }
  });
};`
      },
      {
        name: "Container Infrastructure",
        icon: <Cpu className="w-4 h-4 text-indigo-500" />,
        summary: "Multi-Stage Dockerfile & Reverse Proxy configuration",
        techDetails: "Virtualised runtime environment via Docker. Engineered a multi-stage compilation pipeline to keep image payload sizes under 150MB. Integrated Nginx as reverse proxy with custom headers.",
        codeSnippet: `# --- Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]`
      }
    ]
  },
  {
    id: "sharebite",
    title: "Sharebite Marketplace",
    subtitle: "Community Surplus Redistribution",
    duration: "2 Months",
    role: "Lead Full-Stack Developer",
    liveUrl: "https://share-bite-client-jet.vercel.app",
    phases: [
      {
        name: "Data Modeling",
        icon: <Database className="w-4 h-4 text-primary" />,
        summary: "Firestore Document Hierarchies",
        techDetails: "Engineered single-hierarchy collections representing active food items and request queues. Configured composite indexing in NoSQL schema to handle active location queries.",
        codeSnippet: `// Document structure for "food_items"
{
  id: "item_98213",
  title: "Surplus Gourmet Lunches",
  quantity: 12,
  donorId: "user_8913",
  pickupLocation: {
    geohash: "sst84",
    coordinates: GeoPoint(23.75, 90.38)
  },
  expiresAt: Timestamp("2026-06-27T18:00:00Z"),
  status: "AVAILABLE" // AVAILABLE, REQUESTED, DELIVERED
}`
      },
      {
        name: "Route Security",
        icon: <Lock className="w-4 h-4 text-emerald-500" />,
        summary: "Firebase Security Rules & Custom Claims",
        techDetails: "Enforced document-level query security by deploying custom rules. Validated expiration limits and prohibited write access parameters for unauthenticated hosts.",
        codeSnippet: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /food_items/{itemId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null 
        && request.resource.data.donorId == request.auth.uid;
      allow update, delete: if request.auth != null 
        && resource.data.donorId == request.auth.uid;
    }
  }
}`
      },
      {
        name: "Client Caching",
        icon: <Zap className="w-4 h-4 text-amber-400" />,
        summary: "Local State Synced Subscriptions",
        techDetails: "Constructed custom React context to subscribe to real-time updates and cache items locally. Implemented debounce queries to optimize rendering under heavy traffic load.",
        codeSnippet: `export const useRealTimeFoodItems = (category: string) => {
  const [items, setItems] = useState<FoodItem[]>([]);
  
  useEffect(() => {
    const q = query(
      collection(db, "food_items"),
      where("category", "==", category),
      where("status", "==", "AVAILABLE")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updated = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(updated as FoodItem[]);
    });
    
    return () => unsubscribe();
  }, [category]);

  return items;
};`
      },
      {
        name: "Container Infrastructure",
        icon: <Cpu className="w-4 h-4 text-indigo-500" />,
        summary: "Multi-Stage Alpine Deploys",
        techDetails: "Engineered high-performance Docker setup wrapping the Client Single Page Application (SPA) inside an ultra-lean Nginx container, applying gzip file compression for fast browser paint times.",
        codeSnippet: `FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
      }
    ]
  },
  {
    id: "parcel-track",
    title: "ParcelTrack System",
    subtitle: "Automated Logistics & Delivery Gateway",
    duration: "4 Months",
    role: "Lead Systems Engineer",
    liveUrl: "https://go-deliver-client.vercel.app",
    phases: [
      {
        name: "Data Modeling",
        icon: <Database className="w-4 h-4 text-primary" />,
        summary: "Logistics State Machine schema Design",
        techDetails: "Created relational MongoDB schemas representing packages, delivery riders, and transition logs. Bound data validation strictness using mongoose plugins.",
        codeSnippet: `const packageSchema = new Schema({
  trackingNumber: { type: String, unique: true, required: true },
  currentState: { 
    type: String, 
    enum: ['PENDING', 'SORTING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'RETURNED'], 
    default: 'PENDING' 
  },
  routeLogs: [{
    state: String,
    timestamp: { type: Date, default: Date.now },
    notes: String
  }],
  riderAssigned: { type: Schema.Types.ObjectId, ref: 'Rider' }
});`
      },
      {
        name: "Route Security",
        icon: <Lock className="w-4 h-4 text-emerald-500" />,
        summary: "Cryptographic JWT verification middleware",
        techDetails: "Enforced security checking across logistics updates. Wrapped endpoints in secondary hash validators to prevent path tampering or ID spoofs.",
        codeSnippet: `export const verifyLogisticsSignature = (req: Request, res: Response, next: NextFunction) => {
  const signature = req.headers['x-logistics-signature'];
  if (!signature) return res.status(403).json({ error: "Missing signature" });
  
  const payload = JSON.stringify(req.body);
  const expected = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex');
    
  if (signature !== expected) return res.status(401).json({ error: "Tampered payload" });
  next();
};`
      },
      {
        name: "Client Caching",
        icon: <Zap className="w-4 h-4 text-amber-400" />,
        summary: "Rider Telemetry Polling & Caching",
        techDetails: "Configured TanStack Query to poll rider position arrays at strict 5-second intervals. Cached static package routes for 30 minutes, minimizing network requests.",
        codeSnippet: `export const useActiveTracking = (trackingId: string) => {
  return useQuery({
    queryKey: ['tracking', trackingId],
    queryFn: async () => {
      const res = await axios.get(\`/api/tracking/\${trackingId}\`);
      return res.data;
    },
    refetchInterval: 5000, // Dynamic active mapping update
    staleTime: 2000,
    refetchOnWindowFocus: false
  });
};`
      },
      {
        name: "Container Infrastructure",
        icon: <Cpu className="w-4 h-4 text-indigo-500" />,
        summary: "Docker Compose with Redis Cache layer",
        techDetails: "Designed production-ready Docker Compose structure linking the application container with an isolated Redis memory caching daemon and MongoDB replica set.",
        codeSnippet: `version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - REDIS_URL=redis://cache:6379
      - MONGO_URI=mongodb://db:27107/logistics
    depends_on:
      - cache
      - db
  cache:
    image: redis:alpine
    expose:
      - "6379"
  db:
    image: mongo:6.0`
      }
    ]
  }
];

export default function ProjectsPage() {
  const [activeSnippets, setActiveSnippets] = useState<Record<string, number>>({
    "blood-bridge": 0,
    "sharebite": 0,
    "parcel-track": 0
  });

  const selectPhase = (projectId: string, index: number) => {
    setActiveSnippets(prev => ({
      ...prev,
      [projectId]: index
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground relative overflow-hidden pb-24 transition-colors duration-300">
      <CommonBg />

      {/* Floating Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-xl border border-border text-muted-foreground hover:text-foreground transition-all shadow-md hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs font-mono font-bold uppercase">Home</span>
        </Link>
      </div>

      <Responsive>
        <div className="relative z-10 py-20 max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="mb-16 mt-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-xs text-primary font-mono tracking-wider mb-3">
              PIPELINE_LOG
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase font-mono">
              SYSTEM PIPELINES
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl mt-2 leading-relaxed">
              Replacing common thumbnail grids with real data engineering flows. Examine technical implementations from schema modeling to container deployment.
            </p>
          </div>

          {/* Chronological Pipeline Stack */}
          <div className="relative border-l border-border ml-4 md:ml-8 pl-8 md:pl-12 space-y-24">
            
            {pipelineData.map((project, pIdx) => {
              const activePhaseIdx = activeSnippets[project.id];
              const activePhase = project.phases[activePhaseIdx];

              return (
                <div key={project.id} className="relative group">
                  {/* Timeline bullet */}
                  <div className="absolute -left-[45px] md:-left-[61px] top-1.5 bg-background p-1.5 rounded-full border border-border group-hover:border-primary/50 transition-colors z-20">
                    <GitCommit className="w-5 h-5 text-primary animate-pulse" />
                  </div>

                  {/* Project metadata */}
                  <div className="mb-6">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-semibold">
                      DEPLOYMENT_0{pIdx + 1} &bull; {project.duration}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                      <h2 className="text-2xl font-bold text-foreground font-mono uppercase tracking-tight">
                        {project.title}
                      </h2>
                      <span className="text-xs font-mono text-muted-foreground px-2.5 py-0.5 rounded bg-muted border border-border w-max font-semibold">
                        {project.role}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mt-1 uppercase tracking-wider font-semibold">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Visual Engineering Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-card border border-border rounded-2xl p-6 hover:border-primary/20 transition-all duration-300 shadow-xs">
                    
                    {/* LHS: Phase Navigator & Explanation */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                      
                      <div className="space-y-4">
                        <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-wider block">
                          [ENGINEERING_PHASES]
                        </span>

                        {/* Navigation list */}
                        <div className="space-y-2">
                          {project.phases.map((phase, idx) => {
                            const isActive = activePhaseIdx === idx;
                            return (
                              <button
                                key={phase.name}
                                onClick={() => selectPhase(project.id, idx)}
                                className={`w-full text-left px-4 py-3 rounded-xl border font-mono text-xs transition-all flex items-center justify-between outline-none cursor-pointer ${
                                  isActive
                                    ? "bg-muted border-primary/30 text-foreground shadow-xs"
                                    : "bg-transparent border-transparent hover:bg-muted/40 text-muted-foreground"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  {phase.icon}
                                  <span className="font-bold">{phase.name}</span>
                                </div>
                                <span className={`text-[9px] ${isActive ? "text-primary font-bold" : "text-zinc-500"}`}>
                                  PHASE_0{idx + 1}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Phase Summary card */}
                      <div className="bg-muted/60 border border-border p-4.5 rounded-xl space-y-2.5 shadow-inner">
                        <div className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[10px] font-mono font-bold text-foreground uppercase tracking-wider">
                            Phase Summary
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-foreground leading-normal font-mono uppercase">
                          {activePhase.summary}
                        </h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          {activePhase.techDetails}
                        </p>
                      </div>

                      {/* Launch log & Project Details Route */}
                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-mono font-semibold transition-colors"
                        >
                          Launch Service <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-muted-foreground/40 font-mono">|</span>
                        <Link 
                          href={`/projects/${project.id === "blood-bridge" ? "1" : project.id === "sharebite" ? "2" : "3"}`}
                          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-mono font-semibold transition-colors"
                        >
                          Inspect Details →
                        </Link>
                      </div>

                    </div>

                    {/* RHS: Live Code Terminal (Kept in dark contrast for optimal code visual syntax) */}
                    <div className="lg:col-span-7 bg-[#0b0b0e] border border-[#1f1f23] dark:border-border rounded-xl overflow-hidden flex flex-col justify-between shadow-2xl h-[360px] md:h-[400px]">
                      
                      {/* Terminal header */}
                      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950 border-b border-[#1f1f23] dark:border-border select-none">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          <span className="ml-2 font-mono text-[9px] text-zinc-500 uppercase">
                            {project.id}_system_config.ts
                          </span>
                        </div>
                        <Terminal className="w-3 h-3 text-zinc-600" />
                      </div>

                      {/* Code body */}
                      <div className="p-4 flex-1 overflow-auto font-mono text-[10px] sm:text-[11px] text-zinc-300 leading-normal scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                        <pre className="whitespace-pre">{activePhase.codeSnippet}</pre>
                      </div>

                      {/* Terminal Footer */}
                      <div className="px-4 py-2 bg-zinc-950 border-t border-[#1f1f23] dark:border-border flex items-center justify-between font-mono text-[8px] text-zinc-600 select-none">
                        <span>LINES: {activePhase.codeSnippet.split('\n').length}</span>
                        <span>ENCODING: UTF-8</span>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </Responsive>
    </div>
  );
}
