'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;


    try {

        const { id: examCategoryId } = await params;

        const existingExamCategory = await db.examCategory.findUnique({
            where: {
                id: examCategoryId
            }
        });

        if (!existingExamCategory) {
            return errorResponse("examCategory not found", 404);
        }

        const sectionConfigs = await db.sectionConfig.findMany({
            where: {
                examCategoryId
            }
        });

        return successResponse(sectionConfigs, "All SectionConfigs fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}