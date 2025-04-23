import "./App.css";
import { Route, Routes } from "react-router";
import { useEffect } from "react";
import { useGame } from "./GameContext";
import { socket } from "./socket";

import Home from "./pages/Home";
import Host from "./pages/Host";
import Player from "./pages/Player";

function App() {
  const { setGameState } = useGame();

  useEffect(() => {
    socket.on("gameState", setGameState);

    return () => {
      socket.off("gameState", setGameState);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="host/:roomCode" element={<Host />} />
      <Route path="player/:roomCode" element={<Player />} />
    </Routes>
  );
}

export default App;
