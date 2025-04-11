import React, { useState } from "react";

const CookieConsent = () => {
  const [consent, setConsent] = useState(
    localStorage.getItem("cookieConsent") === "accepted"
  );

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setConsent(true);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setConsent(true);
  };

  if (consent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 md:p-6 z-50">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-gray-600 text-center md:text-left">
          <p className="text-sm md:text-base">
            We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
