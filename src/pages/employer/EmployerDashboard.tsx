import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { getEmployerProfile } from "../../services/employerService";
import { getEmployerJobs } from "../../services/jobService";
import { EmployerProfile, JobListing } from "../../types";
import Dashboard from "../../components/layout/Dashboard";
import Loading from "../../components/common/Loading";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const EmployerDashboard: React.FC = () => {
  const { data: profile, loading: profileLoading } =
    useFetch<EmployerProfile>(getEmployerProfile);

  const { data: jobs, loading: jobsLoading } =
    useFetch<JobListing[]>(getEmployerJobs);

  const isLoading = profileLoading || jobsLoading;
  if (isLoading) {
    return (
      <Dashboard title="Employer Dashboard">
        <Loading message="Loading your dashboard..." />
      </Dashboard>
    );
  }

  const hasProfile = !!profile;
  const hasJobs = jobs && jobs.length > 0;

  return (
    <Dashboard title="Employer Dashboard">
      <div className="space-y-8">
        {/* Profile Status */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Profile Status</h2>
          <div className="flex items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center mr-3 ${
                hasProfile
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {hasProfile ? "✓" : "!"}
            </div>
            <div>
              <h3 className="font-medium">Company Profile</h3>
              <p className="text-sm text-gray-600">
                {hasProfile
                  ? "Your company profile is complete."
                  : "Complete your company profile to attract candidates."}
              </p>
            </div>
            <div className="ml-auto">
              {hasProfile ? (
                <Link to="/employer/profile">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </Link>
              ) : (
                <Link to="/employer/profile/create">
                  <Button size="sm">Complete Profile</Button>
                </Link>
              )}
            </div>
          </div>
        </Card>

        {/* Job Listings */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Job Listings</h2>
            <Link to="/employer/jobs/create">
              <Button size="sm">Post a New Job</Button>
            </Link>
          </div>

          {hasJobs ? (
            <div className="space-y-4">
              {jobs.slice(0, 3).map((job) => (
                <div
                  key={job.id}
                  className="border-b last:border-b-0 pb-4 last:pb-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <p className="text-sm text-gray-600">
                        {job.location || "Remote"} •{" "}
                        {job.job_type && job.job_type.replace("-", " ")}
                      </p>
                    </div>
                    <Link to={`/employer/jobs/${job.id}/candidates`}>
                      <Button variant="outline" size="sm">
                        View Candidates
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}

              {jobs.length > 3 && (
                <div className="text-center mt-4">
                  <Link
                    to="/employer/jobs"
                    className="text-primary-600 hover:text-primary-800"
                  >
                    View all {jobs.length} job listings
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-600 mb-4">
                You haven't posted any jobs yet
              </p>
              <Link to="/employer/jobs/create">
                <Button>Post Your First Job</Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Quick Stats */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">
                {jobs?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Active Job Listings</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">0</div>
              <div className="text-sm text-gray-600">Candidates Applied</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-primary-600">0</div>
              <div className="text-sm text-gray-600">Matches Made</div>
            </div>
          </div>
        </Card>
      </div>
    </Dashboard>
  );
};

export default EmployerDashboard;
