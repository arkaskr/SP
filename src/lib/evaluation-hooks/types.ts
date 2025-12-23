import { UserAnswerPerQuestion, UserSubmission } from "@prisma/client";

export interface ExamCategoryForEv {
    id: string;
    name: string;
}

export interface SubjectForEv{
    name: string;
    chapters: {
        name: string;
    }[];
}

export interface SectionConfigForEv{
    id: string;
    name: string;
    description: string;
    fullMarks: number;
    negativeMarks: number;
    zeroMarks: number;
    partialMarks: number[];
}

export interface OptionForEv {
    id: string;
    text: string;
    imageUrl: string;
    isCorrect: boolean;
}

export interface AnswerExplanationFieldForEv{
    id: string;
    text: string;
    value: string;
    explanation: string;
    imageUrl : string;
}

export interface QuestionForEv {
    id: string;
    text: string;
    imageUrl: string;
    difficultyLevel: string;
    chapterId: string;
    options: OptionForEv[];
    answerExplanationField: AnswerExplanationFieldForEv;
}

export interface ExamSectionForEv{
    id: string;
    name: string;
    description: string;
    isAllQuestionsMandatory: boolean;
    numberOfQuestionsToAttempt: number;
    subject: {
        id: string;
        name: string;
        description: string;
    };
    sectionConfig: SectionConfigForEv;
    questions: QuestionForEv[];
}

export interface ExamforEv {
    id: string;
    title: string;
    instructions: string;
    description: string;
    totalDurationInSeconds: number;
    totalQuestions: number;
    totalMarks: number;
    examType: string;
    createdAt: string;
    updatedAt: string;
    examCategory: ExamCategoryForEv;
    subjects: SubjectForEv[];
    examSections: ExamSectionForEv[];
}

export interface ChosenOptionForEv {
    id: string;
    optionId: string;
    userAnswerPerQuestionId: string;
}

export interface UserAnswerPerQuestionForEv{
    id: string;
    value: string;
    isAttempted: boolean;
    userSubmissionId: string;
    questionId: string;
    chosenOptions: ChosenOptionForEv[];
}

export interface UserSubmissionForEv {
    id: string;
    userId: string;
    examId: string;
    createdAt: string;
    updatedAt: string;
    userAnswerPerQuestions: UserAnswerPerQuestionForEv[];
}


export interface ResultInterface {
    score : number;
    accuracy : number;
    attemptedQuestions : number;
    correctAnswers : number;
    incorrectAnswers : number;
}

// export interface UserSubmissionResponse extends UserSubmissionForEv {
// }