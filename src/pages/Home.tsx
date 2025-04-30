import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PageContainer from "../components/layout/PageContainer";

const Home: React.FC = () => {
  const { state } = useAuth();

  return (
    <PageContainer padding={false}>
      {/* Hero Section */}
      <div className="bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl text-black font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Find The Perfect Match
            </h1>
            <p className="mt-4 text-black text-xl text-primary-100 max-w-2xl mx-auto">
              AI-powered job matching to connect the right candidates with the
              right employers.
            </p>
            <div className="mt-10 flex justify-center">
              {!state.isAuthenticated ? (
                <div className="space-x-4">
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-black hover:bg-primary-50"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-primary-800"
                  >
                    Log In
                  </Link>
                </div>
              ) : (
                <Link
                  to={
                    state.user?.userType === "candidate"
                      ? "/candidate/dashboard"
                      : "/employer/dashboard"
                  }
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-black hover:bg-primary-50"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How It Works
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* For Job Seekers */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                For Job Seekers
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Create your profile and upload your resume</li>
                <li>• Our AI analyzes your skills and experience</li>
                <li>• Get matched with relevant job opportunities</li>
                <li>• Apply directly through the platform</li>
              </ul>
            </div>

            {/* For Employers */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                For Employers
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Post detailed job listings</li>
                <li>• Our AI finds the best candidate matches</li>
                <li>• Review candidate profiles with match scores</li>
                <li>• Connect with promising candidates</li>
              </ul>
            </div>

            {/* AI Matching */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                AI Matching
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>• Advanced vector embeddings technology</li>
                <li>• Semantic understanding of skills & requirements</li>
                <li>• Beyond simple keyword matching</li>
                <li>• Continuously improving algorithms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to find your perfect match?</span>
            <span className="block text-primary-600">Join JobMatch today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-primary-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;
