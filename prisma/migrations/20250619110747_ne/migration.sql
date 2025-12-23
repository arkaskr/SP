/*
  Warnings:

  - You are about to drop the column `examType` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `ph_no` on the `OTP` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chapterId,examId]` on the table `ChapterToExam` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `OTP` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exam_type` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `OTP` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exam_type` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('BASIC', 'STANDARD', 'PREMIUM');

-- AlterEnum
ALTER TYPE "RoleType" ADD VALUE 'SUPERADMIN';

-- DropForeignKey
ALTER TABLE "ExamSection" DROP CONSTRAINT "ExamSection_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_exam_section_id_fkey";

-- DropIndex
DROP INDEX "OTP_ph_no_key";

-- AlterTable
ALTER TABLE "AnswerExplanationField" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "examType",
ADD COLUMN     "exam_type" "ExamType" NOT NULL,
ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "OTP" DROP COLUMN "ph_no",
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "exam_type" "ExamType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateTable
CREATE TABLE "ExamAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "percentile" DOUBLE PRECISION,
    "rank" INTEGER,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "attemptedQuestions" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "incorrectAnswers" INTEGER NOT NULL,
    "timeTaken" INTEGER NOT NULL,
    "userSubmissionId" TEXT NOT NULL,

    CONSTRAINT "ExamAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalysisReport" (
    "id" TEXT NOT NULL,
    "examAttemptId" TEXT NOT NULL,
    "overallPerformance" JSONB,
    "topicWisePerformance" JSONB,
    "difficultyWisePerformance" JSONB,
    "timeManagement" JSONB,
    "strengthsAndWeaknesses" JSONB,
    "suggestedImprovements" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnalysisReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamStatistics" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "totalAttempts" INTEGER NOT NULL,
    "averageScore" DOUBLE PRECISION NOT NULL,
    "highestScore" DOUBLE PRECISION NOT NULL,
    "lowestScore" DOUBLE PRECISION NOT NULL,
    "medianScore" DOUBLE PRECISION NOT NULL,
    "standardDeviation" DOUBLE PRECISION NOT NULL,
    "averageTimeTaken" INTEGER NOT NULL,
    "topPerformers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionStatistics" (
    "id" SERIAL NOT NULL,
    "questionId" TEXT NOT NULL,
    "totalAttempts" INTEGER NOT NULL,
    "correctAttempts" INTEGER NOT NULL,
    "incorrectAttempts" INTEGER NOT NULL,
    "averageTimeTaken" INTEGER NOT NULL,
    "difficultyIndex" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "QuestionStatistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "level" "CourseLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseToExamCategory" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "examCategoryId" TEXT NOT NULL,

    CONSTRAINT "CourseToExamCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseExam" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,

    CONSTRAINT "CourseExam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExamAttempt_userSubmissionId_key" ON "ExamAttempt"("userSubmissionId");

-- CreateIndex
CREATE UNIQUE INDEX "AnalysisReport_examAttemptId_key" ON "AnalysisReport"("examAttemptId");

-- CreateIndex
CREATE UNIQUE INDEX "ExamStatistics_examId_key" ON "ExamStatistics"("examId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionStatistics_questionId_key" ON "QuestionStatistics"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "ChapterToExam_chapterId_examId_key" ON "ChapterToExam"("chapterId", "examId");

-- CreateIndex
CREATE UNIQUE INDEX "OTP_email_key" ON "OTP"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ExamSection" ADD CONSTRAINT "ExamSection_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_exam_section_id_fkey" FOREIGN KEY ("exam_section_id") REFERENCES "ExamSection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAttempt" ADD CONSTRAINT "ExamAttempt_userSubmissionId_fkey" FOREIGN KEY ("userSubmissionId") REFERENCES "UserSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalysisReport" ADD CONSTRAINT "AnalysisReport_examAttemptId_fkey" FOREIGN KEY ("examAttemptId") REFERENCES "ExamAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamStatistics" ADD CONSTRAINT "ExamStatistics_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionStatistics" ADD CONSTRAINT "QuestionStatistics_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseToExamCategory" ADD CONSTRAINT "CourseToExamCategory_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseToExamCategory" ADD CONSTRAINT "CourseToExamCategory_examCategoryId_fkey" FOREIGN KEY ("examCategoryId") REFERENCES "ExamCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseExam" ADD CONSTRAINT "CourseExam_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseExam" ADD CONSTRAINT "CourseExam_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
