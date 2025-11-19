"use client";

import React, { useState } from "react";
import { motion, MotionProps } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Zap, TrendingUp } from "lucide-react";

type BillingPeriod = "monthly" | "yearly";

interface PricingPlan {
  name: string;
  monthlyPrice?: number;
  customPriceText?: string;
  features: string[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  highlighted?: boolean;
  subtitle?: string;
  badge?: string;
  setupFee: string;
}

interface PricingCardsProps {
  onPlanSelect: (planName: string) => void;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Basic",
    monthlyPrice: 29,
    subtitle: "Ιδανικό για solo επαγγελματίες",
    setupFee: "Setup fee: €200 (εφάπαξ)",
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
    monthlyPrice: 49,
    subtitle: "Για επιχειρήσεις που θέλουν ανάπτυξη",
    setupFee: "Setup fee: €449 (εφάπαξ)",
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
    customPriceText: "Επικοινωνήστε μαζί μας",
    subtitle: "Για αλυσίδες & μεγαλύτερες ομάδες",
    setupFee: "Custom setup fee ανάλογα με τις ανάγκες",
    features: [
      "Όλα του Pro",
      "Προσαρμοσμένος τομέας (domain)",
      "Προηγμένες αναφορές & dashboards",
      "Onboarding & εκπαίδευση προσωπικού",
      "Προτεραιότητα υποστήριξης (SLA)",
      "Δυνατότητα ανάπτυξης custom mobile app για την επιχείρησή σας",
    ],
    icon: TrendingUp,
    badge: "Premium",
  },
];

const MotionH2: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & MotionProps
> = ({ children, ...props }) => <motion.h2 {...props}>{children}</motion.h2>;

export default function PricingCards({ onPlanSelect }: PricingCardsProps) {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  const formatPrice = (plan: PricingPlan) => {
    if (!plan.monthlyPrice) {
      return {
        main: plan.customPriceText || "",
        suffix: "",
        discountNote: "",
      };
    }

    if (billingPeriod === "monthly") {
      return {
        main: `€${plan.monthlyPrice}`,
        suffix: "/μήνα",
        discountNote: "Χρέωση ανά μήνα, χωρίς δέσμευση.",
      };
    }

    const yearlyPrice = plan.monthlyPrice * 10; // 2 μήνες δώρο
    return {
      main: `€${yearlyPrice}`,
      suffix: "/έτος",
      discountNote: "2 μήνες δώρο (πληρώνεις 10, χρησιμοποιείς 12).",
    };
  };

  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-100 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 ring-1 ring-blue-100">
            Τιμολόγηση DontWait.gr
          </span>
        </div>

        <MotionH2
          className="text-4xl md:text-5xl font-extrabold text-center mb-3 text-slate-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Πακέτα Τιμών
        </MotionH2>

        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
          Επίλεξε το πακέτο που ταιριάζει στην επιχείρησή σου. Με ετήσια χρέωση
          κερδίζεις 2 μήνες εντελώς δωρεάν.
        </p>

        {/* === TOGGLE FIXED HERE === */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center bg-slate-100 rounded-full px-2 py-1 gap-1 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-1.5 text-xs md:text-sm rounded-full font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Μηνιαία
            </button>
            <button
              type="button"
              onClick={() => setBillingPeriod("yearly")}
              className={`px-4 py-1.5 text-xs md:text-sm rounded-full font-medium transition-all ${
                billingPeriod === "yearly"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "bg-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Ετήσια
            </button>
            <span className="ml-1 px-3 py-1 text-[10px] md:text-xs font-semibold rounded-full bg-yellow-300/80 text-yellow-900 uppercase tracking-wide">
              2 ΜΗΝΕΣ ΔΩΡΟ
            </span>
          </div>
        </div>
        {/* === END TOGGLE === */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {PRICING_PLANS.map((plan, index) => {
            const { main, suffix, discountNote } = formatPrice(plan);

            return (
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
                `}
              >
                {plan.badge && (
                  <div
                    className={`
                      absolute -top-3 left-4 rounded-full px-3 py-1 text-xs font-semibold tracking-wide
                      ${
                        plan.highlighted
                          ? "bg-blue-600 text-white"
                          : plan.name === "Enterprise"
                          ? "bg-yellow-400 text-slate-900"
                          : "bg-slate-900 text-slate-50"
                      }
                    `}
                  >
                    {plan.badge}
                  </div>
                )}

                <div className="flex items-center mb-3 mt-2">
                  <div
                    className={`p-2.5 rounded-2xl mr-4
                      ${
                        plan.highlighted
                          ? "bg-blue-50"
                          : plan.name === "Enterprise"
                          ? "bg-yellow-50"
                          : "bg-slate-100"
                      }`}
                  >
                    <plan.icon
                      className={`w-7 h-7
                        ${
                          plan.highlighted
                            ? "text-blue-600"
                            : plan.name === "Enterprise"
                            ? "text-yellow-600"
                            : "text-slate-700"
                        }`}
                    />
                  </div>

                  <div>
                    <h3
                      className={`
                        text-2xl font-semibold
                        ${
                          plan.name === "Enterprise"
                            ? "text-yellow-700"
                            : plan.highlighted
                            ? "text-blue-700"
                            : "text-slate-900"
                        }
                      `}
                    >
                      {plan.name}
                    </h3>
                    {plan.subtitle && (
                      <p className="text-xs mt-1 text-slate-500">
                        {plan.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 mb-6 space-y-1">
                  <p
                    className={`
                      text-3xl font-extrabold
                      ${
                        plan.name === "Enterprise"
                          ? "text-yellow-700"
                          : plan.highlighted
                          ? "text-blue-700"
                          : "text-slate-900"
                      }
                    `}
                  >
                    {main}
                    {suffix && (
                      <span className="text-sm font-normal text-slate-500 ml-1">
                        {suffix}
                      </span>
                    )}
                  </p>

                  {discountNote &&
                    billingPeriod === "yearly" &&
                    plan.monthlyPrice && (
                      <p className="text-xs text-emerald-600 font-medium">
                        {discountNote}
                      </p>
                    )}

                  {!plan.monthlyPrice && (
                    <p className="text-xs text-slate-500">
                      Custom χρέωση ανάλογα με τις ανάγκες και τον όγκο της
                      επιχείρησης.
                    </p>
                  )}

                  <p className="text-xs font-medium text-slate-600">
                    {plan.setupFee}
                  </p>
                </div>

                <ul
                  className={`
                    space-y-3 mb-8 text-sm
                    ${
                      plan.name === "Enterprise"
                        ? "text-yellow-800"
                        : plan.highlighted
                        ? "text-blue-800"
                        : "text-slate-700"
                    }
                  `}
                >
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`
                          mt-0.5 mr-2 flex-shrink-0
                          ${
                            plan.name === "Enterprise"
                              ? "text-yellow-500"
                              : plan.highlighted
                              ? "text-blue-500"
                              : "text-green-500"
                          }
                        `}
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
                    plan.highlighted
                      ? "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors w-full h-11 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-lg"
                      : plan.name === "Enterprise"
                      ? "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors w-full h-11 bg-yellow-500 hover:bg-yellow-600 text-slate-900 shadow-md"
                      : "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors w-full h-11 bg-slate-900 hover:bg-slate-950 text-white shadow"
                  }
                >
                  Επιλογή Πακέτου
                </Button>

                {plan.name === "Enterprise" && (
                  <p className="text-[11px] text-slate-400 mt-3 text-center">
                    Ιδανικό για franchises, αλυσίδες, custom λύσεις και ανάπτυξη
                    mobile app προσαρμοσμένο στην επιχείρησή σου.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-xs text-slate-400">
          Οι τιμές δεν περιλαμβάνουν ΦΠΑ 24%. Εφάπαξ setup fee ανά πακέτο όπως
          αναγράφεται. Με ετήσιο πλάνο κερδίζεις 2 μήνες δωρεάν (πληρώνεις 10,
          χρησιμοποιείς 12). Επικοινώνησε μαζί μας για ειδικές συμφωνίες ή
          custom Enterprise λύσεις.
        </p>
      </div>
    </section>
  );
}
