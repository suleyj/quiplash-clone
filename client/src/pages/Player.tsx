import { useGame } from "../GameContext";
import { useEffect } from 'react'
import { socket } from "../socket";
import QNA from '../components/QNA'

type GameState = "lobby" | "qna" | "voting" | "results";

function Player() {
    const { gameState, setGameState } = useGame();

    useEffect(() => {
        const handleGameState = (gameState: GameState) => {
          setGameState(gameState);
        };

        socket.on("gameState", handleGameState);

        return () => {
            socket.off("gameState", handleGameState);
        };
    }, []);

  return (
    <div>
      {gameState === 'lobby' && <div>Waiting for game to start</div>}
      {gameState === 'qna' && <QNA/>}
    </div>
  )
}

export default Player
