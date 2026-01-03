import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Mail,
  MessageSquare,
  Send,
  User,
  MapPin,
  Sparkles,
  Briefcase,
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
import Animation from "@/components/Animation/Animation";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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

// Card info
const cardInfo = [
  {
    icon: <Mail className="w-4 h-4" />,
    label: "Email",
    value: "rashedulraha.bd@gmail.com",
    color: "text-blue-500",
    href: "mailto:rashedulraha.bd@gmail.com",
  },
  {
    icon: <Briefcase className="w-4 h-4" />,
    label: "Profession",
    value: "Full Stack Developer",
    color: "text-green-500",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: "Location",
    value: "Naogaon, Rajshahi, Bangladesh",
    color: "text-red-500",
  },
];

// Validation Schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name required" }),
  email: z.string().email({ message: "Invalid email" }),
  subject: z.string().min(5, { message: "Subject too short" }),
  message: z.string().min(10, { message: "Message too short" }),
});

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    alert("Message Initialized & Sent!");
    form.reset();
  }

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden flex flex-col">
      <Navbar />

      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT: Text & Info Section */}
          <div className="col-span-1 lg:col-span-5 space-y-6 sm:space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-mono tracking-widest text-primary uppercase">
                <Sparkles className="h-3 w-3 animate-pulse" />
                Ready to Collaborate
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-tight text-foreground">
                Let's <span className="text-primary italic">Talk</span> <br />
                About Your <span className="text-primary">Idea</span>.
              </h1>

              {/* Description */}
              <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
                Whether you have a question or just want to say hi, I'll try my
                best to get back to you!
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-3 sm:space-y-4 max-w-md mx-auto lg:mx-0">
              {cardInfo.map((item, idx) => {
                const content = (
                  <div
                    key={idx}
                    className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded border border-border/50 bg-card/40 backdrop-blur-xl hover:border-primary/50 hover:bg-card/60 transition-all duration-300 w-full cursor-pointer">
                    <div
                      className={`p-2.5 sm:p-3 rounded-full bg-background border border-border group-hover:scale-110 transition-transform ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        {item.label}
                      </p>
                      <p className="text-xs sm:text-sm font-bold truncate text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a key={idx} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  content
                );
              })}
            </div>
          </div>

          {/* RIGHT: Form Section */}
          <div className="col-span-1 lg:col-span-6 xl:col-span-6">
            <div className="relative p-5 sm:p-6 md:p-8 lg:p-10 rounded border border-border/50 bg-card/60 backdrop-blur-2xl shadow-2xl">
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
                          <FormLabel className="text-[10px] font-mono uppercase text-primary tracking-wider">
                            Full_Name
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                placeholder="Rashed Islam"
                                className="pl-10 sm:pl-12 bg-background/50 h-11 sm:h-12 rounded border-border/50 focus:border-primary/50 transition-colors"
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
                          <FormLabel className="text-[10px] font-mono uppercase text-primary tracking-wider">
                            Email
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                placeholder="email@example.com"
                                className="pl-10 sm:pl-12 bg-background/50 h-11 sm:h-12 rounded border-border/50 focus:border-primary/50 transition-colors"
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
                        <FormLabel className="text-[10px] font-mono uppercase text-primary tracking-wider">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              placeholder="Project Inquiry"
                              className="pl-10 sm:pl-12 bg-background/50 h-11 sm:h-12 rounded border-border/50 focus:border-primary/50 transition-colors"
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
                        <FormLabel className="text-[10px] font-mono uppercase text-primary tracking-wider">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How can I help you?"
                            className="min-h-37.5 bg-background/50 rounded p-3 sm:p-4 resize-none border-border/50 focus:border-primary/50 transition-colors"
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
                    className="w-full h-12 sm:h-14 rounded font-bold uppercase tracking-widest gap-2 text-xs sm:text-sm hover:scale-[1.02] transition-transform active:scale-95">
                    Send Transmission <Send className="w-4 h-4" />
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* RIGHT: Social Sidebar (Desktop only) */}
          <div className="hidden xl:flex xl:col-span-1 flex-col items-center justify-center gap-6">
            <div className="h-16 w-px bg-linear-to-b from-transparent via-border to-primary" />
            <div className="flex flex-col gap-5">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-primary transition-all hover:scale-125 active:scale-90">
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <div className="h-16 w-px bg-linear-to-t from-transparent via-border to-primary" />
          </div>

          {/* Mobile Social Bar (Visible on small/medium screens) */}
          <div className="col-span-1 xl:hidden flex justify-center items-center gap-6 sm:gap-8 pt-6 sm:pt-8">
            <div className="h-px w-8 sm:w-12 bg-linear-to-r from-transparent to-primary" />
            <div className="flex gap-5 sm:gap-6">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-muted-foreground hover:text-primary transition-all hover:scale-110 active:scale-90">
                  <social.icon size={20} className="sm:w-5.5 sm:h-5.5" />
                </a>
              ))}
            </div>
            <div className="h-px w-8 sm:w-12 bg-linear-to-l from-transparent to-primary" />
          </div>
        </div>
      </main>
    </div>
  );
}
