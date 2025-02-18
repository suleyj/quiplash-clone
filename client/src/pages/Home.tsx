import { useState } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router";
import { useGame } from "../GameContext";

function Home() {
    let navigate = useNavigate();
    const [roomCode, setRoomCode] = useState("");
    const [name, setName] = useState("");
    const { setIsHost } = useGame();


    const createRoom = () => {
        if (!socket.connected) socket.connect();
        socket
            .timeout(3000)
            .emit("createRoom", (err: Error, roomCode: string) => {
                if (err) {
                    // TODO: display error
                } else {
                    setIsHost(true)
                    return navigate(`/lobbies/${roomCode}`);
                }
            });
    };

    const joinRoom = () => {
        if (!socket.connected) socket.connect();
        socket
            .timeout(3000)
            .emit("joinRoom", {roomCode, name}, (err: Error, status: boolean) => {
                if (err || !status) {
                    // TODO: display error
                } else {
                    return navigate(`/lobbies/${roomCode}`);
                }
            });
    };

    return (
        <div className="min-h-screen hero bg-base-200">
            <div className="text-center hero-content">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold">Quiplash Clone</h1>
                    <p className="py-6 mb-4">
                        The ultimate party game where wit wins the day. Battle
                        friends in a hilarious showdown of quick thinking and
                        clever comebacks. Answer prompts, vote on the funniest
                        responses, and crown the comedy champion! Perfect for
                        game nights, parties, and online hangouts. Laughter
                        guaranteed!
                    </p>
                    <button
                        className="mb-4 btn btn-primary"
                        onClick={createRoom}
                    >
                        CREATE GAME
                    </button>
                    <p className="mb-4 text-2xl font-bold">OR</p>
                    <div className="flex flex-col items-center mb-6">
                        <input
                            type="text"
                            placeholder="Enter Game Code"
                            className="input input-bordered w-full max-w-[14rem] mr-2 mb-4"
                            onChange={(event) => {
                                setRoomCode(event.target.value);
                            }}
                            value={roomCode}
                        />
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="input input-bordered w-full max-w-[14rem] mr-2"
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            value={name}
                        />
                    </div>

                    <button className="btn btn-primary" onClick={joinRoom} disabled={!(roomCode && name)}>
                        JOIN
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
