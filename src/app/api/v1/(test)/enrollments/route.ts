'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { EnrollmentValidationSchema } from "@/lib/utils/model-validation-schema";
import { checkAuthAdmin, checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";



export const GET = async (req: NextRequest) => {

    const authResponse = await checkAuthUser();
    if(authResponse) return authResponse;    


    try {
         
        const searchParams = req.nextUrl.searchParams;
        const userId = searchParams.get('user-id');
        const courseId = searchParams.get('course-id');

        const whereClause: { userId?: string, courseId?: string } = {};
        if (userId) {
            whereClause.userId = userId;
        }
        if (courseId) {
            whereClause.courseId = courseId;
        }
      
        const enrollments = await db.enrollment.findMany({
            where : whereClause
        })
        
        return successResponse(enrollments, "user enrolled successfully", 201);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}



// export const POST = async (req: NextRequest) => {

//     const authResponse = await checkAuthAdmin();
//     if(authResponse) return authResponse;

//     try {
         
//         const body = await req.json();
//         const validation = EnrollmentValidationSchema.safeParse(body);
        
//         if (!validation.success) {
//             return errorResponse("Invalid Input", 400, validation.error);
//         }

//         const {userId,courseId,totalAmount } = validation.data;
//         // Fetch the existing course to check if it exists
//         const existingCourse = await db.course.findUnique({
//             where: { id : courseId},
//             include: { courseCategories: true, courseExams: true }
//         });

//         if (!existingCourse) {
//             return errorResponse("Course not found", 404);
//         }

//         const existingEnrollment = await db.enrollment.findFirst({
//             where : {
//                 userId,
//                 courseId
//             }
//         })

//         if(existingEnrollment){
//             return errorResponse("User already enrolled", 409);
//         }


//         const enrollment = await db.enrollment.create({
//             data: {
//             userId,
//             courseId,
//             totalAmount
//             },
//         });
        
//         return successResponse(enrollment, "user enrolled successfully", 201);

//     } catch (error) {
//         return errorResponse("Internal Server Error", 500, error);
//     }
// }

