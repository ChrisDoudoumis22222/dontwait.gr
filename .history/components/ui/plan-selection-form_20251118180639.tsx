"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X as CloseX } from "lucide-react";
import { supabase } from "../@/lib/supabaseClient";

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
  const [formData, setFormData] = useState({
    package: selectedPlan || "",
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  // sync with selectedPlan from parent
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
    if (step === 2 && (!formData.name || !formData.email || !formData.phone)) {
      alert("Παρακαλώ συμπληρώστε όλα τα πεδία επικοινωνίας");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

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
      // 👇 Adjust table name / column names to match your Supabase schema
      const { error } = await supabase.from("plan_requests").insert({
        plan_package: formData.package,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        comment: formData.comment || null,
      });

      if (error) {
        console.error("Supabase insert error:", error);
        alert("Κάτι πήγε στραβά κατά την αποστολή. Δοκιμάστε ξανά.");
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <motion.form
            onSubmit={step === 3 ? handleSend : handleNext}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4"
          >
            <button
              onClick={onClose}
              type="button"
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              aria-label="Close"
              disabled={isSubmitting}
            >
              <CloseX className="h-5 w-5" aria-hidden="true" />
            </button>

            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  <span className="relative inline-block font-extrabold text-4xl text-blue-900 mx-1">
                    Επιλογή Πακέτου
                    <svg
                      className="absolute -bottom-0.5 w-full max-h-1.5"
                      viewBox="0 0 55 5"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0.65 4C15.89 2.67 48.04 0.4 54.69 2"
                        strokeWidth="4"
                        stroke="currentColor"
                      />
                    </svg>
                  </span>
                </h2>
                <select
                  name="package"
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                  value={formData.package}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    Επιλέξτε Πακέτο...
                  </option>
                  <option value="basic">Basic</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded border border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors mr-2"
                    disabled={isSubmitting}
                  >
                    Ακύρωση
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    disabled={isSubmitting}
                  >
                    Επόμενο
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  <span className="relative inline-block font-extrabold text-4xl text-blue-900 mx-1">
                    Πληροφορίες Επικοινωνίας
                    <svg
                      className="absolute -bottom-0.5 w-full max-h-1.5"
                      viewBox="0 0 55 5"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0.65 4C15.89 2.67 48.04 0.4 54.69 2"
                        strokeWidth="4"
                        stroke="currentColor"
                      />
                    </svg>
                  </span>
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Όνομα
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Τηλέφωνο
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 rounded border border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors"
                    disabled={isSubmitting}
                  >
                    Πίσω
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    disabled={isSubmitting}
                  >
                    Επόμενο
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  Παρατηρήσεις (Προαιρετικό)
                </h2>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  rows={4}
                  placeholder="Προσθέστε κάποιο σχόλιο αν επιθυμείτε..."
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 rounded border border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors"
                    disabled={isSubmitting}
                  >
                    Πίσω
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Αποστολή..." : "Αποστολή"}
                  </button>
                </div>
              </div>
            )}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
