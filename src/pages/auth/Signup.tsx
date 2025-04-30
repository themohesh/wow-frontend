import React from "react";
import PageContainer from "../../components/layout/PageContainer";
import SignupForm from "../../components/auth/SignupForm";

const Signup: React.FC = () => {
  return (
    <PageContainer title="Create an Account">
      <div className="max-w-md mx-auto">
        <SignupForm />
      </div>
    </PageContainer>
  );
};

export default Signup;
