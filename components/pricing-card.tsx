"use client";

import React from "react";

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  icon: React.ElementType;
  highlighted?: boolean;
}

export default function PricingCard({ name, price, features, icon: Icon, highlighted }: PricingCardProps) {
  return (
    <div className={`p-6 rounded-lg shadow-md border ${highlighted ? "border-blue-600" : "border-gray-200"}`}>
      <div className="flex items-center mb-4">
        <Icon className="h-8 w-8 text-blue-600 mr-2" />
        <h3 className="text-2xl font-bold">{name}</h3>
      </div>
      <p className="text-xl font-semibold mb-4">{price}</p>
      <ul className="mb-4">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center">
            <span className="text-green-500 mr-2">&#10003;</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
        Επιλογή
      </button>
    </div>
  );
}
