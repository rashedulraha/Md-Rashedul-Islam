import { useState, useEffect, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  User,
  Code,
  GraduationCap,
  MapPin,
  Mail,
  Briefcase,
  Download,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";
import {
  aboutData,
  Details,
  timelineData,
  skillsCategories,
  certifications,
  testimonials,
} from "@/Data/AboutData/AboutData";
import { useLenis } from "@/Hooks/useLenis";
import image from "../../assets/rashedul.jpeg";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

type TabType =
  | "overview"
  | "experience"
  | "skills"
  | "education"
  | "testimonials";

interface TabConfig {
  id: TabType;
  label: string;
  icon: JSX.Element;
}

export default function About() {
  useLenis();
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: hsl(var(--muted) / 0.1);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: hsl(var(--primary) / 0.3);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: hsl(var(--primary) / 0.5);
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const tabs: TabConfig[] = [
    {
      id: "overview",
      label: "Overview",
      icon: <User className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      id: "experience",
      label: "Experience",
      icon: <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      id: "skills",
      label: "Skills",
      icon: <Code className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      id: "education",
      label: "Education",
      icon: <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: <Star className="w-3 h-3 sm:w-4 sm:h-4" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <Animation />
      </div>

      <Navbar />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        {/* HERO SECTION */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-12">
            {/* Profile Image */}
            <motion.div
              variants={itemVariants}
              className="relative group w-full max-w-60 sm:max-w-70 lg:max-w-none lg:w-auto">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-4 border-primary/20 bg-card shadow-2xl">
                <img
                  src={image}
                  alt="Rashedul Islam"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>

              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-4 bg-card/95 backdrop-blur-xl border border-border p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl w-[calc(100%-2rem)] sm:w-auto">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-green-500/20 p-1.5 sm:p-2 rounded-lg">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-xs text-muted-foreground uppercase font-bold tracking-wider">
                      Status
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-green-600">
                      Available for Hire
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Hero Content */}
            <motion.div
              variants={itemVariants}
              className="flex-1 text-center lg:text-left w-full">
              <Badge className="mb-3 sm:mb-4 bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm px-3 py-1">
                Full-Stack Developer
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter uppercase mb-3 sm:mb-4 leading-tight">
                Rashedul{" "}
                <span className="text-primary block sm:inline">Islam</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Passionate Full-Stack Developer specializing in React, Next.js,
                and Node.js. I transform complex problems into elegant, scalable
                digital solutions.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                {aboutData.slice(0, 4).map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="text-center lg:text-left bg-card/30 backdrop-blur-sm border border-border/40 rounded-xl p-3 sm:p-4">
                    <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1">
                      <div className="text-primary [&>svg]:w-4 [&>svg]:h-4 sm:[&>svg]:w-5 sm:[&>svg]:h-5">
                        {stat.icon}
                      </div>
                      <span className="text-xl sm:text-2xl lg:text-3xl font-black">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-[9px] sm:text-xs text-muted-foreground uppercase tracking-wider font-medium">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-11 sm:h-12 text-sm sm:text-base">
                    <Mail className="w-4 h-4 mr-2" />
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* NAVIGATION TABS */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-10 sm:mb-12 lg:mb-16">
          <div className="relative w-full overflow-x-auto scrollbar-hide pb-2">
            <div className="flex items-center gap-1 sm:gap-2 p-1 bg-muted/20 border border-border/40 rounded-xl sm:rounded-2xl w-fit min-w-full sm:min-w-0 mx-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-primary rounded-lg sm:rounded-xl z-0 shadow-lg shadow-primary/20"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    {tab.icon}
                    <span className="hidden xs:inline">{tab.label}</span>
                    <span className="xs:hidden">{tab.label.slice(0, 3)}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* DYNAMIC CONTENT */}
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-8 sm:space-y-10 lg:space-y-12">
              {/* About Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                {Details.slice(0, 4).map((detail, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="p-4 sm:p-5 lg:p-6 bg-card/20 backdrop-blur-sm border-border/40 hover:bg-card/30 hover:border-primary/30 transition-all group h-full">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-all shrink-0">
                          <div className="text-primary [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                            {detail.icon}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                            {detail.title}
                          </h3>
                          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                            {detail.content}
                          </p>
                          {detail.highlights && (
                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                              {detail.highlights.map((highlight, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-[10px] sm:text-xs">
                                  <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                                  {highlight}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Contact Information */}
              <motion.div variants={itemVariants}>
                <Card className="p-5 sm:p-6 lg:p-8 bg-card/20 backdrop-blur-sm border-border/40">
                  <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
                    Let's Connect
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-5 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background/50 border border-border/40">
                      <MapPin className="w-5 h-5 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground mb-0.5">
                          Location
                        </p>
                        <p className="font-semibold text-sm sm:text-base">
                          Naogaon, Bangladesh
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-background/50 border border-border/40">
                      <Mail className="w-5 h-5 text-primary shrink-0" />
                      <div className="min-w-0 overflow-hidden">
                        <p className="text-xs sm:text-sm text-muted-foreground mb-0.5">
                          Email
                        </p>
                        <p className="font-semibold text-sm sm:text-base truncate">
                          rashedulraha.bd@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full h-10">
                      <a
                        href="https://linkedin.com/in/rashedulraha"
                        target="_blank"
                        rel="noreferrer">
                        <FaFacebook className="w-4 h-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full h-10">
                      <a
                        href="https://github.com/rashedulraha"
                        target="_blank"
                        rel="noreferrer">
                        <FaGithub className="w-4 h-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="w-full h-10">
                      <a
                        href="https://twitter.com/rashedulraha"
                        target="_blank"
                        rel="noreferrer">
                        <FaXTwitter className="w-4 h-4 mr-2" />
                        Twitter
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <motion.div
              key="experience"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6 sm:space-y-8">
              <h3 className="text-2xl sm:text-3xl font-bold">
                Professional Experience
              </h3>

              <div className="relative pl-6 sm:pl-8 lg:pl-12">
                <div className="absolute left-0 sm:left-3 lg:left-8 top-2 bottom-2 w-0.5 bg-linear-to-b from-primary via-primary/50 to-transparent"></div>

                <div className="space-y-6 sm:space-y-8">
                  {timelineData.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative">
                      <div className="absolute -left-6.5 sm:-left-8.5 lg:-left-12.5 top-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary border-2 sm:border-4 border-background shadow-lg shadow-primary/30"></div>

                      <Card className="p-4 sm:p-5 lg:p-6 bg-card/20 backdrop-blur-sm border-border/40 hover:bg-card/30 hover:border-primary/30 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                          <div className="flex-1 min-w-0">
                            <Badge className="mb-2 text-xs">{item.year}</Badge>
                            <h4 className="text-lg sm:text-xl font-bold mb-1">
                              {item.title}
                            </h4>
                            <p className="text-primary font-medium text-sm sm:text-base">
                              {item.company}
                            </p>
                          </div>
                          <div className="p-2.5 sm:p-3 rounded-xl bg-primary/10 w-fit">
                            <div className="text-primary [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                              {item.icon}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {item.achievements.map((achievement, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-[10px] sm:text-xs">
                              <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" />
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <motion.div
              key="skills"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6 sm:space-y-8">
              <h3 className="text-2xl sm:text-3xl font-bold">
                Technical Skills
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                {skillsCategories.map((category, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="p-4 sm:p-5 lg:p-6 bg-card/20 backdrop-blur-sm border-border/40 hover:bg-card/30 hover:border-primary/30 transition-all h-full">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10 shrink-0">
                            <div className="text-primary [&>svg]:w-5 [&>svg]:h-5">
                              {category.icon}
                            </div>
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-base sm:text-lg font-bold mb-1.5">
                              {category.title}
                            </h4>
                            <Badge
                              variant="outline"
                              className="text-[10px] sm:text-xs">
                              {category.level}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {category.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs bg-background/50 border border-border rounded-full hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all cursor-default">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Skills Progress */}
              <motion.div variants={itemVariants}>
                <Card className="p-5 sm:p-6 lg:p-8 bg-card/20 backdrop-blur-sm border-border/40">
                  <h4 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6">
                    Proficiency Level
                  </h4>
                  <div className="space-y-4 sm:space-y-5">
                    {[
                      { name: "Frontend Development", level: 95 },
                      { name: "Backend Development", level: 85 },
                      { name: "Database Management", level: 80 },
                      { name: "DevOps & Tools", level: 75 },
                    ].map((skill, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium">
                            {skill.name}
                          </span>
                          <span className="text-xs sm:text-sm text-muted-foreground font-bold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 sm:h-2.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: i * 0.1,
                              ease: "easeOut",
                            }}
                            className="h-full bg-linear-to-r from-primary to-primary/80 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <motion.div
              key="education"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6 sm:space-y-8">
              <h3 className="text-2xl sm:text-3xl font-bold">
                Education & Certifications
              </h3>

              <motion.div variants={itemVariants}>
                <Card className="p-5 sm:p-6 lg:p-8 bg-card/20 backdrop-blur-sm border-border/40">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="p-3 sm:p-4 rounded-xl bg-primary/10 shrink-0">
                      <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
                        Bachelor of Science in Computer Science & Engineering
                      </h4>
                      <p className="text-primary font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                        Expected Graduation: 2025
                      </p>
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                        Specializing in Software Engineering and Web
                        Technologies. Focus on building scalable applications
                        and understanding modern development practices.
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Data Structures
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Algorithms
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Web Technologies
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Database Systems
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <div>
                <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5">
                  Professional Certifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {certifications.map((cert, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="p-4 sm:p-5 bg-card/20 backdrop-blur-sm border-border/40 hover:bg-card/30 hover:border-primary/30 transition-all h-full">
                        <div className="flex items-start justify-between gap-2 mb-2.5">
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-sm sm:text-base mb-0.5">
                              {cert.name}
                            </h5>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {cert.issuer}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {cert.year}
                          </Badge>
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground break-all">
                          Credential: {cert.credential}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Testimonials Tab */}
          {activeTab === "testimonials" && (
            <motion.div
              key="testimonials"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6 sm:space-y-8">
              <h3 className="text-2xl sm:text-3xl font-bold">
                Client Testimonials
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="p-4 sm:p-5 lg:p-6 bg-card/20 backdrop-blur-sm border-border/40 hover:bg-card/30 hover:border-primary/30 transition-all h-full flex flex-col">
                      <div className="flex items-center gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500"
                          />
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-4 italic flex-1 leading-relaxed">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-border/40">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm sm:text-base">
                            {testimonial.name}
                          </p>
                          <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 sm:mt-16 lg:mt-20 p-6 sm:p-8 md:p-10 lg:p-16 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] border border-border/50 bg-linear-to-br from-card/20 to-card/5 backdrop-blur-xl text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight">
              Ready to Build Something{" "}
              <span className="text-primary italic block sm:inline mt-1 sm:mt-0">
                Amazing?
              </span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed px-4">
              I'm always excited to take on new challenges and collaborate on
              innovative projects. Let's discuss how I can contribute to your
              team's success.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 max-w-md mx-auto">
              <Button size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Start Conversation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="/projects.pdf" download>
                  <Download className="w-4 h-4 mr-2" />
                  View Portfolio
                </a>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
