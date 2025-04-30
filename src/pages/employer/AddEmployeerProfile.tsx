import React from "react";
import Dashboard from "../../components/layout/Dashboard";
import ProfileForm from "@/components/employer/ProfileForm";
import { createEmployerProfile } from "@/services/employerService";

const CreatEmployerProfile: React.FC = () => {
  return (
    <Dashboard title="Complete Your Profile">
      <ProfileForm onSubmit={createEmployerProfile} />
    </Dashboard>
  );
};

export default CreatEmployerProfile;
