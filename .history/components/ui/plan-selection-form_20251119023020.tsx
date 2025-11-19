"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/app/lib/supabaseClient";

export interface PlanSelectionFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  onSuccess: () => void;
}

// Inline DontWait logo, white on blue header
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
            backgroundColor: "#ffffff", // white logo
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

export const PlanSelectionForm: React.FC<PlanSelectionFormProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);

  const [formData, setFormData] = useState({
    package: selectedPlan || "",
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, package: selectedPlan || "" }));
  }, [selectedPlan]);

  const packageLabels: Record<string, string> = {
    basic: "Basic",
    pro: "Pro",
    enterprise: "Enterprise",
  };
  const selectedPackageLabel =
    packageLabels[formData.package] ?? "το πακέτο σας";

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1 && !formData.package) {
      alert("Παρακαλώ επιλέξτε πακέτο");
      return;
    }
    if (step === 2 && (!formData.name || !formData.email || !formData.phone)) {
      alert("Παρακαλώ συμπληρώστε όλα τα πεδία επικοινωνίας");
      return;
    }
    setDirection(1);
    setStep(step + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const resetForm = () => {
    setFormData({
      package: selectedPlan || "",
      name: "",
      email: "",
      phone: "",
      comment: "",
    });
    setStep(1);
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    setShowThankYou(false);
    onClose();
  };

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from(`Request Form`).insert([
        {
          Name: formData.name,
          Email: formData.email,
          Type: formData.phone,
          Packets: formData.package,
          createdat: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Supabase insert error:", error);
        alert("Κάτι πήγε στραβά. Προσπαθήστε ξανά.");
        return;
      }

      onSuccess();
      setShowThankYou(true);
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Απρόσμενο σφάλμα. Δοκιμάστε ξανά.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  // 🔹 Progress _inside_ each step (0–1)
  const getStepCompletion = (s: number) => {
    if (s === 1) {
      return formData.package ? 1 : 0;
    }
    if (s === 2) {
      let filled = 0;
      if (formData.name.trim()) filled++;
      if (formData.email.trim()) filled++;
      if (formData.phone.trim()) filled++;
      return filled / 3; // 0, 1/3, 2/3, 1
    }
    if (s === 3) {
      // Optional comment – treat as progress if they add something
      return formData.comment.trim().length > 0 ? 1 : 0;
    }
    return 0;
  };

  const currentStepCompletion = getStepCompletion(step);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-3 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* HEADER – BLUE TOP WITH LOGO + STEPPER */}
            <div className="bg-blue-700 text-white px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 relative">
              {/* Close button */}
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

                {showThankYou ? (
                  <p className="text-xs sm:text-sm text-white/80 text-center">
                    Ευχαριστούμε για το ενδιαφέρον σας!
                  </p>
                ) : (
                  <>
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-white/70 text-center">
                      Φόρμα ενδιαφέροντος
                    </p>

                    {/* CENTERED PROGRESS STEPPER (1–2–3) */}
                    <div className="w-full max-w-xs mx-auto">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1">
                        {[1, 2, 3].map((s) => {
                          const isActive = step === s;
                          const isCompleted = step > s;

                          // 🔹 Connector progress between current step and next
                          // If step > s → full, if step === s → partial (0–1), else 0
                          const connectorFill = (() => {
                            if (step > s) return 1;
                            if (step === s) return currentStepCompletion;
                            return 0;
                          })();

                          return (
                            <div key={s} className="flex items-center">
                              {/* Circle */}
                              <motion.div
                                initial={false}
                                animate={{
                                  scale: isActive || isCompleted ? 1 : 0.9,
                                  backgroundColor: isActive
                                    ? "#ffffff"
                                    : isCompleted
                                    ? "#38bdf8"
                                    : "rgba(255,255,255,0.1)",
                                  color:
                                    isActive || isCompleted
                                      ? "#0f172a"
                                      : "#e5e7eb",
                                  boxShadow:
                                    isActive || isCompleted
                                      ? "0 0 0 2px rgba(255,255,255,0.35)"
                                      : "none",
                                }}
                                transition={{ duration: 0.25 }}
                                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold"
                              >
                                {s}
                              </motion.div>

                              {/* Connector */}
                              {s < 3 && (
                                <div className="h-1 w-8 sm:w-10 md:w-14 rounded-full bg-white/20 overflow-hidden mx-1">
                                  <motion.div
                                    initial={false}
                                    animate={{
                                      scaleX: connectorFill,
                                    }}
                                    transition={{ duration: 0.25 }}
                                    className="h-full w-full bg-white origin-left"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <p className="text-[10px] sm:text-[11px] text-center text-white/80 mt-1">
                        Βήμα {step} από 3
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* BODY / CONTENT – scrollable on small screens */}
            <form
              onSubmit={step === 3 ? handleSend : handleNext}
              className="flex-1 overflow-y-auto p-5 sm:p-6"
            >
              {showThankYou ? (
                // THANK YOU SCREEN
                <motion.div
                  key="thankyou"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 sm:mb-5 flex items-center justify-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-500" />
                      </div>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      Ευχαριστούμε!
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mb-6 max-w-sm">
                      Λάβαμε το αίτημά σας για το{" "}
                      <span className="font-semibold">
                        {selectedPackageLabel}
                      </span>
                      . Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.
                    </p>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-5 sm:px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto"
                    >
                      Κλείσιμο
                    </button>
                  </div>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait" custom={direction}>
                  {/* STEP 1 */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25 }}
                    >
                      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
                        Επιλογή Πακέτου
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 mb-6">
                        Διαλέξτε το πακέτο που σας ενδιαφέρει.
                      </p>

                      <motion.select
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        whileFocus={{ scale: 1.01 }}
                        className="w-full border-2 border-gray-200 p-3 rounded-lg mb-6 focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                      >
                        <option value="">Επιλέξτε Πακέτο...</option>
                        <option value="basic">Basic</option>
                        <option value="pro">Pro</option>
                        <option value="enterprise">Enterprise</option>
                      </motion.select>

                      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
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
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md text-sm"
                        >
                          Επόμενο →
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25 }}
                    >
                      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
                        Πληροφορίες
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 mb-6">
                        Συμπληρώστε τα στοιχεία επικοινωνίας σας.
                      </p>

                      <motion.input
                        type="text"
                        name="name"
                        placeholder="Όνομα"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        whileFocus={{ scale: 1.01 }}
                        className="w-full border-2 border-gray-200 p-3 rounded-lg mb-4 focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                      />
                      <motion.input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        whileFocus={{ scale: 1.01 }}
                        className="w-full border-2 border-gray-200 p-3 rounded-lg mb-4 focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                      />
                      <motion.input
                        type="tel"
                        name="phone"
                        placeholder="Τηλέφωνο"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        whileFocus={{ scale: 1.01 }}
                        className="w-full border-2 border-gray-200 p-3 rounded-lg mb-6 focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                      />

                      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3">
                        <motion.button
                          type="button"
                          onClick={handleBack}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-700 text-sm"
                        >
                          ← Πίσω
                        </motion.button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md text-sm"
                        >
                          Επόμενο →
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25 }}
                    >
                      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900">
                        Σχόλια
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-500 mb-6">
                        Προσθέστε οποιαδήποτε πρόσθετη πληροφορία.
                      </p>

                      <motion.textarea
                        name="comment"
                        rows={4}
                        value={formData.comment}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        whileFocus={{ scale: 1.01 }}
                        placeholder="Προαιρετικό σχόλιο..."
                        className="w-full border-2 border-gray-200 p-3 rounded-lg mb-6 focus:border-blue-500 focus:outline-none transition-colors resize-none bg-white text-sm"
                      />

                      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3">
                        <motion.button
                          type="button"
                          onClick={handleBack}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-700 text-sm"
                        >
                          ← Πίσω
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
                              Αποστολή...
                            </>
                          ) : (
                            "Αποστολή ✓"
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
