"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle2, XCircle } from "lucide-react";
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
  const [toast, setToast] = useState<
    | {
        type: "success" | "error";
        message: string;
      }
    | null
  >(null);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    companyType: "",
    companyTypeOther: "",
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
      companyTypeOther: "",
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

    if (
      formData.companyType === "other" &&
      !formData.companyTypeOther.trim()
    ) {
      setToast({
        type: "error",
        message: "Παρακαλώ περιγράψτε τον τύπο της επιχείρησής σας.",
      });
      return;
    }

    setIsSubmitting(true);

    const typeToStore =
      formData.companyType === "other"
        ? formData.companyTypeOther.trim()
        : formData.companyType;

    try {
      const { error } = await supabase.from(`Request Form`).insert([
        {
          Name: formData.name,
          Email: formData.email,
          Type: typeToStore,
          Packets: formData.package,
          createdat: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase error:", error);
        setToast({
          type: "error",
          message: "Κάτι πήγε στραβά. Δοκιμάστε ξανά σε λίγο.",
        });
        return;
      }

      if (onSuccess) onSuccess();

      setToast({
        type: "success",
        message:
          "Το αίτημά σας στάλθηκε με επιτυχία. Θα επικοινωνήσουμε σύντομα μαζί σας.",
      });

      resetForm();
      onClose();
    } catch (err) {
      console.error("Unexpected error:", err);
      setToast({
        type: "error",
        message: "Απρόσμενο σφάλμα. Δοκιμάστε ξανά σε λίγο.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <>
      {/* MODAL */}
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

                {/* Extra field when "Άλλο" is selected */}
                {formData.companyType === "other" && (
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Περιγράψτε τον τύπο της επιχείρησής σας
                    </label>
                    <motion.input
                      type="text"
                      name="companyTypeOther"
                      required
                      disabled={isSubmitting}
                      value={formData.companyTypeOther}
                      onChange={handleChange}
                      placeholder="π.χ. Στούντιο γιόγκα, φωτογραφείο..."
                      whileFocus={{ scale: 1.01 }}
                      className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                    />
                  </div>
                )}

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

      {/* TOAST / POPUP for success & error */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="trial-toast"
            initial={{ opacity: 0, y: -10, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, x: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-4 right-4 z-[60]"
          >
            <div
              className={`flex items-start gap-3 rounded-xl px-4 py-3 shadow-lg border backdrop-blur bg-white/95 ${
                toast.type === "success"
                  ? "border-emerald-200"
                  : "border-red-200"
              }`}
            >
              <div
                className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full ${
                  toast.type === "success" ? "bg-emerald-100" : "bg-red-100"
                }`}
              >
                {toast.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div className="text-sm">
                <p className="font-semibold text-gray-900 mb-0.5">
                  {toast.type === "success"
                    ? "Επιτυχής αποστολή"
                    : "Παρουσιάστηκε σφάλμα"}
                </p>
                <p className="text-xs text-gray-600">{toast.message}</p>
              </div>
              <button
                onClick={() => setToast(null)}
                className="ml-2 mt-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Κλείσιμο ειδοποίησης"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
