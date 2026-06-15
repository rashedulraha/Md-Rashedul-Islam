"use client";

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

import AnimatedGridBackground from "@/components/AnimatedGridBackground/AnimatedGridBackground";
import OrbitCarousel from "@/components/orbit-carousel";

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

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* LEFT: Carousel Section (Takes 6 cols out of 12 on large screens) */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-6 w-full flex justify-center items-center">
            <OrbitCarousel />
          </motion.div>

          {/* RIGHT: Form Section (Takes 6 cols out of 12 on large screens) */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-6 w-full">
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
                              <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground transition-colors group-focus-within:text-primary" />
                              <Input
                                placeholder="Rashedul Islam"
                                className="pl-10"
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
                              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground transition-colors group-focus-within:text-primary" />
                              <Input
                                placeholder="email@example.com"
                                className="pl-10"
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
                            <MessageSquare className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground transition-colors group-focus-within:text-primary" />
                            <Input
                              placeholder="Project Inquiry"
                              className="pl-10"
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
                  <Button type="submit" disabled={isLoading} className="w-full">
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
        </motion.div>
      </main>
    </div>
  );
}
