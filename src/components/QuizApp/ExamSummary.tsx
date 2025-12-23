import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Exam, UserResponse } from "@/types/examTypes";

interface ExamSummaryProps {
  Exam: Exam;
  UserResponse: UserResponse;
  markedForReview: Set<string>;
  visitedQuestions: Set<string>;
  onSubmit: (ans: boolean) => void;
}

const ExamSummary: React.FC<ExamSummaryProps> = ({
  Exam,
  UserResponse,
  markedForReview,
  visitedQuestions,
  onSubmit,
}) => {
  const [summary, setSummary] = useState<{
    totalQuestions: number;
    answered: number;
    notAnswered: number;
    markedForReview: number;
    notVisited: number;
  }>({
    totalQuestions: 0,
    answered: 0,
    notAnswered: 0,
    markedForReview: 0,
    notVisited: 0,
  });

  useEffect(() => {
    const totalQuestions = Exam.examSections.reduce(
      (acc, section) => acc + section.questions.length,
      0
    );
    const answered = UserResponse.userAnswerPerQuestions.filter(
      (answer) =>
        (answer.value && answer.value !== "") ||
        (answer.chosenOptions && answer.chosenOptions.length > 0)
    ).length;
    const notAnswered = totalQuestions - answered;
    const markedForReviewCount = markedForReview.size;
    const notVisited = totalQuestions - visitedQuestions.size;

    setSummary({
      totalQuestions,
      answered,
      notAnswered,
      markedForReview: markedForReviewCount,
      notVisited,
    });
  }, [Exam, UserResponse, markedForReview, visitedQuestions]);

  const [submitting, setSubmitting] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exam Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-3 text-left">No of Questions</th>
                <th className="border p-3 text-left">Answered</th>
                <th className="border p-3 text-left">Not Answered</th>
                <th className="border p-3 text-left">Marked for Review</th>
                <th className="border p-3 text-left">Not Visited</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3">{summary.totalQuestions}</td>
                <td className="border p-3">{summary.answered}</td>
                <td className="border p-3">{summary.notAnswered}</td>
                <td className="border p-3">{summary.markedForReview}</td>
                <td className="border p-3">{summary.notVisited}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="lg" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit for Final Marking"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to submit for final marking?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  No changes will be allowed after submission.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => onSubmit(false)}>
                  NO
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => {onSubmit(true); setSubmitting(true)}}>
                  YES
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamSummary;
