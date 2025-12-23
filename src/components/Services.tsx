"use client";

import * as React from "react";
import { MdArrowOutward } from "react-icons/md";
import ServiceCard from "@/components/ServiceCard";

interface ServiceCardProps {
  bgImg: string;
  icon: React.ComponentType<{ size?: number }>;
  h1: string;
  num: string;
  btn: string;
  p?: string;
}

export function Services() {
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      {/* Button Label */}
      <div className="flex justify-center mb-6">
        <div className="inline-block bg-blue-200 text-blue-700 font-bold px-6 py-2 rounded-full text-lg shadow">
          Our Services
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-xl font-semibold text-center max-w-2xl mx-auto mb-12">
        Comprehensive support for every step of your educational journey
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ServiceCard
          bgImg="/assets/images/ServicesApplication.webp"
          icon={MdArrowOutward}
          h1="Application Assistance"
          num="01"
          btn="Guidance"
        />
        <ServiceCard
          bgImg="/assets/images/ServicesTopUniversity.webp"
          icon={MdArrowOutward}
          h1="University Selection & Shortlisting"
          num="02"
          btn="Top Universities"
        />
        <ServiceCard
          bgImg="/assets/images/ServicesFinancialSupport.webp"
          icon={MdArrowOutward}
          h1="Scholarship & Financial Aid Support"
          num="03"
          btn="Financial Support"
        />
        <ServiceCard
          bgImg="/assets/images/ServicesCareer.jpg"
          icon={MdArrowOutward}
          h1="Career Counselling & Internship Guidance"
          num="04"
          btn="Future Ready"
        />
      </div>
    </section>
  );
}

export default Services;