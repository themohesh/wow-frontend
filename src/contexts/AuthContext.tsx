import React, { createContext, useReducer, useEffect } from "react";
import { User, AuthState } from "../types";
import { getToken, setToken, removeToken } from "../utils/tokenUtils";
import { getCurrentUser } from "../services/authService";

// Initial state
const initialState: AuthState = {
  user: null,
  token: getToken(),
  isAuthenticated: !!getToken(),
  isLoading: true,
  error: null,
};

// Action types
type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGOUT" }
  | { type: "AUTH_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "LOADING" }
  | { type: "LOADING_COMPLETE" };

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "LOADING_COMPLETE":
      return {
        ...state,
        isLoading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "AUTH_ERROR":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Context type
interface AuthContextProps {
  state: AuthState;
  login: (user: User, token: string) => void;
  logout: () => void;
  clearError: () => void;
}

// Create context
export const AuthContext = createContext<AuthContextProps>({
  state: initialState,
  login: () => {},
  logout: () => {},
  clearError: () => {},
});

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const loadUser = async () => {
      const token = getToken();

      if (!token) {
        dispatch({ type: "LOADING_COMPLETE" });
        return;
      }

      dispatch({ type: "LOADING" });

      try {
        const user = await getCurrentUser();
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token },
        });
      } catch {
        removeToken();
        dispatch({
          type: "AUTH_ERROR",
          payload: "Authentication error. Please login again.",
        });
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = (user: User, token: string) => {
    setToken(token);
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: { user, token },
    });
  };

  // Logout function
  const logout = () => {
    removeToken();
    dispatch({ type: "LOGOUT" });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};
