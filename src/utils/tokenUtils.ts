// Store token in localStorage
export const setToken = (token: string): void => {
  localStorage.setItem("job_match_token", token);
};

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem("job_match_token");
};

// Remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem("job_match_token");
};
