'use server';

import { errorResponse, successResponse } from "@/lib/utils/api-responses";
import { db } from "@/lib/db";
import { ExamSectionCreateValidationSchema } from "@/lib/utils/model-validation-schema";
import { NextRequest } from "next/server";
import { checkAuthAdmin } from "@/lib/utils/auth-check-in-exam-api";

// export const POST = async (req: NextRequest) => {

//     const authResponse = await checkAuthAdmin();
//     if(authResponse) return authResponse;

//     try {

//         const body = await req.json();

//         const validation = ExamSectionCreateValidationSchema.safeParse(body);

//         if (!validation.success) {
//             return errorResponse("Invalid Input", 400, validation.error);
//         }

//         const {
//             name,
//             description,
//             isAllQuestionsMandatory,
//             numberOfQuestionsToAttempt,
//             sectionConfigId,
//             examId,
//             questions,
//             subjectId
//         } = validation.data;

//         // find section config
//         const existingSectionConfig = await db.sectionConfig.findUnique({
//             where: {
//                 id: sectionConfigId
//             }
//         });

//         if (!existingSectionConfig) {
//             return errorResponse("Section config not found", 404);
//         }

//         // find exam 
//         const existingExam = await db.exam.findUnique({
//             where: {
//                 id: examId
//             }
//         });

//         if (!existingExam) {
//             return errorResponse("Exam not found", 404);
//         }

//         // find Subject
//         const existingSubject = await db.subject.findUnique({
//             where: {
//                 id: subjectId
//             }
//         })

//         if (!existingSubject) {
//             return errorResponse("Subject not found", 404);
//         }


//         // check if isAllQuestionsMandatory = false then if is provided or not

//         const examSection = await db.examSection.create({
//             data: {
//                 name,
//                 description,
//                 isAllQuestionsMandatory,
//                 numberOfQuestionsToAttempt,
//                 sectionConfig: {
//                     connect: { id: sectionConfigId }
//                 },
//                 exam: {
//                     connect: { id: examId }
//                 },
//                 subject: {
//                     connect: { id: subjectId }
//                 },
//                 questions: {
//                     create: questions.map((question) => ({
//                         text: question.text,
//                         imageUrl: question.imageUrl,
//                         difficultyLevel: question.difficultyLevel,
//                         chapter: {
//                             connect: { id: question.chapterId }
//                         },
//                         options: {
//                             create: question.options?.map((option) => ({
//                                 text: option.text,
//                                 isCorrect: option.isCorrect,
//                                 imageUrl: option.imageUrl
//                             }))
//                         },
//                         answerExplanationField: {
//                             create: {
//                                 text: question.answerExplanationField?.text,
//                                 value: question.answerExplanationField?.value,
//                                 explanation: question.answerExplanationField?.explanation
                                
//                             }
//                         }
//                     }))
//                 }
//             },
//             include: {
//                 questions: {
//                     include: {
//                         options: true,
//                         answerExplanationField: true
//                     }
//                 }
//             }
//         })

//         return successResponse(examSection, "Exam section created successfully", 200);

//     } catch (error) {
//         return errorResponse("Internal Server Error", 500, error);
//     }
// }
