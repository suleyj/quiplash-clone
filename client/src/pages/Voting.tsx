import { useState } from "react";

function Voting() {
  const [round, setRound] = useState(1);
  const [question, setQuestion] = useState(
    "If jose and ryan were in a room alone what would happen ?"
  );
  const [answer, setAnswer] = useState("");

  const submitAnswer = () => {};

  return (
    <div>
      <p>Round {round}</p>
      <p>{question}</p>
      <input
        type="text"
        placeholder="Enter name"
        className="input input-bordered w-full max-w-[14rem] mr-2"
        onChange={(event) => {
          setAnswer(event.target.value);
        }}
        value={answer}
      />
      <button
        className="btn btn-primary"
        onClick={submitAnswer}
        disabled={!answer}
      >
        Submit
      </button>
    </div>
  );
}

export default Voting;
