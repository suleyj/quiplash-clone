class Room {
  /* Static Interface */
  static #rooms = [];

  static get(roomCode) {
    return this.#rooms[roomCode];
  }

  static add(roomCode, hostId) {
    this.#rooms[roomCode] = new Room(roomCode, hostId);
  }

  static disconnect(socketId) {
    this.#rooms.forEach((room) => {
      room.players = room.players.filter((player) => player.id !== socketId);
    });
  }

  /* Instance Interface */
  constructor(roomCode, hostId) {
    this.host = hostId;
    this.gameState = "lobby"; // "lobby" | "qna" | "voting" | "results"
    this.code = roomCode;
    this.players = [];
    this.questionBank = [];
  }

  addPlayer(player) {
    if (!this.players.some((p) => p.id === player.id)) {
      this.players.push(player);
      return true;
    }
    return false;
  }

  getPlayer(socketId) {
    return this.players.find((p) => p.id === socketId);
  }
}

const generateHexCode = (size) => {
  let result = [];
  let hexRef = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];

  for (let n = 0; n < size; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  return result.join("").toUpperCase();
};

const getRoomCode = () => {
  const codeLength = 5;
  let code;
  do {
    code = generateHexCode(codeLength);
  } while (Room.get(code));
  return code;
};

module.exports = { Room, getRoomCode };
