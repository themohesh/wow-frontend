import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { getMatchingJobs, applyToJob } from "../../services/candidateService";
import { JobWithScore } from "../../types";
import Dashboard from "../../components/layout/Dashboard";
import JobMatchList from "../../components/candidate/JobMatchList";
import Loading from "../../components/common/Loading";

const JobMatches: React.FC = () => {
  const {
    data: jobs,
    loading,
    error,
    setData,
  } = useFetch<JobWithScore[]>(getMatchingJobs);
  const [applyStatus, setApplyStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const handleApply = async (jobId: number) => {
    try {
      await applyToJob(jobId);
      setApplyStatus({
        message: "Application submitted successfully!",
        isError: false,
      });

      // Optionally update UI to show the job has been applied to
      if (jobs) {
        const updatedJobs = jobs.map((job) =>
          job.id === jobId ? { ...job, applied: true } : job
        );
        setData(updatedJobs);
      }

      // Clear status after a delay
      setTimeout(() => setApplyStatus(null), 3000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to apply for job";
      setApplyStatus({
        message: errorMessage,
        isError: true,
      });

      // Clear status after a delay
      setTimeout(() => setApplyStatus(null), 3000);
    }
  };

  return (
    <Dashboard title="Job Matches">
      {applyStatus && (
        <div
          className={`mb-4 p-3 rounded-md ${
            applyStatus.isError
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {applyStatus.message}
        </div>
      )}

      {loading ? (
        <Loading message="Finding your job matches..." />
      ) : error ? (
        <div className="p-4 text-red-600">
          Error loading job matches: {error}
        </div>
      ) : (
        <JobMatchList jobs={jobs || []} onApply={handleApply} />
      )}
    </Dashboard>
  );
};

export default JobMatches;
