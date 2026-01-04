import { Award, Briefcase, Code, GraduationCap, User } from "lucide-react";

export const aboutData = [
  {
    label: "Experience",
    value: "1+ Years",
    icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    label: "Projects",
    value: "20+ Done",
    icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
  {
    label: "Contributions",
    value: "800+ Git",
    icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
  },
];

export const Details = [
  {
    icon: <GraduationCap className="w-4 h-4" />,
    title: "My Programming Journey",
    content:
      "Started with basic HTML/CSS in 2020, gradually progressed to JavaScript, React, and full-stack development. Completed multiple courses and built numerous projects to solidify my skills.",
  },
  {
    icon: <Code className="w-4 h-4" />,
    title: "Work I Enjoy",
    content:
      "Building scalable web applications with modern technologies. Love solving complex problems, creating intuitive user interfaces, and optimizing performance.",
  },
  {
    icon: <User className="w-4 h-4" />,
    title: "Hobbies & Interests",
    content:
      "Outside programming, I enjoy sports (football, cricket), reading tech blogs, photography, and exploring new coffee shops. Passionate about mentoring aspiring developers.",
  },
  {
    icon: <Award className="w-4 h-4" />,
    title: "My Personality",
    content:
      "Detail-oriented problem solver who values clean code and collaboration. Believe in continuous learning and staying updated with industry trends.",
  },
];
