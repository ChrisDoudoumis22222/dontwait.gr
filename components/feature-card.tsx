"use client";

import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <Icon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>
    </div>
  );
}
