import { createContext, useContext, useState, ReactNode } from "react";

interface Player {
  name: string;
}

interface GameContextType {
  roomCode: string;
  setRoomCode: (roomCode: string) => void;
  gameState: "lobby" | "qna" | "voting" | "results";
  setGameState: (state: "lobby" | "qna" | "voting" | "results") => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

const GameContext = createContext<GameContextType | null>(null);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [roomCode, setRoomCode] = useState<string>("");
  const [gameState, setGameState] = useState<"lobby" | "qna" | "voting" | "results">("lobby");
  const [players, setPlayers] = useState<Player[]>([]);

  
  return (
    <GameContext.Provider
      value={{
        roomCode,
        setRoomCode,
        gameState,
        setGameState,
        players,
        setPlayers,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
