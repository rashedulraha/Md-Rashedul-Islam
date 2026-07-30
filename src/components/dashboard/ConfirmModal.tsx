"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmModal({
  isOpen,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  icon,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-background border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 relative z-[10000]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground tracking-tight">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{message}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                disabled={isLoading}
                onClick={onClose}
                className="px-4 py-2 bg-muted hover:bg-accent text-xs font-semibold text-foreground rounded-xl transition-all"
              >
                {cancelText}
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={onConfirm}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center gap-2"
              >
                {icon ? icon : <Trash2 className="w-4 h-4" />}
                {isLoading ? "Processing..." : confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

