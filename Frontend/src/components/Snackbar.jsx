import React, { useEffect } from "react";

const Snackbar = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // Auto-close after 4 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 px-4 py-2 text-white rounded shadow-lg ${getBackgroundColor()}`}
    >
      {message}
    </div>
  );
};

export default Snackbar;