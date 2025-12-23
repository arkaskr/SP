
'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;

    try {

        const { id: examId } = await params;
        // const result : string[] = ["user1","user2","user3"];

        const result = await db.examAttempt.findMany({
            where: {
                examId
            },
            orderBy: {
                rank: 'asc'
            },
            select: {
                rank: true,
                score: true,
                user: {
                    select: {
                        name: true
                    }
                }
            }

        }
        );


        return successResponse(result, "Leaderboard fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}