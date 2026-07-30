"use client";

import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import {
  Search,
  Home,
  User,
  Folder,
  FileText,
  BookOpen,
  List,
  Phone,
  Laptop,
  Award,
  Link as LinkIcon,
  ArrowUpRight,
  Moon,
  Sun,
  X,
  ChevronLeft,
  Mail,
  Lock,
  CheckCircle2,
  Terminal,
  LogIn,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import apiClient from "@/lib/axios";
import { sendContactMessage } from "@/services/apiService";

type ViewState = "search" | "contact" | "full-form" | "login";

export default function SearchModal() {
  const t = useTranslations("SearchModal");
  const locale = useLocale();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>("search");
  const [message, setMessage] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactTopic, setContactTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Toggle the menu when ⌘K is pressed or close on Escape
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        if (!isOpen) setCurrentView("search");
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen]);

  // Listen for custom events to open specific views
  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsOpen(true);
      setLoginEmail("");
      setLoginPassword("");
      setLoginError("");
      if (customEvent.detail?.view) {
        setCurrentView(customEvent.detail.view as ViewState);
      } else {
        setCurrentView("search");
      }
    };

    window.addEventListener("open-modal", handleOpenModal);
    return () => window.removeEventListener("open-modal", handleOpenModal);
  }, []);

  if (!isOpen) return null;

  const runCommand = (command: () => void) => {
    setIsOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/20 dark:bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-full max-w-2xl px-4 z-50 overflow-hidden"
          >
            <div className="rounded-2xl w-full max-w-2xl flex flex-col min-h-[400px] max-h-[80vh] glass glass-shadow">
              <AnimatePresence mode="wait">
                {currentView === "search" && (
                  <motion.div
                    key="search-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col h-full"
                  >
                    <Command
                      className="w-full flex flex-col h-full"
                      label="Global Command Menu"
                      shouldFilter={true}
                    >
                      {/* Top Row: Search Input and Buttons */}
                      <div className="flex items-center border-b border-border px-4">
                        <Search className="mr-3 h-5 w-5 text-muted-foreground" />
                        <Command.Input
                          autoFocus
                          className="flex h-14 w-full bg-transparent text-[15px] text-primary placeholder:text-muted-foreground !outline-none !ring-0 !border-none focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 [box-shadow:none]"
                          placeholder={t("searchPlaceholder")}
                        />

                        {/* Action Buttons within the top bar */}
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => setCurrentView("contact")}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary hover:bg-accent"
                          >
                            <Phone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() =>
                              setTheme(theme === "dark" ? "light" : "dark")
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary hover:bg-accent"
                          >
                            {theme === "dark" ? (
                              <Sun className="h-4 w-4" />
                            ) : (
                              <Moon className="h-4 w-4" />
                            )}
                          </button>
                          <button
                            onClick={() => setIsOpen(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-primary hover:bg-accent"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Dropdown Results container */}
                      <Command.List className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent h-[440px]">
                        <Command.Empty className="py-12 text-center text-sm text-muted-foreground">
                          {t("noResults")}
                        </Command.Empty>

                        <Command.Group
                          heading={
                            <div className="flex items-center justify-between px-2 py-3 text-xs text-muted-foreground">
                              <span>{t("recent")}</span>
                              <button className="text-muted-foreground hover:text-primary">
                                {t("clear")}
                              </button>
                            </div>
                          }
                        >
                          <div className="flex flex-wrap gap-2 px-2 pb-4">
                            <span className="cursor-pointer rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                              GitHub
                            </span>
                            <span className="cursor-pointer rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                              Work
                            </span>
                          </div>
                        </Command.Group>

                        <Command.Group
                          heading={
                            <div className="px-2 pb-2 pt-4 text-xs text-muted-foreground border-t border-border">
                              {t("pagesGroup")}
                            </div>
                          }
                        >
                          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <Command.Item
                              value={`home index ${t("home")}`}
                              onSelect={() =>
                                runCommand(() => router.push("/"))
                              }
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                <Home className="h-4 w-4" />
                              </div>
                              {t("home")}
                            </Command.Item>

                            <Command.Item
                              value={`about me profile resume ${t("about")}`}
                              onSelect={() =>
                                runCommand(() =>
                                  router.push("/about"),
                                )
                              }
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                <User className="h-4 w-4" />
                              </div>
                              {t("about")}
                            </Command.Item>

                            <Command.Item
                              value={`work project projects portfolio ${t("work")}`}
                              onSelect={() =>
                                runCommand(() => router.push("/work"))
                              }
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                <Folder className="h-4 w-4" />
                              </div>
                              {t("work")}
                            </Command.Item>

                            <Command.Item
                              value={`blog writing posts article ${t("blog")}`}
                              onSelect={() =>
                                runCommand(() => router.push("/blog"))
                              }
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                <FileText className="h-4 w-4" />
                              </div>
                              {t("blog")}
                            </Command.Item>

                            <Command.Item
                              value={`guestbook comments sign message ${t("guestbook")}`}
                              onSelect={() =>
                                runCommand(() =>
                                  router.push("/guestbook"),
                                )
                              }
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                <BookOpen className="h-4 w-4" />
                              </div>
                              {t("guestbook")}
                            </Command.Item>

                            <Command.Item
                              value={`bucket list goals ${t("bucketList")}`}
                              onSelect={() =>
                                runCommand(() =>
                                  router.push("/bucket-list"),
                                )
                              }
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                <List className="h-4 w-4" />
                              </div>
                              {t("bucketList")}
                            </Command.Item>

                            <Command.Item
                              value={`certificates awards achievements`}
                              onSelect={() =>
                                runCommand(() =>
                                  router.push("/certificates"),
                                )
                              }
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                <Award className="h-4 w-4" />
                              </div>
                              Certificates
                            </Command.Item>

                            <Command.Item
                              value={`book a call meeting contact hire ${t("bookCall")}`}
                              onSelect={() => setCurrentView("contact")}
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                <Phone className="h-4 w-4" />
                              </div>
                              {t("bookCall")}
                            </Command.Item>

                            <Command.Item
                              value={`uses gear hardware tools ${t("uses")}`}
                              onSelect={() =>
                                runCommand(() => router.push("/uses"))
                              }
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                <Laptop className="h-4 w-4" />
                              </div>
                              {t("uses")}
                            </Command.Item>

                            <Command.Item
                              value={`attribution credits inspiration thanks ${t("attribution")}`}
                              onSelect={() =>
                                runCommand(() =>
                                  router.push("/attribution"),
                                )
                              }
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                <Award className="h-4 w-4" />
                              </div>
                              {t("attribution")}
                            </Command.Item>

                            <Command.Item
                              value={`links social connect network ${t("links")}`}
                              onSelect={() =>
                                runCommand(() =>
                                  router.push("/links"),
                                )
                              }
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                <LinkIcon className="h-4 w-4" />
                              </div>
                              {t("links")}
                            </Command.Item>

                            <Command.Item
                              value={`dashboard admin terminal login ${t("dashboardTerminal")}`}
                              onSelect={() => setCurrentView("login")}
                              className="group flex cursor-pointer items-center gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border bg-cyan-500/10 border-cyan-500/20">
                                <Terminal className="h-4 w-4 text-cyan-400" />
                              </div>
                              {t("dashboardTerminal")}
                            </Command.Item>
                          </div>
                        </Command.Group>

                        <Command.Group
                          heading={
                            <div className="px-2 pb-2 pt-4 text-xs text-muted-foreground border-t border-border">
                              {t("connectGroup")}
                            </div>
                          }
                        >
                          <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
                            <Command.Item
                              onSelect={() =>
                                runCommand(() =>
                                  window.open("https://github.com", "_blank"),
                                )
                              }
                              className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                  <GithubIcon className="h-4 w-4" />
                                </div>
                                GitHub
                              </div>
                              <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                            </Command.Item>

                            <Command.Item
                              onSelect={() =>
                                runCommand(() =>
                                  window.open("https://linkedin.com", "_blank"),
                                )
                              }
                              className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                  <LinkedinIcon className="h-4 w-4" />
                                </div>
                                LinkedIn
                              </div>
                              <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                            </Command.Item>

                            <Command.Item
                              onSelect={() =>
                                runCommand(() =>
                                  window.open("https://twitter.com", "_blank"),
                                )
                              }
                              className="group flex cursor-pointer items-center justify-between gap-3 text-sm text-muted-foreground hover:bg-accent rounded-md px-2 py-1 transition-colors aria-selected:bg-accent aria-selected:text-accent-foreground"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted border border-border">
                                  <XIcon className="h-4 w-4" />
                                </div>
                                X (Twitter)
                              </div>
                              <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
                            </Command.Item>
                          </div>
                        </Command.Group>
                      </Command.List>
                    </Command>
                  </motion.div>
                )}

                {currentView === "contact" && (
                  <motion.div
                    key="contact-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col h-full p-4"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-6">
                      <button
                        onClick={() => setCurrentView("search")}
                        className="p-1 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <h2 className="font-medium text-primary">
                        {t("reachOut")}
                      </h2>
                    </div>

                    {/* Message Card */}
                    <div className="bg-muted border border-border rounded-xl flex flex-col mb-4 overflow-hidden focus-within:ring-1 focus-within:ring-primary/20 transition-shadow glass">
                      <div className="p-4 border-b border-border flex items-center gap-3 bg-muted">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-muted-foreground/10 border border-border">
                          <Image
                            src="/personal_img/rashedul-2.jpeg"
                            alt="Rashedul"
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-primary leading-none">
                            {t("sendMessage")}
                          </span>
                          <span className="text-xs text-muted-foreground mt-1">
                            {t("readEveryOne")}
                          </span>
                        </div>
                      </div>

                      <textarea
                        className="w-full h-32 p-4 bg-transparent resize-none text-sm text-primary placeholder:text-muted-foreground focus:outline-none"
                        placeholder={t("messagePlaceholder")}
                        autoFocus
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (message.trim()) setCurrentView("full-form");
                          }
                        }}
                      />

                      <div className="p-3 border-t border-border flex items-center justify-between bg-muted">
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
                          <span>{t("enterToContinue")}</span>
                          <span>{t("shiftEnter")}</span>
                        </div>
                        <button
                          onClick={() => {
                            if (message.trim()) setCurrentView("full-form");
                          }}
                          disabled={!message.trim()}
                          className={`text-xs font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                            !message.trim()
                              ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                              : "bg-primary text-primary-foreground hover:opacity-90 hover:scale-[1.03]"
                          }`}
                        >
                          {t("continueBtn")}
                        </button>
                      </div>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {/* Book a call */}
                      <button
                        onClick={() => runCommand(() => router.push("/book"))}
                        className="flex flex-col items-start p-4 bg-muted border border-border rounded-xl hover:bg-accent hover:border-primary/30 transition-all duration-300 group text-left glass"
                      >
                        <div className="flex items-center mb-3">
                          <div className="h-8 w-8 rounded-full overflow-hidden bg-muted border-2 border-border z-10">
                            <Image
                              src="/personal_img/rashedul-2.jpeg"
                              alt="Rashedul"
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="h-8 w-8 rounded-full bg-muted border-2 border-card -ml-3 flex items-center justify-center text-[10px] font-medium text-muted-foreground z-0">
                            You
                          </div>
                        </div>
                        <span className="text-sm font-medium text-primary mb-1 group-hover:text-primary transition-colors">
                          {t("bookACall")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t("bookCallDesc")}
                        </span>
                      </button>

                      {/* Email me */}
                      <button
                        onClick={() =>
                          runCommand(
                            () =>
                              (window.location.href =
                                "mailto:hello@rashedul.com"),
                          )
                        }
                        className="flex flex-col items-start p-4 bg-muted border border-border rounded-xl hover:bg-accent hover:border-primary/30 transition-all duration-300 group text-left glass"
                      >
                        <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center mb-3 text-muted-foreground group-hover:text-primary group-hover:bg-accent transition-colors">
                          <Mail className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-primary mb-1 group-hover:text-primary transition-colors">
                          {t("emailMe")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t("emailAddress")}
                        </span>
                      </button>
                    </div>

                    {/* Social Links */}
                    <div className="mt-auto pt-4 grid grid-cols-3 gap-2">
                      <button
                        onClick={() =>
                          runCommand(() =>
                            window.open("https://linkedin.com", "_blank"),
                          )
                        }
                        className="flex items-center justify-center gap-2 py-2 px-3 bg-muted/50 hover:bg-accent rounded-full text-xs font-medium text-muted-foreground hover:text-primary transition-colors border border-border/50"
                      >
                        <LinkedinIcon className="h-3.5 w-3.5" />
                        LinkedIn
                      </button>
                      <button
                        onClick={() =>
                          runCommand(() =>
                            window.open("https://twitter.com", "_blank"),
                          )
                        }
                        className="flex items-center justify-center gap-2 py-2 px-3 bg-muted/50 hover:bg-accent rounded-full text-xs font-medium text-muted-foreground hover:text-primary transition-colors border border-border/50"
                      >
                        <XIcon className="h-3.5 w-3.5" />X (Twitter)
                      </button>
                      <button
                        onClick={() =>
                          runCommand(() =>
                            window.open("https://github.com", "_blank"),
                          )
                        }
                        className="flex items-center justify-center gap-2 py-2 px-3 bg-muted/50 hover:bg-accent rounded-full text-xs font-medium text-muted-foreground hover:text-primary transition-colors border border-border/50"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        GitHub
                      </button>
                    </div>
                  </motion.div>
                )}

                {currentView === "full-form" && (
                  <motion.div
                    key="full-form-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col h-full p-4"
                  >
                    {isSuccess ? (
                      <div className="flex flex-col items-center justify-center h-full p-8 min-h-[350px]">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 15 }}
                          className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6"
                        >
                          <svg
                            className="w-10 h-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </motion.div>
                        <motion.h3
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-2xl font-bold text-foreground"
                        >
                          {t("messageSent")}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-sm text-muted-foreground mt-2 text-center"
                        >
                          {t("thankYou")}
                        </motion.p>
                      </div>
                    ) : (
                      <>
                        {/* Header */}
                        <div className="flex items-center gap-2 mb-6">
                          <button
                            onClick={() => setCurrentView("contact")}
                            className="p-1 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <h2 className="font-medium text-primary">
                            {t("sendAMessage")}
                          </h2>
                        </div>

                        {/* Form Layout */}
                        <form
                          className="flex flex-col gap-4"
                          onSubmit={async (e) => {
                            e.preventDefault();
                            setIsSubmitting(true);
                            try {
                              await sendContactMessage({
                                name: contactName || "Anonymous Visitor",
                                email: contactEmail || "visitor@example.com",
                                subject: contactTopic || "General Inquiry",
                                message: message,
                              });
                              setIsSuccess(true);
                              setTimeout(() => {
                                setIsSuccess(false);
                                setIsOpen(false);
                                setMessage("");
                                setContactName("");
                                setContactEmail("");
                                setContactTopic("");
                                setCurrentView("search");
                              }, 2500);
                            } catch (err) {
                              alert(
                                "Failed to send message. Please try again.",
                              );
                            } finally {
                              setIsSubmitting(false);
                            }
                          }}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-medium text-muted-foreground">
                                {t("name")}
                              </label>
                              <input
                                type="text"
                                placeholder="Your Name"
                                required
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                className="bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all glass"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-medium text-muted-foreground">
                                {t("email")}
                              </label>
                              <input
                                type="email"
                                placeholder="your.email@gmail.com"
                                required
                                value={contactEmail}
                                onChange={(e) =>
                                  setContactEmail(e.target.value)
                                }
                                className="bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all glass"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-medium text-muted-foreground">
                                {t("phone")}
                              </label>
                              <input
                                type="tel"
                                placeholder="Your personal phone number"
                                className="bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all glass"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-medium text-muted-foreground">
                                {t("topic")}
                              </label>
                              <input
                                type="text"
                                placeholder="Topic of conversation"
                                value={contactTopic}
                                onChange={(e) =>
                                  setContactTopic(e.target.value)
                                }
                                className="bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all glass"
                              />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 mb-2">
                            <label className="text-xs font-medium text-muted-foreground">
                              {t("description")}
                            </label>
                            <textarea
                              className="bg-muted border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all h-32 resize-none glass"
                              placeholder="Write your message here..."
                              required
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                          </div>

                          <div className="flex justify-end mt-2">
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium text-sm hover:opacity-90 hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_14px_rgba(0,0,0,0.25)] disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed min-w-[140px]"
                            >
                              {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                              ) : (
                                t("sendAMessage")
                              )}
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </motion.div>
                )}

                {currentView === "login" && (
                  <motion.div
                    key="login-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col h-full p-4 relative overflow-hidden"
                  >
                    {/* Subtle background glow adapted for both themes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                    <div className="flex items-center gap-2 mb-6 relative z-10">
                      <button
                        onClick={() => setCurrentView("search")}
                        className="p-1 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <h2 className="font-medium text-primary">
                        {t("goBack")}
                      </h2>
                    </div>

                    <form
                      autoComplete="off"
                      className="flex flex-col gap-5 flex-1 justify-center max-w-sm mx-auto w-full my-8 relative z-10"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        setLoginError("");
                        setIsLoggingIn(true);
                        try {
                          const res = await apiClient.post("/auth/login", {
                            email: loginEmail,
                            password: loginPassword,
                          });
                          const data = res.data;
                          if (data.success && data.data?.accessToken) {
                            localStorage.setItem(
                              "token",
                              data.data.accessToken,
                            );
                            localStorage.setItem(
                              "user",
                              JSON.stringify(data.data.user),
                            );
                            setLoginEmail("");
                            setLoginPassword("");
                            setIsOpen(false);
                            router.push("/dashboard");
                          } else {
                            setLoginError(
                              data.message || "Invalid email or password!",
                            );
                          }
                        } catch (err: any) {
                          setLoginError(
                            err.response?.data?.message ||
                              "Failed to connect to backend server.",
                          );
                        } finally {
                          setIsLoggingIn(false);
                        }
                      }}
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-primary mb-2">
                          {t("dashboardTerminal")}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
                          {t("dashboardDesc")}
                        </p>
                      </div>

                      {loginError && (
                        <div className="p-3 text-xs font-medium text-red-500 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                          {loginError}
                        </div>
                      )}

                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase pl-1">
                          {t("adminEmail")}
                        </label>
                        <input
                          type="email"
                          name="admin_email_field"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          autoComplete="off"
                          required
                          placeholder="Enter your admin email"
                          className="bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm"
                        />
                      </div>
                      <div className="flex flex-col gap-2 mb-4">
                        <label className="text-[11px] font-bold tracking-widest text-muted-foreground uppercase pl-1">
                          {t("securityPassphrase")}
                        </label>
                        <input
                          type="password"
                          name="admin_password_field"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          autoComplete="new-password"
                          required
                          placeholder="Enter your security passphrase"
                          className="bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-xl font-semibold text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoggingIn ? (
                          <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                          <>
                            <LogIn className="w-4 h-4" />
                            {t("accessDashboard")}
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}
