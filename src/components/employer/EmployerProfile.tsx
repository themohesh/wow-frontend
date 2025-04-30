import React from "react";
import { Link } from "react-router-dom";
import { EmployerProfile as EmployerProfileType } from "../../types";
import { formatDate } from "../../utils/dateUtils";
import Card from "../common/Card";
import Button from "../common/Button";

interface EmployerProfileProps {
  profile: EmployerProfileType;
}

const EmployerProfile: React.FC<EmployerProfileProps> = ({ profile }) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold">{profile.company_name}</h2>
          {profile.industry && (
            <p className="text-gray-600">{profile.industry}</p>
          )}
        </div>
        <Link to="/employer/profile/edit">
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </Link>
      </div>

      {profile.description && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">About Company</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {profile.description}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {profile.location && (
          <div>
            <h3 className="text-sm font-medium text-gray-700">Location</h3>
            <p className="text-gray-600">{profile.location}</p>
          </div>
        )}

        {profile.website && (
          <div>
            <h3 className="text-sm font-medium text-gray-700">Website</h3>
            <a
              href={
                profile.website.startsWith("http")
                  ? profile.website
                  : `https://${profile.website}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-800"
            >
              {profile.website}
            </a>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500 mt-4">
        Last updated: {formatDate(profile.updated_at)}
      </div>
    </Card>
  );
};

export default EmployerProfile;
