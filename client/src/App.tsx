import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Host from "./pages/Host";
import Player from "./pages/Player";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="host/:roomCode" element={<Host />} />
            <Route path="player/:roomCode" element={<Player />} />
        </Routes>
    );
}

export default App;
