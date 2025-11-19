"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Element } from "react-scroll";
import { motion, MotionProps, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// ------------------------------
// Custom Components Imports
// ------------------------------
import { Button } from "@/components/ui/button";
import { ChatWidget } from "@/components/chat-widget";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingCards from "@/components/pricing-card";
import { TrialModal } from "@/components/ui/trial-modal";
import { PlanSelectionForm } from "@/components/ui/plan-selection-form";
import HowItWorksSection from "@/components/HowItWorksSection";
import { Navbar } from "@/components/Navbar";

// Lucide imports actually used on this page
import {
  XCircle,
  ArrowRight,
  Calendar,
  Globe,
  Zap,
  Bell,
  CreditCard,
  Users,
  Check,
  Mail,
  Phone,
} from "lucide-react";

// ---------------------------------------------
// Helper wrappers for motion elements
// ---------------------------------------------
const MotionDiv: React.FC<
  React.HTMLAttributes<HTMLDivElement> & MotionProps
> = ({ children, ...props }) => <motion.div {...props}>{children}</motion.div>;

const MotionH2: React.FC<
  React.HTMLAttributes<HTMLHeadingElement> & MotionProps
> = ({ children, ...props }) => <motion.h2 {...props}>{children}</motion.h2>;

// ---------------------------------------------
// Constants / Data Arrays
// ---------------------------------------------
const FEATURES = [
  {
    title: "Εξατομικευμένη Σελίδα Κρατήσεων",
    description:
      "Προσαρμόστε την εμφάνιση και τη λειτουργικότητα της σελίδας σας.",
    icon: Calendar,
  },
  {
    title: "Χρήση Δικού σας Τομέα",
    description:
      "Συνδέστε τον προσωπικό σας τομέα για επαγγελματική παρουσία.",
    icon: Globe,
  },
  {
    title: "Εύκολη Διαχείριση Κρατήσεων",
    description: "Διαχειριστείτε όλες τις κρατήσεις από ένα εύχρηστο ταμπλό.",
    icon: Zap,
  },
  {
    title: "Αυτοματοποιημένες Ειδοποιήσεις",
    description:
      "Στείλτε αυτόματα επιβεβαιώσεις και υπενθυμίσεις στους πελάτες.",
    icon: Bell,
  },
  {
    title: "Ενσωμάτωση Πληρωμών",
    description: "Δεχτείτε online πληρωμές με ασφάλεια και ευκολία.",
    icon: CreditCard,
  },
  {
    title: "Πρόσβαση Πολλαπλών Χρηστών",
    description:
      "Δώστε πρόσβαση σε όλη την ομάδα σας με διαφορετικά δικαιώματα.",
    icon: Users,
  },
];

// ---------------------------------------------
// Reusable SVG Wave Component
// ---------------------------------------------
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

// ---------------------------------------------
// Success Notification Component (with icon)
// ---------------------------------------------
interface SuccessNotificationProps {
  message: string;
  onClose: () => void;
}

function SuccessNotification({ message, onClose }: SuccessNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-50 flex items-center space-x-2">
      <Check className="h-5 w-5" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

// ---------------------------------------------
// Fullscreen Loader (same style as app/loading.tsx)
// ---------------------------------------------
const DONTWAIT_BLUE = "#1e40af";

const FullscreenLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative flex items-center justify-center"
      >
        <div
          className="w-28 h-28 md:w-36 md:h-36"
          style={{
            backgroundColor: DONTWAIT_BLUE,
            WebkitMaskImage: "url('/images/dontwait.svg')",
            maskImage: "url('/images/dontwait.svg')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />

        <motion.div
          className="absolute -bottom-4 h-1.5 w-16 rounded-full bg-slate-200"
          initial={{ opacity: 0.4, scaleX: 0.6 }}
          animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.6, 1, 0.6] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </MotionDiv>

      <motion.p
        className="mt-8 text-[10px] md:text-xs tracking-[0.35em] uppercase text-slate-500"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Φόρτωση DontWait.gr
      </motion.p>
    </div>
  );
};

// ---------------------------------------------
// FOOTER Component
// ---------------------------------------------
function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-blue-800 to-gray-900 text-white py-12">
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
// MAIN HOME COMPONENT (Default Export)
// ---------------------------------------------
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [notificationVisible, setNotificationVisible] = useState(false);

  // 👇 Initial loader for main page (stays a bit longer)
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialLoader(false);
    }, 1800); // ~1.8 seconds
    return () => clearTimeout(timer);
  }, []);

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
    setIsPlanModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>dontwait.gr</title>
        <meta
          name="description"
          content="Δημιουργήστε μια επαγγελματική σελίδα κρατήσεων με το DontWait.gr"
        />
        <link
          rel="icon"
          href="https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png"
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
        {/* 🔵 Initial page loader overlay */}
        <AnimatePresence>
          {showInitialLoader && (
            <motion.div
              key="page-loader"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-[9999]"
            >
              <FullscreenLoader />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navbar as external component */}
        <Navbar onTrialOpen={() => setIsModalOpen(true)} />

        {/* Popups from components/ui */}
        <TrialModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => setNotificationVisible(true)}
        />

        <PlanSelectionForm
          isOpen={isPlanModalOpen}
          onClose={() => setIsPlanModalOpen(false)}
          selectedPlan={selectedPlan}
          onSuccess={() => setNotificationVisible(true)}
        />

        {notificationVisible && (
          <SuccessNotification
            message="Ευχαριστούμε, θα σας απαντήσουμε το συντομότερο δυνατό."
            onClose={() => setNotificationVisible(false)}
          />
        )}

        <main className="pt-20">
          {/* HERO */}
          <Element name="Hero">
            <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
              <Wave position="bottom" />
              <div className="container mx-auto px-4 py-32 md:py-40 lg:py-48">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  <MotionDiv
                    className="lg:w-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight">
                      Αυξήστε τις Κρατήσεις σας{" "}
                      <span className="text-blue-600">Χωρίς Κόπο!</span>
                    </h2>
                    <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                      Δημιουργήστε μια{" "}
                      <strong>επαγγελματική σελίδα κρατήσεων</strong>,
                      αυτοματοποιήστε ραντεβού και ενισχύστε την επιχείρησή σας.
                    </p>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center"
                    >
                      Δοκιμάστε Δωρεάν{" "}
                      <ArrowRight className="ml-2" aria-hidden="true" />
                    </Button>
                  </MotionDiv>

                  <MotionDiv
                    className="lg:w-1/2 flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                  >
                    <DotLottieReact
                      src="https://lottie.host/af179676-9294-4e76-b13e-28c94af1a066/dYGIND4bkN.lottie"
                      loop
                      autoplay
                      style={{ width: "100%", maxWidth: "700px" }}
                    />
                  </MotionDiv>
                </div>
              </div>
            </section>
          </Element>

          {/* ΠΩΣ ΛΕΙΤΟΥΡΓΕΙ */}
          <Element name="Πώς Λειτουργεί">
            <HowItWorksSection />
          </Element>

          {/* ΧΑΡΑΚΤΗΡΙΣΤΙΚΑ */}
          <Element name="Χαρακτηριστικά">
            <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-32">
              <Wave position="top" className="text-blue-100" />
              <Wave position="bottom" className="text-blue-100" />
              <div className="container mx-auto px-4 relative z-10">
                <MotionH2
                  className="text-4xl font-bold text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="relative inline-block font-extrabold text-4xl text-blue-900 mx-1">
                    Χαρακτηριστικά
                    <svg
                      className="absolute -bottom-0.5 w-full max-h-1.5 text-blue-400"
                      viewBox="0 0 55 5"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0.65 4C15.89 2.67 48.04 0.4 54.69 2"
                        strokeWidth="4"
                        stroke="currentColor"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </MotionH2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {FEATURES.map((feature, index) => (
                    <MotionDiv
                      key={index}
                      className="bg-white shadow-md rounded-xl p-6 flex items-start gap-4 transition-transform duration-200 hover:scale-105"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                        <feature.icon
                          className="h-6 w-6 text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-600">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            </section>
          </Element>

          {/* ΓΙΑΤΙ ΝΑ ΕΠΙΛΕΞΕΤΕ */}
          <Element name="Γιατί να Επιλέξετε">
            <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-32">
              <Wave position="top" />
              <Wave position="bottom" />
              <div className="container mx-auto px-4 relative z-10">
                <MotionH2
                  className="text-4xl font-bold text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6 }}
                >
                  Γιατί να Επιλέξετε το{" "}
                  <span className="relative inline-block mx-1 font-extrabold text-4xl text-blue-900">
                    <Image
                      src="https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png"
                      alt="DontWait Logo"
                      width={150}
                      height={40}
                      className="inline-block align-middle"
                    />
                    <svg
                      className="absolute -bottom-0.5 w-full max-h-1.5 text-blue-400"
                      viewBox="0 0 55 5"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0.65 4C15.89 2.67 48.04 0.4 54.69 2"
                        strokeWidth="4"
                        stroke="currentColor"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </MotionH2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Με το DontWait.gr card */}
                  <MotionDiv
                    className="bg-white p-8 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2">
                      Με το{" "}
                      <span
                        aria-hidden="true"
                        className="inline-block"
                        style={{
                          width: 140,
                          height: 32,
                          backgroundColor: "#1e40af", // dark blue
                          WebkitMaskImage: "url('/images/dontwait.svg')",
                          maskImage: "url('/images/dontwait.svg')",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          maskPosition: "center",
                          WebkitMaskSize: "contain",
                          maskSize: "contain",
                        }}
                      />
                      <span className="sr-only">DontWait.gr</span>
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Εξοικονόμηση χρόνου με αυτοματοποιημένες κρατήσεις",
                        "Επαγγελματική παρουσία με προσαρμοσμένη σελίδα",
                        "Αύξηση εσόδων με 24/7 διαθεσιμότητα κρατήσεων",
                        "Βελτίωση εμπειρίας πελατών με εύκολη διαδικασία",
                        "Αναλυτικά στατιστικά για λήψη καλύτερων αποφάσεων",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <Check
                            className="text-green-500 mr-2 mt-1 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </MotionDiv>

                  {/* Χωρίς το DontWait.gr card */}
                  <MotionDiv
                    className="bg-white p-8 rounded-lg shadow-lg"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-gray-600 flex items-center gap-2">
                      Χωρίς το{" "}
                      <span
                        aria-hidden="true"
                        className="inline-block"
                        style={{
                          width: 140,
                          height: 32,
                          backgroundColor: "#9ca3af", // gray
                          WebkitMaskImage: "url('/images/dontwait.svg')",
                          maskImage: "url('/images/dontwait.svg')",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          maskPosition: "center",
                          WebkitMaskSize: "contain",
                          maskSize: "contain",
                        }}
                      />
                      <span className="sr-only">DontWait.gr</span>
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "Σπατάλη χρόνου με χειροκίνητη διαχείριση κρατήσεων",
                        "Μη επαγγελματική εικόνα χωρίς online παρουσία",
                        "Χαμένες ευκαιρίες λόγω περιορισμένων ωρών λειτουργίας",
                        "Δυσαρεστημένοι πελάτες λόγω πολύπλοκης διαδικασίας",
                        "Έλλειψη δεδομένων για τη λήψη επιχειρηματικών αποφάσεων",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <XCircle
                            className="text-red-500 mr-2 mt-1 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </MotionDiv>
                </div>
              </div>
            </section>
          </Element>

          {/* ΤΙΜΟΛΟΓΗΣΗ */}
          <Element name="Τιμολόγηση">
            <PricingCards onPlanSelect={handlePlanSelection} />
          </Element>

          {/* ΜΑΡΤΥΡΙΕΣ */}
          <Element name="Μαρτυρίες">
            <TestimonialsSection />
          </Element>

          {/* CTA SECTION */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32">
            <div className="container mx-auto px-4 text-center">
              <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Απογειώστε την Επιχείρησή σας με Έξυπνες Κρατήσεις!
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                  Εξοικονομήστε χρόνο, αυξήστε τα έσοδά σας και προσφέρετε άψογη
                  εμπειρία στους πελάτες σας.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-[280px] h-[52px] bg-white text-blue-600 hover:bg-blue-50 rounded-full text-base font-medium relative px-6 group shadow-lg"
                  >
                    <span className="flex-1">Δωρεάν Δοκιμή 7 Ημερών</span>
                  </Button>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="w-[280px] h-[52px] bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full text-base font-medium shadow-lg"
                  >
                    Ζητήστε μια Επίδειξη
                  </Button>
                </div>
                <p className="mt-6 text-sm text-blue-200">
                  Χωρίς πιστωτική κάρτα • Εύκολη εγκατάσταση • Ακύρωση
                  οποιαδήποτε στιγμή
                </p>
              </MotionDiv>
            </div>
          </section>
        </main>

        <Footer />
        <ChatWidget />
      </div>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        :root {
          --background: 0 0% 100%;
          --foreground: 0 0% 3.9%;
          --card: 0 0% 100%;
          --card-foreground: 0 0% 3.9%;
          --popover: 0 0% 100%;
          --popover-foreground: 0 0% 3.9%;
          --primary: 0 0% 9%;
          --primary-foreground: 0 0% 98%;
          --secondary: 0 0% 96.1%;
          --secondary-foreground: 0 0% 9%;
          --muted: 0 0% 96.1%;
          --muted-foreground: 0 0% 45.1%;
          --accent: 0 0% 96.1%;
          --accent-foreground: 0 0% 9%;
          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 0 0% 98%;
          --border: 0 0% 89.8%;
          --input: 0 0% 89.8%;
          --ring: 0 0% 3.9%;
          --chart-1: 12 76% 61%;
          --chart-2: 173 58% 39%;
          --chart-3: 197 37% 24%;
          --chart-4: 43 74% 66%;
          --chart-5: 27 87% 67%;
          --radius: 0.5rem;
          --sidebar-background: 0 0% 98%;
          --sidebar-foreground: 240 5.3% 26.1%;
          --sidebar-primary: 240 5.9% 10%;
          --sidebar-primary-foreground: 0 0% 98%;
          --sidebar-accent: 240 4.8% 95.9%;
          --sidebar-accent-foreground: 240 5.9% 10%;
          --sidebar-border: 220 13% 91%;
          --sidebar-ring: 217.2 91.2% 59.8%;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          max-width: 100%;
          overflow-x: hidden;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
        }

        .active {
          color: #1e40af !important;
        }
        .active::after {
          width: 100% !important;
        }

        .dark {
          --background: 0 0% 3.9%;
          --foreground: 0 0% 98%;
          --card: 0 0% 3.9%;
          --card-foreground: 0 0% 98%;
          --popover: 0 0% 3.9%;
          --popover-foreground: 0 0% 98%;
          --primary: 0 0% 98%;
          --primary-foreground: 0 0% 9%;
          --secondary: 0 0% 14.9%;
          --secondary-foreground: 0 0% 98%;
          --muted: 0 0% 14.9%;
          --muted-foreground: 0 0% 63.9%;
          --accent: 0 0% 14.9%;
          --accent-foreground: 0 0% 98%;
          --destructive: 0 62.8% 30.6%;
          --destructive-foreground: 0 0% 98%;
          --border: 0 0% 14.9%;
          --input: 0 0% 14.9%;
          --ring: 0 0% 83.1%;
          --chart-1: 220 70% 50%;
          --chart-2: 160 60% 45%;
          --chart-3: 30 80% 55%;
          --chart-4: 280 65% 60%;
          --chart-5: 340 75% 55%;
          --sidebar-background: 240 5.9% 10%;
          --sidebar-foreground: 240 4.8% 95.9%;
          --sidebar-primary: 224.3 76.3% 48%;
          --sidebar-primary-foreground: 0 0% 100%;
          --sidebar-accent: 240 3.7% 15.9%;
          --sidebar-accent-foreground: 240 4.8% 95.9%;
          --sidebar-border: 240 3.7% 15.9%;
          --sidebar-ring: 217.2 91.2% 59.8%;
        }

        .text-balance {
          text-wrap: balance;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}
