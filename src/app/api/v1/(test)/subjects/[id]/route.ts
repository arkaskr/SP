'use server';


import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { SubjectUpdateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin, checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";


export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {


      const authResponse = await checkAuthUser();
      if(authResponse) return authResponse;

    try {

        const { id: subjectId } = await params;


        const subject = await db.subject.findUnique({
            where: {
                id: subjectId
            }
        })

        if (!subject) {
            return errorResponse("Subject not found", 404);
        }

        return successResponse(subject, "Subject fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }

}

export const PATCH = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {

        const { id: subjectId } = await params;
        const body = await req.json();

        // validation

        const validation = SubjectUpdateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        // db search and update

        const { name, description } = validation.data;

        const exisitingSubject = await db.subject.findUnique({
            where: {
                id: subjectId
            }
        })

        if (!exisitingSubject) {
            return errorResponse("Subject not found", 404);
        }

        const updatedSubject = await db.subject.update({
            where: {
                id: subjectId
            },
            data: {
                name,
                description
            }
        })
        return successResponse(updatedSubject, "Subject updated successfully", 200);


    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;


    try {
        const { id: subjectId } = await params;


        const exisitingSubject = await db.subject.findUnique({
            where: {
                id: subjectId
            }
        })

        if (!exisitingSubject) {
            return errorResponse("Subject not found", 404);
        }

        await db.subject.delete({
            where: {
                id: subjectId
            }
        })

        return successResponse({}, "Subject deleted successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}