"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Popover, Transition } from "@headlessui/react";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "@/components/ui/button";
import {
  Menu,
  CreditCard,
  PlayCircle,
  Settings,
  MessageCircle,
} from "lucide-react";

// ---------------------------------------------
// Brand color (same as LOGO_BRAND_COLOR)
// ---------------------------------------------
const LOGO_BRAND_COLOR = "#1e3a8a"; // text-blue-900

// ---------------------------------------------
// Inline DontWait logo using /images/dontwait.svg
// Forced to blue via CSS mask
// ---------------------------------------------
const InlineLogo: React.FC<{ className?: string; size?: "sm" | "lg" }> = ({
  className,
  size = "sm",
}) => {
  const height = size === "lg" ? 48 : 32; // px
  const width = size === "lg" ? 200 : 140; // px

  return (
    <span
      className={`inline-flex align-middle items-center ${
        className ?? ""
      }`}
    >
      <span
        aria-hidden="true"
        style={
          {
            display: "inline-block",
            width,
            height,
            backgroundColor: LOGO_BRAND_COLOR, // 🔵 force blue
            WebkitMaskImage: "url('/images/dontwait.svg')",
            maskImage: "url('/images/dontwait.svg')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          } as React.CSSProperties
        }
      />
      <span className="sr-only">DontWait</span>
    </span>
  );
};

// ---------------------------------------------
// Nav data
// ---------------------------------------------
const NAV_ITEMS = [
  { label: "Πώς Λειτουργεί", icon: PlayCircle },
  { label: "Χαρακτηριστικά", icon: Settings },
  { label: "Τιμολόγηση", icon: CreditCard },
  { label: "Μαρτυρίες", icon: MessageCircle },
];

export interface NavbarProps {
  onTrialOpen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTrialOpen }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <Popover className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white border-b border-blue-100 shadow-md backdrop-blur-sm">
      <nav className="w-full">
        <div className="mx-auto w-full max-w-5xl md:max-w-6xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          {/* Logo -> always go to main page */}
          <div className="flex-shrink-0">
            <Link href="/" className="inline-flex items-center">
              {/* 🔵 SVG logo, forced blue */}
              <InlineLogo size="lg" />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map(({ label, icon: Icon }) =>
              isHome ? (
                // On home: smooth scroll
                <ScrollLink
                  key={label}
                  to={label}
                  spy
                  smooth
                  duration={500}
                  activeClass="active"
                  className="relative inline-flex items-center text-gray-700 hover:text-blue-700 transition-colors duration-200 cursor-pointer
                    after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-blue-600
                    after:transition-[width] after:ease-in-out after:duration-200 hover:after:w-full"
                >
                  {Icon && <Icon className="mr-2 h-5 w-5" aria-hidden="true" />}
                  {label}
                </ScrollLink>
              ) : (
                // On other pages: redirect to home
                <Link
                  key={label}
                  href="/"
                  className="relative inline-flex items-center text-gray-700 hover:text-blue-700 transition-colors duration-200
                    after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-blue-600
                    after:transition-[width] after:ease-in-out after:duration-200 hover:after:w-full"
                >
                  {Icon && <Icon className="mr-2 h-5 w-5" aria-hidden="true" />}
                  {label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              onClick={onTrialOpen}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              Δοκιμάστε Δωρεάν
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md">
              <Menu className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Open main menu</span>
            </Popover.Button>
          </div>
        </div>
      </nav>

      {/* Mobile panel */}
      <Transition
        as="div"
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel className="md:hidden bg-white/90 backdrop-blur-md shadow-lg border-t border-gray-200">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 pb-4 space-y-4">
            {NAV_ITEMS.map(({ label, icon: Icon }) =>
              isHome ? (
                // On home: smooth scroll
                <ScrollLink
                  key={label}
                  to={label}
                  spy
                  smooth
                  duration={500}
                  activeClass="active"
                  className="block w-full text-gray-700 hover:text-blue-600 text-lg font-medium transition-colors flex items-center cursor-pointer"
                  onClick={() => {
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                >
                  {Icon && <Icon className="mr-2 h-5 w-5" aria-hidden="true" />}
                  {label}
                </ScrollLink>
              ) : (
                // On other pages: redirect to home
                <Link
                  key={label}
                  href="/"
                  className="block w-full text-gray-700 hover:text-blue-600 text-lg font-medium transition-colors flex items-center"
                  onClick={() => {
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                >
                  {Icon && <Icon className="mr-2 h-5 w-5" aria-hidden="true" />}
                  {label}
                </Link>
              )
            )}

            <div className="pt-4">
              <Button
                onClick={onTrialOpen}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                Δοκιμάστε Δωρεάν
              </Button>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};