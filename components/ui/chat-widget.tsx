"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, MessageSquare, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SupportWidget } from "@/components/ui/support-widget";

/** ---------- Motion wrappers ---------- */
const MotionDiv: any = motion.div;
const MotionButton: any = motion.button;

/** ---------- Inline DontWait logo, white on blue header ---------- */
const InlineLogo: React.FC<{ className?: string; size?: "sm" | "lg" }> = ({
  className,
  size = "sm",
}) => {
  const height = size === "lg" ? 40 : 28;
  const width = size === "lg" ? 180 : 130;

  return (
    <span
      className={`inline-flex align-middle items-center ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        style={
          {
            display: "inline-block",
            width,
            height,
            backgroundColor: "#ffffff",
            WebkitMaskImage: "url('/images/dontwait.svg')",
            maskImage: "url('/images/dontwait.svg')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          } as React.CSSProperties
        }
      />
      <span className="sr-only">DontWait</span>
    </span>
  );
};

// ---------------------------------------------
// ChatWidget — opens SupportWidget when noAnswer
// ---------------------------------------------
export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<"idle" | "searching" | "noAnswer">("idle");
  const [showSupport, setShowSupport] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleWidget = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) {
      setPhase("searching");
      setShowSupport(false);

      timerRef.current = setTimeout(() => {
        setPhase("noAnswer");
      }, 20000); // 20 seconds
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      setPhase("idle");
      setShowSupport(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen]);

  const handleOpenSupport = () => {
    setShowSupport(true);
  };

  return (
    <>
      {/* Floating trigger + card */}
      <div className="fixed bottom-5 left-5 z-50">
        <AnimatePresence>
          {isOpen ? (
            <MotionDiv
              key="chat-card"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-80 max-w-[90vw] rounded-2xl shadow-2xl overflow-hidden bg-white border border-slate-200"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white px-4 py-3">
                <button
                  type="button"
                  onClick={toggleWidget}
                  className="absolute right-3 top-3 text-white/80 hover:text-white hover:rotate-90 transition-transform duration-300"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:block">
                    <InlineLogo size="sm" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      DontWait Support
                    </span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 bg-slate-50">
                {phase === "searching" && (
                  <div className="flex flex-col items-center text-center gap-3 py-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                      <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Αναζήτηση επαγγελματία για live chat...
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Συνδέουμε το αίτημά σου με διαθέσιμους συνεργάτες.
                      </p>
                    </div>
                  </div>
                )}

                {phase === "noAnswer" && (
                  <div className="flex flex-col gap-4 py-3">
                    <div className="rounded-xl bg-white border border-slate-200 p-3">
                      <p className="text-sm font-semibold text-slate-900">
                        Δεν βρέθηκε επαγγελματίας σε πραγματικό χρόνο.
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Μπορείς να στείλεις μήνυμα στην υποστήριξη και θα
                        επικοινωνήσουμε μαζί σου το συντομότερο.
                      </p>
                    </div>

                    <MotionButton
                      type="button"
                      onClick={handleOpenSupport}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium shadow-md hover:bg-blue-700 transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Στείλε μήνυμα στην υποστήριξη</span>
                    </MotionButton>

                    <button
                      type="button"
                      onClick={toggleWidget}
                      className="w-full text-xs text-slate-500 hover:text-slate-700 transition-colors mt-1"
                    >
                      Κλείσιμο
                    </button>
                  </div>
                )}
              </div>
            </MotionDiv>
          ) : (
            <MotionButton
              key="chat-trigger"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={toggleWidget}
              className="flex items-center gap-2 px-4 py-3 rounded-full shadow-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Χρειάζεσαι βοήθεια;</span>
            </MotionButton>
          )}
        </AnimatePresence>
      </div>

      {/* SupportWidget modal (opens when no professional found) */}
      <SupportWidget
        isOpen={showSupport}
        onClose={() => setShowSupport(false)}
      />
    </>
  );
};
