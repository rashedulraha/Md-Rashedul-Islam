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

  return (
    <div className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <Navbar />

      <div className="fixed inset-0 z-0">
        <Animation />
      </div>

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* LEFT: Text & Info Section */}
          <div className="col-span-12 lg:col-span-5 space-y-10">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-mono tracking-widest text-primary uppercase animate-pulse">
                <Sparkles className="h-3 w-3" /> Ready to Collaborate
              </div>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase leading-none text-foreground">
                Let's <span className="text-primary italic">Talk</span> <br />
                About Your <span className="text-primary">Idea</span>.
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
                Whether you have a question or just want to say hi, I'll try my
                best to get back to you!
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4 max-w-md mx-auto lg:mx-0">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  value: "contact@rashed.dev",
                  color: "text-blue-500",
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Location",
                  value: "Dhaka, Bangladesh",
                  color: "text-red-500",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group flex items-center gap-5 p-5 rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl hover:border-primary/50 transition-all duration-300">
                  <div
                    className={`p-3 rounded-xl bg-background border border-border group-hover:scale-110 transition-transform ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start gap-4">
              {[FaGithub, FaLinkedinIn, FaXTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-12 w-12 flex items-center justify-center rounded-xl bg-card border border-border hover:border-primary/50 hover:text-primary transition-all active:scale-90 shadow-sm">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Modern Form Card */}
          <div className="col-span-12 lg:col-span-7">
            <div className="relative group">
              {/* Background Glow Effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-primary/30 to-blue-500/30 rounded-4xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

              <div className="relative p-8 sm:p-12 rounded-4xl border border-border/50 bg-card/60 backdrop-blur-2xl shadow-2xl">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                              Full_Name
                            </FormLabel>
                            <FormControl>
                              <div className="group relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                  placeholder="Rashed Islam"
                                  className="pl-12 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded-xl h-14"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                              Email_Address
                            </FormLabel>
                            <FormControl>
                              <div className="group relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                  placeholder="rashed@example.com"
                                  className="pl-12 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded-xl h-14"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                            Message_Subject
                          </FormLabel>
                          <FormControl>
                            <div className="group relative">
                              <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                              <Input
                                placeholder="Project Cooperation"
                                className="pl-12 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded-xl h-14"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-[10px] font-mono uppercase tracking-widest text-primary ml-1">
                            Detailed_Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="I'd like to talk about..."
                              className="min-h-40 bg-background/50 border-border/60 focus:ring-1 focus:ring-primary rounded-2xl p-5 resize-none leading-relaxed"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-2xl h-16 font-black uppercase tracking-[0.2em] gap-3 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
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
