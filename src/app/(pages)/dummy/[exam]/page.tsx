"use client";

import React, { useState, JSX, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Book,
  FileText,
  Brain,
  PenTool,
  School,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Clock,
  Target,
  Award,
} from "lucide-react";
import examSubs from "@/tempdata/examSubs.json";
import Link from "next/link";
import Loading from "@/components/Loading";
import { Badge } from "@/components/ui/badge";

// Define types for sections and subjects
type SectionKey = "practice" | "mock";

type Chapter = {
  name: string;
  chapters: string[];
};

type Section = {
  subjects: Chapter[];
};

interface FetchedExam {
  id: string;
  title: string;
  totalDurationInSeconds: number;
  totalMarks: number;
  totalQuestions: number;
  subjects: {
    name: string;
    chapters: {
      name: string;
    }[];
  }[];
}

export default function ExamPage() {
  const { exam } = useParams<{ exam: string }>();

  // Validate exam parameter
  if (!exam || !examSubs[exam as keyof typeof examSubs]) {
    notFound(); // Redirect to 404 page
  }

  const sections: Record<SectionKey, Section> = examSubs[exam as keyof typeof examSubs].tests;
  const details: Record<string, string | string[]> = examSubs[exam as keyof typeof examSubs].details;

  const [pyqs, setPyqs] = useState<FetchedExam[]>([]);
  const [quiz, setQuiz] = useState<FetchedExam[]>([]);
  const [brainstorm, setBrainstorm] = useState<FetchedExam[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      const [pyqRes, quizRes, brainstormRes] = await Promise.all([
        fetch(`/api/v1/exams?category=${exam}&type=PYQ`),
        fetch(`/api/v1/exams?category=${exam}&type=QUIZ`),
        fetch(`/api/v1/exams?category=${exam}&type=BRAINSTORM`),
      ]);
      const [pyqData, quizData, brainstormData] = await Promise.all([
        pyqRes.json(),
        quizRes.json(),
        brainstormRes.json(),
      ]);
      setPyqs(pyqData.data || []);
      setQuiz(quizData.data || []);
      setBrainstorm(brainstormData.data || []);
      setLoading(false);
    };

    fetchExams();
  }, [exam]);

  return (
    <div className="mx-auto p-6 space-y-6 relative">
      {/* Video as background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/images/examprepbackground.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 bg-white dark:bg-black opacity-20 mt-0" />

      {/* Main content */}
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Exam Prep
          </h1>
          <p className="text-xl text-white/90">
            Your gateway to success in competitive examinations
          </p>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-8"
            style={{ textTransform: "uppercase" }}
          >
            {decodeURIComponent(exam)} Preparation
          </h1>
        </div>
        <Tabs defaultValue="practice" className="w-full bg-white/05 rounded-xl">
          <TabsList className="grid w-full grid-cols-5 bg-white/50">
            {Object.keys(sections).map((key) => (
              <TabsTrigger key={key} value={key} className="text-gray-50">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </TabsTrigger>
            ))}
            <TabsTrigger value="pyq" className="text-gray-50">
              PYQ
            </TabsTrigger>
            <TabsTrigger value="quiz" className="text-gray-50">
              QUIZ
            </TabsTrigger>
            <TabsTrigger value="brainstorm" className="text-gray-50">
              BRAINSTORM
            </TabsTrigger>
          </TabsList>
          {Object.entries(sections).map(([key, section]) => (
            <TabsContent key={key} value={key} className="mt-6 rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {section.subjects.map((subject) => (
                  <Card key={subject.name} className="rounded-xl">
                    <CardHeader className="bg-primary/10 overflow-hidden rounded-t-xl">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <PenTool className="w-4 h-4" />
                        {subject.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 overflow-auto">
                      <ScrollArea
                        className={`w-full rounded-md pr-3 ${
                          subject.chapters.length > 8 ? "h-96" : "h-auto"
                        }`}
                      >
                        {subject.chapters.map((chapter, idx) => (
                          <Button
                            key={idx}
                            variant="drop"
                            className="w-full justify-between mb-2"
                          >
                            <h4 className="overflow-hidden">{chapter}</h4>
                          </Button>
                        ))}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
          <TabsContent value="pyq" className="mt-6 rounded-xl">
            <Card className="rounded-xl">
              <CardHeader className="bg-primary/10 overflow-hidden rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Book className="w-4 h-4" />
                  Previous Year Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 overflow-auto">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pyqs.map((test, idx) => (
                      <Card
                        key={test.id}
                        className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary bg-muted flex flex-col justify-around"
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="flex justify-between items-center">
                            <span className="text-xl font-bold">
                              {test.title}
                            </span>
                            <Badge>{exam}</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-around">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <BookOpen className="h-5 w-5 text-blue-500" />
                                <span>{test.subjects[0].name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-5 w-5 text-green-500" />
                                <span>
                                  {test.totalDurationInSeconds / 60} mins
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <Target className="h-5 w-5 text-purple-500" />
                                <span>Questions: {test.totalQuestions}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Award className="h-5 w-5 text-yellow-500" />
                                <span>Max Marks: {test.totalMarks}</span>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-white">
                              <p className="text-sm font-medium mb-1">
                                Topics:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {test.subjects.map((subject) =>
                                  subject.chapters.map((chapter, index) => (
                                    <Badge
                                      key={`${chapter.name}-${index}`}
                                      className="text-xs"
                                    >
                                      {chapter.name}
                                    </Badge>
                                  ))
                                )}
                              </div>
                            </div>
                            <Link href={`/exam?examId=${test.id}`}>
                              <Button className="w-full mt-2">
                                Start Test
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="quiz" className="mt-6 rounded-xl">
            <Card className="rounded-xl">
              <CardHeader className="bg-primary/10 overflow-hidden rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="w-4 h-4" />
                  Quiz
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 overflow-auto">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quiz.map((test, idx) => (
                      <Card
                        key={test.id}
                        className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary bg-muted flex flex-col justify-around"
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="flex justify-between items-center">
                            <span className="text-xl font-bold">
                              {test.title}
                            </span>
                            <Badge>{exam}</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-around">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <BookOpen className="h-5 w-5 text-blue-500" />
                                <span>{test.subjects[0].name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-5 w-5 text-green-500" />
                                <span>
                                  {test.totalDurationInSeconds / 60} mins
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <Target className="h-5 w-5 text-purple-500" />
                                <span>Questions: {test.totalQuestions}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Award className="h-5 w-5 text-yellow-500" />
                                <span>Max Marks: {test.totalMarks}</span>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-white">
                              <p className="text-sm font-medium mb-1">
                                Topics:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {test.subjects.map((subject) =>
                                  subject.chapters.map((chapter, index) => (
                                    <Badge
                                      key={`${chapter.name}-${index}`}
                                      className="text-xs"
                                    >
                                      {chapter.name}
                                    </Badge>
                                  ))
                                )}
                              </div>
                            </div>
                            <Link href={`/exam?examId=${test.id}`}>
                              <Button className="w-full mt-2">
                                Start Test
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="brainstorm" className="mt-6 rounded-xl">
            <Card className="rounded-xl">
              <CardHeader className="bg-primary/10 overflow-hidden rounded-t-xl">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Brain className="w-4 h-4" />
                  Brainstorm
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 overflow-auto">
                {loading ? (
                  <Loading />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {brainstorm.map((test, idx) => (
                      <Card
                        key={test.id}
                        className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary bg-muted flex flex-col justify-around"
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="flex justify-between items-center">
                            <span className="text-xl font-bold">
                              {test.title}
                            </span>
                            <Badge>{exam}</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-around">
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <BookOpen className="h-5 w-5 text-blue-500" />
                                <span>{test.subjects[0].name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Clock className="h-5 w-5 text-green-500" />
                                <span>
                                  {test.totalDurationInSeconds / 60} mins
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <Target className="h-5 w-5 text-purple-500" />
                                <span>Questions: {test.totalQuestions}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Award className="h-5 w-5 text-yellow-500" />
                                <span>Max Marks: {test.totalMarks}</span>
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-white">
                              <p className="text-sm font-medium mb-1">
                                Topics:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {test.subjects.map((subject) =>
                                  subject.chapters.map((chapter, index) => (
                                    <Badge
                                      key={`${chapter.name}-${index}`}
                                      className="text-xs"
                                    >
                                      {chapter.name}
                                    </Badge>
                                  ))
                                )}
                              </div>
                            </div>
                            <Link href={`/exam?examId=${test.id}`}>
                              <Button className="w-full mt-2">
                                Start Test
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Exam Information Card */}
        <Card className="mt-8 bg-white/50 rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              {details.name} Exam Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="eligibility">
              <TabsList className="w-full lg:w-1/2 bg-white/50">
                <TabsTrigger className="w-full" value="eligibility">
                  Eligibility
                </TabsTrigger>
                <TabsTrigger className="w-full" value="related">
                  Related Exams
                </TabsTrigger>
              </TabsList>
              <TabsContent value="eligibility">
                <ScrollArea className="h-64 p-2">
                  <h4 className="text-lg font-semibold">
                    General Eligibility Criteria
                  </h4>
                  <div className="flex flex-col gap-2">
                    {Array.isArray(details.eligibility) ? (
                      details.eligibility.map((item, idx) => (
                        <div className="flex flex-row items-center" key={idx}>
                          <ChevronRight className="w-4 h-4 font-extrabold" />
                          <p className="text-justify">{item}</p>
                        </div>
                      ))
                    ) : (
                      <p>{details.eligibility}</p>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="related">
                <ScrollArea className="h-64 p-2">
                  <h4 className="text-lg font-semibold">Related Exams</h4>
                  {details.relatedExams && details.relatedExams.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {Array.isArray(details.relatedExams) ? (
                        details.relatedExams.map((exam, idx) => (
                          <Button key={idx} className="whitespace-pre-line">
                            {exam}
                          </Button>
                        ))
                      ) : (
                        <p>{details.relatedExams}</p>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}