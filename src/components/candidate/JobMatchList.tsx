import React from "react";
import { JobWithScore } from "../../types";
import { timeAgo } from "../../utils/dateUtils";
import Card from "../common/Card";
import Button from "../common/Button";

interface JobMatchListProps {
  jobs: JobWithScore[];
  onApply: (jobId: number) => Promise<void>;
}

const JobMatchList: React.FC<JobMatchListProps> = ({ jobs, onApply }) => {
  const [applyingIds, setApplyingIds] = React.useState<number[]>([]);

  const handleApply = async (jobId: number) => {
    setApplyingIds((prev) => [...prev, jobId]);
    try {
      await onApply(jobId);
    } finally {
      setApplyingIds((prev) => prev.filter((id) => id !== jobId));
    }
  };

  if (jobs.length === 0) {
    return (
      <Card>
        <p className="text-gray-600 text-center py-4">
          No matching jobs found. Complete your profile to improve matching.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <Card key={job.id} className="hover:shadow-lg transition-shadow">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.company_name} • {job.location || "Remote"}
              </p>
            </div>
            <div className="flex items-start">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {Math.round(job.match_score * 100)}% Match
              </span>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-sm text-gray-600 line-clamp-3">
              {job.description}
            </p>
          </div>

          {job.requirements && (
            <div className="mt-3">
              <h4 className="text-sm font-medium text-gray-900">
                Requirements:
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {job.requirements}
              </p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Posted {timeAgo(job.created_at)}
            </div>
            <div>
              <Button
                size="sm"
                onClick={() => handleApply(job.id)}
                disabled={applyingIds.includes(job.id)}
              >
                {applyingIds.includes(job.id) ? "Applying..." : "Apply Now"}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default JobMatchList;
