import { useGame } from "../GameContext";

function Player() {
    const { gameState } = useGame();
  return (
    <div>
      {gameState === 'lobby' && <div>Waiting for game to start</div>}
      {gameState === 'answering' && <div>Answer</div>}
    </div>
  )
}

export default Player
