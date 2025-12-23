"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function Page() {
  const containerRef = useRef(null);

  // State arrays to track visibility of each section
  const [featureVisible, setFeatureVisible] = useState<boolean[]>(
    new Array(6).fill(false)
  );
  const [finalSectionVisible, setFinalSectionVisible] = useState(false);

  // Refs for each feature section
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const finalSectionRef = useRef<HTMLDivElement | null>(null);

  const features = [
    {
      title: "AI-Powered Proctoring",
      description:
        "Leverage AI for real-time facial recognition, anomaly detection, and automated cheating alerts.",
      color: "bg-blue-100",
      image: "/assets/images/ai-proctoring.jpg",
    },
    {
      title: "Live & Recorded Proctoring",
      description:
        "Choose between live monitoring or recorded sessions for post-exam review and verification.",
      color: "bg-purple-100",
      image: "/assets/images/live-proctoring.jpg",
    },
    {
      title: "Browser Lockdown",
      description:
        "Prevent students from switching tabs, copying content, or using unauthorized resources during exams.",
      color: "bg-red-100",
      image: "/assets/images/browser-lockdown.jpg",
    },
    {
      title: "Cheating Detection Alerts",
      description:
        "Get instant alerts for suspicious activities such as multiple faces, background noise, or mobile phone usage.",
      color: "bg-yellow-100",
      image: "/assets/images/cheating-alerts.jpg",
    },
    {
      title: "Seamless Integration",
      description:
        "Easily integrate with popular Learning Management Systems like Moodle, Canvas, and Blackboard.",
      color: "bg-green-100",
      image: "/assets/images/integration.jpg",
    },
    {
      title: "Detailed Reporting & Analytics",
      description:
        "Generate detailed reports with flagged events, proctor logs, and exam summaries for administrators.",
      color: "bg-indigo-100",
      image: "/assets/images/reports.jpg",
    },
  ];

  useEffect(() => {
    // Create observer for feature sections
    const featureObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = featureRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) {
            // Update visibility state when entering or leaving viewport
            setFeatureVisible((prev) => {
              const updated = [...prev];
              updated[index] = entry.isIntersecting;
              return updated;
            });
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of element is visible
    );

    // Create observer for final section
    const finalObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === finalSectionRef.current) {
            setFinalSectionVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Store current refs in variables to use in cleanup
    const currentFeatureRefs = featureRefs.current;
    const currentFinalSectionRef = finalSectionRef.current;

    // Observe all feature sections
    currentFeatureRefs.forEach((ref) => {
      if (ref) featureObserver.observe(ref);
    });

    // Observe final section
    if (currentFinalSectionRef) {
      finalObserver.observe(currentFinalSectionRef);
    }

    // Cleanup
    return () => {
      currentFeatureRefs.forEach((ref) => {
        if (ref) featureObserver.unobserve(ref);
      });
      if (currentFinalSectionRef) {
        finalObserver.unobserve(currentFinalSectionRef);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <div className="h-screen flex flex-col md:flex-row items-center justify-center bg-gray-50 text-center md:text-left px-6">
        {/* Left Section - Text */}
        <div className="max-w-2xl">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            AI-Powered Online Proctoring
          </h1>
          <p className="text-xl text-gray-600">
            Secure, reliable, and scalable remote exam monitoring with real-time
            AI analysis, browser lockdown, and live proctoring.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-lg hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="mt-8 md:mt-0 md:ml-12">
          <Image
            src="/assets/images/proctoring-illustration.jpg"
            alt="Online Proctoring"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Features Section */}
      {features.map((feature, index) => (
        <div
          key={index}
          ref={(el) => {
            featureRefs.current[index] = el;
          }}
          className={`h-screen flex flex-col md:flex-row md:odd:flex-row-reverse items-center justify-center ${feature.color} relative overflow-hidden px-6 text-center md:text-left md:odd:text-right gap-4`}
        >
          {/* Text Content - Always on left for even indexes, right for odd indexes in md+ */}
          <div className="max-w-2xl">
            <div
              className={`transition-all duration-1000 transform ${
                featureVisible[index]
                  ? "opacity-100 translate-x-0"
                  : index % 2 === 0
                    ? "opacity-0 -translate-x-32"
                    : "opacity-0 translate-x-32"
              }`}
            >
              <h2 className="text-4xl font-bold mb-4">{feature.title}</h2>
              <p className="text-xl text-gray-600">{feature.description}</p>
            </div>
          </div>

          {/* Image - Always on right for even indexes, left for odd indexes in md+ */}
          <div className="mt-8 md:mt-0 md:ml-12">
            <div
              className={`transition-all duration-1000 transform ${
                featureVisible[index]
                  ? "opacity-100 translate-x-0"
                  : index % 2 === 0
                    ? "opacity-0 translate-x-32"
                    : "opacity-0 -translate-x-32"
              }`}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Final Section */}
      <div
        ref={finalSectionRef}
        className="h-screen flex items-center justify-center bg-gray-50"
      >
        <div
          className={`text-center transition-all duration-1000 transform ${
            finalSectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4">
            Secure & Reliable Online Exams
          </h2>
          <p className="text-xl text-gray-600">
            Ensure academic integrity with AI-powered proctoring. Get started
            today!
          </p>
        </div>
      </div>
    </div>
  );
}
