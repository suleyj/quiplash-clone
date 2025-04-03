import { useState, useEffect} from "react";
import { socket } from "../socket";

function QNA() {
  const [question, setQuestion] = useState(''); 
  const [answer, setAnswer] = useState(''); 

  useEffect(() => {
      const handleQuestion = (question: string) => {
        setQuestion(question);
      };

      socket.on("question", handleQuestion);

      return () => {
          socket.off("question", handleQuestion);
      };
  }, []);

  const submitAnswer = () => {

  }
  
  return (
    <div className="min-h-screen hero bg-base-200">
    <div className="text-center hero-content">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold">Question </h1>
        <h1>{question}</h1>
        <textarea className="textarea" placeholder="Bio"></textarea>
        <button
          className="mb-4 btn btn-primary"
          onClick={submitAnswer}
        >
          SUBMIT
        </button>
      </div>
    </div>
  </div>
  )
}

export default QNA
