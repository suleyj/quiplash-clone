import { useState } from "react";
import { socket } from "../socket";
import useRoomCode from "../hooks/useRoomCode";
import { Answer, Question } from "../types/qna";

function QNA({ questions }: { questions: Question[] }) {
  const roomCode = useRoomCode();

  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [numQuestion, setNumQuestion] = useState(0);

  const submitAnswer = () => {
    const newAnswers = [
      ...answers,
      { questionId: questions[numQuestion].id, answer: answer },
    ];
    setAnswers(newAnswers);

    const newNumQuestion = numQuestion + 1;
    setNumQuestion(newNumQuestion);
    if (newNumQuestion >= questions.length) {
      socket.emit("submitAnswers", { roomCode, answers: newAnswers });
    }
    setAnswer("");
  };

  return (
    <div className="max-w-2xl flex flex-col gap-3">
      <h1 className="text-5xl font-bold">Question #{numQuestion + 1}</h1>
      <h1>
        {numQuestion <= questions.length &&
          questions[numQuestion] &&
          questions[numQuestion].question}
      </h1>
      <textarea
        className="textarea"
        placeholder="Answer"
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
      />
      <button
        className="mb-4 btn btn-primary"
        onClick={submitAnswer}
        disabled={!answer}
      >
        SUBMIT
      </button>
    </div>
  );
}

export default QNA;
