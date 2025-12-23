"use client";

import * as React from "react";

type FeaturesItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function FeaturesItem({ icon, title, description }: FeaturesItemProps) {
  return (
    <div className="text-center h-80 bg-gray-100 p-6 rounded-xl shadow-md transform transition duration-300 hover:shadow-2xl hover:scale-105">
      <div className="w-16 h-16 mb-4 mx-auto flex items-center justify-center bg-indigo-500 text-white rounded-full text-2xl">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default FeaturesItem;