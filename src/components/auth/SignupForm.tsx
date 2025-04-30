import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { signup } from "../../services/authService";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import Card from "../common/Card";

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"candidate" | "employer">(
    "candidate"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup({
        email,
        password,
        confirmPassword,
        userType,
      });

      loginContext(response.user, response.token);

      // Redirect to profile creation page based on user type
      if (userType === "candidate") {
        navigate("/candidate/profile/create");
      } else {
        navigate("/employer/profile/create");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to sign up. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Your Account
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          name="email"
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4"
        />

        <FormInput
          id="password"
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4"
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mb-6"
        />

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            I am a:
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-primary-600"
                checked={userType === "candidate"}
                onChange={() => setUserType("candidate")}
              />
              <span className="ml-2">Job Seeker</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-primary-600"
                checked={userType === "employer"}
                onChange={() => setUserType("employer")}
              />
              <span className="ml-2">Employer</span>
            </label>
          </div>
        </div>

        <Button type="submit" variant="primary" disabled={isLoading} fullWidth>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 hover:text-primary-500">
            Login
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default SignupForm;
