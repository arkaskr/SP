'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

      const authResponse = await checkAuthUser();
      if(authResponse) return authResponse;

    try {

        const { id: subjectId } = await params;


        const exisitingSubject = await db.subject.findUnique({
            where: {
                id: subjectId
            }
        })

        if (!exisitingSubject) {
            return errorResponse("Subject not found", 404);
        }

        const chapters = await db.chapter.findMany({
            where: {
                subjectId: subjectId
            }
        });

        return successResponse(chapters, "Subject fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}