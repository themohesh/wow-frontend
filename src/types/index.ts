// Auth types
export interface User {
  id: number;
  email: string;
  userType: "candidate" | "employer";
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Candidate types
export interface CandidateProfile {
  id: number;
  user_id: number;
  full_name: string;
  headline?: string;
  summary?: string;
  skills?: string;
  experience?: string;
  education?: string;
  resume_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CandidateProfileFormData {
  fullName: string;
  headline: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
}

// Employer types
export interface EmployerProfile {
  id: number;
  user_id: number;
  company_name: string;
  industry?: string;
  description?: string;
  location?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

export interface EmployerProfileFormData {
  companyName: string;
  industry: string;
  description: string;
  location: string;
  website: string;
}

// Job types
export interface JobListing {
  id: number;
  employer_id: number;
  title: string;
  description: string;
  requirements?: string;
  location?: string;
  salary_range?: string;
  job_type?: "full-time" | "part-time" | "contract" | "internship";
  created_at: string;
  updated_at: string;
  company_name?: string;
}

export interface JobFormData {
  title: string;
  description: string;
  requirements: string;
  location: string;
  salaryRange: string;
  jobType: "full-time" | "part-time" | "contract" | "internship";
}

// Match types
export interface JobWithScore extends JobListing {
  match_score: number;
}

export interface CandidateWithScore extends CandidateProfile {
  match_score: number;
  email: string;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  userType: "candidate" | "employer";
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
