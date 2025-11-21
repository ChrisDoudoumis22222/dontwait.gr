"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/app/lib/supabaseClient";

/* ---------- Motion wrappers ---------- */
const MotionDiv: any = motion.div;
const MotionInput: any = motion.input;
const MotionTextarea: any = motion.textarea;
const MotionButton: any = motion.button;

/* ---------- Props from ChatWidget ---------- */
export interface SupportWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

/* ---------- Inline DontWait Logo ---------- */
const InlineLogo: React.FC<{ className?: string; size?: "sm" | "lg" }> = ({
  className,
  size = "sm",
}) => {
  const height = size === "lg" ? 48 : 32;
  const width = size === "lg" ? 200 : 140;

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

/* ---------- Support Widget (modal only, controlled by props) ---------- */
export const SupportWidget: React.FC<SupportWidgetProps> = ({
  isOpen,
  onClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // "idle" = show form, "success" = show success screen, "error" = show form + error banner
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setAcceptedPrivacy(false);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    setStatus("idle");
    setStatusMessage("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    if (!acceptedPrivacy) {
      setStatus("error");
      setStatusMessage(
        "Πρέπει να αποδεχτείτε την Πολιτική Απορρήτου για να συνεχίσετε."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("support_messages").insert([
        {
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject,
          Message: formData.message,
          createdat: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        setStatus("error");
        setStatusMessage("Κάτι πήγε στραβά. Δοκιμάστε ξανά σε λίγο.");
        return;
      }

      // ✅ Success: show success screen, keep modal open
      setStatus("success");
      setStatusMessage(
        "Το μήνυμά σας στάλθηκε με επιτυχία. Η ομάδα υποστήριξης θα επικοινωνήσει μαζί σας σύντομα."
      );
      resetForm();
    } catch (err) {
      console.error("Unexpected error:", err);
      setStatus("error");
      setStatusMessage("Απρόσμενο σφάλμα. Δοκιμάστε ξανά σε λίγο.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          key="support-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-3 sm:p-4"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0"
            onClick={handleClose}
            aria-hidden="true"
          />

          <MotionDiv
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* HEADER */}
            <div className="bg-blue-700 text-white px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 relative">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white/80 hover:text-white transition-colors z-10 hover:rotate-90 duration-300"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <InlineLogo size="sm" />
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/70 text-center">
                  Φόρμα υποστήριξης
                </p>
                <h2 className="text-base sm:text-lg font-semibold text-white text-center">
                  Επικοινωνία με την ομάδα DontWait
                </h2>
              </div>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6">
              {/* ✅ SUCCESS SCREEN */}
              {status === "success" ? (
                <MotionDiv
                  key="support-success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 sm:mb-5 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-500" />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Ευχαριστούμε!
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-6 max-w-sm">
                    {statusMessage ||
                      "Το μήνυμά σας στάλθηκε με επιτυχία. Η ομάδα υποστήριξης θα επικοινωνήσει μαζί σας σύντομα."}
                  </p>

                  <MotionButton
                    type="button"
                    onClick={handleClose}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 sm:px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto text-sm"
                  >
                    Κλείσιμο
                  </MotionButton>
                </MotionDiv>
              ) : (
                // ✅ FORM + optional error banner
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Error banner */}
                  {status === "error" && statusMessage && (
                    <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 mb-2">
                      <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                      <p className="text-xs sm:text-sm text-red-700">
                        {statusMessage}
                      </p>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Όνομα
                    </label>
                    <MotionInput
                      type="text"
                      name="name"
                      required
                      disabled={isSubmitting}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="π.χ. Μαρία Παπαδοπούλου"
                      whileFocus={{ scale: 1.01 }}
                      className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <MotionInput
                      type="email"
                      name="email"
                      required
                      disabled={isSubmitting}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="π.χ. name@domain.gr"
                      whileFocus={{ scale: 1.01 }}
                      className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Θέμα
                    </label>
                    <MotionInput
                      type="text"
                      name="subject"
                      required
                      disabled={isSubmitting}
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="π.χ. Πρόβλημα με τη σελίδα κρατήσεων"
                      whileFocus={{ scale: 1.01 }}
                      className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Μήνυμα
                    </label>
                    <MotionTextarea
                      name="message"
                      rows={4}
                      required
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Περιγράψτε σύντομα το θέμα που αντιμετωπίζετε..."
                      whileFocus={{ scale: 1.01 }}
                      className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none bg-white text-sm"
                    />
                  </div>

                  {/* Privacy consent */}
                  <div className="flex items-start gap-2 pt-1">
                    <MotionInput
                      type="checkbox"
                      name="acceptedPrivacy"
                      disabled={isSubmitting}
                      checked={acceptedPrivacy}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setAcceptedPrivacy(e.target.checked)
                      }
                      whileTap={{ scale: 0.9 }}
                      className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <p className="text-xs sm:text-sm text-gray-600 leading-snug">
                      Δηλώνω ότι έχω διαβάσει και αποδέχομαι την{" "}
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline font-medium"
                      >
                        Πολιτική Απορρήτου
                      </a>{" "}
                      του DontWait.gr.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
                    <MotionButton
                      type="button"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-5 sm:px-6 py-2.5 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-700 text-sm"
                    >
                      Ακύρωση
                    </MotionButton>
                    <MotionButton
                      type="submit"
                      disabled={isSubmitting || !acceptedPrivacy}
                      whileHover={
                        !isSubmitting && acceptedPrivacy ? { scale: 1.02 } : {}
                      }
                      whileTap={
                        !isSubmitting && acceptedPrivacy ? { scale: 0.98 } : {}
                      }
                      className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Αποστολή...
                        </>
                      ) : (
                        "Αποστολή ✓"
                      )}
                    </MotionButton>
                  </div>
                </form>
              )}
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};
