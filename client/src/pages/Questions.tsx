//question page
import { useState } from "react";

function Questions() {
  const [round, setRound] = useState(1);
  const [question, setQuestion] = useState(
    "If jose and ryan were in a room alone what would happen ?"
  );
  const [answer, setAnswer] = useState("");

  const submitAnswer = () => {};

  return (
    <div className="w-4/5 mx-auto mt-20">
      <h1 className="mb-6 text-6xl font-bold text-center">Round {round}</h1>
      <p className="mb-6 text-xl text-center">{question}</p>
      <textarea 
        className="w-full max-w-xs mb-6 textarea textarea-bordered textarea-lg" 
        placeholder="Enter answer"
        onChange={(event) => {
          setAnswer(event.target.value);
        }}
        value={answer}
      />
      <div className="text-center">
        <button
          className="btn btn-primary btn-wide"
          onClick={submitAnswer}
          disabled={!answer}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Questions;
