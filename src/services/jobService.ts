import api from "./api";
import {
  JobListing,
  JobFormData,
  CandidateWithScore,
  ApiResponse,
} from "../types";

// Create job listing
export const createJob = async (data: JobFormData): Promise<JobListing> => {
  const response = await api.post<ApiResponse<JobListing>>("/jobs", {
    title: data.title,
    description: data.description,
    requirements: data.requirements,
    location: data.location,
    salaryRange: data.salaryRange,
    jobType: data.jobType,
  });

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to create job listing");
};

// Update job listing
export const updateJob = async (
  jobId: number,
  data: JobFormData
): Promise<JobListing> => {
  const response = await api.put<ApiResponse<JobListing>>(`/jobs/${jobId}`, {
    title: data.title,
    description: data.description,
    requirements: data.requirements,
    location: data.location,
    salaryRange: data.salaryRange,
    jobType: data.jobType,
  });

  if (response.data.success && response.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to update job listing");
};

// Delete job listing
export const deleteJob = async (jobId: number): Promise<void> => {
  const response = await api.delete<ApiResponse<{ success: boolean }>>(
    `/jobs/${jobId}`
  );

  if (!response.data.success) {
    throw new Error(response.data.message || "Failed to delete job listing");
  }
};

// Get job listing by ID
export const getJobById = async (jobId: number): Promise<JobListing> => {
  const response = await api.get<ApiResponse<JobListing>>(`/jobs/${jobId}`);

  if (response.data.success && response.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to get job listing");
};

// Get all jobs for employer
export const getEmployerJobs = async (): Promise<JobListing[]> => {
  const response = await api.get<ApiResponse<JobListing[]>>("/employer/jobs");

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to get job listings");
};

// Get all jobs
export const getAllJobs = async (): Promise<JobListing[]> => {
  const response = await api.get<ApiResponse<JobListing[]>>("/jobs");

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to get job listings");
};

// Get matching candidates for a job
export const getMatchingCandidates = async (
  jobId: number
): Promise<CandidateWithScore[]> => {
  const response = await api.get<ApiResponse<CandidateWithScore[]>>(
    `/matching/jobs/${jobId}/candidates`
  );

  if (response.data.success && response.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to get matching candidates");
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
