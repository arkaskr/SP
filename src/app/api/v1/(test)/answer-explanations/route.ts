"use server";

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { AnswerExplanationFieldCreateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin } from "@/lib/utils/auth-check-in-exam-api";



// export const POST = async (req: NextRequest) => {


//   const authResponse = await checkAuthAdmin();
//   if(authResponse) return authResponse;

//   try {
//     const body = await req.json();

//     // Validate Input
//     const validation =
//       AnswerExplanationFieldCreateValidationSchema.safeParse(body);
//     if (!validation.success) {
//       return errorResponse("Invalid Input", 400, validation.error);
//     }

//     const { text, value, explanation, questionId } = body;

//     // Find question
//     const existingQuestion = await db.question.findUnique({
//       where: { id: questionId },
//     });

//     if (!existingQuestion) {
//       return errorResponse("Question not found", 404);
//     }

//     // Create answer explanation
//     const option = await db.answerExplanationField.create({
//       data: { text, value, explanation, questionId },
//     });

//     return successResponse(
//       option,
//       "Answer explanation created successfully",
//       201
//     );
//   } catch (error) {
//     console.error("Error creating answer explanation:", error);
//     return errorResponse("Internal Server Error", 500, error);
//   }
// };