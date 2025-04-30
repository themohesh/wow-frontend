import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface DashboardProps {
  children: React.ReactNode;
  title: string;
}

const Dashboard: React.FC<DashboardProps> = ({ children, title }) => {
  const { state } = useAuth();
  const { pathname } = useLocation();

  const isCandidate = state.user?.userType === "candidate";

  const candidateLinks = [
    { name: "Dashboard", href: "/candidate/dashboard" },
    { name: "Job Matches", href: "/candidate/matches" },
    { name: "Profile", href: "/candidate/profile" },
  ];

  const employerLinks = [
    { name: "Dashboard", href: "/employer/dashboard" },
    { name: "My Jobs", href: "/employer/jobs" },
    { name: "Post a Job", href: "/employer/jobs/create" },
    { name: "Profile", href: "/employer/profile" },
  ];

  const navLinks = isCandidate ? candidateLinks : employerLinks;

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <nav className="bg-white shadow rounded-lg p-4">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={`block px-4 py-2 rounded-md ${
                        pathname === link.href
                          ? "bg-primary-100 text-primary-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
