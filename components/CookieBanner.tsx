"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/app/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

const LS_KEY = "dontwait_cookie_consent_v1";
const SESSION_KEY = "dontwait_cookie_session_id";

type ConsentChoice = "accepted" | "necessary_only";

/**
 * Generate or reuse a session id to group multiple visits from same browser.
 */
function getOrCreateSessionId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let existing = window.localStorage.getItem(SESSION_KEY);
    if (!existing) {
      existing = crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
      window.localStorage.setItem(SESSION_KEY, existing);
    }
    return existing;
  } catch {
    return null;
  }
}

/**
 * Save consent choice to Supabase
 */
async function saveConsentToDb(choice: ConsentChoice) {
  try {
    const sessionId = getOrCreateSessionId();
    let userId: string | null = null;

    // If you use Supabase auth, we try to get current user id (optional)
    const { data: authData } = await supabase.auth.getUser();
    if (authData?.user?.id) {
      userId = authData.user.id;
    }

    const userAgent =
      typeof navigator !== "undefined" ? navigator.userAgent : null;
    const locale =
      typeof navigator !== "undefined" ? navigator.language ?? null : null;
    const path =
      typeof window !== "undefined" ? window.location.pathname : null;
    const referrer =
      typeof document !== "undefined" ? document.referrer || null : null;

    await supabase.from("cookie_consents").insert({
      decision: choice,
      session_id: sessionId,
      user_id: userId,
      user_agent: userAgent,
      path,
      referrer,
      locale,
      banner_version: "v1.0.0", // update this when you change the banner
      
    });
  } catch (error) {
    console.error("Error saving cookie consent:", error);
  }
}

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = window.localStorage.getItem(LS_KEY);
      if (!stored) {
        setIsVisible(true);
      }
    } catch (e) {
      console.error("Error reading cookie consent from localStorage:", e);
    }
  }, []);

  const handleChoice = (choice: ConsentChoice) => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(LS_KEY, choice);
      } catch (e) {
        console.error("Error writing cookie consent to localStorage:", e);
      }
    }

    // Fire-and-forget – DB save happens in the background
    void saveConsentToDb(choice);

    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cookie-banner"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3 sm:px-4 sm:pb-4"
        >
          <div className="w-full max-w-3xl rounded-2xl bg-blue-900/95 backdrop-blur-md border border-blue-500/60 shadow-2xl p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-blue-50">
            {/* Left side: icon + text */}
            <div className="flex-1 flex gap-3">
              <div className="hidden sm:flex items-start">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700/90 border border-blue-300/60">
                  <span className="text-lg">🍪</span>
                </div>
              </div>

              <div className="text-sm">
                <p className="font-semibold text-white mb-1">
                  Χρησιμοποιούμε cookies
                </p>
                <p className="leading-relaxed text-xs sm:text-sm text-blue-100">
                  Στο <span className="font-semibold">DontWait.gr</span>{" "}
                  χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σου,
                  να αναλύουμε την επισκεψιμότητα και να θυμόμαστε τις
                  προτιμήσεις σου. Μπορείς να αποδεχτείς όλα τα cookies ή μόνο
                  τα απολύτως απαραίτητα.
                </p>
                <p className="mt-2 text-[11px] sm:text-xs text-blue-200">
                  Δες περισσότερα στην{" "}
                  <Link
                    href="/privacy-policy"
                    className="underline underline-offset-2 hover:text-white"
                  >
                    Πολιτική Απορρήτου
                  </Link>{" "}
                  και στην{" "}
                  <Link
                    href="/CookiePolicy" // app/CookiePolicy/page.tsx
                    className="underline underline-offset-2 hover:text-white"
                  >
                    Πολιτική Cookies
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Right side: buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-blue-200 text-blue-50 hover:bg-blue-800 hover:text-white rounded-full text-xs sm:text-sm"
                onClick={() => handleChoice("necessary_only")}
              >
                Μόνο τα απαραίτητα
              </Button>
              <Button
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-400 text-white shadow-md rounded-full text-xs sm:text-sm"
                onClick={() => handleChoice("accepted")}
              >
                Αποδοχή όλων
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
