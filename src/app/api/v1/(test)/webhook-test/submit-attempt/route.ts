"use server";

import { submitAttempt } from "@/lib/evaluation-hooks/report-functions";
import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
        
        const body = await req.json();

        const {
            userSubmissionId,
            examId,
            userId
        } = body;

        const timeTaken = body.timeTaken; // Assuming timeTaken is part of the request body
        const response = await submitAttempt(userId, examId, userSubmissionId, timeTaken);
        return successResponse(response, "Webhook test", 200);
  } catch (error) {
        console.log(error);
        return errorResponse("Internal Server Error", 500, error);
  }
};
