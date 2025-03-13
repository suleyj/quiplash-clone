import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useGame } from "../GameContext";
import { useParams } from "react-router"
import Game from '../Game.tsx'
import Player from '../Player.tsx'

function Lobby() {
    const [players, setPlayers] = useState([""]);
    const [inGame, setInGame] = useState(false);
    const { isHost } = useGame();
    const { roomCode } = useParams();

    useEffect(() => {
        const handlePlayerList = (players: string[]) => {
            setPlayers(players);
        };

        socket.on("playerList", handlePlayerList);

        return () => {
            socket.off("playerList", handlePlayerList);
        };
    }, []);

    const startGame = () =>{ 
        
        socket.emit("startGame", roomCode, (err: Error, status: boolean) => {
            if (err || !status) {
                console.log(err);
                console.log(status);
                
                
                console.log('hey');
                
            } else {
                console.log('hey');
                
                setInGame(true) ;
            }
        });
        
    }

    return (
        <div>
           
            {inGame ? (isHost ? <Game /> : <Player/>) :
            <>
                {/*TODO: make UI look nice */}
                <h1>Lobby</h1>
                <div>
                    <ul>
                        {players.length &&
                            players.map((player) => <li key={player}>{player}</li>)}
                    </ul>
                </div>

                {isHost ? (
                    <button className="btn btn-primary" onClick={startGame}>
                    START GAME
                </button>
                ) : (
                    <p>Waiting for host to start...</p>
                )}
            </>
            }

        </div>
    );
}

export default Lobby;
