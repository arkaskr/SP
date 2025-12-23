'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { ExamSectionUpdateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin, checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;    

    try {

        const { id: examSectionId } = await params;

        const existingExamSection = await db.examSection.findUnique({
            where: {
                id: examSectionId
            },
            include: {
                questions: {
                    include: {
                        options: true,
                        answerExplanationField: true
                    }
                }
            }
        })

        if (!existingExamSection) {
            return errorResponse("Exam section not found", 404);
        }

        return successResponse(existingExamSection, "Exam section fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}
export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;


    try {

        const { id: examSectionId } = await params;
        const body = await req.json();

        const validation = ExamSectionUpdateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        const {
            name,
            description,
            isAllQuestionsMandatory,
            numberOfQuestionsToAttempt,
            sectionConfigId,
            examId,
            subjectId
        } = body;

        const existingExamSection = await db.examSection.findUnique({
            where: {
                id: examSectionId
            }
        })

        if (!existingExamSection) {
            return errorResponse("Exam section not found", 404);
        }


        // find section config
        const existingSectionConfig = await db.sectionConfig.findUnique({
            where: {
                id: sectionConfigId
            }
        });

        if (!existingSectionConfig) {
            return errorResponse("Section config not found", 404);
        }

        // find exam 
        const existingExam = await db.exam.findUnique({
            where: {
                id: examId
            }
        });

        if (!existingExam) {
            return errorResponse("Exam not found", 404);
        }

        // find Subject
        const existingSubject = await db.subject.findUnique({
            where: {
                id: subjectId
            }
        })

        if (!existingSubject) {
            return errorResponse("Subject not found", 404);
        }


        const updatedExamSection = await db.examSection.update({
            where: {
                id: examSectionId
            },
            data: {
                name,
                description,
                isAllQuestionsMandatory,
                numberOfQuestionsToAttempt,
                sectionConfigId,
                examId,
                subjectId
            }
        })

        return successResponse(updatedExamSection, "Exam section updated successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}
export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {

        const { id: examSectionId } = await params;

        const existingExamSection = await db.examSection.findUnique({
            where: {
                id: examSectionId
            },
        })

        if (!existingExamSection) {
            return errorResponse("Exam section not found", 404);
        }

        await db.examSection.delete({
            where: {
                id: examSectionId
            }
        })

        return successResponse({}, "Exam section deleted successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}
