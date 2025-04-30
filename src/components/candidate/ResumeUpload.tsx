import React, { useState } from "react";
// import { uploadResume } from "../../services/candidateService";
import Button from "../common/Button";
import Card from "../common/Card";

const ResumeUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setSuccessMessage(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      //   const resumeUrl = await uploadResume(file);
      setSuccessMessage("Resume uploaded successfully!");
      setFile(null);
      // Reset the file input
      const fileInput = document.getElementById("resume") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to upload resume. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-medium mb-4">Upload Your Resume</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <label
            htmlFor="resume"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Resume (PDF, DOC, DOCX)
          </label>
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-primary-50 file:text-primary-700
              hover:file:bg-primary-100"
          />
          <p className="mt-1 text-sm text-gray-500">
            Your resume will be used to improve job matching results
          </p>
        </div>

        <Button type="submit" disabled={isUploading || !file}>
          {isUploading ? "Uploading..." : "Upload Resume"}
        </Button>
      </form>
    </Card>
  );
};

export default ResumeUpload;
