import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { getCandidateProfile } from "../../services/candidateService";
import { getMatchingJobs } from "../../services/candidateService";
import { CandidateProfile, JobWithScore } from "../../types";
import Dashboard from "../../components/layout/Dashboard";
import Loading from "../../components/common/Loading";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const CandidateDashboard: React.FC = () => {
  const {
    data: profile,
    loading: profileLoading,

  } = useFetch<CandidateProfile>(getCandidateProfile);

  const {
    data: jobs,
    loading: jobsLoading,
  } = useFetch<JobWithScore[]>(getMatchingJobs);

  const isLoading = profileLoading || jobsLoading;
  if (isLoading) {
    return (
      <Dashboard title="Candidate Dashboard">
        <Loading message="Loading your dashboard..." />
      </Dashboard>
    );
  }



  const hasProfile = !!profile;
  const hasResumeUploaded = !!profile?.resume_url;

  return (
    <Dashboard title="Candidate Dashboard">
      <div className="space-y-8">
        {/* Profile Status */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Profile Status</h2>
          <div className="space-y-4">
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
                <h3 className="font-medium">Profile Information</h3>
                <p className="text-sm text-gray-600">
                  {hasProfile
                    ? "Your profile is complete."
                    : "Complete your profile to improve matching."}
                </p>
              </div>
              <div className="ml-auto">
                {hasProfile ? (
                  <Link to="/candidate/profile">
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </Link>
                ) : (
                  <Link to="/candidate/profile/create">
                    <Button size="sm">Complete Profile</Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center mr-3 ${
                  hasResumeUploaded
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {hasResumeUploaded ? "✓" : "!"}
              </div>
              <div>
                <h3 className="font-medium">Resume Upload</h3>
                <p className="text-sm text-gray-600">
                  {hasResumeUploaded
                    ? "Your resume has been uploaded."
                    : "Upload your resume to improve matching."}
                </p>
              </div>
              <div className="ml-auto">
                {hasResumeUploaded ? (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      View Resume
                    </Button>
                  </a>
                ) : (
                  <Link to="/candidate/profile">
                    <Button size="sm">Upload Resume</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Job Matches Preview */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Job Matches</h2>
            <Link to="/candidate/matches">
              <Button variant="outline" size="sm">
                View All Matches
              </Button>
            </Link>
          </div>

          {jobs && jobs.length > 0 ? (
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
                        {job.company_name} • {job.location || "Remote"}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {Math.round(job.match_score * 100)}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No job matches found yet. Complete your profile to get matches.
            </p>
          )}
        </Card>
      </div>
    </Dashboard>
  );
};

export default CandidateDashboard;
