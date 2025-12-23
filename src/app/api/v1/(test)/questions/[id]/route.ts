'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { QuestionUpdateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin } from "@/lib/utils/auth-check-in-exam-api";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {

        const { id: questionId } = await params;

        const existingQuestion = await db.question.findUnique({
            where: {
                id: questionId
            },
            include: {
                options: true,
                answerExplanationField: true
            }
        })

        if (!existingQuestion) {
            return errorResponse("Question not found", 404);
        }

        return successResponse(existingQuestion, "Question fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}
export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {

        const { id: questionId } = await params;
        const body = await req.json();

        const validation = QuestionUpdateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        const {
            text,
            imageUrl,
            difficultyLevel,
            examSectionId
        } = validation.data;

        const existingQuestion = await db.question.findUnique({
            where: {
                id: questionId
            },
        })

        if (!existingQuestion) {
            return errorResponse("Question not found", 404);
        }

        // find exam section
        const existingExamSection = await db.examSection.findUnique({
            where: {
                id: examSectionId
            }
        });

        if (!existingExamSection) {
            return errorResponse("Exam section not found", 404);
        }

        const question = await db.question.update({
            where: {
                id: questionId
            },
            data: {
                text,
                imageUrl,
                difficultyLevel,
                examSectionId
            }
        })

        return successResponse(question, "Question updated successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {

        const { id: questionId } = await params;

        const existingQuestion = await db.question.findUnique({
            where: {
                id: questionId
            },
        })

        if (!existingQuestion) {
            return errorResponse("Question not found", 404);
        }

        await db.question.delete({
            where: {
                id: questionId
            },
        })

        return successResponse({}, "Question deleted successfully", 200);


    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}