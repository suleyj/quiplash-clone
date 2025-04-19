import { useGame } from "../GameContext";
import { socket } from "../socket";
import QNA from "../components/QNA";
import Voting from "../components/Voting";
import { useEffect, useState } from "react";
import { Question } from "../types/qna";
import { VotingInfo } from "../types/votingInfo";

function Player() {
  const { gameState } = useGame();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [votingInfo, setVotingInfo] = useState<VotingInfo[]>([]);

  useEffect(() => {
    socket.on("gameQuestions", setQuestions);
    socket.on("voting", setVotingInfo);

    return () => {
      socket.off("gameQuestions", setQuestions);
      socket.off("voting", setVotingInfo);
    };
  }, []);

  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-2xl flex flex-col gap-3">
          {gameState === "lobby" && <div>Waiting for game to start</div>}
          {gameState === "qna" && <QNA questions={questions} />}
          {gameState === "voting" && <Voting votingInfo={votingInfo} />}
        </div>
      </div>
    </div>
  );
}

export default Player;
