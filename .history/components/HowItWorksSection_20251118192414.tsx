"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Globe, TrendingUp } from "lucide-react";

type Step = {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const HOW_IT_WORKS_STEPS: Step[] = [
  {
    title: "Εγγραφή & Προσαρμογή",
    description: "Προσθέστε λογότυπο, πληροφορίες επιχείρησης και υπηρεσίες.",
    icon: Briefcase,
  },
  {
    title: "Μοιραστείτε τη Σελίδα σας",
    description:
      "Χρησιμοποιήστε τον μοναδικό σας σύνδεσμο ή συνδέστε τον δικό σας τομέα.",
    icon: Globe,
  },
  {
    title: "Λάβετε Κρατήσεις & Διαχειριστείτε",
    description:
      "Ενημερώσεις σε πραγματικό χρόνο & αναλύσεις στον Πίνακα Ελέγχου.",
    icon: TrendingUp,
  },
];

// Reusable SVG Wave (local to this component)
function Wave({
  position = "bottom",
  className = "text-blue-100",
  ...props
}: React.SVGProps<SVGSVGElement> & { position?: "top" | "bottom" }) {
  const pathTop = "M0,0 C300,80 900,40 1200,80 L1200,0 L0,0 Z";
  const pathBottom = "M0,80 C300,40 900,80 1200,120 L1200,120 L0,120 Z";
  const d = position === "top" ? pathTop : pathBottom;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 ${position}-0 -z-10 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-24 md:h-32"
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        {...props}
      >
        <path d={d} fill="currentColor" />
      </svg>
    </div>
  );
}

const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-32">
      <Wave position="top" className="text-blue-100" />
      <Wave position="bottom" className="text-blue-100" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="relative inline-block font-extrabold text-4xl text-blue-900 mx-1">
            Πώς Λειτουργεί
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
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="bg-white shadow-md rounded-xl p-6 flex items-start gap-4 transition-transform duration-200 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                  <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-600">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
