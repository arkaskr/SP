'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { checkAuthSuperAdmin } from "@/lib/utils/auth-check-in-exam-api";
import { NextRequest } from "next/server";



export const GET = async (req: NextRequest) => {

    
    const authResponse = await checkAuthSuperAdmin();
    if(authResponse) return authResponse;
    

    try {
        
        return successResponse({}, "super admin get not implemented", 501);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
};



export const POST = async (req: NextRequest) => {

    
    const authResponse = await checkAuthSuperAdmin();
    if(authResponse) return authResponse;
    

    try {
        
        return successResponse({}, "super admin post not implemented", 501);

    } catch (error) {
        return errorResponse("Internal Server Error", 500, error);
    }
};

