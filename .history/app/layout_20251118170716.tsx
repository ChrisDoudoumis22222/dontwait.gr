// app/layout.tsx
import type { Metadata } from "next";
import React from "react";
import "../globals.css"; // <- this should include tailwind base/components/utilities

export const metadata: Metadata = {
  title: "Dontwait.gr",
  description: "Αναβάθμισε την επιχείρησή σου",
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
