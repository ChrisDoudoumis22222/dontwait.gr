"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const STEP_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    alt: "Ιδιοκτήτης επιχείρησης ρυθμίζει online το προφίλ του",
  },
  {
    src: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1200&auto=format&fit=crop",
    alt: "Κοινή χρήση σελίδας κρατήσεων σε κινητό και υπολογιστή",
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
    alt: "Πίνακας ελέγχου με κρατήσεις και αναλύσεις",
  },
];

// ⚠️ Make sure this file is at: /public/2025-02-10-203844.svg
const InlineLogo: React.FC<{ className?: string; size?: "sm" | "lg" }> = ({
  className,
  size = "sm",
}) => {
  const imgClass =
    size === "lg"
      ? "h-14 w-auto md:h-16" // bigger for title
      : "h-8 w-auto";

  return (
    <span
      className={`inline-flex align-middle items-center mx-1 ${
        className ?? ""
      }`}
    >
      <img
        src="/2025-02-10-203844.svg"
        alt="DontWait logo"
        className={imgClass}
      />
    </span>
  );
};

const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0); // timeline animation
  const [imageStep, setImageStep] = useState(1); // looping carousel

  // one-time left timeline animation
  useEffect(() => {
    const timer1 = setTimeout(() => setActiveStep(1), 500);
    const timer2 = setTimeout(() => setActiveStep(2), 1500);
    const timer3 = setTimeout(() => setActiveStep(3), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // infinite image carousel (slow & forever)
  useEffect(() => {
    const interval = setInterval(() => {
      setImageStep((prev) => (prev % 3) + 1);
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, []);

  const displayedStep = imageStep;

  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-blue-50/60 py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-100/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-sky-100/50 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title area, no "Πώς Λειτουργεί" pill, bigger logo */}
        <div className="mb-12 text-center">
          <h2 className="mt-0 text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 flex flex-wrap items-center justify-center gap-2">
            <span>Ξεκινήστε με το</span>
            <InlineLogo size="lg" />
            <span>σε 3 απλά βήματα</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Από την εγγραφή μέχρι τις online κρατήσεις – όλα είναι
            αυτοματοποιημένα και απλά για εσάς και τους πελάτες σας.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* LEFT – TIMELINE STEPS */}
          <div className="w-full max-w-md mx-auto">
            <div className="flex flex-col gap-8">
              {/* Step 1 */}
              <div
                className={`flex gap-4 transition-all duration-700 ${
                  activeStep >= 1
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 -translate-x-8 scale-95"
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg transition-all duration-500 ${
                      activeStep >= 1 ? "scale-100 rotate-0" : "scale-0 -rotate-180"
                    }`}
                  >
                    1
                  </div>
                  <div
                    className={`w-1 bg-blue-600/80 my-2 rounded-full transition-all duration-700 delay-300 ${
                      activeStep >= 2 ? "h-24" : "h-0"
                    }`}
                  />
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">
                    Εγγραφή & Ρύθμιση Επιχείρησης
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    Δημιουργείτε λογαριασμό στο <InlineLogo /> προσθέτετε τα
                    στοιχεία της επιχείρησης, τις υπηρεσίες και τις ώρες
                    λειτουργίας σας.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div
                className={`flex gap-4 transition-all duration-700 ${
                  activeStep >= 2
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 -translate-x-8 scale-95"
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg transition-all duration-500 ${
                      activeStep >= 2 ? "scale-100 rotate-0" : "scale-0 -rotate-180"
                    }`}
                  >
                    2
                  </div>
                  <div
                    className={`w-1 bg-blue-600/80 my-2 rounded-full transition-all duration-700 delay-300 ${
                      activeStep >= 3 ? "h-24" : "h-0"
                    }`}
                  />
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">
                    Σελίδα Κρατήσεων & Διαμοιρασμός
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    Το σύστημα δημιουργεί την{" "}
                    <span className="font-semibold">
                      προσωπική σας σελίδα κρατήσεων
                    </span>
                    . Μοιραστείτε τον σύνδεσμο με πελάτες ή συνδέστε το δικό σας
                    domain.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div
                className={`flex gap-4 transition-all duration-700 ${
                  activeStep >= 3
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 -translate-x-8 scale-95"
                }`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg transition-all duration-500 ${
                      activeStep >= 3 ? "scale-100 rotate-0" : "scale-0 -rotate-180"
                    }`}
                  >
                    3
                  </div>
                </div>
                <div className="pt-3">
                  <h3 className="text-xl font-semibold text-blue-700 mb-2">
                    Online Κρατήσεις & Πίνακας Ελέγχου
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    Οι πελάτες κλείνουν{" "}
                    <span className="font-semibold">online 24/7</span>. Βλέπετε
                    όλες τις κρατήσεις στον πίνακα ελέγχου, λαμβάνετε
                    ειδοποιήσεις και οργανώνετε καλύτερα την ημέρα σας.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT – IMAGE PANEL (slow infinite carousel) */}
          <div className="w-full lg:flex-1">
            <div className="relative max-w-xl mx-auto aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-blue-100 bg-white">
              {STEP_IMAGES.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    displayedStep === idx + 1 ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={idx === 0}
                    sizes="(min-width: 1024px) 500px, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white text-sm md:text-base">
                <div>
                  <p className="uppercase tracking-[0.18em] text-xs text-white/80">
                    ΒΗΜΑ {displayedStep} / 3
                  </p>
                  <p className="font-semibold">
                    {displayedStep === 1 && (
                      <>
                        Ρύθμιση επιχείρησης στο{" "}
                        <InlineLogo className="mx-0" />
                      </>
                    )}
                    {displayedStep === 2 &&
                      "Σελίδα κρατήσεων έτοιμη για διαμοιρασμό"}
                    {displayedStep === 3 &&
                      "Προβολή κρατήσεων & αναλυτικών στοιχείων"}
                  </p>
                </div>

                <div className="flex gap-1.5">
                  {[1, 2, 3].map((s) => (
                    <span
                      key={s}
                      className={`h-2 w-6 rounded-full transition-all ${
                        displayedStep === s ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* no extra text under the image */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
