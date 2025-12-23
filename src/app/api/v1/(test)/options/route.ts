"use server";

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { OptionCreateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin } from "@/lib/utils/auth-check-in-exam-api";

// export const POST = async (req: NextRequest) => {

//     const authResponse = await checkAuthAdmin();
//     if(authResponse) return authResponse;

//     try {

//         const body = await req.json();
//         const validation = OptionCreateValidationSchema.safeParse(body);

//         if (!validation.success) {
//             return errorResponse("Invalid Input", 400, validation.error);
//         }

//         const {
//             text,
//             imageUrl,
//             isCorrect,
//             questionId
//         } = validation.data;

//         // find exam
//         const existingQuestion = await db.question.findUnique({
//             where: {
//                 id: questionId
//             }
//         });

//         if (!existingQuestion) {
//             return errorResponse("Question not found", 404);
//         }

//         const option = await db.option.create({
//             data: {
//                 text,
//                 imageUrl,
//                 isCorrect,
//                 questionId
//             }
//         })

//         return successResponse(option, "Option created successfully", 201);

//     } catch (error) {
//         return errorResponse("Internal Server Error", 500, error);
//     }
// }
