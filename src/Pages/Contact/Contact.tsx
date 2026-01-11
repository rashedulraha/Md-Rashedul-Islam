import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Send,
  User,
  MapPin,
  Sparkles,
  Briefcase,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "../shared/Navbar/Navbar";
import Animation from "@/components/Animation/Animation";

// Social Links Configuration
const socialLinks = [
  { name: "GitHub", icon: FaGithub, url: "https://github.com/rashedulraha" },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/rashedulraha",
  },
  { name: "Twitter", icon: FaXTwitter, url: "https://x.com/rashedulraha" },
  {
    name: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/rashedulraha",
  },
];

// Card info with dynamic colors
const cardInfo = [
  {
    icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
    label: "Email",
    value: "rashedulraha.bd@gmail.com",
    color: "var(--chart-2)",
    href: "mailto:rashedulraha.bd@gmail.com",
  },
  {
    icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
    label: "Profession",
    value: "Full Stack Developer",
    color: "var(--chart-4)",
  },
  {
    icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
    label: "Location",
    value: "Naogaon, Rajshahi, Bangladesh",
    color: "var(--destructive)",
  },
];

// Validation Schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(values);
    setIsLoading(false);
    setIsSubmitted(true);
    form.reset();

    // Hide success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <Navbar />

      {/* Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-10">
        <Animation />
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* LEFT: Text & Info Section */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-5 space-y-6 sm:space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4 sm:space-y-5 text-center lg:text-left">
              {/* Badge */}
              <motion.div variants={itemVariants} className="inline-flex">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] sm:text-xs font-mono tracking-widest text-primary uppercase">
                  <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-pulse" />
                  Ready to Collaborate
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] uppercase">
                Let's <span className="text-primary italic">Talk</span>
                <br className="hidden sm:block" />
                <span className="block sm:inline"> About Your </span>
                <span className="text-primary">Idea</span>.
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
                Whether you have a question or just want to say hi, I'll try my
                best to get back to you!
              </motion.p>
            </div>

            {/* Info Cards */}
            <motion.div
              variants={containerVariants}
              className="space-y-3 sm:space-y-4 max-w-md mx-auto lg:mx-0">
              {cardInfo.map((item, idx) => {
                const content = (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border border-border/40 bg-card/20 backdrop-blur-sm hover:border-primary/50 hover:bg-card/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-full">
                    <div
                      className="p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl bg-background/50 border border-border/40 group-hover:scale-110 transition-transform duration-300 shrink-0"
                      style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-xs sm:text-sm lg:text-base font-bold truncate group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );

                return item.href ? (
                  <a key={idx} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={idx}>{content}</div>
                );
              })}
            </motion.div>

            {/* Mobile Social Bar */}
            <motion.div
              variants={itemVariants}
              className="flex lg:hidden justify-center items-center gap-5 sm:gap-6 pt-4 sm:pt-6">
              <div className="h-px w-12 sm:w-16 bg-linear-to-r from-transparent via-border to-primary" />
              <div className="flex gap-4 sm:gap-5">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110 active:scale-90">
                    <social.icon size={20} className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                ))}
              </div>
              <div className="h-px w-12 sm:w-16 bg-linear-to-l from-transparent via-border to-primary" />
            </motion.div>
          </motion.div>

          {/* RIGHT: Form Section */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-6">
            <div className="relative p-5 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-border/40 bg-card/20 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500">
              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-4 left-4 right-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 text-xs sm:text-sm font-medium flex items-center gap-2 z-10">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span>
                    Message sent successfully! I'll get back to you soon.
                  </span>
                </motion.div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5 sm:space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] sm:text-xs font-mono uppercase text-primary tracking-wider">
                            Full_Name
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                              <Input
                                placeholder="Rashedul Islam"
                                className="pl-10 sm:pl-12 bg-background/50 h-10 sm:h-11 lg:h-12 text-sm sm:text-base rounded-lg sm:rounded-xl border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] sm:text-xs font-mono uppercase text-primary tracking-wider">
                            Email
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                              <Input
                                placeholder="email@example.com"
                                className="pl-10 sm:pl-12 bg-background/50 h-10 sm:h-11 lg:h-12 text-sm sm:text-base rounded-lg sm:rounded-xl border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Subject Field */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] sm:text-xs font-mono uppercase text-primary tracking-wider">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <div className="relative group">
                            <MessageSquare className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                            <Input
                              placeholder="Project Inquiry"
                              className="pl-10 sm:pl-12 bg-background/50 h-10 sm:h-11 lg:h-12 text-sm sm:text-base rounded-lg sm:rounded-xl border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Message Field */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] sm:text-xs font-mono uppercase text-primary tracking-wider">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How can I help you?"
                            className="min-h-30 sm:min-h-35 lg:min-h-37.5 bg-background/50 text-sm sm:text-base rounded-lg sm:rounded-xl p-3 sm:p-4 resize-none border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 sm:h-12 lg:h-14 rounded-xl font-bold uppercase tracking-widest gap-2 text-xs sm:text-sm bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>

          {/* Desktop Social Sidebar */}
          <motion.div
            variants={itemVariants}
            className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center gap-5 sm:gap-6">
            <div className="h-12 sm:h-16 w-px bg-linear-to-b from-transparent via-border to-primary" />
            <div className="flex flex-col gap-4 sm:gap-5">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-125 active:scale-90">
                  <social.icon size={20} className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="h-12 sm:h-16 w-px bg-linear-to-t from-transparent via-border to-primary" />
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
