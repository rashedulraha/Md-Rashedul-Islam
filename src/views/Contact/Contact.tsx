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
  Briefcase,
  CheckCircle,
  Loader2,
} from "lucide-react";

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
import OrbitCarousel from "@/components/orbit-carousel";

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

// ===== CREATIVE BORDER STYLES (Theme-aware, no hardcode) =====
const creativeBorderStyle = {
  borderTop: "1.5px solid var(--border)",
  borderLeft: "1px solid var(--border)",
  borderRight: "1px solid var(--border)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 15%)",
};

const innerCardBorderStyle = {
  borderTop: "1px solid var(--border)",
  borderLeft: "1px solid color-mix(in srgb, var(--border) 80%)",
  borderRight: "1px solid color-mix(in srgb, var(--border) 80%)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 10%)",
};

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(values);
    setIsLoading(false);
    setIsSubmitted(true);
    form.reset();

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
          {/* LEFT: Carousel & Contact Info Section */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-6 w-full flex flex-col justify-center items-center gap-8">
            {/* Orbit Carousel */}
            <div className="w-full flex justify-center items-center">
              <OrbitCarousel />
            </div>
          </motion.div>

          {/* RIGHT: Form Section */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-6 w-full">
            {/* Form Card with Creative Border */}
            <div className="relative overflow-hidden rounded-xl bg-card p-6 sm:p-8 md:p-10 transition-all duration-500 hover:shadow-lg group">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
              {/* Subtle corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium flex items-center gap-3 z-10">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>
                    Message sent successfully! I'll get back to you soon.
                  </span>
                </motion.div>
              )}

              <div className="relative">
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
                            <FormLabel className="text-xs sm:text-sm font-semibold text-foreground tracking-wide">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/70 transition-colors group-focus-within:text-primary" />
                                <Input
                                  placeholder="Rashedul Islam"
                                  className="pl-10 h-11 text-base bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
                            <FormLabel className="text-xs sm:text-sm font-semibold text-foreground tracking-wide">
                              Email
                            </FormLabel>
                            <FormControl>
                              <div className="relative group">
                                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/70 transition-colors group-focus-within:text-primary" />
                                <Input
                                  placeholder="email@example.com"
                                  className="pl-10 h-11 text-base bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
                          <FormLabel className="text-xs sm:text-sm font-semibold text-foreground tracking-wide">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <MessageSquare className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/70 transition-colors group-focus-within:text-primary" />
                              <Input
                                placeholder="Project Inquiry"
                                className="pl-10 h-11 text-base bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
                          <FormLabel className="text-xs sm:text-sm font-semibold text-foreground tracking-wide">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="How can I help you?"
                              className="min-h-[150px] bg-background text-base rounded-xl p-4 resize-none border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
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
                      className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 group/btn">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
