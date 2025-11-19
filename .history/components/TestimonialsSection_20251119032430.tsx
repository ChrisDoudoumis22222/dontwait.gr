"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

/** ---------- Motion wrappers (fix TS children error) ---------- */
const MotionDiv: any = motion.div;
const MotionH2: any = motion.h2;
const MotionH3: any = motion.h3;
const MotionP: any = motion.p;

/** ---------- Types ---------- */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  rating?: number; // 1..5
};

type Props = {
  id?: string;
  title?: string;
  subtitle?: string;
  items?: Testimonial[];
  className?: string;
  showDividers?: boolean;
  showCTA?: boolean;
};

/** ---------- Internal UI Components ---------- */
const Wave: React.FC<{ position?: "top" | "bottom"; className?: string }> = ({
  position = "bottom",
  className = "text-blue-100",
}) => {
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
      >
        <path d={d} fill="currentColor" />
      </svg>
    </div>
  );
};

const SectionDivider: React.FC<{ flip?: boolean; className?: string }> = ({
  flip = false,
  className = "",
}) => (
  <div className={`relative ${className}`}>
    <svg
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      className={`w-full h-[70px] text-blue-50 ${flip ? "rotate-180" : ""}`}
    >
      <path
        d="M0,100 C300,20 900,180 1200,60 L1200,0 L0,0 Z"
        fill="currentColor"
      />
    </svg>
  </div>
);

const TestimonialCard: React.FC<{ t: Testimonial; index: number }> = ({
  t,
  index,
}) => (
  <MotionDiv
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.45, delay: index * 0.08 }}
    className="group relative rounded-2xl bg-white/95 backdrop-blur-sm p-6 md:p-7 shadow-md ring-1 ring-slate-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
  >
    <Quote className="absolute -top-4 -left-4 h-10 w-10 text-blue-100 group-hover:text-blue-200 transition-colors duration-300" />

    <div className="flex items-start gap-5">
      {/* Avatar */}
      <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-blue-200/70 flex-shrink-0 bg-blue-50">
        {t.avatar ? (
          <Image
            src={t.avatar || "/placeholder.svg"}
            alt={t.author}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-blue-500">
            {t.author.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-slate-700 leading-relaxed italic text-sm md:text-[15px] mb-4">
          "{t.quote}"
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="font-semibold text-slate-900 text-sm md:text-base">
              {t.author}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">{t.role}</div>
          </div>

          {typeof t.rating === "number" && (
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors ${
                    i < (t.rating ?? 0) ? "text-yellow-400" : "text-slate-200"
                  }`}
                  fill={i < (t.rating ?? 0) ? "currentColor" : "none"}
                />
              ))}
              <span className="ml-1 text-xs text-slate-500 font-medium">
                {t.rating.toFixed(1)}/5
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  </MotionDiv>
);

/** ---------- Default Data ---------- */
export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Το DontWait.gr άλλαξε τον τρόπο που διαχειριζόμαστε τις κρατήσεις. Όχι άλλα τηλεφωνήματα, μόνο εύκολες online κρατήσεις!",
    author: "Άννα Παπαδοπούλου",
    role: "Ιδιοκτήτρια Σαλονιού",
    avatar:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=400&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote:
      "Ο πίνακας ελέγχου μας βοηθά να παρακολουθούμε τα πάντα σε ένα μέρος. Το συνιστώ ανεπιφύλακτα!",
    author: "Iωαννα Αντωνίου",
    role: "Διευθυντής Γυμναστηρίου",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    rating: 5,
  },
  {
    quote:
      "Η μετάβαση ήταν πανεύκολη και οι πελάτες μας κλείνουν ραντεβού 24/7. Εξαιρετικό εργαλείο.",
    author: "Μαρία Κ.",
    role: "Spa Manager",
    avatar:
      "https://images.unsplash.com/photo-1542596768-5d1d21f1cf98?q=80&w=400&auto=format&fit=crop",
    rating: 4.5,
  },
];

/** ---------- Main Component ---------- */
export default function TestimonialsSection({
  id = "Μαρτυρίες",
  title = "Τι Λένε οι Πελάτες μας",
  subtitle = "Πώς το DontWait.gr βελτίωσε την εμπειρία κρατήσεων για επιχειρήσεις και πελάτες.",
  items = DEFAULT_TESTIMONIALS,
  className = "",
  showDividers = true,
  showCTA = false,
}: Props) {
  const list = Array.isArray(items) ? items : DEFAULT_TESTIMONIALS;

  return (
    <div id={id} className={className}>
      {showDividers && <SectionDivider className="bg-transparent" />}

      <section className="relative isolate py-20 md:py-28">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100" />
        <Wave position="top" />
        <Wave position="bottom" />

        <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl ring-1 ring-slate-100 p-6 md:p-10 lg:p-12">
            {/* Header */}
            <div className="mb-10 md:mb-12 text-center">
              <MotionH2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 text-balance"
              >
                {title}
              </MotionH2>

              {subtitle && (
                <MotionP
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-4 text-sm md:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
                >
                  {subtitle}
                </MotionP>
              )}
            </div>

            {list.length > 0 ? (
              <div className="flex flex-col md:flex-row md:flex-wrap gap-6 lg:gap-7">
                {list.map((t, i) => (
                  <div
                    key={i}
                    className="md:flex-1 md:basis-[calc(50%-0.875rem)] lg:basis-[calc(33.333%-1.167rem)]"
                  >
                    <TestimonialCard t={t} index={i} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-400 py-10 text-sm">
                Δεν υπάρχουν μαρτυρίες προς το παρόν.
              </div>
            )}
          </div>
        </div>
      </section>

      {showDividers && <SectionDivider flip className="bg-transparent" />}

      {/* CTA Section */}
      {showCTA && (
        <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 md:py-24">
          <div className="container mx-auto px-6 text-center max-w-3xl">
            <MotionH3
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance"
            >
              Έτοιμοι να απογειώσετε τις κρατήσεις σας;
            </MotionH3>
            <MotionP
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-blue-100 text-sm md:text-base lg:text-lg leading-relaxed"
            >
              Δοκιμάστε το δωρεάν και δείτε άμεσα τη διαφορά στην καθημερινή
              λειτουργία της επιχείρησής σας.
            </MotionP>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/#trial"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 h-12 text-blue-700 hover:bg-blue-50 transition-colors shadow-lg w-full sm:w-[260px] text-sm font-semibold"
              >
                Δωρεάν Δοκιμή 7 Ημερών
              </a>
              <a
                href="/#demo"
                className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 h-12 text-white hover:bg-white/10 transition-colors w-full sm:w-[260px] text-sm font-semibold"
              >
                Ζητήστε μια Επίδειξη
              </a>
            </div>

            <p className="mt-6 text-xs md:text-sm text-blue-200">
              Χωρίς πιστωτική κάρτα • Εύκολη εγκατάσταση • Ακύρωση οποιαδήποτε
              στιγμή
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
