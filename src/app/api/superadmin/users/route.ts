'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { NextRequest } from "next/server";
import { checkAuthSuperAdmin } from "@/lib/utils/auth-check-in-exam-api";



export const GET = async (req: NextRequest) => {

    
    const authResponse = await checkAuthSuperAdmin();
    if(authResponse) return authResponse;
    

    try {
        
        const users = await db.user.findMany({
            select : {
                id : true,
                name : true,
                email : true,
                ph_no : true,
                image : true,
                role : true,
                createdAt : true
            }
        });
       
        return successResponse(users, "Users fetched successfully", 200);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
};

