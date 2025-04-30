import React from "react";
import { Link } from "react-router-dom";
import { CandidateProfile as CandidateProfileType } from "../../types";
import { formatDate } from "../../utils/dateUtils";
import Card from "../common/Card";
import Button from "../common/Button";

interface CandidateProfileProps {
  profile: CandidateProfileType;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({ profile }) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">{profile.full_name}</h2>
          {profile.headline && (
            <p className="text-gray-600">{profile.headline}</p>
          )}
        </div>
        <Link to="/candidate/profile/edit">
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </Link>
      </div>

      {profile.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Summary</h3>
          <p className="text-gray-700 whitespace-pre-line">{profile.summary}</p>
        </div>
      )}

      {profile.skills && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Skills</h3>
          <p className="text-gray-700 whitespace-pre-line">{profile.skills}</p>
        </div>
      )}

      {profile.experience && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Experience</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {profile.experience}
          </p>
        </div>
      )}

      {profile.education && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Education</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {profile.education}
          </p>
        </div>
      )}

      {profile.resume_url && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Resume</h3>
          <a
            href={profile.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800"
          >
            View Resume
          </a>
        </div>
      )}

      <div className="text-sm text-gray-500 mt-4">
        Last updated: {formatDate(profile.updated_at)}
      </div>
    </Card>
  );
};

export default CandidateProfile;
