import Lobby from "../components/Lobby";
import { socket } from "../socket";
import { useGame } from "../GameContext";
import Timer from "../components/Timer";
import Voting from "../components/Voting";
import { useEffect, useState } from "react";
import { VotingInfo } from "../types/votingInfo";

const Host = () => {
  const { gameState } = useGame();
  const [votingInfo, setVotingInfo] = useState<VotingInfo[]>([]);

  useEffect(() => {
    socket.on("voting", setVotingInfo);

    return () => {
      socket.off("voting", setVotingInfo);
    };
  }, []);

  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="text-center hero-content">
        <div className="max-w-2xl flex flex-col gap-3">
          <h1>Host Screen</h1>
          {gameState === "lobby" && <Lobby />}
          {gameState === "qna" && (
            <>
              <div>Waiting For Users to answer Questions</div>
              <Timer />
            </>
          )}
          {gameState === "voting" && <Voting votingInfo={votingInfo} />}
        </div>
      </div>
    </div>
  );
};

export default Host;
