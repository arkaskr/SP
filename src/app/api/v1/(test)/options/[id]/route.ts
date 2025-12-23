'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { OptionUpdateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin } from "@/lib/utils/auth-check-in-exam-api";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {
        const { id: optionId } = await params;

        const existingOption = await db.option.findUnique({
            where: {
                id: optionId
            }
        })

        if (!existingOption) {
            return errorResponse("Option not found", 404);
        }

        return successResponse(existingOption, "Option fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}
export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {
        const body = await req.json();
        const { id: optionId } = await params;

        const validation = OptionUpdateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }


        const {
            text,
            imageUrl,
            isCorrect,
            questionId
        } = validation.data;

        const existingOption = await db.option.findUnique({
            where: {
                id: optionId
            }
        })

        if (!existingOption) {
            return errorResponse("Option not found", 404);
        }

        // find exam 
        const existingQuestion = await db.question.findUnique({
            where: {
                id: questionId
            }
        });

        if (!existingQuestion) {
            return errorResponse("Question not found", 404);
        }

        const updatedOption = await db.option.update({
            where: {
                id: optionId
            },
            data: {
                text,
                imageUrl,
                isCorrect,
                questionId
            }
        })

        return successResponse(updatedOption, "Option updated successfully", 201);
    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;


    try {
        const { id: optionId } = await params;

        const existingOption = await db.option.findUnique({
            where: {
                id: optionId
            }
        })

        if (!existingOption) {
            return errorResponse("Option not found", 404);
        }

        await db.option.delete({
            where: {
                id: optionId
            }
        })

        return successResponse({}, "Option deleted successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}