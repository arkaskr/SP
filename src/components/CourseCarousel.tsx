"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import type { Course } from "@/type/course";
import { ChevronLeft, ChevronRight, Clock, Pause, Play } from "lucide-react";

interface CourseCarouselProps {
  courses?: Course[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
  showControls?: boolean;
}

// Define gradient presets based on your reference image
const gradientPresets = ["linear-gradient(135deg, #0a1128, #001f54, #034078)"];

export default function CourseCarousel({
  courses: propCourses,
  autoScroll = true,
  autoScrollInterval = 5000,
  showControls = true,
}: CourseCarouselProps) {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>(propCourses || []);
  const [userCourses, setUserCourses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(!propCourses);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(autoScroll);
  const [itemsPerView, setItemsPerView] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Get gradient for a course based on index
  const getCourseGradient = (index: number) => {
    return gradientPresets[index % gradientPresets.length];
  };

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(1);
      } else if (width < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);

    return () => {
      window.removeEventListener("resize", updateItemsPerView);
    };
  }, []);

  // Fetch courses if not provided via props
  useEffect(() => {
    if (propCourses) return;

    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/v1/courses");

        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data.data)) {
          setCourses(data.data);
        } else {
          console.warn("Received non-array data");
          setCourses([]);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
        setError("Failed to fetch courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [propCourses]);

  // Fetch user enrolled courses
  useEffect(() => {
    async function fetchUserCourses() {
      try {
        const userid = session?.user?.id;
        if (!userid) return;

        const response = await fetch(`/api/v1/courses/users/${userid}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch user courses: ${response.status}`);
        }

        const data = await response.json();
        if (Array.isArray(data.data)) {
          setUserCourses(data.data.map((course: Course) => course.id));
        } else {
          setUserCourses([]);
        }
      } catch (error) {
        console.error("Error fetching user courses:", error);
        setUserCourses([]);
      }
    }

    fetchUserCourses();
  }, [session?.user?.id]);

  // Calculate the number of slides
  const totalSlides = Math.ceil(courses.length / itemsPerView);
  const canGoNext = currentIndex < totalSlides - 1;
  const canGoPrev = currentIndex > 0;

  // Slide navigation functions
  const nextSlide = useCallback(() => {
    if (canGoNext) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  }, [canGoNext]);

  const prevSlide = useCallback(() => {
    if (canGoPrev) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(totalSlides - 1);
    }
  }, [canGoPrev, totalSlides]);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentIndex(index);
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (
      !isAutoScrolling ||
      courses.length <= itemsPerView ||
      totalSlides <= 1
    ) {
      return;
    }

    const startAutoScroll = () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }

      autoScrollTimerRef.current = setTimeout(() => {
        nextSlide();
      }, autoScrollInterval);
    };

    startAutoScroll();

    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
    };
  }, [
    isAutoScrolling,
    currentIndex,
    courses.length,
    autoScrollInterval,
    itemsPerView,
    totalSlides,
    nextSlide,
  ]);

  // Handle mouse/touch events
  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoScroll) {
      setIsAutoScrolling(true);
    }
  };

  // Calculate visible courses with proper slicing
  const getVisibleCourses = () => {
    const start = currentIndex * itemsPerView;
    const end = start + itemsPerView;
    return courses.slice(start, end);
  };

  // Touch swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Add shine animation keyframes
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes shine {
        0%, 100% { transform: translateX(-100%); }
        50% { transform: translateX(100%); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Loading state
  if (isLoading && courses.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (courses.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No courses available.</p>
      </div>
    );
  }

  // Fix: Handle cases where totalSlides might be 0
  const safeTotalSlides = Math.max(1, totalSlides);
  const safeCurrentIndex = currentIndex >= safeTotalSlides ? 0 : currentIndex;

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="relative overflow-visible"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Sliding container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${safeCurrentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="w-full flex-shrink-0 px-3"
              style={{
                width: `${100 / itemsPerView}%`,
                minWidth: `${100 / itemsPerView}%`,
              }}
            >
              <div
                className={`relative bg-white rounded-2xl overflow-hidden shadow-lg
                transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl 
                border border-gray-200/50 h-full flex flex-col min-h-[200px]
                group hover:border-blue-300`}
              >
                {/* Premium badge with ribbon effect */}
                <div
                  className={`absolute top-2 right-0 z-20
    ${
      course.price > 0
        ? "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-gray-900"
        : "bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 text-white"
    }
    text-[11px] font-bold py-[6px] px-14 shadow-lg transform rotate-45
    translate-x-[40px] translate-y-[18px]
    border-l border-r border-white/20`}
                >
                  {course.price > 0 ? "PREMIUM" : "COMING SOON"}
                </div>

                {/* Card content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Gradient Header */}
                  <div
                    className={`relative text-white overflow-hidden flex flex-col justify-center
    ${course.price === 0 ? "flex-1 items-center text-center px-6" : "px-6 py-10"}
  `}
                    style={{
                      background: getCourseGradient(index),
                      minHeight: course.price === 0 ? "100%" : "190px",
                    }}
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/10" />

                    {/* Shine effect */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      style={{ animation: "shine 3s ease-in-out infinite" }}
                    />

                    <div className="relative z-10">
                      <h3
                        className={`font-bold leading-tight mb-3
      ${
        course.price === 0
          ? "text-3xl md:text-4xl"
          : "text-2xl md:text-3xl line-clamp-2"
      }
    `}
                      >
                        {course.title}
                      </h3>

                      <p
                        className={`text-white/90 font-medium uppercase tracking-wider
      ${course.price === 0 ? "text-lg md:text-xl" : "text-base"}
    `}
                      >
                        {course.subtitle || "Mock Paper"}
                      </p>
                    </div>
                  </div>

                  {/* Price section - Reduced height */}
                  <div
                    className={`${course.price > 0 ? "p-5" : "p-6"} flex-shrink-0`}
                  >
                    {course.price > 0 ? (
                      <>
                        <div className="flex items-end justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-2xl font-bold text-gray-900">
                                ₹
                                {Math.max(
                                  0,
                                  course.price - (course.discount || 0),
                                )}
                              </span>
                              {course.discount && course.discount > 0 && (
                                <>
                                  <span className="text-sm text-gray-400 line-through">
                                    ₹{course.price}
                                  </span>
                                  <span className="text-xs font-semibold bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                    Save ₹{course.discount}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {userCourses.includes(course.id) ? (
                          <Link
                            href={`/courses/${course.id}`}
                            className="block"
                          >
                            <Button
                              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 
                              hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold 
                              py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Continue Learning
                            </Button>
                          </Link>
                        ) : (
                          <Link
                            href={`/checkout?courseId=${course.id}`}
                            className="block"
                          >
                            <Button
                              className="w-full bg-gradient-to-r from-[#001f54] to-[#034078] 
            hover:from-[#001a46] hover:to-[#023a6e] text-white font-semibold 
            py-3 rounded-xl transition-all duration-300 hover:shadow-lg 
            hover:scale-[1.02]"
                            >
                              Enroll Now
                            </Button>
                          </Link>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile touch indicators */}
        {safeTotalSlides > 1 && (
          <div className="flex md:hidden justify-center mt-6">
            <div className="text-xs text-gray-600 flex items-center gap-2">
              <span>← Swipe →</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {showControls && safeTotalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute -left-1 md:left-4 top-1/2 -translate-y-1/2 
            bg-white/90 hover:bg-white rounded-full p-3 shadow-xl hover:shadow-2xl 
            transition-all z-10 disabled:opacity-50 disabled:cursor-not-allowed
            border border-gray-200"
            aria-label="Previous slide"
            disabled={!canGoPrev}
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-2 md:right-4 top-1/2 -translate-y-1/2 
            bg-white/90 hover:bg-white rounded-full p-3 shadow-xl hover:shadow-2xl 
            transition-all z-10 disabled:opacity-50 disabled:cursor-not-allowed
            border border-gray-200"
            aria-label="Next slide"
            disabled={!canGoNext}
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-gray-700" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {safeTotalSlides > 1 && (
        <div className="flex justify-center mt-8 space-x-3 my-4">
          {Array.from({ length: safeTotalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === safeCurrentIndex
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 w-8 md:w-10 h-3"
                  : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
