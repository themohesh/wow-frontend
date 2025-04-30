import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {
  getMatchingCandidates,
  showInterestInCandidate,
} from "../../services/jobService";
import { getJobById } from "../../services/jobService";
import { CandidateWithScore, JobListing } from "../../types";
import Dashboard from "../../components/layout/Dashboard";
import CandidateMatchList from "../../components/employer/CandidateMatchList";
import Card from "../../components/common/Card";
import Loading from "../../components/common/Loading";

const CandidateMatches: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const numericJobId = parseInt(jobId || "0");

  const {
    data: job,
    loading: jobLoading,
    error: jobError,
  } = useFetch<JobListing>(() => getJobById(numericJobId));

  const {
    data: candidates,
    loading: candidatesLoading,
    error: candidatesError,
  } = useFetch<CandidateWithScore[]>(() => getMatchingCandidates(numericJobId));

  const [interestStatus, setInterestStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  const isLoading = jobLoading || candidatesLoading;
  const error = jobError || candidatesError;

  const handleShowInterest = async (candidateId: number) => {
    try {
      await showInterestInCandidate(numericJobId, candidateId);
      setInterestStatus({
        message: "Interest shown successfully!",
        isError: false,
      });

      // Clear status after a delay
      setTimeout(() => setInterestStatus(null), 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setInterestStatus({
          message: err.message || "Failed to show interest in candidate",
          isError: true,
        });
      }
      // Clear status after a delay
      setTimeout(() => setInterestStatus(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <Dashboard title="Matching Candidates">
        <Loading message="Loading candidates..." />
      </Dashboard>
    );
  }

  if (error) {
    return (
      <Dashboard title="Matching Candidates">
        <div className="p-4 text-red-600">Error loading data: {error}</div>
      </Dashboard>
    );
  }

  return (
    <Dashboard title="Matching Candidates">
      {interestStatus && (
        <div
          className={`mb-4 p-3 rounded-md ${
            interestStatus.isError
              ? "bg-red-50 text-red-700"
              : "bg-green-50 text-green-700"
          }`}
        >
          {interestStatus.message}
        </div>
      )}

      {job && (
        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-2">{job.title}</h2>
          <p className="text-gray-600">
            {job.location || "Remote"} •{" "}
            {job.job_type && job.job_type.replace("-", " ")}
          </p>
          {job.salary_range && (
            <p className="text-gray-600">Salary: {job.salary_range}</p>
          )}
          <div className="mt-3">
            <h3 className="font-medium">Description</h3>
            <p className="text-gray-700 mt-1">{job.description}</p>
          </div>
          {job.requirements && (
            <div className="mt-3">
              <h3 className="font-medium">Requirements</h3>
              <p className="text-gray-700 mt-1">{job.requirements}</p>
            </div>
          )}
        </Card>
      )}

      <h3 className="text-lg font-medium mb-4">Matching Candidates</h3>

      <CandidateMatchList
        candidates={candidates || []}
        onShowInterest={handleShowInterest}
      />
    </Dashboard>
  );
};

export default CandidateMatches;
