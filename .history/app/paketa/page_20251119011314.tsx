// app/packages/page.tsx
"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Check, X, ArrowRight, Mail, Phone } from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { TrialModal } from "@/components/ui/trial-modal";
import { PlanSelectionForm } from "@/components/ui/plan-selection-form";
import { ChatWidget } from "@/components/chat-widget";

// ---------------------------------------------
// Types
// ---------------------------------------------
type BillingPeriod = "monthly" | "yearly";

// ---------------------------------------------
// Comparison data
// ---------------------------------------------
const FEATURES = [
  {
    label: "Προσαρμοσμένη σελίδα κρατήσεων",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    label: "Απεριόριστα ραντεβού",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    label: "Πολλαπλοί χρήστες / προσωπικό",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    label: "Online πληρωμές",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    label: "Αυτόματες email υπενθυμίσεις",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    label: "Αυτόματες SMS υπενθυμίσεις",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    label: "Χρήση δικού σας domain",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    label: "Στατιστικά & αναφορές",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    label: "Προτεραιότητα υποστήριξης",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    label: "Προηγμένες ρυθμίσεις ροής εργασίας",
    basic: false,
    pro: false,
    enterprise: true,
  },
  {
    label: "Πολυκατάστημα / πολλαπλές τοποθεσίες",
    basic: false,
    pro: false,
    enterprise: true,
  },
  {
    label: "White-label / branding",
    basic: false,
    pro: false,
    enterprise: true,
  },
];

// ---------------------------------------------
// FOOTER Component (same style as home)
// ---------------------------------------------
function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-blue-800 to-gray-900 text-white py-12 mt-16">
      <div className="absolute inset-x-0 top-0 -mt-1 overflow-hidden leading-none">
        <svg
          className="w-full h-12"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,80 900,40 1200,80 L1200,0 L0,0 Z"
            fill="currentColor"
            className="text-blue-800"
          />
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="flex justify-center">
          <Image
            src="https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png"
            alt="DontWait Logo"
            width={120}
            height={40}
            className="mx-auto rounded-lg"
          />
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8">
          <a
            href="mailto:info@dontwait.gr"
            className="flex items-center text-white hover:text-blue-400 transition-colors"
          >
            <Mail className="h-5 w-5 mr-2" aria-hidden="true" />
            <span>info@dontwait.gr</span>
          </a>
          <a
            href="tel:+306985673674"
            className="flex items-center text-white hover:text-blue-400 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
            <span>+30 698 56 73 674</span>
          </a>
        </div>
        <p className="mt-4 text-xs text-blue-100">
          * Οι τιμές δεν περιλαμβάνουν ΦΠΑ 24%.
        </p>
        <p className="mt-2 text-sm">
          &copy; {new Date().getFullYear()} DontWait. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ---------------------------------------------
// MAIN PAGE
// ---------------------------------------------
export default function PackagesComparisonPage() {
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");

  // 👉 This is the "request thingy" popup (PlanSelectionForm)
  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    setIsPlanModalOpen(true);
  };

  const toggleBilling = () => {
    setBillingPeriod((prev) => (prev === "monthly" ? "yearly" : "monthly"));
  };

  const getPriceText = (plan: "basic" | "pro") => {
    const baseMonthly = plan === "basic" ? 29 : 49;
    if (billingPeriod === "monthly") {
      return `€${baseMonthly} / μήνα`;
    }
    const yearly = baseMonthly * 10; // 2 μήνες δώρο
    return `€${yearly} / έτος`;
  };

  const getBillingNote = (plan: "basic" | "pro") => {
    if (billingPeriod === "yearly") {
      return "2 μήνες δώρο – πληρώνεις 10 μήνες, χρησιμοποιείς 12.";
    }
    if (plan === "basic") {
      return "Χωρίς δέσμευση – μπορείς να αναβαθμίσεις σε Pro ανά πάσα στιγμή.";
    }
    return "Ιδανικό για τις περισσότερες επιχειρήσεις με ομάδα & ανάγκη για online πληρωμές.";
  };

  const proPriceForCta =
    billingPeriod === "monthly" ? "€49/μήνα" : "€490/έτος (2 μήνες δώρο)";

  return (
    <>
      <Head>
        <title>Σύγκριση Πακέτων | DontWait.gr</title>
        <meta
          name="description"
          content="Δείτε αναλυτικά τις διαφορές μεταξύ των πακέτων Basic, Pro και Enterprise του DontWait.gr και βρείτε αυτό που ταιριάζει καλύτερα στην επιχείρησή σας."
        />
        <link
          rel="icon"
          href="https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-900 font-sans">
        {/* Navbar from components */}
        <Navbar onTrialOpen={() => setIsTrialOpen(true)} />

        {/* Trial modal (simple one) */}
        <TrialModal
          isOpen={isTrialOpen}
          onClose={() => setIsTrialOpen(false)}
          onSuccess={() => {
            /* hook into global success notification if you want */
          }}
        />

        {/* Request / PlanSelection popup */}
        <PlanSelectionForm
          isOpen={isPlanModalOpen}
          onClose={() => setIsPlanModalOpen(false)}
          selectedPlan={selectedPlan}
          onSuccess={() => {
            /* same – could trigger a global toast */
          }}
        />

        <main className="pt-20 pb-10">
          {/* Hero / intro */}
          <section className="max-w-6xl mx-auto px-4 pt-8 sm:pt-10 pb-4 sm:pb-6">
            <div className="flex flex-col gap-4 sm:gap-5 text-center">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
                Σύγκριση Πακέτων
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Basic, Pro ή Enterprise;
              </h1>
              <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
                Δείτε αναλυτικά τι προσφέρει κάθε πακέτο του{" "}
                <span className="font-semibold text-blue-700">DontWait.gr</span>{" "}
                και επιλέξτε αυτό που ταιριάζει στις ανάγκες και στο μέγεθος της
                επιχείρησής σας.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-600 text-blue-700 text-xs sm:text-sm font-medium px-4 py-2 bg-white/70 backdrop-blur hover:bg-white shadow-sm"
                >
                  Επιστροφή στην αρχική
                </Link>
                <Link
                  href="/#Τιμολόγηση"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white text-xs sm:text-sm font-medium px-4 py-2 shadow-md hover:bg-blue-700"
                >
                  Μετάβαση στην Τιμολόγηση
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Billing toggle – styled like PricingCards component */}
          <section className="max-w-6xl mx-auto px-4 mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center mb-1 gap-3 bg-white/80 backdrop-blur rounded-full px-4 py-2 shadow-sm border border-slate-200">
                <span
                  className={`text-xs sm:text-sm font-medium transition-colors ${
                    billingPeriod === "monthly"
                      ? "text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  Μηνιαία
                </span>

                <button
                  type="button"
                  onClick={toggleBilling}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full border transition-colors duration-200 ${
                    billingPeriod === "yearly"
                      ? "bg-blue-600 border-blue-600"
                      : "bg-slate-300 border-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                      billingPeriod === "yearly"
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>

                <span
                  className={`text-xs sm:text-sm font-medium transition-colors ${
                    billingPeriod === "yearly"
                      ? "text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  Ετήσια
                </span>

                {billingPeriod === "yearly" && (
                  <span className="ml-1 px-3 py-1 text-[10px] md:text-xs font-semibold rounded-full bg-yellow-300/90 text-yellow-900 uppercase tracking-wide">
                    2 ΜΗΝΕΣ ΔΩΡΟ
                  </span>
                )}
              </div>

              <p className="text-[11px] sm:text-xs text-slate-500 text-center max-w-md">
                Με ετήσια χρέωση πληρώνεις μόνο 10 μήνες{" "}
                <span className="font-semibold text-emerald-600">
                  και κερδίζεις 2 επιπλέον δωρεάν.
                </span>
              </p>
            </div>
          </section>

          {/* Package summary cards */}
          <section className="max-w-6xl mx-auto px-4 mb-10 sm:mb-14 grid gap-5 md:grid-cols-3">
            {/* BASIC */}
            <div className="bg-white rounded-2xl shadow-md border border-blue-100/60 p-5 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_55%)]" />
              <div className="relative">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  Basic
                </h2>
                <p className="text-xs text-gray-500 mb-2">
                  Ιδανικό για μικρά καταστήματα ή αυτόνομους επαγγελματίες που
                  ξεκινούν με online ραντεβού.
                </p>
                <p className="text-2xl font-bold text-blue-700 mb-1">
                  {getPriceText("basic")}
                </p>
                <p className="text-[11px] text-gray-500 mb-1">
                  Εφάπαξ setup fee: €200 (εφάπαξ παραμετροποίηση & στήσιμο).
                </p>
                <p className="text-[11px] text-gray-500 mb-4">
                  {getBillingNote("basic")}
                </p>
              </div>
              <button
                onClick={() => handlePlanSelection("basic")}
                className="relative mt-auto inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-700 text-xs font-medium px-4 py-2 hover:bg-blue-50 transition-colors"
              >
                Επιλέξτε Basic
              </button>
            </div>

            {/* PRO – highlighted */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl p-5 relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(circle_at_top,_#ffffff,_transparent_65%)]" />
              <div className="relative">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 border border-white/25 text-[11px] font-medium mb-3">
                  Δημοφιλέστερη Επιλογή
                </div>
                <h2 className="text-lg font-semibold mb-1">Pro</h2>
                <p className="text-xs text-blue-100 mb-2">
                  Για επιχειρήσεις που θέλουν online πληρωμές, SMS
                  υπενθυμίσεις και συνεργασία ομάδας.
                </p>
                <p className="text-2xl font-bold mb-1">{getPriceText("pro")}</p>
                <p className="text-[11px] text-blue-100 mb-1">
                  Εφάπαξ setup fee: €449 (πλήρης παραμετροποίηση & onboarding).
                </p>
                <p className="text-[11px] text-blue-100 mb-2">
                  Περιλαμβάνει online πληρωμές, SMS, πολλαπλούς χρήστες και
                  σύνδεση με δικό σας domain.
                </p>
                <p className="text-[11px] text-emerald-200 mb-4">
                  {getBillingNote("pro")}
                </p>
              </div>
              <button
                onClick={() => handlePlanSelection("pro")}
                className="relative mt-auto inline-flex items-center justify-center rounded-full bg-white text-blue-700 text-xs font-semibold px-4 py-2 shadow-md hover:bg-blue-50 transition-colors"
              >
                Επιλέξτε Pro
              </button>
            </div>

            {/* ENTERPRISE */}
            <div className="bg-white rounded-2xl shadow-md border border-blue-100/60 p-5 flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(234,179,8,0.12),_transparent_60%)]" />
              <div className="relative">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  Enterprise
                </h2>
                <p className="text-xs text-gray-500 mb-2">
                  Προσαρμοσμένη λύση για αλυσίδες καταστημάτων, franchises και
                  brands με ειδικές απαιτήσεις.
                </p>
                <p className="text-2xl font-bold text-blue-700 mb-1">
                  Επικοινωνήστε μαζί μας
                </p>
                <p className="text-[11px] text-gray-500 mb-1">
                  Τιμολόγηση κατόπιν συζήτησης, ανάλογα με όγκο, ανάγκες &
                  απαιτήσεις.
                </p>
                <p className="text-[11px] text-gray-500 mb-4">
                  White-label, πολλαπλές τοποθεσίες, SLA υποστήριξης & δυνατότητα
                  για custom mobile app. Setup fee κατόπιν συμφωνίας.
                </p>
              </div>
              <button
                onClick={() => handlePlanSelection("enterprise")}
                className="relative mt-auto inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-700 text-xs font-medium px-4 py-2 hover:bg-blue-50 transition-colors"
              >
                Ζητήστε Προσφορά
              </button>
            </div>
          </section>

          {/* Comparison table */}
          <section className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100/70 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-blue-50 bg-gradient-to-r from-blue-50 via-white to-blue-50">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                  Αναλυτική Σύγκριση Λειτουργιών
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
                  Κάθε πακέτο χτίζεται πάνω στο προηγούμενο. Το Pro περιλαμβάνει
                  όλα τα του Basic, ενώ το Enterprise περιλαμβάνει όλα τα του
                  Pro μαζί με επιπλέον enterprise δυνατότητες.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50/80">
                      <th className="text-left py-3 pl-4 sm:pl-6 pr-4 font-semibold text-gray-700 text-xs sm:text-sm">
                        Λειτουργία
                      </th>
                      <th className="text-center py-3 px-3 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                        Basic
                      </th>
                      <th className="text-center py-3 px-3 sm:px-4 font-semibold text-gray-700 text-xs sm:text-sm">
                        Pro
                      </th>
                      <th className="text-center py-3 pr-4 sm:pr-6 pl-3 sm:pl-4 font-semibold text-gray-700 text-xs sm:text-sm">
                        Enterprise
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEATURES.map((f, idx) => (
                      <tr
                        key={f.label}
                        className={
                          idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                        }
                      >
                        <td className="py-3 pl-4 sm:pl-6 pr-4 align-top text-xs sm:text-sm text-gray-800">
                          {f.label}
                        </td>

                        {/* Basic */}
                        <td className="py-3 px-3 sm:px-4 text-center align-middle">
                          {f.basic ? (
                            <Check className="inline-block w-5 h-5 text-emerald-500" />
                          ) : (
                            <X className="inline-block w-4 h-4 text-gray-300" />
                          )}
                        </td>

                        {/* Pro */}
                        <td className="py-3 px-3 sm:px-4 text-center align-middle">
                          {f.pro ? (
                            <Check className="inline-block w-5 h-5 text-emerald-500" />
                          ) : (
                            <X className="inline-block w-4 h-4 text-gray-300" />
                          )}
                        </td>

                        {/* Enterprise */}
                        <td className="py-3 pr-4 sm:pr-6 pl-3 sm:pl-4 text-center align-middle">
                          {f.enterprise ? (
                            <Check className="inline-block w-5 h-5 text-emerald-500" />
                          ) : (
                            <X className="inline-block w-4 h-4 text-gray-300" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom CTA row */}
              <div className="px-4 sm:px-6 py-4 border-t border-blue-50 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                  Ακόμη δεν είστε σίγουροι; Ξεκινήστε με{" "}
                  <span className="font-semibold text-blue-700">Pro</span>{" "}
                  ({proPriceForCta} + setup fee) και αλλάξτε πακέτο όποτε
                  θέλετε. Με ετήσια χρέωση κερδίζετε 2 μήνες δωρεάν.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handlePlanSelection("pro")}
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-xs sm:text-sm font-medium px-4 py-2 shadow-md hover:bg-blue-700 transition-colors"
                  >
                    Δωρεάν Δοκιμή 7 Ημερών
                  </button>
                  <Link
                    href="/#Hero"
                    className="inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-700 text-xs sm:text-sm font-medium px-4 py-2 hover:bg-blue-50 bg-white transition-colors"
                  >
                    Μιλήστε μαζί μας
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </>
  );
}
