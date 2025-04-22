type VotingInfo = {
  questionId: number;
  question: string;
  answers: Answer[];
};

type Answer = {
  id: number;
  answer: string;
};

type Vote = {
  questionId: number;
  answer: number;
};

export type { VotingInfo, Answer, Vote };
