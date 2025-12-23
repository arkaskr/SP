import { evaluateWbjee } from "./evaluation-functions/wbjee/evaluateWbjee";
import { ExamforEv, ResultInterface, UserSubmissionForEv } from "./types";

export function evaluate(userSubmission: UserSubmissionForEv, exam: ExamforEv) : { result: ResultInterface } {
    const examCategoryName = exam.examCategory.name.toLowerCase();

    let result : ResultInterface = { 
        score : 0,
        accuracy : 0,
        attemptedQuestions : 0,
        correctAnswers : 0,
        incorrectAnswers : 0
     };

    switch(examCategoryName) {
        case "wbjee":
            result = evaluateWbjee(userSubmission,exam).result;
    }

    return {result};

}