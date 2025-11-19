// app/packages/page.tsx
import React from "react";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";

const features = [
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

export const metadata = {
  title: "Σύγκριση Πακέτων | DontWait.gr",
  description:
    "Δείτε αναλυτικά τις διαφορές μεταξύ των πακέτων Basic, Pro και Enterprise του DontWait.gr και βρείτε αυτό που ταιριάζει καλύτερα στην επιχείρησή σας.",
};

const PackagesComparisonPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-900">
      {/* Top bar / breadcrumb */}
      <header className="border-b border-blue-100 bg-white/70 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900"
          >
            <span className="inline-block h-7 w-24 bg-blue-700 rounded-md text-white text-xs font-semibold flex items-center justify-center">
              DONTWAIT
            </span>
            <span className="hidden sm:inline text-xs text-gray-500">
              Επιστροφή στην αρχική
            </span>
          </Link>

          <Link
            href="/#Τιμολόγηση"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white text-xs sm:text-sm font-medium px-4 py-2 shadow-md hover:bg-blue-700"
          >
            Μετάβαση στην Τιμολόγηση
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16 pt-10 sm:pt-14">
        {/* Hero / intro */}
        <section className="text-center mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 mb-2">
            Σύγκριση Πακέτων
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Basic, Pro ή Enterprise;
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600">
            Δείτε αναλυτικά τι προσφέρει κάθε πακέτο του{" "}
            <span className="font-semibold text-blue-700">DontWait.gr</span> και
            επιλέξτε αυτό που ταιριάζει στις ανάγκες και στο μέγεθος της
            επιχείρησής σας.
          </p>
        </section>

        {/* Package summary cards */}
        <section className="grid gap-5 md:grid-cols-3 mb-10 sm:mb-14">
          {/* BASIC */}
          <div className="bg-white rounded-2xl shadow-md border border-blue-100/60 p-5 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Basic
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Ιδανικό για μικρά καταστήματα ή αυτόνομους επαγγελματίες που
              ξεκινούν με online ραντεβού.
            </p>
            <p className="text-2xl font-bold text-blue-700 mb-1">€100 / μήνα</p>
            <p className="text-[11px] text-gray-500 mb-4">
              Χωρίς δέσμευση – δυνατότητα αναβάθμισης σε Pro οποιαδήποτε στιγμή.
            </p>
            <Link
              href="/#Τιμολόγηση"
              className="mt-auto inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-700 text-xs font-medium px-4 py-2 hover:bg-blue-50"
            >
              Επιλέξτε Basic
            </Link>
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
                Για επιχειρήσεις που θέλουν πληρωμές online, SMS υπενθυμίσεις
                και συνεργασία πολλών μελών της ομάδας.
              </p>
              <p className="text-2xl font-bold mb-1">€150 / μήνα</p>
              <p className="text-[11px] text-blue-100 mb-4">
                Περιλαμβάνει online πληρωμές, SMS, πολλαπλούς χρήστες και
                σύνδεση με δικό σας domain.
              </p>
            </div>
            <Link
              href="/#Τιμολόγηση"
              className="relative mt-auto inline-flex items-center justify-center rounded-full bg-white text-blue-700 text-xs font-semibold px-4 py-2 shadow-md hover:bg-blue-50"
            >
              Επιλέξτε Pro
            </Link>
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
              Τιμολόγηση κατόπιν συζήτησης, με white-label, πολλαπλές τοποθεσίες
              & SLA υποστήριξης.
            </p>
            <Link
              href="/#Τιμολόγηση"
              className="mt-auto inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-700 text-xs font-medium px-4 py-2 hover:bg-blue-50"
            >
              Ζητήστε Προσφορά
            </Link>
          </div>
        </section>

        {/* Comparison table */}
        <section className="bg-white rounded-2xl shadow-lg border border-blue-100/70 overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-blue-50 bg-gradient-to-r from-blue-50 via-white to-blue-50">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Αναλυτική Σύγκριση Λειτουργιών
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
              Κάθε πακέτο χτίζεται πάνω στο προηγούμενο. Το Pro περιλαμβάνει
              όλα τα του Basic, ενώ το Enterprise περιλαμβάνει όλα τα του Pro
              μαζί με επιπλέον enterprise δυνατότητες.
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
                {features.map((f, idx) => (
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
              <span className="font-semibold text-blue-700">Pro</span> και
              αλλάξτε πακέτο όποτε θέλετε – χωρίς χρέωση εγκατάστασης.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Link
                href="/#Τιμολόγηση"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white text-xs sm:text-sm font-medium px-4 py-2 shadow-md hover:bg-blue-700"
              >
                Δωρεάν Δοκιμή 7 Ημερών
              </Link>
              <Link
                href="/#Hero"
                className="inline-flex items-center justify-center rounded-full border border-blue-600 text-blue-700 text-xs sm:text-sm font-medium px-4 py-2 hover:bg-blue-50"
              >
                Μιλήστε μαζί μας
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PackagesComparisonPage;
