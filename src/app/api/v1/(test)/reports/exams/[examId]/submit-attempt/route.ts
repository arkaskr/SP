"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client"
import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { SubmitAttemptInputValidationSchema } from "@/lib/utils/model-validation-schema";
import { checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";

export async function POST(request: Request, { params }: { params: Promise<{ examId: string }> }) {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;

    try {
        const { examId } = await params;
        const body = await request.json();
        
        const validation = SubmitAttemptInputValidationSchema.safeParse(body);
        
        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        const {userId,userSubmissionId, score, accuracy, attemptedQuestions, correctAnswers, incorrectAnswers, timeTaken} = validation.data;

        const existingExamAttempt = await db.examAttempt.findFirst({
            where : {
                userSubmissionId : userSubmissionId
            }
        })

        if(existingExamAttempt){
            return errorResponse("attempt already submitted",409);
        }

        const result = await db.$transaction(async (db) => {

            const examAttempt = await db.examAttempt.create({
                data: {
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    exam: {
                        connect: {
                            id: examId
                        }
                    },
                    userSubmission : {
                        connect : {
                            id : userSubmissionId
                        }
                    },
                    score: score,
                    accuracy: accuracy,
                    attemptedQuestions: attemptedQuestions,
                    correctAnswers: correctAnswers,
                    incorrectAnswers: incorrectAnswers,
                    timeTaken: timeTaken
                    
                },
                include: {
                    analysisReport: true
                }
            });


            const rankQuery = getRankQuery(examId);
            const rankedAttempts = await db.$queryRaw(rankQuery)

            const statsQuery = getStatsQuery(examId);
            await db.$executeRaw(statsQuery);

            return db.examAttempt.findUnique({
                where: { id: examAttempt.id },
                include: { analysisReport: true },
            });
        },
        {
            timeout : 30000
        });

    
        return successResponse(result,"attempt submitted successfully",200);
    } catch (error) {
        return errorResponse("Internal server error",500,error);
    }
}


function getRankQuery(examId : string) : Prisma.Sql {
    return Prisma.sql`
    WITH ranked_attempts AS (
    SELECT 
        id,
        score,
        RANK() OVER (ORDER BY score DESC) as rank,
        PERCENT_RANK() OVER (ORDER BY score DESC) as percentile
    FROM "ExamAttempt"
    WHERE "examId" = ${examId}
    )
    UPDATE "ExamAttempt" ea
    SET 
    rank = ra.rank,
    percentile = (1 - ra.percentile) * 100
    FROM ranked_attempts ra
    WHERE ea.id = ra.id
    RETURNING ea.id, ea.score, ea.rank, ea.percentile;
`
}

function getStatsQuery(examId : string) : Prisma.Sql {
    return Prisma.sql`
    WITH exam_stats AS (
    SELECT 
        COUNT(*) as total_attempts,
        AVG(score) as average_score,
        MAX(score) as highest_score,
        MIN(score) as lowest_score,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY score) as median_score,
        COALESCE(STDDEV(score), 0) as standard_deviation,
        AVG("timeTaken") as average_time_taken
    FROM "ExamAttempt"
    WHERE "examId" = ${examId}
    )
    INSERT INTO "ExamStatistics" (
    "id","examId", "totalAttempts", "averageScore", "highestScore", 
    "lowestScore", "medianScore", "standardDeviation", "averageTimeTaken", 
    "topPerformers", "createdAt", "updatedAt"
    )
    SELECT 
    gen_random_uuid(),
    ${examId}, total_attempts, average_score, highest_score, 
    lowest_score, median_score, standard_deviation, average_time_taken,
    (SELECT json_agg(row_to_json(top_performers))
    FROM (
        SELECT "userId", score
        FROM "ExamAttempt"
        WHERE "examId" = ${examId}
        ORDER BY score DESC
        LIMIT 10
    ) as top_performers),
    NOW(), NOW()
    FROM exam_stats
    ON CONFLICT ("examId") DO UPDATE
    SET 
    "totalAttempts" = EXCLUDED."totalAttempts",
    "averageScore" = EXCLUDED."averageScore",
    "highestScore" = EXCLUDED."highestScore",
    "lowestScore" = EXCLUDED."lowestScore",
    "medianScore" = EXCLUDED."medianScore",
    "standardDeviation" = EXCLUDED."standardDeviation",
    "averageTimeTaken" = EXCLUDED."averageTimeTaken",
    "topPerformers" = EXCLUDED."topPerformers",
    "updatedAt" = NOW()
    RETURNING *;
`;
}