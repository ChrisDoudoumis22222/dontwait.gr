"use client";

import React from "react";
import { MessageSquare } from "lucide-react";

export default function FloatingActionButton() {
  return (
    <button
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
      aria-label="Chat"
    >
      <MessageSquare className="h-6 w-6" />
    </button>
  );
}
