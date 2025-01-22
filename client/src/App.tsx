import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Questions from "./pages/Questions";
import Voting from "./pages/Voting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="lobbies/:roomCode" element={<Lobby />} />
      <Route path="questions" element={<Questions />} />
      <Route path="Voting" element={<Voting />} />
    </Routes>
  );
}

export default App;
