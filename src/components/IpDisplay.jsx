import React, { useState, useEffect } from "react";
import { Copy, CheckCircle2, Gauge, MapPin, Server, Clock } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { measureConnectionSpeed } from '../utils/speedTest';
import { Helmet } from 'react-helmet-async';

const IpDisplay = () => {
  const [ipData, setIpData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState(null);
  const [isTestingSpeed, setIsTestingSpeed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ipinfo.io/json");
        setIpData(response.data);
        
        // Store location data in session storage
        const locationData = {
          city: response.data.city,
          region: response.data.region,
          country: response.data.country
        };
        sessionStorage.setItem('locationData', JSON.stringify(locationData));
        
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };

    fetchData();
}, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testSpeed = async () => {
    setIsTestingSpeed(true);
    try {
      const speed = await measureConnectionSpeed();
      setConnectionSpeed(speed);
    } catch (error) {
      console.error('Speed test failed:', error);
    }
    setIsTestingSpeed(false);
  };

  // In the Network Performance Section, replace the existing content with:
  <div className="border rounded-lg p-4">
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-green-100 p-2 rounded-full">
        <Gauge className="w-5 h-5 text-green-600" />
      </div>
      <h3 className="text-lg font-semibold">Network Performance</h3>
    </div>

    {ipData && (
      <div className="grid grid-cols-1 gap-4">
        <StatBlock
          label="Organization"
          value={ipData.org}
          icon={<Server className="w-4 h-4" />}
        />
        <div className="mt-4">
          <button
            onClick={testSpeed}
            disabled={isTestingSpeed}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            {isTestingSpeed ? 'Testing...' : 'Test Connection Speed'}
          </button>
          {connectionSpeed && (
            <div className="mt-3">
              <StatBlock
                label="Connection Speed"
                value={`${connectionSpeed} Kbps`}
                icon={<Gauge className="w-4 h-4" />}
              />
            </div>
          )}
        </div>
      </div>
    )}
  </div>

  return (
    <>
     <Helmet>
                <title>Network Speed Analysis | Internet Speed Test Tool</title>
                <meta name="description" content="Test your internet connection speed with our comprehensive network analysis tool. Measure download speed, upload speed, and latency in real-time." />
                <meta name="keywords" content="speed test, network analysis, internet speed, bandwidth test, latency test, connection speed" />
                <meta property="og:title" content="Network Speed Analysis Tool" />
                <meta property="og:description" content="Measure your internet connection speed with our real-time network analysis tool." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Network Speed Analysis Tool" />
                <meta name="twitter:description" content="Comprehensive internet speed testing tool for measuring network performance." />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-4xl mx-auto"
    >
      {/* Header Section - remains the same */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IP Address Section */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Copy className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">IP Address Details</h3>
          </div>

          {ipData ? (
            <table className="w-full">
              <tbody>
                <TableRow
                  label="IP Address"
                  value={ipData.ip}
                  copyable
                  onCopy={copyToClipboard}
                  copied={copied}
                />
                <TableRow
                  label="Timezone"
                  value={ipData.timezone}
                />
                <TableRow
                  label="Postal Code"
                  value={ipData.postal}
                />
              </tbody>
            </table>
          ) : (
            <div className="space-y-4">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          )}
        </div>

        {/* Network Performance Section */}
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Server className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Network Information</h3>
          </div>

          {ipData ? (
            <div className="grid grid-cols-1 gap-4">
              <StatBlock
                label="Organization"
                value={ipData.org}
                icon={<Server className="w-4 h-4" />}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <SkeletonLoader />
            </div>
          )}
        </div>

        {/* Geolocation Section */}
        <div className="lg:col-span-2 border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-purple-100 p-2 rounded-full">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Geolocation Data</h3>
          </div>

          {ipData ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatBlock label="City" value={ipData.city} />
              <StatBlock label="Region" value={ipData.region} />
              <StatBlock label="Country" value={ipData.country} />
              <StatBlock label="Coordinates" value={ipData.loc} />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </div>
          )}
        </div>
      </div>

      {/* Footer remains the same */}
    </motion.div>
    <div className="min-h-[20vh] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8"></div>
    </>
  );
};

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="animate-pulse space-y-2">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

// Reusable Table Row Component
const TableRow = ({ label, value, copyable = false, onCopy, copied }) => (
  <tr className="border-b border-gray-100">
    <td className="py-2 pr-4 text-gray-600">{label}</td>
    <td className="py-2 font-mono text-blue-600 flex items-center justify-between">
      {value || "N/A"}
      {copyable && (
        <button
          onClick={() => onCopy(value)}
          className="ml-2 hover:text-blue-700"
        >
          {copied ? (
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      )}
    </td>
  </tr>
);

// Reusable Stat Block Component
const StatBlock = ({ label, value, icon }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-gray-500">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
    <div className="font-medium text-gray-800">{value || "N/A"}</div>
  </div>
);

export default IpDisplay;
