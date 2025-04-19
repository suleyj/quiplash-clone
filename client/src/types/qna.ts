type Question = {
  id: number;
  question: string;
};

type Answer = {
  questionId: number;
  answer: string;
};

export type { Answer, Question };
