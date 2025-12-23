'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { checkAuthAdmin, checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;

    try {

        const { id: userSubmissionId } = await params;

        const userSubmission = await db.userSubmission.findUnique({
            where: {
                id: userSubmissionId
            },
            include: {
                userAnswerPerQuestions: {
                    include: {
                        chosenOptions: true
                    }
                },
                exam : {
                    select : {
                        id : true,
                        title : true
                    }
                }
            }
        })

        if (!userSubmission) {
            return errorResponse("User submission not found", 404);
        }

        return successResponse(userSubmission, "User submission fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}





export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {

        const { id: userSubmissionId } = await params;

        const userSubmission = await db.userSubmission.findUnique({
            where: {
                id: userSubmissionId
            }
        })

        if (!userSubmission) {
            return errorResponse("User submission not found", 404);
        }

        await db.userSubmission.delete({
            where: {
                id: userSubmissionId
            }
        })

        return successResponse({}, "User submission deleted successfully", 200);
    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}