import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JobFormData, JobListing } from "../../types";
import FormInput from "../common/FormInput";
import TextArea from "../common/TextArea";
import Button from "../common/Button";

interface JobFormProps {
  initialData?: Partial<JobFormData>;
  onSubmit: (data: JobFormData) => Promise<JobListing>;
  isEdit?: boolean;
}

const JobForm: React.FC<JobFormProps> = ({
  initialData = {},
  onSubmit,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<JobFormData>({
    title: initialData.title || "",
    description: initialData.description || "",
    requirements: initialData.requirements || "",
    location: initialData.location || "",
    salaryRange: initialData.salaryRange || "",
    jobType: initialData.jobType || "full-time",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      navigate("/employer/jobs");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to save job. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">
        {isEdit ? "Edit Job Listing" : "Create New Job Listing"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput
          id="title"
          name="title"
          label="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mb-4"
        />

        <TextArea
          id="description"
          name="description"
          label="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mb-4"
          rows={5}
        />

        <TextArea
          id="requirements"
          name="requirements"
          label="Requirements"
          value={formData.requirements}
          onChange={handleChange}
          className="mb-4"
          rows={3}
        />

        <FormInput
          id="location"
          name="location"
          label="Location"
          placeholder="e.g., San Francisco, CA or Remote"
          value={formData.location}
          onChange={handleChange}
          className="mb-4"
        />

        <FormInput
          id="salaryRange"
          name="salaryRange"
          label="Salary Range"
          placeholder="e.g., $80,000 - $100,000"
          value={formData.salaryRange}
          onChange={handleChange}
          className="mb-4"
        />

        <div className="mb-4">
          <label
            htmlFor="jobType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/employer/jobs")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEdit ? "Update Job" : "Post Job"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
