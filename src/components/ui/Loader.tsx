import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" role="status" aria-live="polite">
      <div className="w-24 h-24 border-8 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
