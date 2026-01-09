import {
  CircleDot,
  Workflow,
  Trophy,
  Calendar,
  MapPin,
  ExternalLink,
  Award,
  BookOpen,
  Users,
  Code,
  TrendingUp,
  Star,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import type { EvolutionPhase } from "@/Routes/Types/Particle";
import { useState, useEffect } from "react";
import { useLenis } from "@/Hooks/useLenis";

//! get data to public json file
const loadProjects = async () => {
  const res = await fetch("/evolution.json");
  const json = await res.json();
  return json;
};

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Senior Developer at TechCorp",
    content:
      "Rashedul is an exceptional developer with a keen eye for detail and a passion for creating efficient solutions.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Project Manager at DevStudio",
    content:
      "His ability to quickly adapt to new technologies and deliver high-quality code is impressive.",
    rating: 5,
  },
];

// Certifications data
const certifications = [
  {
    id: 1,
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-DEV-2023-12345",
  },
  {
    id: 2,
    name: "MongoDB Certified Developer",
    issuer: "MongoDB University",
    date: "2022",
    credentialId: "MDB-DEV-2022-67890",
  },
  {
    id: 3,
    name: "React Advanced Patterns",
    issuer: "Udemy",
    date: "2023",
    credentialId: "UDM-REACT-2023-54321",
  },
];

// Key metrics
const metrics = [
  {
    id: 1,
    label: "Projects Completed",
    value: "25+",
    icon: Code,
    color: "text-blue-500",
  },
  {
    id: 2,
    label: "Years of Experience",
    value: "3+",
    icon: Calendar,
    color: "text-green-500",
  },
  {
    id: 3,
    label: "Happy Clients",
    value: "15+",
    icon: Users,
    color: "text-purple-500",
  },
  {
    id: 4,
    label: "Awards & Recognition",
    value: "5+",
    icon: Award,
    color: "text-yellow-500",
  },
];

export default function Experience() {
  const [data, setData] = useState<EvolutionPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("timeline");

  // Initialize AOS and Lenis
  useLenis();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await loadProjects();
        setData(result);
      } catch (error) {
        console.error("Error loading evolution data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      {/* Navbar Integration */}
      <Navbar />

      {/* Tech Background Animation */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 px-3 sm:px-4 md:px-6 lg:px-8 container mx-auto">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8" data-aos="fade-down">
          <div className="inline-flex rounded-lg bg-card/40 backdrop-blur-sm border border-border/30 p-1">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "timeline"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("timeline")}>
              Timeline
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "skills"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("skills")}>
              Skills & Expertise
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "achievements"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("achievements")}>
              Achievements
            </button>
          </div>
        </div>

        <div className="container w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* LEFT SIDE: Heading & Status */}
          <div className="col-span-1 lg:col-span-4 flex flex-col justify-start lg:justify-center space-y-4 sm:space-y-6 text-center lg:text-left items-center lg:items-start">
            <div className="space-y-2" data-aos="fade-right">
              <h2 className="text-primary font-mono text-[10px] sm:text-xs tracking-[0.3em] sm:tracking-[0.5em] uppercase">
                Log_History
              </h2>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-tight">
                Technical <br />{" "}
                <span className="text-primary italic">Evolution</span>
              </h1>
            </div>
            <p
              className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-xs border-l border-primary/30 pl-4 text-left"
              data-aos="fade-right"
              data-aos-delay="100">
              A timeline of my journey from theoretical foundations to building
              scalable digital solutions. Focusing on efficiency and modern
              architectures.
            </p>
            <div
              className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4"
              data-aos="fade-right"
              data-aos-delay="200">
              <div className="flex -space-x-2">
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-background bg-primary/20 flex items-center justify-center backdrop-blur-md">
                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-background bg-chart-1/20 flex items-center justify-center backdrop-blur-md">
                  <Workflow
                    className="h-3 w-3 sm:h-4 sm:w-4"
                    style={{ color: "var(--chart-1)" }}
                  />
                </div>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                Ready for Onboarding
              </span>
            </div>

            {/* Enhanced Stats Section */}
            <div
              className="grid grid-cols-2 gap-3 mt-6"
              data-aos="fade-right"
              data-aos-delay="300">
              <Card className="p-3 bg-card/40 backdrop-blur-sm border-border/30">
                <p className="text-xs text-muted-foreground">Phases</p>
                <p className="text-xl font-bold">{data.length}</p>
              </Card>
              <Card className="p-3 bg-card/40 backdrop-blur-sm border-border/30">
                <p className="text-xs text-muted-foreground">Technologies</p>
                <p className="text-xl font-bold">
                  {data.reduce((acc, item) => acc + item.stack.length, 0)}
                </p>
              </Card>
            </div>

            {/* Key Metrics */}
            <div
              className="space-y-3 mt-4 w-full"
              data-aos="fade-right"
              data-aos-delay="400">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Key Metrics
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((metric, index) => (
                  <Card
                    key={metric.id}
                    className="p-3 bg-card/40 backdrop-blur-sm border-border/30 flex items-center gap-3"
                    data-aos="zoom-in"
                    data-aos-delay={500 + index * 100}>
                    <div className={`p-2 rounded-lg bg-background/50`}>
                      <metric.icon className={`h-4 w-4 ${metric.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {metric.label}
                      </p>
                      <p className="text-lg font-bold">{metric.value}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Download Resume Button */}
            <Button
              className="w-full mt-4 bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20"
              asChild
              data-aos="fade-up"
              data-aos-delay="600">
              <a href="/Md-Rasheduli-Islam.pdf" download>
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </div>

          {/* RIGHT SIDE: Content Based on Active Tab */}
          <div
            className="col-span-1 lg:col-span-8 space-y-4 sm:space-y-5 lg:overflow-y-auto lg:max-h-[70vh] lg:pr-4 custom-scrollbar"
            data-lenis-prevent="false">
            {activeTab === "timeline" && (
              <>
                {loading
                  ? // Loading Skeleton
                    Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="animate-pulse">
                        <div className="p-4 sm:p-5 md:p-6">
                          <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                          <div className="h-3 bg-muted rounded w-full mb-2"></div>
                          <div className="h-3 bg-muted rounded w-full mb-4"></div>
                          <div className="flex gap-2">
                            <div className="h-6 bg-muted rounded w-16"></div>
                            <div className="h-6 bg-muted rounded w-16"></div>
                            <div className="h-6 bg-muted rounded w-16"></div>
                          </div>
                        </div>
                      </Card>
                    ))
                  : data.map((item: EvolutionPhase, index: number) => (
                      <Card
                        key={index}
                        className="group rounded relative bg-card/20 backdrop-blur-xl border-border/40 p-4 sm:p-5 md:p-6 transition-all hover:bg-primary/3 hover:border-primary/50 overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1"
                        data-aos="fade-up"
                        data-aos-delay={index * 100}>
                        {/* Background Decor */}
                        <span className="absolute -right-2 -top-2 sm:-right-4 sm:-top-4 text-4xl sm:text-5xl md:text-6xl font-black text-primary/5 italic select-none">
                          0{index + 1}
                        </span>

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                          <div className="space-y-1">
                            <span className="text-[9px] sm:text-[10px] font-mono text-primary/80 uppercase tracking-tighter">
                              {item.phase}
                            </span>
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                              {item.role}
                            </h3>
                            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground/80 font-medium">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {item.org}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {item.duration}
                              </span>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="w-fit h-fit bg-primary/10 text-primary border-none text-[9px] sm:text-[10px] px-2.5 sm:px-3 py-1 shrink-0">
                            {item.impact}
                          </Badge>
                        </div>

                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                          {item.stack.map((s) => (
                            <div
                              key={s}
                              className="flex items-center gap-1 bg-background/50 border border-border/50 px-2 py-1 rounded text-[8px] sm:text-[9px] font-mono text-muted-foreground uppercase tracking-wider group-hover:border-primary/30 transition-colors">
                              <CircleDot className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-primary/50" />
                              {s}
                            </div>
                          ))}
                        </div>

                        {item.link && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs p-0 h-auto font-normal"
                            asChild>
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary hover:underline">
                              View Project <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </Card>
                    ))}
              </>
            )}

            {activeTab === "skills" && (
              <div className="space-y-6">
                {/* Technical Skills Section */}
                <Card
                  className="p-6 bg-card/20 backdrop-blur-xl border-border/40"
                  data-aos="fade-up">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Technical Expertise
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div data-aos="fade-right" data-aos-delay="100">
                      <h4 className="font-semibold mb-2 text-sm">Frontend</h4>
                      <div className="space-y-2">
                        {["React", "Next.js", "TypeScript", "Tailwind CSS"].map(
                          (skill, index) => (
                            <div
                              key={skill}
                              className="flex items-center gap-2"
                              data-aos="fade-right"
                              data-aos-delay={100 + index * 50}>
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                              <span className="text-sm">{skill}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div data-aos="fade-right" data-aos-delay="200">
                      <h4 className="font-semibold mb-2 text-sm">Backend</h4>
                      <div className="space-y-2">
                        {["Node.js", "Express", "MongoDB", "REST APIs"].map(
                          (skill, index) => (
                            <div
                              key={skill}
                              className="flex items-center gap-2"
                              data-aos="fade-right"
                              data-aos-delay={200 + index * 50}>
                              <div className="h-2 w-2 rounded-full bg-chart-1"></div>
                              <span className="text-sm">{skill}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div data-aos="fade-right" data-aos-delay="300">
                      <h4 className="font-semibold mb-2 text-sm">
                        Tools & Others
                      </h4>
                      <div className="space-y-2">
                        {["Git", "Docker", "AWS", "Figma"].map(
                          (skill, index) => (
                            <div
                              key={skill}
                              className="flex items-center gap-2"
                              data-aos="fade-right"
                              data-aos-delay={300 + index * 50}>
                              <div className="h-2 w-2 rounded-full bg-chart-2"></div>
                              <span className="text-sm">{skill}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div data-aos="fade-right" data-aos-delay="400">
                      <h4 className="font-semibold mb-2 text-sm">
                        Soft Skills
                      </h4>
                      <div className="space-y-2">
                        {[
                          "Problem Solving",
                          "Team Collaboration",
                          "Communication",
                          "Time Management",
                        ].map((skill, index) => (
                          <div
                            key={skill}
                            className="flex items-center gap-2"
                            data-aos="fade-right"
                            data-aos-delay={400 + index * 50}>
                            <div className="h-2 w-2 rounded-full bg-chart-3"></div>
                            <span className="text-sm">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Learning Path */}
                <Card
                  className="p-6 bg-card/20 backdrop-blur-xl border-border/40"
                  data-aos="fade-up"
                  data-aos-delay="200">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Learning Journey
                  </h3>
                  <div className="space-y-4">
                    <div
                      className="flex items-start gap-3"
                      data-aos="fade-right"
                      data-aos-delay="300">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Continuous Learning</h4>
                        <p className="text-sm text-muted-foreground">
                          Actively pursuing advanced courses in cloud
                          architecture and machine learning to expand technical
                          capabilities.
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-start gap-3"
                      data-aos="fade-right"
                      data-aos-delay="400">
                      <div className="bg-chart-1/10 p-2 rounded-lg">
                        <Award className="h-4 w-4 text-chart-1" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Industry Certifications
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Regularly updating certifications to stay current with
                          industry standards and best practices.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-6">
                {/* Certifications Section */}
                <Card
                  className="p-6 bg-card/20 backdrop-blur-xl border-border/40"
                  data-aos="fade-up">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Certifications
                  </h3>
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div
                        key={cert.id}
                        className="border-l-2 border-primary/30 pl-4"
                        data-aos="fade-right"
                        data-aos-delay={index * 100}>
                        <h4 className="font-semibold">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer} • {cert.date}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">
                          Credential ID: {cert.credentialId}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Testimonials Section */}
                <Card
                  className="p-6 bg-card/20 backdrop-blur-xl border-border/40"
                  data-aos="fade-up"
                  data-aos-delay="100">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Testimonials
                  </h3>
                  <div className="space-y-4">
                    {testimonials.map((testimonial, index) => (
                      <div
                        key={testimonial.id}
                        className="border-l-2 border-chart-1/30 pl-4"
                        data-aos="fade-right"
                        data-aos-delay={100 + index * 100}>
                        <div className="flex items-center gap-1 mb-2">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                className="h-3 w-3 fill-yellow-400 text-yellow-400"
                              />
                            )
                          )}
                        </div>
                        <p className="text-sm italic mb-2">
                          "{testimonial.content}"
                        </p>
                        <p className="text-sm font-semibold">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.position}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Awards Section */}
                <Card
                  className="p-6 bg-card/20 backdrop-blur-xl border-border/40"
                  data-aos="fade-up"
                  data-aos-delay="200">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Awards & Recognition
                  </h3>
                  <div className="space-y-4">
                    <div
                      className="flex items-start gap-3"
                      data-aos="fade-right"
                      data-aos-delay="300">
                      <div className="bg-yellow-500/10 p-2 rounded-lg">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Best Innovation Award</h4>
                        <p className="text-sm text-muted-foreground">
                          TechFest 2022 - Recognized for developing an
                          innovative solution to streamline workflow processes.
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-start gap-3"
                      data-aos="fade-right"
                      data-aos-delay="400">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Award className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Employee of the Quarter
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          DevStudio Q3 2023 - Acknowledged for exceptional
                          performance and dedication to team success.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
