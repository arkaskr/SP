
import { db } from "@/lib/db"
import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";
import { NextRequest } from "next/server";

interface ReportQuery {
    examId : string;
    userId : string;
    userSubmissionId ?: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ examId: string, userId : string }> }) {
    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;


    try {

        const {userId , examId} = await params;
        
        const searchParams = request.nextUrl.searchParams;
        const userSubmissionId = searchParams.get("user-submission-id");
       
        const whereClause : ReportQuery = {
            examId,
            userId
        }

        if(userSubmissionId){
            whereClause.userSubmissionId = userSubmissionId;
        }

        const examAttempts = await db.examAttempt.findMany({
            where: whereClause
        });
        
        // Fetch reports for each attempt
        const existingReports = await Promise.all(
            examAttempts.map(async (attempt) => {
                const report = await db.analysisReport.findUnique({
                    where: {
                        examAttemptId: attempt.id
                    },
                    include: {
                        examAttempt: {
                            select: {
                                attemptedQuestions: true,
                                correctAnswers: true,
                                incorrectAnswers: true,
                                timeTaken: true
                            }
                        }
                    }
                });
                return { ...report };
            })
        );
        
        return successResponse(existingReports,'saved reports fetched successfully',200); 

    } catch (error) {
        console.error("Error generating report:", error);
        return errorResponse('Internal server error',500,error);
    }

}
