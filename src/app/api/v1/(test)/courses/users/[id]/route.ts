'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { transformCourseResponse } from "@/lib/utils/utility_functions";
import { checkAuthUser } from "@/lib/utils/auth-check-in-exam-api";


export const GET = async(req : NextRequest,{ params } :{ params: Promise<{ id: string }> }) => {
    
    // const authResponse = await checkAuthUser();
    // if(authResponse) return authResponse;

    try {
         const {id : userId} = await params;

         const response = await db.enrollment.findMany({
            where: { userId },
            include: { 
                course: {
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
            } }
        }
        });

         const result = response.map(item => ({enrollmentId : item.id,...transformCourseResponse(item.course)}));

         return successResponse(result, "Courses fetched successfully", 200);
    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}