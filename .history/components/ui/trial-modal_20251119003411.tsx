"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/app/lib/supabaseClient";

/* ---------- Props ---------- */
export interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

/* ---------- Inline DontWait Logo (same style as PlanSelectionForm) ---------- */
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

/* ---------- Component ---------- */
export const TrialModal: React.FC<TrialModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    companyType: "",
    package: "",
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      companyType: "",
      package: "",
    });
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from(`Request Form`).insert([
        {
          Name: formData.name,
          Email: formData.email,
          Type: formData.companyType, // business type stored in "Type"
          Packets: formData.package, // selected plan stored in "Packets"
          createdat: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        alert("Κάτι πήγε στραβά. Δοκιμάστε ξανά.");
        return;
      }

      if (onSuccess) onSuccess();
      resetForm();
      onClose();
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Απρόσμενο σφάλμα. Προσπαθήστε ξανά.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="trial-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-3 sm:p-4"
        >
          {/* Click on backdrop to close */}
          <div
            className="absolute inset-0"
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* HEADER – blue bar with logo & close button */}
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
                  Φόρμα δοκιμαστικής εγγραφής
                </p>
                <h2 className="text-base sm:text-lg font-semibold text-white text-center">
                  Δωρεάν Δοκιμή 7 Ημερών
                </h2>
              </div>
            </div>

            {/* BODY – form, scrollable if needed */}
            <form
              onSubmit={handleSubmit}
              className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4"
            >
              {/* Name */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Όνομα
                </label>
                <motion.input
                  type="text"
                  name="name"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <motion.input
                  type="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                />
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Τύπος Επιχείρησης
                </label>
                <motion.select
                  name="companyType"
                  required
                  disabled={isSubmitting}
                  value={formData.companyType}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                >
                  <option value="">Επιλέξτε...</option>
                  <option value="salon">Σαλόνι</option>
                  <option value="nails">Νύχια</option>
                  <option value="restaurant">Εστιατόριο</option>
                  <option value="cleaning">Εταιρεία Καθαρισμού</option>
                  <option value="other">Άλλο</option>
                </motion.select>
              </div>

              {/* Package */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Ενδιαφέρον Πακέτο
                </label>
                <motion.select
                  name="package"
                  required
                  disabled={isSubmitting}
                  value={formData.package}
                  onChange={handleChange}
                  whileFocus={{ scale: 1.01 }}
                  className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                >
                  <option value="">Επιλέξτε...</option>
                  <option value="basic">Basic</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </motion.select>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
                <motion.button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-700 text-sm"
                >
                  Ακύρωση
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Υποβολή...
                    </>
                  ) : (
                    "Υποβολή ✓"
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
