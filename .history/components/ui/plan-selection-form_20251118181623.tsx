"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X as CloseX } from "lucide-react";
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

  const [formData, setFormData] = useState({
    package: selectedPlan || "",
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  // Sync with selected plan
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
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

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
      // IMPORTANT: Table has space + uppercase => must be in double quotes
      const { error } = await supabase
        .from(`Request Form`) // ⬅ DO NOT QUOTE HERE — supabase handles it
        .insert([
          {
            Name: formData.name,
            Email: formData.email,
            Type: formData.phone, // You can change this
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        >
          <motion.form
            onSubmit={step === 3 ? handleSend : handleNext}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <CloseX className="h-5 w-5" />
            </button>

            {/* STEP 1 */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Επιλογή Πακέτου</h2>
                <select
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full border p-2 rounded mb-4"
                >
                  <option value="">Επιλέξτε Πακέτο...</option>
                  <option value="basic">Basic</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-4 py-2 border rounded"
                  >
                    Ακύρωση
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Επόμενο
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Πληροφορίες</h2>

                <input
                  type="text"
                  name="name"
                  placeholder="Όνομα"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full border p-2 rounded mb-4"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full border p-2 rounded mb-4"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Τηλέφωνο"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full border p-2 rounded mb-4"
                />

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 border rounded"
                  >
                    Πίσω
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Επόμενο
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Σχόλια</h2>

                <textarea
                  name="comment"
                  rows={3}
                  value={formData.comment}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="Προαιρετικό σχόλιο..."
                  className="w-full border p-2 rounded mb-4"
                />

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 border rounded"
                  >
                    Πίσω
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
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
