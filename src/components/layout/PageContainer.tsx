import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  padding?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  padding = true,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} />
      <main className={`flex-grow ${padding ? "py-8" : ""}`}>
        <div
          className={`max-w-7xl mx-auto ${
            padding ? "px-4 sm:px-6 lg:px-8" : ""
          }`}
        >
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageContainer;
