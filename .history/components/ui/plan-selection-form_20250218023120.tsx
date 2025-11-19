"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Fixed import path

interface PlanSelectionFormProps {
  onCloseAction: () => void;
}

export function PlanSelectionForm({ onCloseAction }: PlanSelectionFormProps) {
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Selected Plan:", selectedPlan);
    onCloseAction();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Επιλογή Πακέτου</h2>
        <select
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          required
        >
          <option value="">Επιλέξτε Πακέτο...</option>
          <option value="basic">Basic</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>
        <div className="flex justify-end">
          <Button type="button" onClick={onCloseAction} className="mr-2">
            Ακύρωση
          </Button>
          <Button type="submit">Επιλογή</Button>
        </div>
      </form>
    </div>
  );
}
