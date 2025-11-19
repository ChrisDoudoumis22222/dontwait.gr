"use client";

import React from "react";
import { motion, MotionProps } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Zap, TrendingUp } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  highlighted?: boolean;
}

interface PricingCardsProps {
  onPlanSelect: (planName: string) => void;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Basic",
    price: "€100",
    features: [
      "Προσαρμοσμένη σελίδα κρατήσεων",
      "Πρόσβαση στον πίνακα ελέγχου",
      "Ειδοποιήσεις μέσω email",
    ],
    icon: Shield,
  },
  {
    name: "Pro",
    price: "€150",
    features: [
      "Όλα του Basic",
      "Υπενθυμίσεις SMS",
      "Online πληρωμές",
      "Ιδανικό για τις περισσότερες επιχειρήσεις",
    ],
    highlighted: true,
    icon: Zap,
  },
  {
    name: "Enterprise",
    price: "Επικοινωνήστε μαζί μας",
    features: [
      "Όλα του Pro",
      "Προσαρμοσμένος τομέας",
      "Προηγμένες αναφορές",
      "Προτεραιότητα υποστήριξης",
    ],
    icon: TrendingUp,
  },
];

const MotionH2: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & MotionProps
> = ({ children, ...props }) => <motion.h2 {...props}>{children}</motion.h2>;

export default function PricingCards({ onPlanSelect }: PricingCardsProps) {
  return (
    <section className="bg-white py-32">
      <div className="container mx-auto px-4">
        <MotionH2
          className="text-4xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Πακέτα Τιμών
        </MotionH2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-lg transition-transform duration-300
                ${
                  plan.name === "Pro"
                    ? "bg-gradient-to-r from-blue-50 to-blue-100 shadow-[0_0_20px_5px_rgba(37,99,235,0.4)]"
                    : plan.name === "Enterprise"
                    ? "bg-white border border-yellow-400 shadow-[0_0_15px_5px_rgba(255,215,0,0.4)] scale-100 hover:scale-105"
                    : "bg-white shadow-lg"
                }`}
            >
              {plan.name === "Enterprise" && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-white px-2 py-1 text-xs font-semibold uppercase rounded-bl-lg rounded-tr-lg">
                  Premium
                </div>
              )}

              {plan.highlighted && plan.name !== "Enterprise" && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-2 py-1 text-xs font-bold uppercase rounded-bl-lg rounded-tr-lg">
                  Πιο Δημοφιλές
                </div>
              )}

              <div className="flex items-center mb-4">
                <div
                  className={`p-2 rounded-full mr-4 ${
                    plan.name === "Pro"
                      ? "bg-blue-100"
                      : plan.name === "Enterprise"
                      ? "bg-yellow-100"
                      : "bg-gray-100"
                  }`}
                >
                  <plan.icon
                    className={`w-8 h-8 ${
                      plan.name === "Pro"
                        ? "text-blue-600"
                        : plan.name === "Enterprise"
                        ? "text-yellow-500"
                        : "text-gray-600"
                    }`}
                  />
                </div>

                <h3
                  className={`text-2xl font-semibold ${
                    plan.name === "Enterprise"
                      ? "text-yellow-600"
                      : "text-gray-900"
                  }`}
                >
                  {plan.name}
                </h3>
              </div>

              <p
                className={`text-3xl font-bold mb-6 ${
                  plan.name === "Enterprise"
                    ? "text-yellow-700"
                    : plan.name === "Pro"
                    ? "text-blue-700"
                    : ""
                }`}
              >
                {plan.price}
                {plan.name !== "Enterprise" && (
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    /έτος
                  </span>
                )}
              </p>

              <ul
                className={`space-y-3 mb-8 ${
                  plan.name === "Enterprise"
                    ? "text-yellow-700"
                    : plan.name === "Pro"
                    ? "text-blue-700"
                    : ""
                }`}
              >
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`lucide lucide-check ${
                        plan.name === "Enterprise"
                          ? "text-yellow-500"
                          : plan.name === "Pro"
                          ? "text-blue-500"
                          : "text-green-500"
                      } mr-2`}
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => onPlanSelect(plan.name)}
                className={
                  plan.name === "Pro"
                    ? "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors w-full h-10 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white"
                    : plan.name === "Enterprise"
                    ? "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors w-full h-10 bg-yellow-500 hover:bg-yellow-600 text-white shadow"
                    : "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors w-full h-10 bg-gray-800 hover:bg-gray-900 text-white"
                }
              >
                Επιλογή Πακέτου
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
