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
    question: "What certificate courses do you offer?",
    answer:
      "We offer a wide range of professionally designed, industry-oriented certificate courses focused on skill development, career advancement, and practical learning across multiple domains.",
  },
  {
    question: "Who can enroll in the certificate courses?",
    answer:
      "Our certificate courses are open to students, graduates, working professionals, and career changers who wish to enhance their skills or gain industry-relevant knowledge.",
  },
  {
    question: "Are the certificate courses industry-oriented?",
    answer:
      "Yes, all our certificate programs are designed with a strong industry focus, emphasizing practical skills, real-world applications, and current market requirements.",
  },
  {
    question: "What is the duration of the certificate courses?",
    answer:
      "Course duration varies depending on the program and typically ranges from a few weeks to a few months.",
  },
  {
    question: "Do you offer online certificate courses?",
    answer:
      "Yes, we offer flexible learning options, including online and hybrid certificate courses, allowing learners to study at their own pace.",
  },
  {
    question: "Will I receive a certificate upon completion?",
    answer:
      "Yes, learners receive a certificate of completion after successfully finishing the course requirements.",
  },
  {
    question: "Are the certificates recognized by employers?",
    answer:
      "Our certificates are designed to align with industry standards and are valued by employers for skill-based roles and career enhancement.",
  },
  {
    question: "Do the courses include practical training or projects?",
    answer:
      "Yes, most courses include hands-on training, case studies, and practical projects to ensure real-world learning experience.",
  },
  {
    question: "How can I enroll in a certificate course?",
    answer:
      "You can enroll by contacting our admissions team or filling out the enrollment form on our website.",
  },
  {
    question: "What is the fee structure for certificate courses?",
    answer:
      "Course fees vary based on the program. Please contact us or visit the course details page for complete fee information.",
  },
  {
    question: "Do you provide career guidance or support?",
    answer:
      "Yes, we offer guidance to help learners choose the right course aligned with their career goals.",
  },
];

const FAQ = () => {
  return (
    <Section className="py-12">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white mb-8 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-black">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our
            customer support team.
          </p>
        </motion.div>

        {/* Accordion with spacing */}
        <div className="not-prose max-w-6xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-[1000px] mx-auto"
          >
            {content.map(
              (
                item,
                index // Fixed: Changed FAQItem to content
              ) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="mb-2" // Added margin-bottom for spacing between questions
                >
                  <AccordionItem
                    value={item.question}
                    className="rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                  >
                    <AccordionTrigger className="text-left hover:no-underline text-white text-base sm:text-lg hover:text-blue-300 px-4 py-3">
                      {item.question}
                    </AccordionTrigger>

                    <AccordionContent className="text-gray-100 text-sm px-4 py-3">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              )
            )}
          </Accordion>
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
