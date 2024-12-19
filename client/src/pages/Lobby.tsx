import { useEffect, useState } from "react";
import { socket } from "../socket";

function Lobby() {
    const [players, setPlayers] = useState([""]);

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
        </div>
    );
}

export default Lobby;
