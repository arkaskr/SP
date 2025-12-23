"use server";
import { db } from "@/lib/db"
import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;

  try {


    const {userId} = await params;

    const examAttempts = await db.examAttempt.findMany({
        where : {
            userId
        }
    })

    const totalAttempts = examAttempts.length;
    // const totalScore = examAttempts.reduce((sum : number,attempt) => sum + attempt.score,0);
    // const totalAttemptedQuestions = examAttempts.reduce((sum : number,attempt) => sum + attempt.attemptedQuestions,0);
    // const totalAccuracy = examAttempts.reduce((sum : number,attempt) => sum + attempt.accuracy,0);
    const total = examAttempts.reduce((sum : number[],attempt) =>
       [sum[0] + attempt.score,sum[1] + attempt.attemptedQuestions,sum[2] + attempt.accuracy],[0,0,0]);

    // total time spent across all attempts (timeTaken stored in seconds)
    const totalTimeSeconds = examAttempts.reduce((s, a) => s + (a.timeTaken || 0), 0);
    const studyHours = +(totalTimeSeconds / 3600).toFixed(1); // rounded to 1 decimal place

    const result = totalAttempts
    ? { 
      totalAttempts : totalAttempts,
      avg_score: total[0] / totalAttempts,
      avg_attempted_questions: total[1] / totalAttempts,
      avg_accuracy: total[2] / totalAttempts,
      totalTimeSeconds,
      studyHours,
      }
    : { totalAttempts : 0 ,avg_score: 0, avg_attempted_questions: 0, avg_accuracy: 0, totalTimeSeconds: 0, studyHours: 0 };
    


    return successResponse(result,"user submission avg fetched successfully");
  } catch (error) {
    return errorResponse("Internal Server error",500,error);
  }
}

/*
 * avg score, avg attempted question,avg accuracy ; total attempt (mock/pyq/practice)
 * 
 * 
 */