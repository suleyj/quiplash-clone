import { createContext, useContext, useState, ReactNode } from "react";

interface GameContextType {
  isHost: boolean;
  setIsHost: (host: boolean) => void;
  playerName: string;
  setPlayerName: (playerName: string) => void;
  roomCode: string;
  setRoomCode: (roomCode: string) => void;
}

// Create context with a default value of `null`
const GameContext = createContext<GameContextType | null>(null);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [isHost, setIsHost] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");

  return (
    <GameContext.Provider value={{ isHost, setIsHost , playerName, setPlayerName, roomCode, setRoomCode}}>
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
