'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { ChapterCreateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin } from "@/lib/utils/auth-check-in-exam-api";


export const POST = async (req: NextRequest) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {

        const body = await req.json();
        const validation = ChapterCreateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        const { name, description, subjectId } = validation.data;

        const exisitingSubject = await db.subject.findUnique({
            where: {
                id: subjectId
            }
        });

        if (!exisitingSubject) {
            return errorResponse("Subject not found", 404);
        }


        const newChapter = await db.chapter.create({
            data: {
                name,
                description,
                subjectId
            }
        });

        return successResponse(newChapter, "Chapter created successfully", 201);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}