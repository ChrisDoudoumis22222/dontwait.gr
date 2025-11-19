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
              `}
            >
              {/* Badge */}
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

              {/* Icon & Name */}
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

              {/* Price */}
              <div className="mt-4 mb-6">
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
                  {plan.price}
                  {plan.name !== "Enterprise" && (
                    <span className="text-sm font-normal text-slate-500 ml-1">
                      /έτος
                    </span>
                  )}
                </p>
                {plan.monthlyHint && plan.name !== "Enterprise" && (
                  <p className="text-xs text-slate-400 mt-1">
                    {plan.monthlyHint} (χρεώνεται ετησίως)
                  </p>
                )}
              </div>

              {/* Features */}
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

              {/* CTA Button */}
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
                  Ιδανικό για franchises, αλυσίδες και custom λύσεις.
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-slate-400">
          Οι τιμές δεν περιλαμβάνουν ΦΠΑ 24%. Επικοινώνησε μαζί μας για ειδικές
          συμφωνίες ή ετήσια συμβόλαια υποστήριξης.
        </p>
      </div>
    </section>
  );
}
