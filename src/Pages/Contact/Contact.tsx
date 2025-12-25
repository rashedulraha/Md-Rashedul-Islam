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
    <div className="h-screen w-full bg-background overflow-hidden flex flex-col">
      <Navbar />

      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 pt-28 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 w-full">
          {/* LEFT: Text & Info Section */}
          <div className="col-span-12 lg:col-span-5 space-y-3 md:space-y-4 lg:space-y-5">
            <div className="space-y-2 md:space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[8px] md:text-[9px] lg:text-[10px] font-mono tracking-widest text-primary uppercase animate-pulse">
                <Sparkles className="h-2 w-2 md:h-3 md:w-3" /> Ready to
                Collaborate
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter uppercase leading-none text-foreground">
                Let's <span className="text-primary italic">Talk</span> <br />
                About Your <span className="text-primary">Idea</span>.
              </h1>
              <p className="text-muted-foreground text-xs md:text-sm lg:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
                Whether you have a question or just want to say hi, I'll try my
                best to get back to you!
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-2 md:space-y-3 max-w-md mx-auto lg:mx-0">
              {[
                {
                  icon: <Mail className="w-3 h-3 md:w-4 md:h-4" />,
                  label: "Email",
                  value: "rashedulraha.bd.gmail.com",
                  color: "text-blue-500",
                  href: "mailto:rashedulraha.bd.gmail.com",
                },
                {
                  icon: <Briefcase className="w-3 h-3 md:w-4 md:h-4" />,
                  label: "Profession",
                  value: "Full Stack Developer",
                  color: "text-green-500",
                },
                {
                  icon: <MapPin className="w-3 h-3 md:w-4 md:h-4" />,
                  label: "Location",
                  value: "Naogaon,Rajshahi, Dhaka, Bangladesh",
                  color: "text-red-500",
                },
              ].map((item, idx) => {
                const CardContent = (
                  <>
                    <div
                      className={`p-1.5 md:p-2.5 rounded-full bg-background border border-border group-hover:scale-110 transition-transform ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] md:text-[9px] lg:text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                        {item.label}
                      </p>
                      <p className="text-xs md:text-sm font-bold truncate">
                        {item.value}
                      </p>
                    </div>
                  </>
                );

                return item.href ? (
                  <a
                    key={idx}
                    href={item.href}
                    className="group flex items-center gap-2 md:gap-3 lg:gap-5 p-2 md:p-3 lg:p-4 rounded border border-border/50 bg-card/40 backdrop-blur-xl hover:border-primary/50 transition-all duration-300">
                    {CardContent}
                  </a>
                ) : (
                  <div
                    key={idx}
                    className="group flex items-center gap-2 md:gap-3 lg:gap-5 p-2 md:p-3 lg:p-4 rounded border border-border/50 bg-card/40 backdrop-blur-xl hover:border-primary/50 transition-all duration-300">
                    {CardContent}
                  </div>
                );
              })}
            </div>

            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start gap-2 md:gap-3">
              {socialLinks.map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 flex items-center justify-center rounded bg-card border border-border hover:border-primary/50 hover:text-primary transition-all active:scale-90 shadow-sm">
                  <Icon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Modern Form Card */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative group h-full">
              {/* Background Glow Effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-primary/30 to-blue-500/30 rounded-xl md:rounded-2xl lg:rounded-3xl blur-xl md:blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

              <div className="relative p-3 md:p-4 lg:p-6 xl:p-8 rounded border border-border/50 bg-card/60 backdrop-blur-2xl shadow-2xl h-full flex flex-col">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3 md:space-y-4 lg:space-y-5 flex-1 flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3 lg:gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-1 md:space-y-2">
                            <FormLabel className="text-[8px] md:text-[9px] lg:text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                              Full_Name
                            </FormLabel>
                            <FormControl>
                              <div className="group relative">
                                <User className="absolute left-2 md:left-3 lg:left-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                  placeholder="Rashed Islam"
                                  className="pl-8 md:pl-10 lg:pl-12 h-8 md:h-9 lg:h-10 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded text-xs md:text-sm"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-[10px] md:text-xs" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-1 md:space-y-2">
                            <FormLabel className="text-[8px] md:text-[9px] lg:text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                              Email_Address
                            </FormLabel>
                            <FormControl>
                              <div className="group relative">
                                <Mail className="absolute left-2 md:left-3 lg:left-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                  placeholder="rashed@example.com"
                                  className="pl-8 md:pl-10 lg:pl-12 h-8 md:h-9 lg:h-10 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded text-xs md:text-sm"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage className="text-[10px] md:text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="space-y-1 md:space-y-2">
                          <FormLabel className="text-[8px] md:text-[9px] lg:text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                            Message_Subject
                          </FormLabel>
                          <FormControl>
                            <div className="group relative">
                              <MessageSquare className="absolute left-2 md:left-3 lg:left-4 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                              <Input
                                placeholder="Project Cooperation"
                                className="pl-8 md:pl-10 lg:pl-12 h-8 md:h-9 lg:h-10 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded text-xs md:text-sm"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[10px] md:text-xs" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-1 md:space-y-2 flex-1 flex flex-col">
                          <FormLabel className="text-[8px] md:text-[9px] lg:text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                            Detailed_Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="I'd like to talk about..."
                              className="min-h-20 md:min-h-24 lg:min-h-32 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded p-2 md:p-3 lg:p-4 resize-none leading-relaxed text-xs md:text-sm flex-1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px] md:text-xs" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="rounded w-full h-8 md:h-10 lg:h-11 text-xs md:text-sm lg:text-base gap-1 md:gap-2">
                      Send Transmission{" "}
                      <Send className="w-3 h-3 md:w-4 md:h-4" />
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
