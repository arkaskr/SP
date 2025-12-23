'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { SubjectCreateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin, checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";



export const GET = async (req: NextRequest) => {
    try {

        const authResponse = await checkAuthUser();
        if(authResponse) return authResponse;

        const allSubjects = await db.subject.findMany();


        return successResponse(allSubjects, "All Subjects fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}

export const POST = async (req: NextRequest) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {

        const body = await req.json();
        const validation = SubjectCreateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        const { name, description } = validation.data;

        const newSubject = await db.subject.create({
            data: {
                name,
                description
            }
        });

        return successResponse(newSubject, "Subject created successfully", 201);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}


