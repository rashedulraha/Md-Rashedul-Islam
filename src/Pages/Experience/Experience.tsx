import { Briefcase, Calendar, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Ltd.",
    period: "2023 - Present",
    description:
      "Leading the development of scalable MERN stack applications and mentoring junior developers.",
    skills: ["React", "Node.js", "AWS"],
    type: "work",
  },
  {
    title: "Frontend Developer",
    company: "Creative Digital Agency",
    period: "2021 - 2023",
    description:
      "Built pixel-perfect, responsive UIs using Tailwind CSS and Next.js for international clients.",
    skills: ["Next.js", "Tailwind", "TypeScript"],
    type: "work",
  },
  {
    title: "B.Sc in Computer Science",
    company: "University of Technology",
    period: "2017 - 2021",
    description:
      "Completed graduation with a focus on Software Engineering and Data Structures.",
    skills: ["Algorithms", "Java", "Database"],
    type: "education",
  },
];

export default function Experience() {
  return (
    <div className="relative z-10 max-w-5xl mx-auto h-full w-full py-10 px-6 overflow-y-auto no-scrollbar">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-primary font-mono tracking-widest text-sm mb-2 uppercase">
          History
        </h2>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase">
          Experience <span className="text-primary">&</span> Education
        </h1>
      </div>

      {/* Timeline Container */}
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
        {experiences.map((item, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-in fade-in slide-in-from-bottom duration-500 delay-${
              index * 100
            }`}>
            {/* Icon/Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors group-hover:border-primary group-hover:bg-primary/10">
              {item.type === "work" ? (
                <Briefcase className="h-5 w-5 text-primary" />
              ) : (
                <GraduationCap className="h-5 w-5 text-chart-2" />
              )}
            </div>

            {/* Content Card */}
            <Card className="w-[calc(100%-4rem)] md:w-[45%] bg-card/20 backdrop-blur-md border-border/40 transition-all hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary),0.1)]">
              <CardHeader className="p-4 pb-0">
                <div className="flex items-center justify-between mb-1">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono border-primary/20 text-primary uppercase">
                    {item.period}
                  </Badge>
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                  {item.title}
                </CardTitle>
                <p className="text-sm font-medium text-primary/80">
                  {item.company}
                </p>
              </CardHeader>
              <CardContent className="p-4 pt-2 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono bg-secondary/50 px-2 py-1 rounded border border-border/50 text-muted-foreground uppercase">
                      #{skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
