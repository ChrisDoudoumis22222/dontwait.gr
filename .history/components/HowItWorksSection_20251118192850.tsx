"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Share2, LineChart } from 'lucide-react';

type Step = {
  number: string;
  title: string;
  description: string;
  imageQuery: string;
  icon: React.ReactNode;
};

const HOW_IT_WORKS_STEPS: Step[] = [
  {
    number: "01",
    title: "Εγγραφή & Προσαρμογή",
    description: "Προσθέστε λογότυπο, πληροφορίες επιχείρησης και υπηρεσίες.",
    imageQuery: "minimal modern workspace desk setup clean aesthetic professional",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    number: "02",
    title: "Μοιραστείτε τη Σελίδα σας",
    description:
      "Χρησιμοποιήστε τον μοναδικό σας σύνδεσμο ή συνδέστε τον δικό σας τομέα.",
    imageQuery: "abstract connection network nodes modern minimalist tech",
    icon: <Share2 className="w-6 h-6" />,
  },
  {
    number: "03",
    title: "Λάβετε Κρατήσεις & Διαχειριστείτε",
    description:
      "Ενημερώσεις σε πραγματικό χρόνο & αναλύσεις στον Πίνακα Ελέγχου.",
    imageQuery: "elegant dashboard analytics charts minimalist interface",
    icon: <LineChart className="w-6 h-6" />,
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white py-24 md:py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-20 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-semibold tracking-wider uppercase text-primary/70">
              Απλό & Αποτελεσματικό
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            <span className="relative inline-block bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Πώς Λειτουργεί
            </span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-pretty leading-relaxed">
            Ξεκινήστε σε τρία απλά βήματα και αναπτύξτε την επιχείρησή σας online
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 max-w-7xl mx-auto">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            >
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-32 left-[60%] w-full h-[2px] bg-gradient-to-r from-primary/30 via-primary/20 to-transparent z-0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2 + 0.5,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: "left" }}
                />
              )}

              <motion.div
                className="relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-border/50"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="relative h-56 bg-gradient-to-br from-neutral-100 to-neutral-50 overflow-hidden">
                  <Image
                    src={`/.jpg?height=400&width=500&query=${encodeURIComponent(step.imageQuery)}`}
                    alt={step.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-110"
                  />
                  
                  <motion.div
                    className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-sm text-primary rounded-2xl flex items-center justify-center shadow-lg border border-primary/10"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {step.icon}
                  </motion.div>

                  <motion.div
                    className="absolute bottom-6 left-6 text-7xl font-bold text-white/10 select-none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  >
                    {step.number}
                  </motion.div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-bold text-primary/60 tracking-wider">
                      ΒΗΜ Α {step.number}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                  </div>
                  
                  <h3 className="text-2xl md:text-2xl font-bold text-foreground mb-4 text-balance leading-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-base leading-relaxed text-pretty">
                    {step.description}
                  </p>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformOrigin: "left" }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-lg mb-8 text-pretty">
            Είστε έτοιμοι να ξεκινήσετε;
          </p>
          <motion.button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Ξεκινήστε Δωρεάν
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
