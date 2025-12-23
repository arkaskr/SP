// Loading.tsx
import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-xl text-gray-700">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
