import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const AdUnit = ({ slot, format, className = "" }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const loadAd = () => {
      try {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        console.error("AdSense error:", error);
      }
    };

    if (adRef.current && adRef.current.innerHTML === "") {
      loadAd();
    }
  }, [slot]);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.REACT_APP_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
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
