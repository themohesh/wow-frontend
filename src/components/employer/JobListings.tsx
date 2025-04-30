import React, { useState } from "react";
import { Link } from "react-router-dom";
import { JobListing } from "../../types";
import {  timeAgo } from "../../utils/dateUtils";
import Card from "../common/Card";
import Button from "../common/Button";

interface JobListingsProps {
  jobs: JobListing[];
  onDelete: (jobId: number) => Promise<void>;
}

const JobListings: React.FC<JobListingsProps> = ({ jobs, onDelete }) => {
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const handleDelete = async (jobId: number) => {
    if (confirm("Are you sure you want to delete this job?")) {
      setDeletingIds((prev) => [...prev, jobId]);
      try {
        await onDelete(jobId);
      } finally {
        setDeletingIds((prev) => prev.filter((id) => id !== jobId));
      }
    }
  };

  if (jobs.length === 0) {
    return (
      <Card>
        <div className="text-center py-4">
          <p className="text-gray-600 mb-4">You haven't posted any jobs yet</p>
          <Link to="/employer/jobs/create">
            <Button>Post Your First Job</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Job Listings</h2>
        <Link to="/employer/jobs/create">
          <Button>Post New Job</Button>
        </Link>
      </div>

      {jobs.map((job) => (
        <Card key={job.id}>
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600">
                {job.location || "Remote"} • {job.job_type?.replace("-", " ")}
              </p>
            </div>
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {job.job_type}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <p className="text-sm text-gray-600 line-clamp-2">
              {job.description}
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-gray-500">
              Posted {timeAgo(job.created_at)}
            </div>
            <div className="flex space-x-2">
              <Link to={`/employer/jobs/${job.id}/candidates`}>
                <Button size="sm" variant="outline">
                  View Matches
                </Button>
              </Link>
              <Link to={`/employer/jobs/${job.id}/edit`}>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </Link>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleDelete(job.id)}
                disabled={deletingIds.includes(job.id)}
              >
                {deletingIds.includes(job.id) ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default JobListings;
