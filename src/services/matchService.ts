import api from "./api";
import { JobWithScore, CandidateWithScore, ApiResponse } from "../types";

// Get job matches for candidate
export const getJobMatches = async (): Promise<JobWithScore[]> => {
  const response = await api.get<ApiResponse<JobWithScore[]>>("/matching/jobs");

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to get job matches");
};

// Get candidate matches for a job
export const getCandidateMatches = async (
  jobId: number
): Promise<CandidateWithScore[]> => {
  const response = await api.get<ApiResponse<CandidateWithScore[]>>(
    `/matching/jobs/${jobId}/candidates`
  );

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to get candidate matches");
};

// Apply to a job
export const applyToJob = async (jobId: number): Promise<void> => {
  const response = await api.post<ApiResponse<{ success: boolean }>>(
    `/matching/jobs/${jobId}/apply`
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to apply for job");
  }
};

// Show interest in a candidate
export const showInterestInCandidate = async (
  jobId: number,
  candidateId: number
): Promise<void> => {
  const response = await api.post<ApiResponse<{ success: boolean }>>(
    `/matching/jobs/${jobId}/candidates/${candidateId}/interest`
  );

  if (!response.data.success) {
    throw new Error(
      response.data.message || "Failed to show interest in candidate"
    );
  }
};
