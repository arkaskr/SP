"use client";
import React, { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Course {
  courseId: string;
  banner: string;
  title: string;
  summary: string;
  skills: string[];
  objective: string[];
  outcome: string[];
  coordinator: string;
}

export default function CourseCarousel() {
  const router = useRouter();
  const [showArrows, setShowArrows] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/study-abroad/all", {
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data.courses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const checkScreenSize = () => setShowArrows(window.innerWidth > 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    []
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[480px] rounded-xl overflow-hidden">
              <Skeleton className="w-full h-64" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-2 flex-wrap">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-600 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-muted/20 rounded-lg p-8">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No courses available at the moment
          </p>
        </div>
      </div>
    );
  }

  const extendedCourses = [...courses, ...courses, ...courses];

  return (
    <div className="w-full py-12 bg-gradient-to-b from-background to-muted/20">
      <Carousel
        className="w-full max-w-7xl mx-auto px-4"
        opts={{ align: "start", loop: true }}
        plugins={[plugin]}
      >
        <CarouselContent className="-ml-4">
          {extendedCourses.map((course, index) => (
            <CarouselItem
              key={`${course.courseId}-${index}`}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div
                className="group h-full bg-card rounded-xl overflow-hidden border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => router.push(`/study-abroad/${course.courseId}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={course.banner}
                    alt={course.title}
                    width={720}
                    height={480}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {course.skills.slice(0, 3).map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-primary/10 hover:bg-primary/20 text-primary"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 3 && (
                      <Badge variant="secondary">
                        +{course.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="mt-auto flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{course.coordinator}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary transform translate-x-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showArrows && (
          <>
            <CarouselPrevious className="hidden md:flex -left-4 hover:bg-background" />
            <CarouselNext className="hidden md:flex -right-4 hover:bg-background" />
          </>
        )}
      </Carousel>
    </div>
  );
}
