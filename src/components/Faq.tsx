
"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section, Container } from "@/components/craft";
import Link from "next/link";
import { motion } from "framer-motion";

type FAQItem = {
  question: string;
  answer: string;
  link?: string;
};

const content: FAQItem[] = [
  {
    question: "What certifications does SynergiaPrep provide for studying abroad?",
    answer:
      "SynergiaPrep offers internationally recognized certifications for Python, Machine Learning, Data Science, and application-based courses like Urban Flow, Smart Data Scale, etc.",
  },
  {
    question: "How can I enroll in SynergiaPrep’s study abroad certification courses?",
    answer:
      "Enrollment is simple. Visit our website, select the desired certification course, and fill out the online registration form. Alternatively, contact our support team directly for assistance.",
  },
  {
    question: "Does SynergiaPrep offer personalized exam preparation coaching?",
    answer:
      "Yes, SynergiaPrep provides customized coaching sessions designed to meet individual learning styles and improve specific skill areas for optimal exam performance.",
  },
  {
    question: "Can SynergiaPrep assist me in selecting the right certification exam based on my educational goals?",
    answer:
      "Certainly! Our expert counselors provide personalized consultations to guide you toward the most appropriate certification based on your desired destination, university, and program of study.",
  },
  {
    question: "Are SynergiaPrep’s certifications globally recognized?",
    answer:
      "Absolutely. Certifications provided by SynergiaPrep, including IELTS, TOEFL, GRE, GMAT, SAT, and PTE, are globally recognized and widely accepted by universities worldwide.",
  },
  {
    question: "What is the duration of SynergiaPrep certification courses?",
    answer:
      "The course duration varies based on the specific certification exam and individual preparation needs, typically ranging from 4 to 12 weeks, with flexible schedules to accommodate all students.",
  },
  {
    question: "Does SynergiaPrep provide assistance beyond certification, such as study abroad applications?",
    answer:
      "Yes, SynergiaPrep offers comprehensive support throughout the application process, including university selection, application assistance, documentation guidance, and visa counseling.",
  },
  {
    question: "What kind of visa support does SynergiaPrep offer?",
    answer:
      "Our experienced advisors provide visa counseling, documentation assistance, mock interview preparations, and step-by-step guidance to facilitate a smooth visa application process.",
  },
  {
    question: "How much do SynergiaPrep certification courses cost?",
    answer:
      "Course fees vary based on the chosen certification and duration. Please visit our website or contact our support team for detailed pricing.",
    link: "https://synergiaprep.com/pricing",
  },
  {
    question: "Does SynergiaPrep offer online courses?",
    answer:
      "Yes, SynergiaPrep provides convenient online certification courses, enabling students to prepare flexibly and effectively from anywhere.",
  },
  {
    question: "Does SynergiaPrep provide support for living arrangements abroad, such as hostels or accommodation?",
    answer:
      "Yes, SynergiaPrep offers assistance in finding suitable living arrangements abroad, including hostel accommodations, student housing, and other affordable options.",
  },
  {
    question: "Can SynergiaPrep assist with scholarships and financial aid for studying abroad?",
    answer:
      "Absolutely! We guide students in identifying and applying for various scholarships and financial aid opportunities to support their overseas education.",
  },
  {
    question: "Does SynergiaPrep provide support for one-semester academic exchange programs?",
    answer:
      "Yes, we offer tailored support for students participating in one-semester academic exchange programs, including assistance with applications, documentation, and preparations for a smooth academic experience abroad.",
  },
  {
    question: "How does SynergiaPrep help students adapt to studying abroad, especially those coming from an Indian environment?",
    answer:
      "SynergiaPrep provides comprehensive cultural orientation and counseling to help students transition smoothly into the new academic environment abroad while staying connected to their Indian roots.",
  },
];

const FAQ = () => {
  return (
    <Section className="py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg md:text-xl text-gray-600">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our customer support team.
          </p>
        </motion.div>
        <div className="not-prose mt-4 flex flex-col gap-4 md:mt-8 max-w-6xl mx-auto">
          <Accordion type="single" collapsible className="w-[1000px]">
            {content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={item.question}
                  className="rounded-lg border-none bg-white/10 backdrop-blur-sm text-white hover:bg-black/20 transition-all"
                >
                  <AccordionTrigger className="text-left hover:no-underline text-white text-lg hover:text-blue-300 px-4 py-3">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-50 text-sm px-4 py-3">
                    {item.answer}
                    {item.link && (
                      <Link
                        href={item.link}
                        className="mt-2 flex items-center text-blue-300 hover:text-blue-400 transition-colors"
                      >
                        Learn more <ArrowUpRight className="ml-1" size="16" />
                      </Link>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
