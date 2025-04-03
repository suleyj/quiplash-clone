import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useGame } from "../GameContext";
import useRoomCode from '../hooks/useRoomCode';

function Lobby() {
    const [players, setPlayers] = useState([""]);
    const { setGameState } = useGame();
    const roomCode = useRoomCode();

    const startGame = () => {
        setGameState("qna");
        socket
          .timeout(3000)
          .emit("startGame", roomCode , (err: Error, status: boolean) => {
              if (err || !status) {
                console.log('error');
                
                  // TODO: display error
              }
        });
    };
  

    useEffect(() => {
        const handlePlayerList = (players: string[]) => {
            setPlayers(players);
        };

        socket.on("playerList", handlePlayerList);

        return () => {
            socket.off("playerList", handlePlayerList);
        };
    }, []);


    return (
        <div>
            <h1>Lobby</h1>
            <div>
                <ul>
                    {players.length &&
                        players.map((player) => <li key={player}>{player}</li>)}
                </ul>
            </div>
            <button className="btn btn-primary" onClick={startGame} >
                START GAME
            </button>
        </div>
    );
}

export default Lobby;
