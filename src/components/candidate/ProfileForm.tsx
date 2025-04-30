import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CandidateProfile, CandidateProfileFormData } from "../../types";
import FormInput from "../common/FormInput";
import TextArea from "../common/TextArea";
import Button from "../common/Button";

interface ProfileFormProps {
  initialData?: Partial<CandidateProfileFormData>;
  onSubmit: (data: CandidateProfileFormData) => Promise<CandidateProfile>;
  isEdit?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData = {},
  onSubmit,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<CandidateProfileFormData>({
    fullName: initialData.fullName || "",
    headline: initialData.headline || "",
    summary: initialData.summary || "",
    skills: initialData.skills || "",
    experience: initialData.experience || "",
    education: initialData.education || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      navigate("/candidate/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to save profile. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">
        {isEdit ? "Edit Your Profile" : "Create Your Profile"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput
          id="fullName"
          name="fullName"
          label="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="mb-4"
        />

        <FormInput
          id="headline"
          name="headline"
          label="Professional Headline"
          placeholder="e.g., Frontend Developer with 5 years experience"
          value={formData.headline}
          onChange={handleChange}
          className="mb-4"
        />

        <TextArea
          id="summary"
          name="summary"
          label="Professional Summary"
          value={formData.summary}
          onChange={handleChange}
          className="mb-4"
          rows={4}
        />

        <TextArea
          id="skills"
          name="skills"
          label="Skills"
          placeholder="e.g., JavaScript, React, Node.js, etc."
          value={formData.skills}
          onChange={handleChange}
          className="mb-4"
          rows={3}
        />

        <TextArea
          id="experience"
          name="experience"
          label="Work Experience"
          value={formData.experience}
          onChange={handleChange}
          className="mb-4"
          rows={5}
        />

        <TextArea
          id="education"
          name="education"
          label="Education"
          value={formData.education}
          onChange={handleChange}
          className="mb-4"
          rows={3}
        />

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/candidate/dashboard")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEdit
              ? "Save Changes"
              : "Create Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
