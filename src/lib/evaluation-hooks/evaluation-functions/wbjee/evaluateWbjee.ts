import { ChosenOptionForEv, ExamforEv, ExamSectionForEv, OptionForEv, QuestionForEv, ResultInterface, UserAnswerPerQuestionForEv, UserSubmissionForEv } from "@/lib/evaluation-hooks/types";


// do we do correct++ for paritally correct mcq?



export function evaluateWbjee(userSubmission: UserSubmissionForEv, exam: ExamforEv) : { result : ResultInterface } {
    
    let score : number = 0;
    let accuracy : number = 0; // #correct/attempted
    let attemptedQuestions : number = 0;
    let correctAnswers : number = 0;
    let incorrectAnswers : number = 0;
    

    // Iterate through each section in the exam
    exam.examSections.forEach((section: ExamSectionForEv) => {

        const sectionConfig = section.sectionConfig;
     

        // Iterate through each question in the section
        section.questions.forEach((question: QuestionForEv) => {
            // Find the user's answer for this question
            const userAnswer = userSubmission.userAnswerPerQuestions.find(
                (answer: UserAnswerPerQuestionForEv) =>
                    answer.questionId === question.id
            );

            if (!userAnswer || !userAnswer.isAttempted) {
                score += sectionConfig.zeroMarks;
                return;
            }

            // Find the correct options for the question
            const correctOptions = question.options.filter((option: OptionForEv) => option.isCorrect);
            const correctOptionIds = correctOptions.map((option:OptionForEv) => option.id);

            // Get the user's chosen options
            const chosenOptionIds = userAnswer.chosenOptions.map((chosen: ChosenOptionForEv) => chosen.optionId);


            if(sectionConfig.name === "WBJEE_SECTION_SINGLE_CHOICE_MCQ_TYPE_1"){
                /*
                    Carries 1 mark each and only one option is correct.
                    In case of incorrect answer or any combination of more than one answer ,
                    1/4 mark will be deducted.
                */

                if(
                    chosenOptionIds.length > 1 || (
                    chosenOptionIds.length === 0 && correctOptionIds.length === 0
                     && chosenOptionIds[0] !== correctOptionIds[0])
                    )
                {
                    score += sectionConfig.negativeMarks;
                    incorrectAnswers++;
                    attemptedQuestions++;
                }
                else{
                    score += sectionConfig.fullMarks;
                    correctAnswers++;
                    attemptedQuestions++;
                }
     

            }
            else  if(sectionConfig.name === "WBJEE_SECTION_SINGLE_CHOICE_MCQ_TYPE_2"){

                /*
                Each question carries 2 marks.
                Only one option is correct.
                In case of an incorrect answer or if more than one option is selected,
                 1 mark will be deducted
                */

                if(
                chosenOptionIds.length > 1 || (
                chosenOptionIds.length === 0 && correctOptionIds.length === 0
                    && chosenOptionIds[0] !== correctOptionIds[0])
                )
                {
                    score += sectionConfig.negativeMarks;
                    incorrectAnswers++;
                    attemptedQuestions++;
                }
                else{
                    score += sectionConfig.fullMarks;
                    correctAnswers++;
                    attemptedQuestions++;
                }
            }
            else  if(sectionConfig.name === "WBJEE_SECTION_MULTI_CHOICE_MCQ"){
                /*
                Each question carries 2 marks.One or more options can be correct.
                If all correct answers are marked and no incorrect answers are marked,
                the score is calculated as:
                Score=2×(number of correct answers marked)/(actual number of correct answers).
                If any wrong option is marked or if a combination including a wrong option is marked, 
                the answer is considered wrong, but there is no negative marking. 
                In such cases, zero marks are awarded.
                */

                const isWrongOptionChosen = chosenOptionIds.some((optionId: string) => !correctOptionIds.includes(optionId));
                if(isWrongOptionChosen){
                    score += sectionConfig.zeroMarks;
                    incorrectAnswers++;
                    attemptedQuestions++;
                    return;
                }

                // for partial or full marks

                score += sectionConfig.fullMarks*(chosenOptionIds.length)/(correctOptionIds.length);
                attemptedQuestions++;
                // ? do we inc this for only full marks?
                correctAnswers++;
                
            }
            else {
                throw new Error("Section config not found");
            }
        })
    })

    accuracy = correctAnswers/attemptedQuestions;

    return {result : { 
        score,
        accuracy,
        attemptedQuestions,
        correctAnswers,
        incorrectAnswers
    }}
}


/**
 *   // Check if the user's chosen options match the correct options
        //     const isCorrect = chosenOptionIds.length === correctOptionIds.length &&
        //         chosenOptionIds.every((optionId: string) => correctOptionIds.includes(optionId));

        //     // Calculate marks based on the result
        //     if (isCorrect) {
        //         // Full marks for correct answer
               
        //         score += sectionConfig.fullMarks;
        //     } else if (chosenOptionIds.length > 0) {
        //         // Partial or negative marks for incorrect answer
        //         const isPartiallyCorrect = chosenOptionIds.some((optionId: string) => correctOptionIds.includes(optionId));
        //         if (isPartiallyCorrect) {
        //             // Apply partial marks (if applicable)
        //             const partialMark = sectionConfig.partialMarks[chosenOptionIds.length - 1] || sectionConfig.zeroMarks;
                    
        //             score += partialMark;
        //         } else {
        //             // Apply negative marks for incorrect answer
                    
        //             score += sectionConfig.negativeMarks;
        //         }
        //     } else {
        //         // Zero marks if no options were chosen
                
        //         score += sectionConfig.zeroMarks;
        //     }
        // })
 * 
 * 
 */