import {
  Award,
  Briefcase,
  Code,
  GraduationCap,
  Zap,
  Target,
  TrendingUp,
  Users,
  Lightbulb,
  Rocket,
  Heart,
  Server,
} from "lucide-react";

export const aboutData = [
  {
    label: "Experience",
    value: "2+ Years",
    icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
    description: "Professional development",
  },
  {
    label: "Projects",
    value: "50+",
    icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />,
    description: "Completed applications",
  },
  {
    label: "Contributions",
    value: "1.2K+",
    icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
    description: "GitHub commits",
  },
  {
    label: "Clients",
    value: "15+",
    icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
    description: "Happy clients",
  },
  {
    label: "Technologies",
    value: "20+",
    icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
    description: "Tech stack mastered",
  },
  {
    label: "Performance",
    value: "99.9%",
    icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
    description: "Uptime achieved",
  },
];

export const Details = [
  {
    icon: <Rocket className="w-5 h-5 text-primary" />,
    title: "Professional Journey",
    content:
      "Started my development career in 2022 with a focus on modern web technologies. Quickly progressed from frontend development to full-stack engineering, working with startups and established companies to deliver scalable solutions. Currently specializing in React, Next.js, and Node.js ecosystems.",
    highlights: [
      "2+ years professional experience",
      "Full-stack expertise",
      "Startup to enterprise projects",
    ],
    year: "2022 - Present",
  },
  {
    icon: <Code className="w-5 h-5 text-primary" />,
    title: "Technical Expertise",
    content:
      "Passionate about building performant, scalable web applications with exceptional user experiences. Expertise in MERN stack, Next.js SSR/SSG, TypeScript, and modern development practices. Focus on clean architecture, API design, and optimization.",
    highlights: [
      "MERN Stack Specialist",
      "TypeScript Expert",
      "Performance Optimization",
    ],
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript"],
  },
  {
    icon: <Target className="w-5 h-5 text-primary" />,
    title: "Problem Solving",
    content:
      "Love tackling complex challenges and turning them into elegant solutions. Experienced in system design, database architecture, and implementing best practices. Always seeking to optimize code quality and application performance.",
    highlights: ["System Design", "Clean Architecture", "Performance Tuning"],
    achievements: [
      "Reduced load times by 60%",
      "Implemented scalable solutions",
      "Optimized database queries",
    ],
  },
  {
    icon: <Lightbulb className="w-5 h-5 text-primary" />,
    title: "Innovation & Learning",
    content:
      "Continuous learner dedicated to staying updated with the latest technologies. Active contributor to open-source projects, technical blogger, and mentor to aspiring developers. Always exploring new frameworks and development methodologies.",
    highlights: [
      "Open Source Contributor",
      "Technical Writer",
      "Community Mentor",
    ],
    learning: [
      "AI/ML Integration",
      "Advanced TypeScript",
      "Cloud Architecture",
    ],
  },
  {
    icon: <Users className="w-5 h-5 text-primary" />,
    title: "Collaboration & Leadership",
    content:
      "Strong team player with excellent communication skills. Experience leading development teams, conducting code reviews, and mentoring junior developers. Believe in knowledge sharing and collaborative problem-solving.",
    highlights: ["Team Leadership", "Code Reviews", "Technical Mentoring"],
    softSkills: ["Agile/Scrum", "Communication", "Project Management"],
  },
  {
    icon: <Heart className="w-5 h-5 text-primary" />,
    title: "Beyond Code",
    content:
      "When not coding, you'll find me exploring new technologies, contributing to tech communities, or enjoying outdoor activities. Passionate about photography, coffee culture, and sharing knowledge through workshops and meetups.",
    highlights: ["Tech Community", "Photography", "Coffee Enthusiast"],
    interests: [
      "Hackathons",
      "Tech Meetups",
      "Open Source",
      "Photography",
      "Coffee Tasting",
    ],
  },
];

// Additional data for enhanced about section
export const timelineData = [
  {
    year: "2024",
    title: "Senior Full-Stack Developer",
    company: "Freelance & Consulting",
    description:
      "Leading multiple projects, implementing advanced architectures, and mentoring junior developers.",
    achievements: [
      "10+ successful projects",
      "Team leadership",
      "Technical consulting",
    ],
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    year: "2023",
    title: "Full-Stack Developer",
    company: "Tech Startup",
    description:
      "Developed scalable web applications using React, Node.js, and cloud technologies.",
    achievements: [
      "Built MVP from scratch",
      "Improved performance by 70%",
      "Led API development",
    ],
    icon: <Rocket className="w-5 h-5" />,
  },
  {
    year: "2022",
    title: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Created responsive user interfaces and interactive web experiences.",
    achievements: [
      "20+ client projects",
      "UI/UX implementation",
      "Performance optimization",
    ],
    icon: <Code className="w-5 h-5" />,
  },
  {
    year: "2021",
    title: "Development Journey Started",
    company: "Self-Learning",
    description:
      "Began learning web development with HTML, CSS, and JavaScript.",
    achievements: [
      "Completed 100+ hours of courses",
      "Built first web app",
      "Joined developer communities",
    ],
    icon: <GraduationCap className="w-5 h-5" />,
  },
];

export const skillsCategories = [
  {
    title: "Frontend",
    icon: <Code className="w-4 h-4" />,
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "JavaScript ES6+",
    ],
    level: "Expert",
  },
  {
    title: "Backend",
    icon: <Server className="w-4 h-4" />,
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "REST APIs",
      "GraphQL",
    ],
    level: "Advanced",
  },
  {
    title: "Tools & DevOps",
    icon: <Zap className="w-4 h-4" />,
    skills: ["Git", "GitHub", "Docker", "Nginx", "VS Code", "Postman", "Figma"],
    level: "Intermediate",
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-4 h-4" />,
    skills: [
      "Problem Solving",
      "Team Collaboration",
      "Communication",
      "Project Management",
      "Agile/Scrum",
    ],
    level: "Expert",
  },
];

// Certifications and achievements
export const certifications = [
  {
    name: "Full-Stack Web Development",
    issuer: "Udacity",
    year: "2023",
    credential: "UD123456",
  },
  {
    name: "React Advanced Patterns",
    issuer: "Frontend Masters",
    year: "2023",
    credential: "FM789012",
  },
  {
    name: "Node.js & Express",
    issuer: "Coursera",
    year: "2022",
    credential: "CS345678",
  },
];

// Testimonials
export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content:
      "Rashedul delivered exceptional work on our e-commerce platform. His attention to detail and problem-solving skills are outstanding.",
    rating: 5,
    avatar: "/avatars/sarah.jpg",
  },
  {
    name: "Michael Chen",
    role: "CTO, Digital Agency",
    content:
      "One of the most talented developers I've worked with. His full-stack expertise and commitment to quality are impressive.",
    rating: 5,
    avatar: "/avatars/michael.jpg",
  },
  {
    name: "Emily Davis",
    role: "Product Manager",
    content:
      "Rashedul's ability to understand requirements and deliver solutions that exceed expectations is remarkable.",
    rating: 5,
    avatar: "/avatars/emily.jpg",
  },
];
