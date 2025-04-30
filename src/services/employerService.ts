import api from "./api";
import {
  EmployerProfile,
  EmployerProfileFormData,
  ApiResponse,
} from "../types";

// Create employer profile
export const createEmployerProfile = async (
  data: EmployerProfileFormData
): Promise<EmployerProfile> => {
  const response = await api.post<ApiResponse<EmployerProfile>>(
    "/employer/profile",
    {
      companyName: data.companyName,
      industry: data.industry,
      description: data.description,
      location: data.location,
      website: data.website,
    }
  );

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to create profile");
};

// Update employer profile
export const updateEmployerProfile = async (
  data: EmployerProfileFormData
): Promise<EmployerProfile> => {
  const response = await api.put<ApiResponse<EmployerProfile>>(
    "/employer/profile",
    {
      companyName: data.companyName,
      industry: data.industry,
      description: data.description,
      location: data.location,
      website: data.website,
    }
  );

  if (response.data.success && response.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to update profile");
};

// Get employer profile
export const getEmployerProfile = async (): Promise<EmployerProfile> => {
  const response = await api.get<ApiResponse<EmployerProfile>>(
    "/employer/profile"
  );

  if (response.data.success && response.data.data) {
    return response.data.data;
  }

  throw new Error(response.data.message || "Failed to get profile");
};
