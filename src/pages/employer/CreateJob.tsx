import React from "react";
import { createJob } from "../../services/jobService";
import JobForm from "../../components/employer/JobForm";
import Dashboard from "../../components/layout/Dashboard";

const CreateJob: React.FC = () => {
  return (
    <Dashboard title="Post a New Job">
      <JobForm onSubmit={createJob} />
    </Dashboard>
  );
};

export default CreateJob;
