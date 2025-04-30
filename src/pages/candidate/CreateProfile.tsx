import React from "react";
import { createCandidateProfile } from "../../services/candidateService";
import ProfileForm from "../../components/candidate/ProfileForm";
import Dashboard from "../../components/layout/Dashboard";

const CreateProfile: React.FC = () => {
  return (
    <Dashboard title="Create Profile">
      <ProfileForm onSubmit={createCandidateProfile} />
    </Dashboard>
  );
};

export default CreateProfile;
