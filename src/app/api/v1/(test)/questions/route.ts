'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { QuestionCreateValidationSchema } from "@/lib/utils/model-validation-schema";

import { NextRequest } from "next/server";
import { checkAuthAdmin } from "@/lib/utils/auth-check-in-exam-api";



// export const POST = async (req: NextRequest) => {

//     const authResponse = await checkAuthAdmin();
//     if(authResponse) return authResponse;

//     try {

//         const body = await req.json();

//         const validation = QuestionCreateValidationSchema.safeParse(body);

//         if (!validation.success) {
//             return errorResponse("Invalid Input", 400, validation.error);
//         }

//         const {
//             text,
//             imageUrl,
//             difficultyLevel,
//             examSectionId,
//             chapterId,
//             options,
//             answerExplanationField
//         } = validation.data;


//         // find exam 
//         const existingExamSection = await db.examSection.findUnique({
//             where: {
//                 id: examSectionId
//             }
//         });

//         if (!existingExamSection) {
//             return errorResponse("Exam section not found", 404);
//         }

//         const question = await db.question.create({
//             data: {
//                 text,
//                 imageUrl,
//                 difficultyLevel,
//                 chapter: {
//                     connect: { id: chapterId }
//                 },
//                 examSection: {
//                     connect: { id: examSectionId }
//                 },
//                 options: {
//                     create: options.map((option) => ({
//                         text: option.text,
//                         isCorrect: option.isCorrect,
//                         imageUrl: option.imageUrl
//                     }))
//                 },
//                 answerExplanationField: {
//                     create: {
//                         text: answerExplanationField.text,
//                         value: answerExplanationField.value,
//                         explanation: answerExplanationField.explanation,
//                         imageUrl : answerExplanationField.imageUrl
//                     }
//                 }
//             },
//             include: {
//                 options: true,
//                 answerExplanationField: true
//             }
//         })


//         return successResponse(question, "Question created successfully", 201);

//     } catch (error) {
//         return errorResponse("Internal Server Error", 500, error);
//     }
// }