"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BookOpenIcon,
  StarIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface Course {
  courseId: string;
  banner: string;
  title: string;
  summary: string;
  skills: string[];
  objective: string;
  outcome: string;
  coordinator: string;
  duration: string;
  startDate: string;
  level: string;
  // prerequisites: string[];
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatarUrl: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    name: "Alice",
    rating: 5,
    comment: "Excellent course! Learned a lot.",
    avatarUrl: "/assets/images/unsplash1.jpg"
  },
  {
    id: 2,
    name: "Bob",
    rating: 4,
    comment: "Very informative, but could use more practical examples.",
    avatarUrl: "/assets/images/unsplash2.jpg"
  },
  {
    id: 3,
    name: "Charlie",
    rating: 5,
    comment: "The instructor was fantastic. Highly recommended!",
    avatarUrl: "/assets/images/unsplash3.jpg"
  },
];

const FixedComponent = () => {
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const footer = document.querySelector(".footer");
    if (footer) {
      setFooterHeight(footer.clientHeight);
    }
  }, []);
}
export default function CourseDetailsPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        setLoading(true);
        // console.log("Fetching course details for ID:", id);
        const response = await fetch(`/api/study-abroad/${id}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch course details");
        }

        const data = await response.json();
        if (data.courseId) {
          setCourse(data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    getCourseDetails();
  }, [id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!course) {
    return <ErrorDisplay message="No course details available." />;
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!course) {
    return <ErrorDisplay message="No course details available." />;
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={course.banner || "/placeholder.jpg"}
          alt={course.title}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-14">
              {course.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="relative flex lg:flex-row flex-col">
        <main className="px-10 py-8 lg:w-[75%] w-full">
          <div className="gap-8">
            {/* Main content column */}
            <div className="md:col-span-2 space-y-8">
              <Section title="About the Course">
                <p className="text-muted-foreground">{course.summary}</p>
              </Section>
              <Section title="Course Overview">
                <p className="text-muted-foreground">{course.objective}</p>
              </Section>

              <Section title="What You'll Learn">
                <p className="text-muted-foreground mb-4">{course.outcome}</p>
              </Section>

              <Section title="Prerequisites">
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <Badge key={index}>{skill}</Badge>
                  ))}
                </div>
              </Section>

              <Section title="Course Coordinator">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <UserIcon className="w-8 h-8 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {course.coordinator}
                    </h3>
                    <p className="text-muted-foreground">Course Coordinator</p>
                  </div>
                </div>
              </Section>
            </div>
          </div>

          <Separator className="my-20 bg-current" />

          <Section title="Student Reviews">
      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={review.avatarUrl} alt={review.name} />
                </Avatar>
                {review.name}
                <span className="ml-auto text-yellow-400 flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 fill-current" />
                  ))}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
        </main>

        {/* Fixed sidebar */}
        <div className="sticky bottom-5 h-min overflow-y-auto px-6 py-8 lg:w-[25%] w-full z-10 lg:hidden">
          <MobileSidebar course={course} />
        </div>
        <div className="sticky top-10 h-min overflow-y-auto px-6 py-8 lg:w-[25%] w-full z-10 lg:block hidden">
          <div className="bg-background p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Course Information
            </h2>
            <ul className="space-y-4">
              <InfoItem
                icon={<ClockIcon />}
                label="Duration"
                value={course.duration}
              />
              <InfoItem
                icon={<CalendarIcon />}
                label="Start Date"
                value={course.startDate}
              />
            </ul>
            <Button className="w-full mt-6">Enroll Now</Button>
          </div>

          <div className="mt-6 space-y-4 overflow-y-auto">
            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Previous Year Questions
              </h3>
              <p className="text-sm text-foreground/80">
                Access to past exam questions to help you prepare effectively.
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Study Materials
              </h3>
              <p className="text-sm text-foreground/80">
                Comprehensive study materials and resources to support your
                learning.
              </p>
            </div>
            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Discussion Forum
              </h3>
              <p className="text-sm text-foreground/80">
                Engage with peers and instructors in our active discussion
                forum.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      {children}
    </section>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center">
      <div className="mr-4 text-muted-foreground">{icon}</div>
      <div>
        <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
        <dd className="text-sm text-foreground">{value}</dd>
      </div>
    </div>
  );
}

function InfoBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Skeleton className="w-full h-[300px] md:h-[400px]" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-8 w-1/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
          <div>
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorDisplay({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}

function MobileSidebar({ course }: { course: Course }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full">Enroll Course</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold text-foreground">
              Course Information
            </DrawerTitle>
          </DrawerHeader>
          <div className="bg-background p-2">
            <ul className="space-y-4">
              <InfoItem
                icon={<ClockIcon />}
                label="Duration"
                value={course.duration}
              />
              <InfoItem
                icon={<CalendarIcon />}
                label="Start Date"
                value={course.startDate}
              />
            </ul>
          </div>
          <Separator className="my-4 bg-current" />

          <div className="mt-3 space-y-2 overflow-y-auto">
            <div className="bg-background rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Previous Year Questions
              </h3>
              <p className="text-sm text-foreground">
                Access to past exam questions to help you prepare effectively.
              </p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Study Materials
              </h3>
              <p className="text-sm text-foreground">
                Comprehensive study materials and resources to support your
                learning.
              </p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Discussion Forum
              </h3>
              <p className="text-sm text-foreground">
                Engage with peers and instructors in our active discussion
                forum.
              </p>
            </div>
          </div>

          <DrawerFooter>
            <Button>Enroll Now</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
