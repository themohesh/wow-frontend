import api from "./api";
import {
  CandidateProfile,
  CandidateProfileFormData,
  JobWithScore,
  ApiResponse,
} from "../types";

// Create candidate profile
export const createCandidateProfile = async (
  data: CandidateProfileFormData
): Promise<CandidateProfile> => {
  const response = await api.post<ApiResponse<CandidateProfile>>(
    "/candidate/profile",
    {
      fullName: data.fullName,
      headline: data.headline,
      summary: data.summary,
      skills: data.skills,
      experience: data.experience,
      education: data.education,
    }
  );

  if (response.data.success && response.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to create profile");
};

// Update candidate profile
export const updateCandidateProfile = async (
  data: CandidateProfileFormData
): Promise<CandidateProfile> => {
  const response = await api.put<ApiResponse<CandidateProfile>>(
    "/candidate/profile",
    {
      fullName: data.fullName,
      headline: data.headline,
      summary: data.summary,
      skills: data.skills,
      experience: data.experience,
      education: data.education,
    }
  );

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to update profile");
};

// Get candidate profile
export const getCandidateProfile = async (): Promise<CandidateProfile> => {
  const response = await api.get<ApiResponse<CandidateProfile>>(
    "/candidate/profile"
  );
  console.log("candidate profile response", response);

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to get profile");
};

// Upload resume
export const uploadResume = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await api.post<ApiResponse<{ resumeUrl: string }>>(
    "/candidate/resume",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (response.data.success && response.data) {
    return response.data.data.resumeUrl;
  }

  throw new Error(response.data.message || "Failed to upload resume");
};

// Get matching jobs
export const getMatchingJobs = async (): Promise<JobWithScore[]> => {
  const response = await api.get<ApiResponse<JobWithScore[]>>(
    "/candidate/matches"
  );

  if (response.data.success && response.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to get matching jobs");
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
