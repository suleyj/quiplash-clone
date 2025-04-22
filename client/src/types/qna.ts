type Question = {
  id: number;
  question: string;
};

type Answer = {
  questionId: number;
  answer: string;
  votes: [];
};

export type { Answer, Question };
