import { Answer } from "../types/votingInfo";

function VotingCard({ answer }: { answer: Answer }) {
  return (
    <div className="card bg-neutral text-neutral-content w-96">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{answer.answer}</h2>
      </div>
    </div>
  );
}

export default VotingCard;
