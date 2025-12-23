"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  TrendingUp,
  Target,
  Award,
  Clock,
  ChevronRight,
  BookOpen,
  Trophy,
  BarChart as BarChartIcon,
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertTriangle,
} from "lucide-react";
import { useSession } from "next-auth/react";

// Types
interface ExamAttempt {
  id: string;
  userId: string;
  examId: string;
  createdAt: string;
  updatedAt: string;
  exam: {
    id: string;
    title: string;
  };
}

interface OverallPerformance {
  rank: number;
  score: number;
  accuracy: number;
  percentile: number;
}

interface TopicPerformance {
  topic: string;
  accuracy: number;
}

interface DifficultyPerformance {
  difficulty: string;
  accuracy: number;
}

interface TimeManagement {
  totalTimeTaken: number;
  averageTimePerQuestion: number;
}

interface StrengthsAndWeaknesses {
  strengths: string[];
  weaknesses: string[];
}

interface ReportData {
  id: string;
  examAttemptId: string;
  overallPerformance: OverallPerformance;
  topicWisePerformance: TopicPerformance[];
  difficultyWisePerformance: DifficultyPerformance[];
  timeManagement: TimeManagement;
  strengthsAndWeaknesses: StrengthsAndWeaknesses;
  suggestedImprovements: string[];
  createdAt: string;
  updatedAt: string;
}

interface OverallStats {
  totalAttempts: number;
  avg_score: number;
  avg_attempted_questions: number;
  avg_accuracy: number;
}

interface StatItemProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

const TestAnalysisDashboard: React.FC = () => {
  const { data: session } = useSession();
  const [submissions, setSubmissions] = useState<ExamAttempt[]>([]);
  const [selectedSubmission, setSelectedSubmission] =
    useState<ExamAttempt | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [overallStats, setoverallStats] = useState<OverallStats>({
    totalAttempts: 0,
    avg_score: 0,
    avg_attempted_questions: 0,
    avg_accuracy: 0,
  });

  const fetchSubmissions = async (userId: string) => {
    try {
      const url = new URL("/api/v1/user-submissions", window.location.href);
      url.searchParams.set("user-id", userId);
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch submissions");
      const data = await response.json();
      setSubmissions(data.data || []);
    } catch (error) {
      console.log("Error fetching submissions:", error);
    }
  };

  const fetchOverallStats = async (userId: string) => {
    try {
      const response = await fetch(`/api/v1/reports/users/${userId}`);
      const data = await response.json();
      setoverallStats(data.data);
    } catch (error) {
      console.log("Error fetching average values:", error);
    }
  };

  useEffect(() => {
    const userId = session?.user?.id;
    if (userId) {
      fetchSubmissions(userId);
      fetchOverallStats(userId);
    }
  }, [session?.user?.id]);

  const fetchReportData = async (
    userSubmissionId: string,
    examId: string,
    userId: string
  ) => {
    setLoading(true);
    try {
      const url = new URL(
        `api/v1/reports/exams/${examId}/users/${userId}`,
        window.location.origin
      );
      url.searchParams.set("user-submission-id", userSubmissionId);
      const response = await fetch(url);
      // if (!response.ok) throw new Error("Failed to fetch report");
      const result = await response.json();
      setReportData(result.data[0]);
      // console.log("result:",result.data[0]);
    } catch (error) {
      console.log("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmissionClick = (submission: ExamAttempt) => {
    setSelectedSubmission(submission);
    fetchReportData(submission.id, submission.examId, submission.userId);
  };

  const COLORS = ["#10B981", "#EF4444", "#6366F1", "#F59E0B", "#8B5CF6"];

  const renderPerformanceDonut = () => {
    if (!reportData)
      return (
        <div className="h-64 flex items-center justify-center text-gray-500">
          Select a test to view details
        </div>
      );

    const performanceData = [
      {
        name: "Correct",
        value: reportData.overallPerformance.score,
        color: "#10B981",
      },
      {
        name: "Incorrect",
        value: reportData.overallPerformance.score *(1- reportData.overallPerformance.accuracy),
        color: "#EF4444",
      },
    ];

    return (
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={performanceData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {performanceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const renderTick = ({
    payload,
    x,
    y,
    cx,
    cy,
  }: {
    payload: { value: string };
    x: number;
    y: number;
    cx: number;
    cy: number;
  }) => {
        // Extract all initials from words
    const initials = payload.value
      .split(" ")
      .map((word) => word[0]?.toUpperCase()) // Get the first letter of each word
      .join(""); // Join them to form initials

    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        fontSize={15}
        fill="#000"
        // transform={`rotate(${angle}, ${x}, ${y})`} // Rotate based on position
      >
        {initials}
      </text>
    );
  };



  const renderTopicPerformance = () => {
    if (!reportData?.topicWisePerformance) return null;

    const topicData = reportData.topicWisePerformance.map((topic, index) => ({
      ...topic,
      color: COLORS[index % COLORS.length],
      fullMark: 100,
    }));

    return (
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topicData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="topic" tick={renderTick} />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fontSize: 10 }}
          />
          <Radar
            name="Accuracy"
            dataKey="accuracy"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip formatter={(value) => `${value}%`} />
        </RadarChart>
      </ResponsiveContainer>
    );
  };


  const renderDifficultyPerformance = () => {
    if (!reportData?.difficultyWisePerformance) return null;

    const difficultyData = reportData.difficultyWisePerformance.map(
      (item, index) => ({
        ...item,
        accuracy: parseFloat(item.accuracy.toFixed(2)),
        color: COLORS[index % COLORS.length],
      })
    );

    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={difficultyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="difficulty" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="accuracy" fill="#8884d8">
            {difficultyData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const StatItem: React.FC<StatItemProps> = ({ label, value, icon }) => (
    <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg flex items-center">
      <div className="mr-3">{icon}</div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-4 dark:from-indigo-950 dark:to-purple-900 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 sm:mb-0">
            <BarChartIcon className="mr-3 text-indigo-600" size={36} />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Test Performance Dashboard
            </h1>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="bg-background shadow-lg rounded-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Trophy className="mr-2 text-yellow-500" /> Overall Performance
            Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatItem
              label="Average Score"
              value={`${parseFloat(overallStats.avg_score.toFixed(2))}`}
              icon={<TrendingUp className="text-indigo-600" />}
            />
            <StatItem
              label="Total Tests"
              value={overallStats.totalAttempts}
              icon={<BarChartIcon className="text-blue-600" />}
            />
            <StatItem
              label="Avg. Attempted Questions"
              value={`${parseFloat(overallStats.avg_attempted_questions.toFixed(2))}`}
              icon={<Award className="text-green-600" />}
            />
            <StatItem
              label="Avg. Accuracy"
              value={`${parseFloat(overallStats.avg_accuracy.toFixed(2))*100}%`}
              icon={<Target className="text-purple-600" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="bg-background shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Target className="mr-2 text-indigo-600" /> Test Submissions
            </h2>

            {submissions.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No submissions found
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {submissions.map((sub, idx) => (
                  <button
                    key={sub.id}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedSubmission?.id === sub.id
                        ? "bg-indigo-500 text-white"
                        : "hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                    }`}
                    onClick={() => handleSubmissionClick(sub)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {idx + 1 + ". " + sub.exam.title}
                        </span>
                        <p className="text-xs opacity-70 flex items-center">
                          <Calendar size={12} className="mr-1" />{" "}
                          {new Date(sub.createdAt).toLocaleDateString()}:
                          {new Date(sub.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <ChevronRight size={20} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Report Display */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-background shadow-lg rounded-xl p-6 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                  <p>Loading report...</p>
                </div>
              </div>
            ) : reportData ? (
              <div className="space-y-6">
                {/* Overall Performance */}
                <div className="bg-background shadow-lg rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <TrendingUp className="mr-2 text-green-600" /> Performance
                    Overview
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>{renderPerformanceDonut()}</div>
                    <div className="grid grid-cols-2 gap-4 content-center">
                      {[
                        {
                          label: "Score",
                          value: `${reportData.overallPerformance.score}%`,
                          icon: (
                            <TrendingUp className="text-green-600" size={18} />
                          ),
                        },
                        {
                          label: "Accuracy",
                          value: `${reportData.overallPerformance.accuracy * 100}%`,
                          icon: <Target className="text-blue-600" size={18} />,
                        },
                        {
                          label: "Rank",
                          value: reportData.overallPerformance.rank,
                          icon: (
                            <Trophy className="text-yellow-600" size={18} />
                          ),
                        },
                        {
                          label: "Percentile",
                          value: `${reportData.overallPerformance.percentile.toPrecision(4)}%`,
                          icon: <Award className="text-purple-600" size={18} />,
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg"
                        >
                          <div className="flex items-center mb-1">
                            {item.icon}
                            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                              {item.label}
                            </span>
                          </div>
                          <p className="text-lg font-bold">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Topic & Difficulty Performance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-background shadow-lg rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <BookOpen className="mr-2 text-pink-600" /> Topic
                      Performance
                    </h3>
                    {renderTopicPerformance()}
                  </div>

                  <div className="bg-background shadow-lg rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <AlertTriangle className="mr-2 text-amber-600" />{" "}
                      Difficulty Performance
                    </h3>
                    {renderDifficultyPerformance()}
                  </div>
                </div>

                {/* Time Management & Improvements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-background shadow-lg rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Clock className="mr-2 text-blue-600" /> Time Management
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                        <span>Total Time Taken</span>
                        <span className="font-bold">
                          {reportData.timeManagement.totalTimeTaken} mins
                        </span>
                      </div>
                      <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                        <span>Avg. Time per Question</span>
                        <span className="font-bold">
                          {reportData.timeManagement.averageTimePerQuestion}{" "}
                          mins
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-background shadow-lg rounded-xl p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Award className="mr-2 text-purple-600" /> Strengths &
                      Improvements
                    </h3>

                    <div className="mb-3">
                      <div className="flex items-center mb-2">
                        <ArrowUpCircle
                          className="text-green-600 mr-2"
                          size={18}
                        />
                        <h4 className="font-semibold">Strengths</h4>
                      </div>
                      {reportData.strengthsAndWeaknesses.strengths.length ? (
                        <ul className="list-disc pl-6 space-y-1">
                          {reportData.strengthsAndWeaknesses.strengths.map(
                            (item, i) => (
                              <li
                                key={i}
                                className="text-green-700 dark:text-green-400"
                              >
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic pl-6">
                          Keep practicing to develop strengths
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center mb-2">
                        <ArrowDownCircle
                          className="text-red-600 mr-2"
                          size={18}
                        />
                        <h4 className="font-semibold">Areas to Improve</h4>
                      </div>
                      <ul className="list-disc pl-6 space-y-1">
                        {reportData.strengthsAndWeaknesses.weaknesses.map(
                          (item, i) => (
                            <li
                              key={i}
                              className="text-red-700 dark:text-red-400"
                            >
                              {item}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Suggested Improvements */}
                <div className="bg-background shadow-lg rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <Target className="mr-2 text-indigo-600" /> Suggested
                    Improvements
                  </h3>
                  <ul className="space-y-2">
                    {reportData.suggestedImprovements.map(
                      (suggestion, index) => (
                        <li
                          key={index}
                          className="flex items-start p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg"
                        >
                          <span className="mr-2 text-indigo-600">•</span>
                          <span>{suggestion}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="bg-background shadow-lg rounded-xl p-6 h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Target size={48} className="mx-auto mb-3 opacity-50" />
                  <p>Select a test to view detailed report</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAnalysisDashboard;
