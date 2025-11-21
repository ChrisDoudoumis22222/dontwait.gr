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

/** ---------- Motion wrappers (fix TS children error) ---------- */
const MotionDiv: any = motion.div;
const MotionSelect: any = motion.select;
const MotionInput: any = motion.input;
const MotionTextarea: any = motion.textarea;
const MotionButton: any = motion.button;

/** ---------- Inline DontWait logo, white on blue header ---------- */
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
    billing_period: "monthly" as "monthly" | "yearly",
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  // ✅ NEW: state for privacy acceptance
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      package: selectedPlan || "",
    }));
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
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      // only checkbox we have is acceptedPrivacy, handled separately
      return;
    }
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
      billing_period: "monthly",
      name: "",
      email: "",
      phone: "",
      comment: "",
    });
    setStep(1);
    setAcceptedPrivacy(false); // ✅ reset checkbox
  };

  const handleClose = () => {
    if (isSubmitting) return;
    resetForm();
    setShowThankYou(false);
    onClose();
  };

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ require privacy acceptance before sending
    if (!acceptedPrivacy) {
      alert(
        "Πρέπει να αποδεχτείτε την Πολιτική Απορρήτου για να συνεχίσετε."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("request_form_leads").insert([
        {
          // match your Postgres columns exactly
          Name: formData.name,
          Email: formData.email,
          Type: formData.phone,
          Packets: formData.package,
          selected_plan: formData.package || selectedPlan, // NOT NULL in DB
          billing_period: formData.billing_period, // 'monthly' or 'yearly'
          createdat: new Date().toISOString(),
          // Δεν στέλνω acceptedPrivacy / comment γιατί δεν υπάρχουν στήλες ακόμα.
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
        <MotionDiv
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-3 sm:p-4"
        >
          <MotionDiv
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

                          const connectorFill = (() => {
                            if (step > s) return 1;
                            if (step === s) return currentStepCompletion;
                            return 0;
                          })();

                          return (
                            <div key={s} className="flex items-center">
                              {/* Circle */}
                              <MotionDiv
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
                              </MotionDiv>

                              {/* Connector */}
                              {s < 3 && (
                                <div className="h-1 w-8 sm:w-10 md:w-14 rounded-full bg-white/20 overflow-hidden mx-1">
                                  <MotionDiv
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
                <MotionDiv
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
                </MotionDiv>
              ) : (
                <AnimatePresence mode="wait" custom={direction}>
                  {/* STEP 1 */}
                  {step === 1 && (
                    <MotionDiv
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
                        Διαλέξτε το πακέτο και τον τρόπο χρέωσης που σας
                        ενδιαφέρει.
                      </p>

                      <MotionSelect
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        whileFocus={{ scale: 1.01 }}
                        className="w-full border-2 border-gray-200 p-3 rounded-lg mb-4 focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                      >
                        <option value="">Επιλέξτε Πακέτο...</option>
                        <option value="basic">Basic</option>
                        <option value="pro">Pro</option>
                        <option value="enterprise">Enterprise</option>
                      </MotionSelect>

                      {/* Billing period select */}
                      <MotionSelect
                        name="billing_period"
                        value={formData.billing_period}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        whileFocus={{ scale: 1.01 }}
                        className="w-full border-2 border-gray-200 p-3 rounded-lg mb-6 focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                      >
                        <option value="monthly">Μηνιαία χρέωση</option>
                        <option value="yearly">Ετήσια χρέωση</option>
                      </MotionSelect>

                      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
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
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md text-sm"
                        >
                          Επόμενο →
                        </MotionButton>
                      </div>
                    </MotionDiv>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <MotionDiv
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

                      <MotionInput
                        type="text"
                        name="name"
                        placeholder="Όνομα"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        whileFocus={{ scale: 1.01 }}
                        className="w-full border-2 border-gray-200 p-3 rounded-lg mb-4 focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                      />
                      <MotionInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        whileFocus={{ scale: 1.01 }}
                        className="w-full border-2 border-gray-200 p-3 rounded-lg mb-4 focus:border-blue-500 focus:outline-none transition-colors bg-white text-sm"
                      />
                      <MotionInput
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
                        <MotionButton
                          type="button"
                          onClick={handleBack}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-700 text-sm"
                        >
                          ← Πίσω
                        </MotionButton>
                        <MotionButton
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md text-sm"
                        >
                          Επόμενο →
                        </MotionButton>
                      </div>
                    </MotionDiv>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <MotionDiv
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

                      <MotionTextarea
                        name="comment"
                        rows={4}
                        value={formData.comment}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        whileFocus={{ scale: 1.01 }}
                        placeholder="Προαιρετικό σχόλιο..."
                        className="w-full border-2 border-gray-200 p-3 rounded-lg mb-4 focus:border-blue-500 focus:outline-none transition-colors resize-none bg-white text-sm"
                      />

                      {/* ✅ Privacy Policy Consent */}
                      <div className="flex items-start gap-2 mb-6">
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

                      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3">
                        <MotionButton
                          type="button"
                          onClick={handleBack}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full sm:w-auto px-5 sm:px-6 py-2.5 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors text-gray-700 text-sm"
                        >
                          ← Πίσω
                        </MotionButton>
                        <MotionButton
                          type="submit"
                          disabled={isSubmitting || !acceptedPrivacy}
                          whileHover={
                            !isSubmitting && acceptedPrivacy
                              ? { scale: 1.02 }
                              : {}
                          }
                          whileTap={
                            !isSubmitting && acceptedPrivacy
                              ? { scale: 0.98 }
                              : {}
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
                    </MotionDiv>
                  )}
                </AnimatePresence>
              )}
            </form>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};
