"use client";

import React, { useState, useEffect, useRef } from "react";
import { X as CloseIcon, MessageSquare as ChatIcon } from "lucide-react";
import { AnimatePresence, motion, MotionProps } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

// ------------------------------
// Create Supabase Client using .env variables
// ------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---------------------------------------------
// Helper Wrappers for Framer Motion Elements
// ---------------------------------------------
const MotionDiv: React.FC<React.HTMLAttributes<HTMLDivElement> & MotionProps> = ({
  children,
  ...props
}) => {
  return <motion.div {...props}>{children}</motion.div>;
};

const MotionButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & MotionProps
> = ({ children, ...props }) => {
  return <motion.button {...props}>{children}</motion.button>;
};

// ---------------------------------------------
// ChatWidget Component
// ---------------------------------------------
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState("idle"); // "searching" | "noAnswer"
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  // Explicitly type the timer ref using the return type of setTimeout
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      // When the widget opens, start the "searching" phase
      setPhase("searching");
      setShowEmailForm(false);
      timerRef.current = setTimeout(() => {
        setPhase("noAnswer");
      }, 20000); // 20 seconds
    } else {
      // When closing, clear any timers and reset state
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setPhase("idle");
      setShowEmailForm(false);
    }
  }, [isOpen]);

  const handleSendEmailClick = () => {
    setShowEmailForm(true);
  };

  const handleEmailFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const payload = {
      email: emailValue,
      message: messageValue,
    };

    try {
      const { data, error } = await supabase
        .from("chat_emails")
        .insert([payload]);
      if (error) {
        console.error("Error inserting email:", error.message);
      } else {
        console.log("Email inserted successfully:", data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
    // Optionally clear the form fields and close the widget
    setEmailValue("");
    setMessageValue("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence exitBeforeEnter>
        {isOpen ? (
          <MotionDiv
            key="chat-widget"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-xl w-80 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 flex justify-between items-center">
              <h4 className="font-semibold">Chat</h4>
              <button onClick={toggleWidget} aria-label="Close">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            {/* Body */}
            <div className="p-4">
              {phase === "searching" && (
                <div className="flex flex-col items-center justify-center h-40">
                  <p className="text-sm text-gray-600 mb-2">
                    Αναζήτηση επαγγελματία για live chat...
                  </p>
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-600"></div>
                </div>
              )}
              {phase === "noAnswer" && !showEmailForm && (
                <div className="flex flex-col items-center justify-center h-40">
                  <p className="text-sm text-gray-600 mb-2">
                    Δεν βρέθηκε επαγγελματίας για live chat.
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Παρακαλούμε στείλτε email για περαιτέρω επικοινωνία.
                  </p>
                  <button
                    onClick={handleSendEmailClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    Στείλτε Email
                  </button>
                </div>
              )}
              {showEmailForm && (
                <form onSubmit={handleEmailFormSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700">
                      Μήνυμα
                    </label>
                    <textarea
                      required
                      value={messageValue}
                      onChange={(e) => setMessageValue(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2"
                      placeholder="Type your message here..."
                      rows={3}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md p-2"
                  >
                    Αποστολή
                  </button>
                </form>
              )}
            </div>
          </MotionDiv>
        ) : (
          <MotionButton
            key="chat-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={toggleWidget}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-xl focus:outline-none"
            aria-label="Open Chat"
          >
            <ChatIcon className="h-6 w-6" />
          </MotionButton>
        )}
      </AnimatePresence>
    </div>
  );
}
