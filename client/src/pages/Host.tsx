import Lobby from "../components/Lobby";
import { useGame } from "../GameContext";

const Host = () => {
  
   const { gameState} = useGame();
    
  return (
    <div>
      <h1>Host Screen</h1>
      {gameState === 'lobby' && <Lobby />}
      {gameState === 'qna' && <div>Waiting For Users to answer Questions</div>}
    </div>
  );
};

export default Host;