'use server';


import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { ChapterUpdateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin, checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";


export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;    


    try {

        const { id: chapterId } = await params;

        console.log(chapterId);

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId
            }
        })

        if (!chapter) {
            return errorResponse("Chapter not found", 404);
        }

        return successResponse(chapter, "Chapter fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;


    try {

        const { id: chapterId } = await params;
        const body = await req.json();
        const validation = ChapterUpdateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        const { name, description, subjectId } = validation.data;

        const exisitingChapter = await db.chapter.findUnique({
            where: {
                id: chapterId
            }
        })

        if (!exisitingChapter) {
            return errorResponse("Chapter not found", 404);
        }

        const exisitingSubject = await db.subject.findUnique({
            where: {
                id: subjectId
            }
        });

        if (!exisitingSubject) {
            return errorResponse("Subject not found", 404);
        }

        const updatedChapter = await db.chapter.update({
            where: {
                id: chapterId
            },
            data: {
                name,
                description,
                subjectId
            }
        });

        return successResponse(updatedChapter, "Chapter updated successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;    


    try {

        const { id: chapterId } = await params;

        const exisitingChapter = await db.chapter.findUnique({
            where: {
                id: chapterId
            }
        })

        if (!exisitingChapter) {
            return errorResponse("Chapter not found", 404);
        }

        await db.chapter.delete({
            where: {
                id: chapterId
            }
        })

        return successResponse({}, "Chapter deleted successfully", 200);


    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}