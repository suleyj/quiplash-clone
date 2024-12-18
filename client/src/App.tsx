import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    // function onFooEvent(value) {
    //   setFooEvents(previous => [...previous, value]);
    // }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    // socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      // socket.off('foo', onFooEvent);
    };
  }, []);

  const createRoom = () => {
    socket.emit("createRoom", socket);
  }

  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold">Quiplash Clone</h1>
            <p className="py-6 mb-4">
              The ultimate party game where wit wins the day. Battle friends in
              a hilarious showdown of quick thinking and clever comebacks.
              Answer prompts, vote on the funniest responses, and crown the
              comedy champion! Perfect for game nights, parties, and online
              hangouts. Laughter guaranteed!"
            </p>
            <button className="btn btn-primary mb-4" onClick={createRoom}>START GAME</button>
            <p className="text-2xl font-bold mb-4">OR</p>
            <input
              type="text"
              placeholder="Enter Game Code"
              className="input input-bordered w-full max-w-[14rem] mr-2"
            />
            <button className="btn btn-primary">JOIN</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
