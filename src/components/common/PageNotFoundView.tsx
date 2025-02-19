// PageNotFoundView.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFoundView: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 返回到上一个页面
  };

  const handleHomePage = () => {
    navigate("/"); // 跳转到主页
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-semibold text-red-600">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-4">Oops! The page you are looking for does not exist.</p>
      <div className="mt-6">
        <button onClick={handleGoBack} className="mr-4 px-6 py-2 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
          Go Back
        </button>
        <button onClick={handleHomePage} className="px-6 py-2 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFoundView;
