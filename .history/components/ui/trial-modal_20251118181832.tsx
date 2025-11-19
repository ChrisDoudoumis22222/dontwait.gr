"use client";

import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { supabase } from "@/app/lib/supabaseClient";

export interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // IMPORTANT: Uses your Supabase table
      const { error } = await supabase.from(`Request Form`).insert([
        {
          Name: formData.name,
          Email: formData.email,
          Type: formData.companyType,   // business type stored in "Type"
          Packets: formData.package,    // selected plan stored in "Packets"
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
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          {/* Modal Panel */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <Image
                  src="https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png"
                  alt="DontWait Logo"
                  width={120}
                  height={40}
                />
              </div>

              <Dialog.Title
                as="h3"
                className="text-xl font-bold text-gray-900 text-center mb-4"
              >
                Δοκιμάστε Δωρεάν
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Όνομα
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    disabled={isSubmitting}
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Τύπος Επιχείρησης
                  </label>
                  <select
                    name="companyType"
                    required
                    disabled={isSubmitting}
                    value={formData.companyType}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Επιλέξτε...</option>
                    <option value="salon">Σαλόνι</option>
                    <option value="nails">Νύχια</option>
                    <option value="restaurant">Εστιατόριο</option>
                    <option value="cleaning">Εταιρεία Καθαρισμού</option>
                    <option value="other">Άλλο</option>
                  </select>
                </div>

                {/* package */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ενδιαφέρον Πακέτο
                  </label>
                  <select
                    name="package"
                    required
                    disabled={isSubmitting}
                    value={formData.package}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Επιλέξτε...</option>
                    <option value="basic">Basic</option>
                    <option value="pro">Pro</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Ακύρωση
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {isSubmitting ? "Υποβολή..." : "Υποβολή"}
                  </button>
                </div>
              </form>

            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
