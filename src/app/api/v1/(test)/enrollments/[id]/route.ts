import { db } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { checkAuthAdmin } from "@/lib/utils/auth-check-in-exam-api";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest,{ params }: { params: Promise<{ id: string }> }) => {

    const authResponse = await checkAuthAdmin();
    if(authResponse) return authResponse;

    try {
         
        const {id : enrollmentId} = await params;

        
         await db.enrollment.delete({
            where : {
                id : enrollmentId
            }
        });
        
        return successResponse({}, "user enrollment cancelled successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
}

