import { VotingInfo } from "../types/votingInfo";
import VotingCard from "./VotingCard";

function Voting({ votingInfo }: { votingInfo: VotingInfo[] }) {
  return (
    <div>
      {votingInfo && votingInfo[0] && (
        <div>
          <h2 className="text-4xl">{votingInfo[0].question}</h2>
          <div className="flex gap-5 mt-10">
            {votingInfo[0].answers &&
              votingInfo[0].answers.map((answer, i) => (
                <VotingCard key={i} answer={answer} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Voting;
