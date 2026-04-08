import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AdUnit = ({ slot, format, className = "" }) => {
  const adRef = useRef(null);

  useEffect(() => {
    // Flag to prevent double execution in React Strict Mode
    let isMounted = true; 

    const loadAd = () => {
      try {
        if (window.adsbygoogle && isMounted) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        console.error("AdSense error:", error);
      }
    };

    // Use a small timeout to let the DOM settle, helping Adsense find the element
    const timeoutId = setTimeout(() => {
      if (adRef.current && adRef.current.innerHTML === "") {
        loadAd();
      }
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [slot]);

  return (
    <div className={`ad-container ${className} overflow-hidden`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.REACT_APP_ADSENSE_CLIENT_ID || "ca-pub-4253403965713620"}
        data-ad-slot={slot || "auto"}
        data-ad-format={format || "auto"}
        data-full-width-responsive="true"
      />
    </div>
  );
};

AdUnit.propTypes = {
  slot: PropTypes.string.isRequired,
  format: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default AdUnit;
