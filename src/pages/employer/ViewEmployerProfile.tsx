import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { getEmployerProfile } from "../../services/employerService";
import { EmployerProfile as EmployerProfileType } from "../../types";
import Dashboard from "../../components/layout/Dashboard";
import EmployerProfile from "../../components/employer/EmployerProfile";
import Loading from "../../components/common/Loading";
import Button from "../../components/common/Button";

const ViewEmployerProfile: React.FC = () => {
  const {
    data: profile,
    loading,
    error,
  } = useFetch<EmployerProfileType>(getEmployerProfile);

  if (loading) {
    return (
      <Dashboard title="Company Profile">
        <Loading message="Loading your profile..." />
      </Dashboard>
    );
  }

  if (error) {
    return (
      <Dashboard title="Company Profile">
        <div className="p-4 text-red-600">Error loading profile: {error}</div>
      </Dashboard>
    );
  }

  if (!profile) {
    return (
      <Dashboard title="Company Profile">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            You haven't created a company profile yet
          </p>
          <Link to="/employer/profile/create">
            <Button>Create Company Profile</Button>
          </Link>
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard title="Company Profile">
      <EmployerProfile profile={profile} />
    </Dashboard>
  );
};

export default ViewEmployerProfile;
