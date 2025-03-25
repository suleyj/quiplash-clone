import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useGame } from "../GameContext";

function Lobby() {
    const [players, setPlayers] = useState([""]);
    const { startGame} = useGame();

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
