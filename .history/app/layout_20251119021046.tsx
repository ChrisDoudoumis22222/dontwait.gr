// app/layout.tsx
import type { Metadata } from "next";
import React from "react";
import "./style/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://dontwait.gr"),
  title: {
    default: "DontWait.gr – Έξυπνο Online Σύστημα Κρατήσεων για Επιχειρήσεις",
    template: "%s | DontWait.gr",
  },
  description:
    "Το DontWait.gr είναι ένα έξυπνο online σύστημα κρατήσεων για σαλόνια ομορφιάς, εστιατόρια, γυμναστήρια, personal trainers και εταιρείες καθαρισμού. Δημιούργησε επαγγελματική σελίδα κρατήσεων, δέξου online ραντεβού 24/7 και αυτοματοποίησε τις υπενθυμίσεις πελατών.",
  keywords: [
    "online κρατήσεις",
    "σύστημα κρατήσεων",
    "σελίδα κρατήσεων",
    "booking page",
    "ραντεβού online",
    "DontWait",
    "DontWait.gr",
    "κρατήσεις σαλόνι ομορφιάς",
    "κρατήσεις εστιατορίου",
    "κρατήσεις γυμναστηρίου",
    "κρατήσεις personal trainer",
    "κρατήσεις εταιρεία καθαρισμού",
    "λογισμικό SaaS κρατήσεων",
    "ηλεκτρονικά ραντεβού",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://dontwait.gr/",
    title: "DontWait.gr – Online Σύστημα Κρατήσεων για Σύγχρονες Επιχειρήσεις",
    description:
      "Αναβάθμισε την επιχείρησή σου με το DontWait.gr. Δημιούργησε επαγγελματική σελίδα online κρατήσεων, δέξου ραντεβού 24/7 και αυτοματοποίησε υπενθυμίσεις για πελάτες.",
    siteName: "DontWait.gr",
    locale: "el_GR",
    images: [
      {
        url: "https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png",
        width: 1200,
        height: 630,
        alt: "DontWait.gr – Online Σύστημα Κρατήσεων",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DontWait.gr – Έξυπνο Online Σύστημα Κρατήσεων",
    description:
      "Δημιούργησε τη δική σου επαγγελματική σελίδα κρατήσεων με το DontWait.gr και δέξου online ραντεβού από πελάτες 24/7.",
    images: ["https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/2025-02-10-203844.ico",
    shortcut: "/images/2025-02-10-203844.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <body>{children}</body>
    </html>
  );
}
