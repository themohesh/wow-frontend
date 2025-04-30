import React from "react";
import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/common/Button";

const NotFound: React.FC = () => {
  return (
    <PageContainer>
      <div className="text-center py-16">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </PageContainer>
  );
};

export default NotFound;
