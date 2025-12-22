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

// alert

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
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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

  // Social Links Configuration
  const socialLinks = [
    {
      Icon: FaGithub,
      href: "https://github.com/rashedulraha",
      label: "GitHub",
    },
    {
      Icon: FaLinkedinIn,
      href: "https://www.linkedin.com/in/rashedulraha",
      label: "LinkedIn",
    },
    {
      Icon: FaXTwitter,
      href: "https://twitter.com/rashedulraha",
      label: "Twitter",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <Navbar />

      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start lg:items-center">
          {/* LEFT: Text & Info Section */}
          <div className="col-span-12 lg:col-span-5 space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-[9px] sm:text-[10px] font-mono tracking-widest text-primary uppercase animate-pulse">
                <Sparkles className="h-3 w-3" /> Ready to Collaborate
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-foreground">
                Let's <span className="text-primary italic">Talk</span> <br />
                About Your <span className="text-primary">Idea</span>.
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
                Whether you have a question or just want to say hi, I'll try my
                best to get back to you!
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-3 sm:space-y-4 max-w-md mx-auto lg:mx-0">
              {[
                {
                  icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
                  label: "Email",
                  value: "rashedulraha.bd.gmail.com",
                  color: "text-blue-500",
                  href: "mailto:rashedulraha.bd.gmail.com",
                },
                {
                  icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />,
                  label: "Profession",
                  value: "Full Stack Developer",
                  color: "text-green-500",
                },
                {
                  icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
                  label: "Location",
                  value: "Naogaon,Rajshahi, Dhaka, Bangladesh",
                  color: "text-red-500",
                },
              ].map((item, idx) => {
                const CardContent = (
                  <>
                    <div
                      className={`p-2.5 sm:p-3 rounded-full bg-background border border-border group-hover:scale-110 transition-transform ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                        {item.label}
                      </p>
                      <p className="text-xs sm:text-sm font-bold truncate">
                        {item.value}
                      </p>
                    </div>
                  </>
                );

                return item.href ? (
                  <a
                    key={idx}
                    href={item.href}
                    className="group flex items-center gap-3 sm:gap-5 p-4 sm:p-5 rounded border border-border/50 bg-card/40 backdrop-blur-xl hover:border-primary/50 transition-all duration-300">
                    {CardContent}
                  </a>
                ) : (
                  <div
                    key={idx}
                    className="group flex items-center gap-3 sm:gap-5 p-4 sm:p-5 rounded border border-border/50 bg-card/40 backdrop-blur-xl hover:border-primary/50 transition-all duration-300">
                    {CardContent}
                  </div>
                );
              })}
            </div>

            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start gap-3 sm:gap-4">
              {socialLinks.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded bg-card border border-border hover:border-primary/50 hover:text-primary transition-all active:scale-90 shadow-sm">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Modern Form Card */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative group">
              {/* Background Glow Effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-primary/30 to-blue-500/30 rounded-3xl sm:rounded-4xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

              <div className="relative p-6 sm:p-8 lg:p-12 rounded border border-border/50 bg-card/60 backdrop-blur-2xl shadow-2xl">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                              Full_Name
                            </FormLabel>
                            <FormControl>
                              <div className="group relative">
                                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                  placeholder="Rashed Islam"
                                  className="pl-10 sm:pl-12 h-10 sm:h-11 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded text-sm"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-2 sm:space-y-3">
                            <FormLabel className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                              Email_Address
                            </FormLabel>
                            <FormControl>
                              <div className="group relative">
                                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                  placeholder="rashed@example.com"
                                  className="pl-10 sm:pl-12 h-10 sm:h-11 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded text-sm"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="space-y-2 sm:space-y-3">
                          <FormLabel className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                            Message_Subject
                          </FormLabel>
                          <FormControl>
                            <div className="group relative">
                              <MessageSquare className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                              <Input
                                placeholder="Project Cooperation"
                                className="pl-10 sm:pl-12 h-10 sm:h-11 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded text-sm"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-2 sm:space-y-3">
                          <FormLabel className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                            Detailed_Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="I'd like to talk about..."
                              className="min-h-32 sm:min-h-40 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded p-4 sm:p-5 resize-none leading-relaxed text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="rounded w-full h-11 sm:h-12 text-sm sm:text-base gap-2">
                      Send Transmission <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
