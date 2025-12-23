import QuizApp from "@/components/QuizApp/QuizApp";
import { Suspense } from "react";

export default function ExamWrapper() {
  return (
    <Suspense fallback={<div>Loading Exam...</div>}>
      <QuizApp />
    </Suspense>
  );
}
