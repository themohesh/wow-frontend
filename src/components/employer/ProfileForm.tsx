import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../common/FormInput";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import { EmployerProfile, EmployerProfileFormData } from "@/types";

interface ProflefilwFormProps {
  onSubmit: (data: EmployerProfileFormData) => Promise<EmployerProfile>;
}

const ProfileForm = ({ onSubmit }: ProflefilwFormProps) => {
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    description: "",
    location: "",
    website: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      navigate("/employer/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to save profile. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput
          id="companyName"
          name="companyName"
          label="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="mb-4"
        />

        <FormInput
          id="industry"
          name="industry"
          label="Industry"
          placeholder="e.g., Technology, Healthcare, Finance"
          value={formData.industry}
          onChange={handleChange}
          className="mb-4"
        />

        <TextArea
          id="description"
          name="description"
          label="Company Description"
          value={formData.description}
          onChange={handleChange}
          className="mb-4"
          rows={4}
        />

        <FormInput
          id="location"
          name="location"
          label="Location"
          placeholder="e.g., San Francisco, CA"
          value={formData.location}
          onChange={handleChange}
          className="mb-4"
        />

        <FormInput
          id="website"
          name="website"
          label="Website"
          placeholder="e.g., https://yourcompany.com"
          value={formData.website}
          onChange={handleChange}
          className="mb-4"
        />

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/employer/dashboard")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Create Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
