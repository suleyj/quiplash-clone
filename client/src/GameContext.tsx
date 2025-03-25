import { createContext, useContext, useState, ReactNode } from "react";

interface Player {
  name: string;
}

interface GameContextType {
  roomCode: string;
  setRoomCode: (roomCode: string) => void;
  gameState: "lobby" | "answering" | "voting" | "results";
  setGameState: (state: "lobby" | "answering" | "voting" | "results") => void;
  players: Player[];
  setPlayers: (players: Player[]) => void;
  startGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [roomCode, setRoomCode] = useState<string>("");
  const [gameState, setGameState] = useState<"lobby" | "answering" | "voting" | "results">("lobby");
  const [players, setPlayers] = useState<Player[]>([]);

  const startGame = () => {
      setGameState("answering");
  };

  return (
    <GameContext.Provider
      value={{
        roomCode,
        setRoomCode,
        gameState,
        setGameState,
        players,
        setPlayers,
        startGame,
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
