import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useGame } from "../GameContext";

function Lobby() {
    const [players, setPlayers] = useState([""]);
    const { isHost } = useGame();

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

            {/*TODO: make UI look nice */}
            <div>
                <ul>
                    {players.length &&
                        players.map((player) => <li key={player}>{player}</li>)}
                </ul>
            </div>

            {isHost ? (
                <button className="btn btn-primary">
                START GAME
            </button>
            ) : (
                <p>Waiting for host to start...</p>
            )}
        </div>
    );
}

export default Lobby;
