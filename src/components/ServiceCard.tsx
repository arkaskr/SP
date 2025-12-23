"use client";

import * as React from "react";
import Image from "next/image";
import type { IconType } from "react-icons";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: IconType;
  btn: string;
  h1: string;
  num: string;
  p?: string;
  bgImg: string;
}

export function ServiceCard({ icon: Icon, btn, h1, num, p, bgImg }: ServiceCardProps) {
  return (
    <div className="rounded-xl shadow-md text-white p-6 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
      {/* Background Image */}
      <Image
        src={bgImg}
        alt={h1}
        fill
        className="object-cover object-bottom z-[-1]"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-xl z-0"></div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <Button variant="default" className="bg-white text-indigo-700 font-medium px-4 py-1 rounded-full text-sm shadow">
          {btn}
        </Button>
        {Icon && <Icon className="text-white text-2xl" />}
      </div>

      {/* Body */}
      <div className="relative z-10 mt-auto">
        <div className="text-4xl font-bold mb-2">{num}</div>
        <h3 className="text-xl font-semibold leading-snug mb-2">{h1}</h3>
        {p && <p className="text-sm text-white/90">{p}</p>}
      </div>
    </div>
  );
}

export default ServiceCard;