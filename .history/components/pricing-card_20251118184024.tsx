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
  subtitle?: string;
  monthlyHint?: string;
  badge?: string;
}

interface PricingCardsProps {
  onPlanSelect: (planName: string) => void;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Basic",
    price: "€240",
    subtitle: "Ιδανικό για solo επαγγελματίες",
    monthlyHint: "≈ €20 / μήνα",
    features: [
      "Προσαρμοσμένη σελίδα κρατήσεων",
      "Πρόσβαση στον πίνακα ελέγχου",
      "Ειδοποιήσεις μέσω email",
      "Βασική υποστήριξη μέσω email",
    ],
    icon: Shield,
    badge: "Ξεκίνημα",
  },
  {
    name: "Pro",
    price: "€420",
    subtitle: "Για επιχειρήσεις που θέλουν ανάπτυξη",
    monthlyHint: "≈ €35 / μήνα",
    features: [
      "Όλα του Basic",
      "Υπενθυμίσεις SMS",
      "Online πληρωμές",
      "Προτεραιότητα στην υποστήριξη",
      "Ιδανικό για τις περισσότερες επιχειρήσεις",
    ],
    highlighted: true,
    icon: Zap,
    badge: "Πιο Δημοφιλές",
  },
  {
    name: "Enterprise",
    price: "Επικοινωνήστε μαζί μας",
    subtitle: "Για αλυσίδες & μεγαλύτερες ομάδες",
    features: [
      "Όλα του Pro",
      "Προσαρμοσμένος τομέας (domain)",
      "Προηγμένες αναφορές & dashboards",
      "Onboarding & εκπαίδευση προσωπικού",
      "Προτεραιότητα υποστήριξης (SLA)",
    ],
    icon: TrendingUp,
    badge: "Premium",
  },
];

const MotionH2: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & MotionProps
> = ({ children, ...props }) => <motion.h2 {...props}>{children}</motion.h2>;

export default function PricingCards({ onPlanSelect }: PricingCardsProps) {
  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-100 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
            Τιμολόγηση DontWait.gr
          </span>
        </div>

        <MotionH2
          className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-slate-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Πακέτα Τιμών
        </MotionH2>

        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-12">
          Επίλεξε το πακέτο που ταιριάζει στην επιχείρησή σου. Μπορείς πάντα να
          αναβαθμίσεις όταν οι κρατήσεις σου αρχίσουν να εκτοξεύονται.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {PRICING_PLANS.map((plan, index) => (
            <div
              key={index}
              className={`
                relative p-8 rounded-2xl border transition-all duration-300
                bg-white/90 backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl
                ${
                  plan.highlighted
                    ? "border-blue-500 shadow-[0_0_24px_rgba(37,99,235,0.35)]"
                    : plan.name === "Enterprise"
                    ? "border-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.4)]"
                    : "border-slate-200 shadow-md"
                }
