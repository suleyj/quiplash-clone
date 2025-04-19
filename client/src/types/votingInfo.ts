type VotingInfo = {
  questionId: number;
  question: string;
  answers: Answer[];
};

type Answer = {
  id: number;
  answer: string;
};

export type { VotingInfo, Answer };
