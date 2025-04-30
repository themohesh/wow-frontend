import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { login } from "../../services/authService";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import Card from "../common/Card";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      console.log("Login response:", response);
      loginContext(response.user, response.token);

      // Redirect based on user type
      if (response.user.userType === "candidate") {
        navigate("/candidate/dashboard");
      } else {
        navigate("/employer/dashboard");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Login to JobMatch</h2>

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
          className="mb-6"
        />

        <Button type="submit" variant="primary" disabled={isLoading} fullWidth>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary-600 hover:text-primary-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default LoginForm;
