import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { GameProvider } from "./GameContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <GameProvider>
                <App />
            </GameProvider>
        </BrowserRouter>
    </StrictMode>
);
