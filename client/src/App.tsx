import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="lobbies/:roomCode" element={<Lobby />} />
        </Routes>
    );
}

export default App;
