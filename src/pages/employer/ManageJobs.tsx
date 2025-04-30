import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { getEmployerJobs, deleteJob } from "../../services/jobService";
import { JobListing } from "../../types";
import Dashboard from "../../components/layout/Dashboard";
import JobListings from "../../components/employer/JobListings";
import Loading from "../../components/common/Loading";

const ManageJobs: React.FC = () => {
  const {
    data: jobs,
    loading,
    error,
    setData,
  } = useFetch<JobListing[]>(getEmployerJobs);

  const handleDelete = async (jobId: number) => {
    try {
      await deleteJob(jobId);

      // Update local state after successful deletion
      if (jobs) {
        setData(jobs.filter((job) => job.id !== jobId));
      }
    } catch (err) {
      console.error("Error deleting job:", err);
      // Error handling would go here
    }
  };

  return (
    <Dashboard title="Manage Jobs">
      {loading ? (
        <Loading message="Loading your job listings..." />
      ) : error ? (
        <div className="p-4 text-red-600">Error loading jobs: {error}</div>
      ) : (
        <JobListings jobs={jobs || []} onDelete={handleDelete} />
      )}
    </Dashboard>
  );
};

export default ManageJobs;
