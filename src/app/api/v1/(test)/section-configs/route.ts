'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { SectionConfigCreateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin } from "@/lib/utils/auth-check-in-exam-api";

export const POST = async (req: NextRequest) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;


    try {
        const body = await req.json();
        const validation = SectionConfigCreateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        const { name, description, examCategoryId, fullMarks, negativeMarks, zeroMarks, partialMarks } = validation.data;


        const existingExamCategory = await db.examCategory.findUnique({
            where: {
                id: examCategoryId
            }
        });

        if (!existingExamCategory) {
            return errorResponse("ExamCategory not found", 404);
        }

        const sectionConfig = await db.sectionConfig.create({
            data: {
                name,
                description,
                examCategoryId,
                fullMarks,
                negativeMarks,
                zeroMarks,
                partialMarks
            }
        });

        return successResponse(sectionConfig, "SectionConfig created successfully", 201);


    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}