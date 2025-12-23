"use client";

import React, { useEffect } from "react";
import {
  Eye,
  Star,
  Globe,
  Lightbulb,
  Shield,
  Users,
  CheckCircle,
  Target,
  Rocket,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const AboutCompany = () => {
  const router = useRouter();

  // Handle scrolling to section on page load with offset for navbar and header
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const sectionId = hash.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 60; // Approximate navbar height (adjust if needed)
        const headerHeight = 100; // Approximate header height (mb-8 md:mb-12 + h2)
        const offset = navbarHeight + headerHeight;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth",
        });
      }
    }
  }, []);

  const values = [
    {
      icon: Globe,
      title: "Inclusivity",
      description:
        "Creating opportunities for every student, regardless of their background, by providing accessible and comprehensive educational resources.",
    },
    {
      icon: Star,
      title: "Excellence",
      description:
        "Committed to delivering the highest quality of learning experiences, leveraging expertise from top academic institutions and technological innovations.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Prioritizing continuous technological advancement in AI/ML, Materials Science, and IoT to redefine how education and career preparation are approached.",
    },
    {
      icon: CheckCircle,
      title: "Empowerment",
      description:
        "Empowering students to take control of their academic and professional journeys through personalized guidance and progress tracking.",
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description:
        "Offering study-abroad consultations and international certification courses to prepare students for global opportunities and cross-border collaborations.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description:
        "Maintaining transparency and trust in all services, ensuring fairness and reliability for students, partners, and stakeholders.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "Forging meaningful partnerships with academic institutions, industry leaders, and global entities to create an ecosystem that fosters success and innovation.",
    },
  ];

  const missionHighlights = [
    "To empower students across diverse fields and career aspirations by delivering a cutting-edge educational platform that enables them to prepare, practice, and succeed in their exams",
    "We are committed to being a reliable partner in every student's journey to success, regardless of their chosen path",
    "Through our AI/ML-powered tools, we provide personalized exam preparation, progress tracking, and insights to optimize learning outcomes",
    "We bridge academic and professional growth by offering internships, short-term certification courses with leading foreign universities, and innovative technological solutions",
    "By fostering innovation in AI/ML, Materials Science, and IoT, we aim to redefine the educational landscape while nurturing global opportunities through study-abroad consultations",
  ];

  return (
    <div
      className="min-h-screen"
      // style={{
      //   backgroundImage: "url(/assets/images/missionvalues.webp)",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      {/* <div className="absolute inset-0 bg-black/50" /> */}

      <div className="w-full relative px-4 py-8 md:py-16 justify-center items-center flex flex-col bg-gradient-to-b from-[#3a59e4] via-blue-400 dark:via-blue-900 to-blue-300">
        <div className="w-full text-center">
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Transforming Education, Empowering Futures
            </h2>
          </div>

          <Card id="mission" className="w-full border-none bg-transparent text-white mb-6 md:mb-10 shadow-none">
            <CardHeader>
              <CardTitle className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <Rocket className="w-8 h-8" />
                  <span className="text-xl md:text-2xl font-bold">
                    Our Mission
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 backdrop-blur-sm">
                {missionHighlights.map((highlight, index) => (
                  <React.Fragment key={highlight}>
                    <div className="flex items-start space-x-3 text-left">
                      <Target className="w-5 h-5 mt-1 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        {highlight}
                      </span>
                    </div>
                    {index < missionHighlights.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col lg:flex-row w-full gap-6 pt-20">
            <Card id="vision" className="w-full border-none bg-transparent text-white mb-6 md:mb-10 shadow-none">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl flex items-center justify-center">
                  <Eye className="mr-3 w-6 h-6" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm md:text-base">
                <p>
                  To be the most trusted and innovative EduTech platform globally,
                  transforming the way students learn, prepare, and succeed in
                  their chosen paths. We envision creating a future where every
                  student, regardless of their field or location, has access to
                  advanced technology-driven education that inspires confidence
                  and unlocks their full potential.
                </p>
                <p className="mt-5">
                  We aspire to lead in educational innovation, not only by setting
                  new standards in exam preparation but also by empowering
                  individuals with skills for the industries of tomorrow through
                  technological advancements and global opportunities.
                </p>
              </CardContent>
            </Card>
            <div className="w-full block lg:relative">
              <Image
                src="/assets/images/unsplash1.jpg"
                alt="Mission and Values"
                width={400}
                height={400}
                className="rounded-lg absolute top-0 right-0 shadow-lg hidden lg:block"
              />
              <Image
                src="/assets/images/unsplash2.jpg"
                alt="Mission and Values"
                width={600}
                height={200}
                className="rounded-lg lg:absolute lg:bottom-0 lg:left-0 shadow-lg"
              />
            </div>
          </div>

          <div id="core-values" className="mt-8 container md:mt-40">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-white">
              Our Core Values
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {values.map((value, index) => (
                <AccordionItem
                  key={value.title}
                  value={`item-${index}`}
                  className="backdrop-blur-sm mb-2 rounded-lg text-white"
                >
                  <AccordionTrigger className="px-4">
                    <div className="flex items-center justify-center">
                      <value.icon className="mr-3 w-5 h-5 text-white" />
                      <span className="text-sm md:text-base">
                        {value.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 text-white text-sm md:text-base">
                    {value.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCompany;