import { useParams } from 'react-router';

const useRoomCode = () => {
  const { roomCode } = useParams<{ roomCode: string }>();

  return roomCode;
};

export default useRoomCode;