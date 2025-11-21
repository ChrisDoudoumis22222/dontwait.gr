"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-blue-800 to-gray-900 text-white py-12">
      {/* Solid blue strip to connect with the section above */}
      <div className="absolute inset-x-0 top-0 h-6 bg-blue-800" />

      {/* Top wave */}
      <div className="absolute inset-x-0 top-0 overflow-hidden leading-none">
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
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png"
            alt="DontWait Logo"
            width={120}
            height={40}
            className="mx-auto rounded-lg"
          />
        </div>

        {/* Contact links */}
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

        {/* Privacy / Terms / Cookies */}
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-blue-100">
          <Link
            href="/privacy-policy"
            className="hover:text-white hover:underline underline-offset-4"
          >
            Πολιτική Απορρήτου
          </Link>
          <span className="hidden sm:inline-block">•</span>
          <Link
            href="/terms"   // 🔹 this now matches app/terms/page.tsx
            className="hover:text-white hover:underline underline-offset-4"
          >
            Όροι Χρήσης
          </Link>
          <span className="hidden sm:inline-block">•</span>
          <Link
            href="/CookiePolicy" // matches app/CookiePolicy/page.tsx
            className="hover:text-white hover:underline underline-offset-4"
          >
            Πολιτική Cookies
          </Link>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-sm">
          &copy; {new Date().getFullYear()} DontWait. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
