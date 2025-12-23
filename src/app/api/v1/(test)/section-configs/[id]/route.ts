'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { SectionConfigUpdateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin, checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;

    try {

        const { id: sectionConfigId } = await params;

        const sectionConfig = await db.sectionConfig.findUnique({
            where: {
                id: sectionConfigId
            }
        });

        if (!sectionConfig) {
            return errorResponse("SectionConfig not found", 404);
        }

        return successResponse(sectionConfig, "SectionConfig fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}
export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;


    try {

        const { id: sectionConfigId } = await params;
        const body = await req.json();
        const validation = SectionConfigUpdateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        const existingSectionConfig = await db.sectionConfig.findUnique({
            where: {
                id: sectionConfigId
            }
        });

        if (!existingSectionConfig) {
            return errorResponse("SectionConfig not found", 404);
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


        const sectionConfig = await db.sectionConfig.update({
            where: {
                id: sectionConfigId
            },
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


        return successResponse(sectionConfig, "SectionConfig updated successfully", 200);



    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;


    try {

        const { id: sectionConfigId } = await params;

        const sectionConfig = await db.sectionConfig.findUnique({
            where: {
                id: sectionConfigId
            }
        });

        if (!sectionConfig) {
            return errorResponse("SectionConfig not found", 404);
        }

        await db.sectionConfig.delete({
            where: {
                id: sectionConfigId
            }
        });

        return successResponse({}, "SectionConfig deleted successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
} 