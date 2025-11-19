"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clover as CloseX, Loader2 } from 'lucide-react';
import { supabase } from "@/app/lib/supabaseClient";

export interface PlanSelectionFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  onSuccess: () => void;
}

export const PlanSelectionForm: React.FC<PlanSelectionFormProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  onSuccess,
}) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [direction, setDirection] = useState(0);

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
    if (
      step === 2 &&
      (!formData.name || !formData.email || !formData.phone)
    ) {
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

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from(`Request Form`)
        .insert([
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
      resetForm();
      onClose();
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 hover:rotate-90 duration-300"
            >
              <CloseX className="h-5 w-5" />
            </button>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 pt-6 pb-4">
              <div className="flex items-center justify-between mb-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center flex-1">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: step >= s ? 1 : 0.85,
                        backgroundColor: step >= s ? "#2563eb" : "#e5e7eb",
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md"
                    >
                      {s}
                    </motion.div>
                    {s < 3 && (
                      <motion.div
                        initial={false}
                        animate={{
                          scaleX: step > s ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-1 bg-blue-600 flex-1 mx-2 origin-left rounded-full"
                      />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 text-center">
                Βήμα {step} από 3
              </p>
            </div>

            <form
              onSubmit={step === 3 ? handleSend : handleNext}
              className="p-6"
            >
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
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                      Επιλογή Πακέτου
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                      Διαλέξτε το πακέτο που σας ενδιαφέρει
                    </p>

                    <motion.select
                      name="package"
                      value={formData.package}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      whileFocus={{ scale: 1.01 }}
                      className="w-full border-2 border-gray-200 p-3 rounded-lg mb-6 focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="">Επιλέξτε Πακέτο...</option>
                      <option value="basic">Basic</option>
                      <option value="pro">Pro</option>
                      <option value="enterprise">Enterprise</option>
                    </motion.select>

                    <div className="flex justify-end gap-3">
                      <motion.button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-2.5 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Ακύρωση
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
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
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                      Πληροφορίες
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                      Συμπληρώστε τα στοιχεία επικοινωνίας σας
                    </p>

                    <motion.input
                      type="text"
                      name="name"
                      placeholder="Όνομα"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      whileFocus={{ scale: 1.01 }}
                      className="w-full border-2 border-gray-200 p-3 rounded-lg mb-4 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <motion.input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      whileFocus={{ scale: 1.01 }}
                      className="w-full border-2 border-gray-200 p-3 rounded-lg mb-4 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <motion.input
                      type="tel"
                      name="phone"
                      placeholder="Τηλέφωνο"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      whileFocus={{ scale: 1.01 }}
                      className="w-full border-2 border-gray-200 p-3 rounded-lg mb-6 focus:border-blue-500 focus:outline-none transition-colors"
                    />

                    <div className="flex justify-between gap-3">
                      <motion.button
                        type="button"
                        onClick={handleBack}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-2.5 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        ← Πίσω
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
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
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                      Σχόλια
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                      Προσθέστε οποιαδήποτε πρόσθετη πληροφορία
                    </p>

                    <motion.textarea
                      name="comment"
                      rows={4}
                      value={formData.comment}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      whileFocus={{ scale: 1.01 }}
                      placeholder="Προαιρετικό σχόλιο..."
                      className="w-full border-2 border-gray-200 p-3 rounded-lg mb-6 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    />

                    <div className="flex justify-between gap-3">
                      <motion.button
                        type="button"
                        onClick={handleBack}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-2.5 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        ← Πίσω
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
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
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
