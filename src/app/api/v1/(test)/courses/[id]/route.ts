'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { CourseUpdateValidationSchema } from "@/lib/utils/model-validation-schema";
import { transformCourseResponse } from "@/lib/utils/utility_functions";
import { checkAuthAdmin, checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";


export const GET = async(req : NextRequest,{ params }: { params: Promise<{ id: string }> }) => {

    // const authResponse = await checkAuthUser();
    // if(authResponse) return authResponse;


    try {
         
         const {id : courseId} = await params;

         const course = await db.course.findUnique({
            where : {
                id : courseId
            },
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

         if (!course) {
            return errorResponse("Course not found", 404);
         }

         const result = transformCourseResponse(course);

         return successResponse(result, "Course fetched successfully", 200);
    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}

export const PATCH = async (req: NextRequest,{ params }: { params: Promise<{ id: string }> }) => {


    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;    

    try {
         
         const {id : courseId} = await params;

        const body = await req.json();
        const validation = CourseUpdateValidationSchema.safeParse(body);
        
        if (!validation.success) {
            return errorResponse("Invalid Input", 400, validation.error);
        }
        
        const { title,subtitle,thumbnailUrl, description, price,discount, level, examCategoryIds, examIds } = validation.data;

        // Fetch the existing course to check if it exists
        const existingCourse = await db.course.findUnique({
            where: { id : courseId},
            include: { courseCategories: true, courseExams: true }
        });

        if (!existingCourse) {
            return errorResponse("Course not found", 404);
        }
        
        
        const updatedCourse = await db.course.update({
            where: { id : courseId },
            data: {
                title : title ?? existingCourse.title,
                subtitle : subtitle ?? existingCourse.subtitle,
                thumbnailUrl : thumbnailUrl ?? existingCourse.thumbnailUrl,
                description: description ?? existingCourse.description,
                price: price ?? existingCourse.price,
                discount : discount ?? existingCourse.discount,
                level: level ?? existingCourse.level,
                courseCategories: {
                    deleteMany: {}, // Remove existing categories
                    create: examCategoryIds?.map(examCategoryId => ({
                        examCategory: {
                            connect: { id: examCategoryId }
                        }
                    })) ?? existingCourse.courseCategories
                },
                courseExams: {
                    deleteMany: {}, // Remove existing exams
                    create: examIds?.map(examId => ({
                        exam: {
                            connect: { id: examId }
                        }
                    })) ?? existingCourse.courseExams
                }
            }
        });

        
        return successResponse(updatedCourse, "Course updated successfully", 201);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}


export const DELETE = async(req : NextRequest,{ params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {
         
         const {id : courseId} = await params;
         
        // Fetch the existing course to check if it exists
        const existingCourse = await db.course.findUnique({
            where: { id : courseId}
        });

        if (!existingCourse) {
            return errorResponse("Course not found", 404);
        }

         await db.course.delete({
            where : {
                id : courseId
            }
         })

         return successResponse({}, "Course deleted successfully", 200);
    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}