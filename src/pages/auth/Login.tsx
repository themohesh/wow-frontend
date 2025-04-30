import React from "react";
import PageContainer from "../../components/layout/PageContainer";
import LoginForm from "../../components/auth/LoginForm";

const Login: React.FC = () => {
  return (
    <PageContainer title="Login">
      <div className="max-w-md mx-auto">
        <LoginForm />
      </div>
    </PageContainer>
  );
};

export default Login;
