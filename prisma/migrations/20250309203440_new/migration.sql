/*
  Warnings:

  - The values [BRAINSTROM] on the enum `ExamType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExamType_new" AS ENUM ('PYQ', 'MOCK', 'PRACTICE', 'QUIZ', 'BRAINSTORM');
ALTER TABLE "Exam" ALTER COLUMN "examType" TYPE "ExamType_new" USING ("examType"::text::"ExamType_new");
ALTER TYPE "ExamType" RENAME TO "ExamType_old";
ALTER TYPE "ExamType_new" RENAME TO "ExamType";
DROP TYPE "ExamType_old";
COMMIT;
