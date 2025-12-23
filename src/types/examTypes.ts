export interface Option {
  id: string;
  text: string;
  imageUrl: string;
  isCorrect: boolean;
  questionId: string;
}

export interface AnswerExplanation {
  id: string;
  text: string;
  value: string;
  explanation: string;
  questionId: string;
}

export interface Question {
  id: string;
  text: string;
  imageUrl: string;
  difficultyLevel: string;
  examSectionId: string;
  chapterId: string;
  options: Option[];
  answerExplanationField: AnswerExplanation;
}

export interface SectionConfig {
  id: string;
  name: string;
  description: string;
  fullMarks: number;
  negativeMarks: number;
  zeroMarks: number;
  partialMarks: number[];
}

export interface ExamSection {
  id: string;
  name: string;
  description: string;
  isAllQuestionsMandatory: boolean;
  numberOfQuestionsToAttempt: number;
  sectionConfigId: string;
  examId: string;
  sectionConfig: SectionConfig;
  questions: Question[];
}

export interface Exam {
  id: string;
  title: string;
  instructions: string;
  description: string;
  totalDurationInSeconds: number;
  examTypeId: string;
  examCategoryId: string;
  createdAt: string;
  updatedAt: string;
  examSections: ExamSection[];
}

export interface OptionSelection {
  optionId: string;
}

export interface UserAnswer {
  value?: string;
  isAttempted: boolean;
  questionId: string;
  chosenOptions?: OptionSelection[];
}

export interface UserResponse {
  userId: string;
  examId: string;
  userAnswerPerQuestions: UserAnswer[];
}
