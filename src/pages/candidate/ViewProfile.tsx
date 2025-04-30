import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { getCandidateProfile } from "../../services/candidateService";
import { CandidateProfile as CandidateProfileType } from "../../types";
import Dashboard from "../../components/layout/Dashboard";
import CandidateProfile from "../../components/candidate/CandidateProfile";
import ResumeUpload from "../../components/candidate/ResumeUpload";
import Loading from "../../components/common/Loading";
import Button from "../../components/common/Button";

const ViewProfile: React.FC = () => {
  const {
    data: profile,
    loading,
    error,
  } = useFetch<CandidateProfileType>(getCandidateProfile);

  if (loading) {
    return (
      <Dashboard title="Your Profile">
        <Loading message="Loading your profile..." />
      </Dashboard>
    );
  }

  if (error) {
    return (
      <Dashboard title="Your Profile">
        <div className="p-4 text-red-600">Error loading profile: {error}</div>
      </Dashboard>
    );
  }

  if (!profile) {
    return (
      <Dashboard title="Your Profile">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            You haven't created a profile yet
          </p>
          <Link to="/candidate/profile/create">
            <Button>Create Your Profile</Button>
          </Link>
        </div>
      </Dashboard>
    );
  }

  return (
    <Dashboard title="Your Profile">
      <div className="space-y-8">
        <CandidateProfile profile={profile} />
        <ResumeUpload />
      </div>
    </Dashboard>
  );
};

export default ViewProfile;
