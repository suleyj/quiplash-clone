import { socket } from "../socket";
import { useState } from "react";
import { VotingInfo, Vote } from "../types/votingInfo";
import useRoomCode from "../hooks/useRoomCode";

function Voting({ votingInfo }: { votingInfo: VotingInfo[] }) {
  const roomCode = useRoomCode();

  const sendVote = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newVotes = [
      ...votes,
      {
        questionId: votingInfo[voteIndex].questionId,
        answer: event.target.value,
      },
    ];
    setVotes(newVotes);
    setVoteIndex(voteIndex + 1);
    if (newVotes.length >= votingInfo.length) {
      console.log("hey");

      socket.emit("sendVotes", { roomCode, votes: newVotes });
    }
  };

  const [voteIndex, setVoteIndex] = useState(0);
  const [votes, setVotes] = useState<Vote[]>([]);

  return (
    <>
      {voteIndex < votingInfo.length ? (
        <div>
          {votingInfo[voteIndex] && (
            <div>
              <h2 className="text-4xl">{votingInfo[voteIndex].question}</h2>
              <div className="flex justify-between mt-10">
                {votingInfo[voteIndex].answers &&
                  votingInfo[voteIndex].answers.map((answer, i) => (
                    <button
                      value={answer.answer}
                      key={i}
                      className="btn btn-neutral w-[45%] h-[100px] text-xl"
                      onClick={sendVote}
                    >
                      <h2>{answer.answer}</h2>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-2xl flex flex-col gap-3">
          <div>Waiting For Next Round</div>
        </div>
      )}
    </>
  );
}

export default Voting;
