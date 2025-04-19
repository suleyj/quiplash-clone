import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useGame } from "../GameContext";
import useRoomCode from "../hooks/useRoomCode";

function Lobby() {
  const [players, setPlayers] = useState([""]);
  const { setGameState } = useGame();
  const roomCode = useRoomCode();

  const startGame = () => {
    setGameState("qna");
    socket
      .timeout(3000)
      .emit("startGame", roomCode, (err: Error, status: boolean) => {
        if (err || !status) {
          console.log("error");

          // TODO: display error
        }
      });
  };

  useEffect(() => {
    socket.on("playerList", setPlayers);

    return () => {
      socket.off("playerList", setPlayers);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-5">Lobby</h1>
      <div>
        <ul>
          {players.length &&
            players.map((player) => <li key={player}>{player}</li>)}
        </ul>
      </div>
      <button
        className="btn btn-primary mt-5"
        onClick={startGame}
        disabled={players.length < 2}
      >
        START GAME
      </button>
    </div>
  );
}

export default Lobby;
