import React, { useState } from "react";
import { CandidateWithScore } from "../../types";
import Card from "../common/Card";
import Button from "../common/Button";

interface CandidateMatchListProps {
  candidates: CandidateWithScore[];
  onShowInterest: (candidateId: number) => Promise<void>;
}

const CandidateMatchList: React.FC<CandidateMatchListProps> = ({
  candidates,
  onShowInterest,
}) => {
  const [interestedIds, setInterestedIds] = useState<number[]>([]);

  const handleShowInterest = async (candidateId: number) => {
    setInterestedIds((prev) => [...prev, candidateId]);
    try {
      await onShowInterest(candidateId);
    } finally {
      setInterestedIds((prev) => prev.filter((id) => id !== candidateId));
    }
  };

  if (candidates.length === 0) {
    return (
      <Card>
        <p className="text-gray-600 text-center py-4">
          No matching candidates found yet. Check back later.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {candidate.full_name}
              </h3>
              <p className="text-sm text-gray-600">
                {candidate.headline || "Candidate"}
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {Math.round(candidate.match_score * 100)}% Match
              </span>
            </div>
          </div>

          <div className="mt-3">
            {candidate.summary && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {candidate.summary}
              </p>
            )}
          </div>

          {candidate.skills && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-gray-900">Skills:</h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {candidate.skills}
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-end">
            <Button
              size="sm"
              onClick={() => handleShowInterest(candidate.id)}
              disabled={interestedIds.includes(candidate.id)}
            >
              {interestedIds.includes(candidate.id)
                ? "Processing..."
                : "Interested"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CandidateMatchList;
