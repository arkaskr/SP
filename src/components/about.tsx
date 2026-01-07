"use client";

import * as React from "react";

export function About() {
  return (
    <>
      <div className="px-6 pt-10 pb-15 bg-white sm:pt-10">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-200 text-blue-700 font-bold px-6 py-2 rounded-full text-lg shadow">
            About Us
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <p className="text-gray-700 leading-relaxed md:leading-loose space-y-6">
              <span className="block text-lg sm:text-xl">
                At{" "}
                <span className="font-bold text-blue-600">
                  SynergiaPrep Pvt Ltd
                </span>
                , we empower students with the tools, guidance, and global
                opportunities they need to succeed — whether it&apos;s preparing
                for competitive exams or securing admission to top universities
                worldwide.
              </span>

              <span className="block text-lg sm:text-xl">
                Our platform brings together the best of both worlds: expert-led
                online exam preparation for entrance and government exams like{" "}
                <span className="font-semibold text-gray-900">
                  JEE, NEET, WBJEE
                </span>
                , and more, combined with comprehensive admission counseling for
                international education.
              </span>

              <span className="block text-lg sm:text-xl">
                With a team of experienced mentors, dynamic learning resources,
                and transparent guidance at every step,{" "}
                <span className="font-semibold text-gray-900">
                  SynergiaPrep
                </span>{" "}
                is your one-stop solution for academic success and career
                advancement.
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
