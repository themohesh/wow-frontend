import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";

// Candidate pages
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import CreateProfile from "./pages/candidate/CreateProfile";
import ViewProfile from "./pages/candidate/ViewProfile";
import JobMatches from "./pages/candidate/JobMatches";

// Employer pages
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import ManageJobs from "./pages/employer/ManageJobs";
import CreateJob from "./pages/employer/CreateJob";
import CandidateMatches from "./pages/employer/CandidateMatches";
import ViewEmployerProfile from "./pages/employer/ViewEmployerProfile";
import CreatEmployerProfile from "./pages/employer/AddEmployeerProfile";

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: "candidate" | "employer";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredUserType,
}) => {
  const { state } = useAuth();

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredUserType && state.user?.userType !== requiredUserType) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Candidate routes */}
      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute requiredUserType="candidate">
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/profile"
        element={
          <ProtectedRoute requiredUserType="candidate">
            <ViewProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/profile/create"
        element={
          <ProtectedRoute requiredUserType="candidate">
            <CreateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/candidate/matches"
        element={
          <ProtectedRoute requiredUserType="candidate">
            <JobMatches />
          </ProtectedRoute>
        }
      />

      {/* Employer routes */}
      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute requiredUserType="employer">
            <EmployerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/profile"
        element={
          <ProtectedRoute requiredUserType="employer">
            <ViewEmployerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/jobs"
        element={
          <ProtectedRoute requiredUserType="employer">
            <ManageJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/jobs/create"
        element={
          <ProtectedRoute requiredUserType="employer">
            <CreateJob />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/profile/create"
        element={
          <ProtectedRoute requiredUserType="employer">
            <CreatEmployerProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/jobs/:jobId/candidates"
        element={
          <ProtectedRoute requiredUserType="employer">
            <CandidateMatches />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employer/jobs/:jobId/edit"
        element={
          <ProtectedRoute requiredUserType="employer">
            <CreateJob />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
