'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { SubjectCreateWithChaptersValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin } from "@/lib/utils/auth-check-in-exam-api";


export const POST = async (req: NextRequest) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {

        const body = await req.json();
        const validation = SubjectCreateWithChaptersValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        const allData = validation.data;

        const res = await Promise.all(
            allData.map(async (data) => {
                return await db.subject.create({
                    data: {
                        name: data.name,
                        description: data.description,
                        chapters: {
                            create: data.chapters.map((chapter) => ({
                                name: chapter.name,
                                description: chapter.description
                            }))
                        }
                    },
                    include : {
                        chapters : true
                    }
                });
            })
        );

        return successResponse(res, "Subject created successfully", 201);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}


