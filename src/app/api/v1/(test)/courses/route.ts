'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { CourseCreateValidationSchema } from "@/lib/utils/model-validation-schema";
import { transformCourseResponse } from "@/lib/utils/utility_functions";
import { checkAuthAdmin, checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";


export const GET = async(req : NextRequest) => {

    // const authResponse = await checkAuthUser();
    // if(authResponse) return authResponse;


    try {
         
         const courses = await db.course.findMany({
            include : {
                courseCategories : {
                    select : {
                        examCategory : {
                            select : {
                                id : true,
                                name : true
                            }
                        }
                    }
                },
                courseExams : {
                    select : {
                        exam : {
                            select : {
                                id : true,
                                title : true
                            }
                        }
                    }
                },
                enrollments : {
                    select : {
                        id : true
                    }
                }
            }
         });

         const result = courses.map(transformCourseResponse);

         return successResponse(result, "Courses fetched successfully", 200);
    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}

export const POST = async (req: NextRequest) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;    

    try {

        const body = await req.json();
        const validation = CourseCreateValidationSchema.safeParse(body);

        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }

        const { title,subtitle,thumbnailUrl, description, price,discount, level, examCategoryIds, examIds } = validation.data;

        const course = await db.course.create({
            data: {
                title,
                subtitle,
                thumbnailUrl: thumbnailUrl ?? "",
                description,
                price,
                discount,
                level,
                courseCategories: {
                    create: examCategoryIds.map(examCategoryId => ({
                        examCategory: {
                            connect: { id: examCategoryId }
                        }
                    }))
                },
                courseExams: {
                    create: examIds.map(examId => ({
                        exam: {
                            connect: { id: examId }
                        }
                    }))
                }
            }
        });
        
        return successResponse(course, "Course created successfully", 201);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}


