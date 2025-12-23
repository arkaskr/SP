'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { ExamCategoryUpdateValidationSchema } from "@/lib/utils/model-validation-schema";
import { transformExamCategoryResponse } from "@/lib/utils/utility_functions";
import { NextRequest } from "next/server";
import { checkAuthAdmin, checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;

    try {

        const { id: examCategoryId } = await params;

        const examCategoryDB = await db.examCategory.findUnique({
            where: {
                id: examCategoryId
            },
            include: {
                subjectToExamCategories: {
                    include: {
                        subject: true
                    }
                }
            }
        });

        const examCategory = transformExamCategoryResponse(examCategoryDB);

        if (!examCategory) {
            return errorResponse("examCategory not found", 404);
        }

        return successResponse(examCategory, "examCategory fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}


export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {

        const { id: examCategoryId } = await params;
        const body = await req.json();
        const validation = ExamCategoryUpdateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        const existingExamCategory = await db.examCategory.findUnique({
            where: {
                id: examCategoryId
            }
        });

        if (!existingExamCategory) {
            return errorResponse("examCategory not found", 404);
        }


        const { name, description, eligibility, cutoffs, examPattern, subjectIds } = validation.data;


        const exisitingExamCategory = await db.examCategory.findUnique({
            where: {
                id: examCategoryId
            }
        })

        if (!exisitingExamCategory) {
            return errorResponse("examCategory not found", 404);
        }

        if (subjectIds) {
            for (const subjectId of subjectIds) {
                const exisitingSubject = await db.subject.findUnique({
                    where: {
                        id: subjectId
                    }
                })
                if (!exisitingSubject) {
                    return errorResponse("subject not found", 404);
                }
            }
        }

        const updatedExamCategoryDB = await db.examCategory.update({
            where: {
                id: examCategoryId
            },
            data: {
                name,
                description,
                eligibility,
                cutoffs,
                examPattern,
                subjectToExamCategories: {
                    deleteMany: {},
                    create: subjectIds?.map(subjectId => ({
                        subject: {
                            connect: { id: subjectId }
                        }
                    }))
                }
            },
            include: {
                subjectToExamCategories: {
                    include: {
                        subject: true
                    }
                }
            }
        });

        const updatedExamCategory = transformExamCategoryResponse(updatedExamCategoryDB);

        return successResponse(updatedExamCategory, "examCategory updated successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;


    try {
        const { id: examCategoryId } = await params;

        const exisitingExamCategory = await db.examCategory.findUnique({
            where: {
                id: examCategoryId
            }
        })

        if (!exisitingExamCategory) {
            return errorResponse("examCategory not found", 404);
        }

        await db.examCategory.delete({
            where: {
                id: examCategoryId
            }
        })

        return successResponse({}, "examCategory deleted successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}

