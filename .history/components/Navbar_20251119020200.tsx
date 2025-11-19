"use client";

import React from "react";
import Image from "next/image";
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
  return (
    <Popover className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white border-b border-blue-100 shadow-md backdrop-blur-sm">
      {/* ✅ Max-width + centered + padding */}
      <nav className="w-full">
        <div className="mx-auto w-full max-w-5xl md:max-w-6xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="https://i.ibb.co/DPmSsDrN/2025-02-10-203844.png"
              alt="DontWait Logo"
              width={180}
              height={50}
              priority
            />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map(({ label, icon: Icon }) => (
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
            ))}
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

      {/* Mobile panel with same horizontal limits */}
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
            {NAV_ITEMS.map(({ label, icon: Icon }) => (
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
            ))}

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
