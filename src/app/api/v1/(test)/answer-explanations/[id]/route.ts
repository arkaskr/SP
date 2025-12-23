'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { AnswerExplanationFieldUpdateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin, checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;


    try {
        const { id: answerExplanationId } = await params;

        const existingAnswerExplanation = await db.answerExplanationField.findUnique({
            where: {
                id: answerExplanationId
            }
        })

        if (!existingAnswerExplanation) {
            errorResponse("Answer explanation not found", 404);
        }

        return successResponse(existingAnswerExplanation, "Answer explanation fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}
export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;
    
    try {
        const body = await req.json();
        const { id: answerExplanationId } = await params;

        const validation = AnswerExplanationFieldUpdateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }


        const {
            text,
            value,
            explanation,
            questionId
        } = validation.data;

        const existingAnswerExplanation = await db.answerExplanationField.findUnique({
            where: {
                id: answerExplanationId
            }
        })

        if (!existingAnswerExplanation) {
            errorResponse("Answer explanation not found", 404);
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

        const updatedAnswerExplanation = await db.answerExplanationField.update({
            where: {
                id: answerExplanationId
            },
            data: {
                text,
                value,
                explanation,
                questionId
            }
        })

        return successResponse(updatedAnswerExplanation, "Answer explanation fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;


    try {
        const { id: answerExplanationId } = await params;

        const existingAnswerExplanation = await db.answerExplanationField.findUnique({
            where: {
                id: answerExplanationId
            }
        })

        if (!existingAnswerExplanation) {
            errorResponse("Answer explanation not found", 404);
        }

        await db.answerExplanationField.delete({
            where: {
                id: answerExplanationId
            }
        })

        return successResponse({}, "Answer explanation deleted successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}