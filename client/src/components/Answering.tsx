import { useState } from "react";
import { socket } from "../socket";

function Answering() {
  const [question, setQuestion] = useState(''); 
  const [answer, setAnswer] = useState(''); 

  const sendAnswer = () => {
    // function body
  };
  
  return (
    <div className="min-h-screen hero bg-base-200">
    <div className="text-center hero-content">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold">Question </h1>
        <button
          className="mb-4 btn btn-primary"
          onClick={createRoom}
        >
          CREATE GAME
        </button>
      </div>
    </div>
  </div>
  )
}

export default Answering
