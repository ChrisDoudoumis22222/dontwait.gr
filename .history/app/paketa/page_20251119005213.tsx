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
        <p className="mt-6 text-sm">
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

  const handlePlanSelection = (plan: string) => {
    setSelectedPlan(plan);
    setIsPlanModalOpen(true);
  };

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

        {/* Modals, so navbar buttons still work on this page */}
        <TrialModal
          isOpen={isTrialOpen}
          onClose={() => setIsTrialOpen(false)}
          onSuccess={() => {
            /* you can add a toast here if you want */
          }}
        />

        <PlanSelectionForm
          isOpen={isPlanModalOpen}
          onClose={() => setIsPlanModalOpen(false)}
          selectedPlan={selectedPlan}
          onSuccess={() => {
            /* same – hook into global success notification if you like */
          }}
        />

        <main className="pt-20 pb-10">
          {/* Hero / intro */}
          <section className="max-w-6xl mx-auto px-4 pt-8 sm:pt-10 pb-8 sm:pb-12">
            <div className="flex flex-col gap-4 sm:gap-5 text-center">
              <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-blue-600">
                Σύγκριση Πακέτων
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
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

          {/* Package summary cards */}
          <section className="max-w-6xl mx-auto px-4 mb-10 sm:mb-14 grid gap-5 md:grid-cols-3">
            {/* BASIC */}
            <div className="bg-white rounded-2xl shadow-md border border-blue-100/60 p-5 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Basic
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Ιδανικό για μικρά καταστήματα ή αυτόνομους επαγγελματίες που
                ξεκινούν με online ραντεβού.
              </p>
              <p className="text-2xl font-bold text-blue-700 mb-1">
                €100 / μήνα
              </p>
              <p className="text-[11px] text-gray-500 mb-4">
                Χωρίς δέσμευση – δυνατότητα αναβάθμισης σε Pro οποιαδήποτε
                στιγμή.
              </p>
              <button
                onClick={() => handlePlanSelection("basic")}
                className="mt-auto inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-700 text-xs font-medium px-4 py-2 hover:bg-blue-50"
              >
                Επιλέξτε Basic
              </button>
            </div>

            {/* PRO – highlighted */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl p-5 relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top,_#ffffff,_transparent_60%)]" />
              <div className="relative">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 border border-white/25 text-[11px] font-medium mb-3">
                  Δημοφιλέστερη Επιλογή
                </div>
                <h2 className="text-lg font-semibold mb-1">Pro</h2>
                <p className="text-xs text-blue-100 mb-4">
                  Για επιχειρήσεις που θέλουν πληρωμές online, SMS
                  υπενθυμίσεις και συνεργασία πολλών μελών της ομάδας.
                </p>
                <p className="text-2xl font-bold mb-1">€150 / μήνα</p>
                <p className="text-[11px] text-blue-100 mb-4">
                  Περιλαμβάνει online πληρωμές, SMS, πολλαπλούς χρήστες και
                  σύνδεση με δικό σας domain.
                </p>
              </div>
              <button
                onClick={() => handlePlanSelection("pro")}
                className="relative mt-auto inline-flex items-center justify-center rounded-full bg-white text-blue-700 text-xs font-semibold px-4 py-2 shadow-md hover:bg-blue-50"
              >
                Επιλέξτε Pro
              </button>
            </div>

            {/* ENTERPRISE */}
            <div className="bg-white rounded-2xl shadow-md border border-blue-100/60 p-5 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Enterprise
              </h2>
              <p className="text-xs text-gray-500 mb-4">
                Προσαρμοσμένη λύση για αλυσίδες καταστημάτων, franchises και
                brands με ειδικές απαιτήσεις.
              </p>
              <p className="text-2xl font-bold text-blue-700 mb-1">Custom</p>
              <p className="text-[11px] text-gray-500 mb-4">
                Τιμολόγηση κατόπιν συζήτησης, με white-label, πολλαπλές
                τοποθεσίες & SLA υποστήριξης.
              </p>
              <button
                onClick={() => handlePlanSelection("enterprise")}
                className="mt-auto inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-700 text-xs font-medium px-4 py-2 hover:bg-blue-50"
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
                        className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}
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
                  <span className="font-semibold text-blue-700">Pro</span> και
                  αλλάξτε πακέτο όποτε θέλετε – χωρίς χρέωση εγκατάστασης.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => setIsTrialOpen(true)}
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-xs sm:text-sm font-medium px-4 py-2 shadow-md hover:bg-blue-700"
                  >
                    Δωρεάν Δοκιμή 7 Ημερών
                  </button>
                  <Link
                    href="/#Hero"
                    className="inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-700 text-xs sm:text-sm font-medium px-4 py-2 hover:bg-blue-50 bg-white"
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
