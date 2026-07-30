"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Code2, 
  History, 
  Settings, 
  LogOut, 
  PanelLeftClose, 
  PanelLeftOpen,
  MessageSquare,
  BookOpen,
  Award,
  MessageSquareQuote,
  ListTodo
} from "lucide-react";
import { ConfirmModal } from "./ConfirmModal";

export type TabId = 
  | "overview" 
  | "messages" 
  | "projects" 
  | "skills" 
  | "testimonials"
  | "blogs" 
  | "certificates" 
  | "guestbook" 
  | "bucket-list" 
  | "profile" 
  | "settings";

interface SidebarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

export function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }: SidebarProps) {
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "messages", label: "Contact Messages", icon: MessageSquare },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { id: "blogs", label: "Blogs", icon: BookOpen },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "guestbook", label: "Guestbook", icon: History },
    { id: "bucket-list", label: "Bucket List", icon: ListTodo },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden md:flex flex-col border-r border-border bg-background/50 backdrop-blur-xl h-screen sticky top-0 z-40 shrink-0"
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-bold text-lg text-foreground truncate"
          >
            Admin Panel
          </motion.div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors ${isCollapsed ? "mx-auto" : ""}`}
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 py-6 px-3 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-primary" : "group-hover:scale-110 transition-transform"}`} />
              
              {!isCollapsed && (
                <span className={`font-medium text-xs flex-1 text-left ${isActive ? "text-foreground font-bold" : ""}`}>
                  {tab.label}
                </span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {tab.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button 
          onClick={() => setIsExitModalOpen(true)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors group ${isCollapsed ? "justify-center" : ""}`}
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {!isCollapsed && <span className="font-medium text-xs">Exit Dashboard</span>}
        </button>
      </div>

      <ConfirmModal
        isOpen={isExitModalOpen}
        title="Exit Dashboard"
        message="Are you sure you want to log out and exit the admin panel?"
        confirmText="Exit & Logout"
        cancelText="Stay Here"
        icon={<LogOut className="w-4 h-4" />}
        onConfirm={handleLogout}
        onClose={() => setIsExitModalOpen(false)}
      />
    </motion.aside>
  );
}
