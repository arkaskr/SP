"use server";
import { db } from "@/lib/db"
import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";

export async function POST(request: Request, { params }: { params: Promise<{ examId: string }> }) {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;

  try {


    const {examId} = await params;

    const examAttempts = await db.examAttempt.findMany({
      where: { examId },
      orderBy: { score: "desc" },
    })

    const totalAttempts = examAttempts.length;
    const updatedAttempts = examAttempts.map((attempt, index) => ({
      id: attempt.id,
      percentile: ((totalAttempts - index) / totalAttempts) * 100,
      rank: index + 1,
    }))

    await db.$transaction(
      updatedAttempts.map((attempt) =>
        db.examAttempt.update({
          where: { id: attempt.id },
          data: { percentile: attempt.percentile, rank: attempt.rank },
        }),
      ),
    )

    await db.examStatistics.update({
      where: { examId },
      data: {
        totalAttempts,
        averageScore: examAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts,
        highestScore: examAttempts[0].score,
        lowestScore: examAttempts[totalAttempts - 1].score,
        medianScore: examAttempts[Math.floor(totalAttempts / 2)].score,
        standardDeviation: 0,
        topPerformers: JSON.stringify(examAttempts.slice(0, 10).map((a) => ({ id: a.userId, score: a.score }))),
      },
    })

    return successResponse({},"Rankings updated successfully");
  } catch (error) {
    console.error("Error updating rankings:", error);
    return errorResponse("Failed to update rankings",500);
  }
}
