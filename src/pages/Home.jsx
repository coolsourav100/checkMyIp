import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { saveToHistory } from '../utils/history';
import AdUnit from '../components/ads/AdUnit';

const Home = () => {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [pingData, setPingData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const startTime = performance.now();
      const response = await axios.get("https://ipinfo.io/json");
      const endTime = performance.now();
      
      setIpData(response.data);
      setPingData(Math.round(endTime - startTime));
      
      saveToHistory('IP Lookup', response.data.ip, `${response.data.city}, ${response.data.country}`);

      // Store location data in session storage
      const locationData = {
        city: response.data.city,
        region: response.data.region,
        country: response.data.country
      };
      sessionStorage.setItem('locationData', JSON.stringify(locationData));
    } catch (error) {
      console.error("Data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCopy = () => {
    if (ipData?.ip) {
      navigator.clipboard.writeText(ipData.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getAsnAndOrg = (orgString) => {
    if (!orgString) return { asn: 'N/A', org: 'N/A' };
    const match = orgString.match(/^(AS\d+)\s+(.+)$/);
    if (match) {
      return { asn: match[1], org: match[2] };
    }
    return { asn: 'N/A', org: orgString };
  };

  const { asn, org } = getAsnAndOrg(ipData?.org);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 sm:pb-20">
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Left Sidebar Ad Area */}
        <aside className="hidden xl:block w-[300px] shrink-0 sticky top-28">
          <div className="w-[300px] min-h-[600px] bg-surface-container-low flex flex-col items-center justify-center rounded-xl relative overflow-hidden border border-outline-variant/10">
            <span className="font-label text-[10px] uppercase tracking-widest text-outline absolute top-2 left-4 z-10">Advertisement</span>
            <AdUnit slot="auto" format="vertical" className="w-[300px] h-[600px] z-20 mix-blend-multiply" />
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 space-y-12 min-w-0">
          {/* Hero IP Card */}
          <section className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[2rem] blur-2xl group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-surface-container-lowest rounded-xl p-5 sm:p-8 md:p-10 ambient-shadow overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-4 py-1.5 rounded-full font-label text-xs font-bold mb-6">
                    <span className={`w-2 h-2 rounded-full ${loading ? 'bg-outline animate-pulse' : 'bg-secondary animate-pulse'}`}></span>
                    {loading ? 'DETECTING CONNECTION...' : 'YOUR PUBLIC IP ADDRESS'}
                  </span>
                  <h1 className="font-headline text-3xl sm:text-5xl md:text-7xl font-bold text-primary tracking-tighter leading-none mb-4 min-h-[40px] sm:min-h-[72px] break-all sm:break-normal">
                    {loading ? 'Retrieving...' : ipData?.ip || 'Unknown IP'}
                  </h1>
                  <p className="text-on-surface-variant font-body text-sm sm:text-lg max-w-md min-h-[40px] sm:min-h-[56px]">
                    {loading ? 'Analyzing your connection route and geolocation data...' : `Your connection is routed through ${ipData?.city || 'Unknown'}, ${ipData?.region || 'Unknown'}.`}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button onClick={handleCopy} className="glass-overlay p-3 sm:p-4 rounded-xl text-primary hover:bg-primary-fixed transition-colors ambient-shadow flex items-center gap-2 group/btn active:scale-95">
                    <span className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
                    <span className="font-bold text-xs sm:text-sm tracking-tight">{copied ? 'Copied!' : 'Copy Address'}</span>
                  </button>
                  <button onClick={fetchData} className="glass-overlay p-3 sm:p-4 rounded-xl text-primary hover:bg-primary-fixed transition-colors ambient-shadow active:scale-95 group" title="Refresh">
                    <span className={`material-symbols-outlined ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`}>refresh</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Data Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {/* Geolocation Card */}
            <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-8 ambient-shadow flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-headline text-2xl font-bold tracking-tight text-primary">Geolocation Data</h3>
                <span className="material-symbols-outlined text-secondary">location_on</span>
              </div>
              <div className="space-y-6 flex-1">
                <div className="flex justify-between items-center group">
                  <span className="font-label text-sm text-on-surface-variant font-medium">City</span>
                  <span className="font-body text-on-surface font-bold text-right group-hover:text-primary transition-colors">{loading ? '...' : ipData?.city || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="font-label text-sm text-on-surface-variant font-medium">Region</span>
                  <span className="font-body text-on-surface font-bold text-right group-hover:text-primary transition-colors">{loading ? '...' : ipData?.region || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="font-label text-sm text-on-surface-variant font-medium">Country</span>
                  <span className="flex items-center gap-2 font-body text-on-surface font-bold text-right group-hover:text-primary transition-colors">
                    {!loading && ipData?.country ? (
                      <>
                        <img alt={`${ipData.country} Flag`} className="w-5 h-4 object-cover rounded-sm" src={`https://flagcdn.com/w20/${ipData.country.toLowerCase()}.png`} onError={(e) => e.target.style.display = 'none'} />
                        {ipData.country}
                      </>
                    ) : '...'}
                  </span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="font-label text-sm text-on-surface-variant font-medium">Coordinates</span>
                  <span className="font-headline text-on-surface font-bold text-right group-hover:text-primary transition-colors">{loading ? '...' : ipData?.loc || 'N/A'}</span>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-outline-variant/10">
                <div className="w-full h-40 rounded-xl bg-surface-container-high overflow-hidden relative">
                  <img alt="Mumbai minimal map" className="w-full h-full object-cover grayscale opacity-50 contrast-125" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABp2Svu2N96ieHUYSu3FQDi-Ij1jROaq4jth1D1nz4HCq5CSO7lmMuvOdkMQIOGimuWfISGEGa0zkUuXHQ82nsWiZUbpmbrhEwRVsjickSKYLtDM5QA1k1riWC68LRLyJi8BkPrL5pUn8xvMc7lJG687lnRczmRdbqKmpKBdfqekRv_zTEjmHa2kwHGxgxiK9VKNxKdy7P8H4GK6iVxEx0ykGtSl1-GNG-_1bxLUepDkR7QFGQONeZaUuRbGIBSZPWVfkZ4QE4scU"/>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary rounded-full ring-8 ring-primary/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Network & Security Card */}
            <div className="bg-surface-container-lowest rounded-xl p-5 sm:p-8 ambient-shadow flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-headline text-2xl font-bold tracking-tight text-primary">Network Info</h3>
                <span className="material-symbols-outlined text-secondary">router</span>
              </div>
              <div className="space-y-6 flex-1">
                <div className="flex justify-between items-start group">
                  <span className="font-label text-sm text-on-surface-variant font-medium mt-1">ISP</span>
                  <span className="font-body text-on-surface font-bold text-right max-w-[140px] sm:max-w-[180px] break-words group-hover:text-primary transition-colors">{loading ? '...' : org}</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="font-label text-sm text-on-surface-variant font-medium">Organization</span>
                  <span className="font-body text-on-surface font-bold text-right group-hover:text-primary transition-colors">{loading ? '...' : org}</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="font-label text-sm text-on-surface-variant font-medium">ASN</span>
                  <span className="font-headline text-on-surface font-bold text-right group-hover:text-primary transition-colors">{loading ? '...' : asn}</span>
                </div>
                <div className="flex justify-between items-center group">
                  <span className="font-label text-sm text-on-surface-variant font-medium">Proxy/VPN</span>
                  <span className="flex items-center gap-1.5 font-body text-error font-bold text-right">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    {loading ? '...' : 'None Detected'}
                  </span>
                </div>
              </div>
              <div className="mt-8 p-6 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">speed</span>
                  </div>
                  <div>
                    <div className="text-xs font-label font-bold text-outline uppercase tracking-wider">Latency (RTT)</div>
                    <div className="text-xl font-headline font-bold text-on-surface">{loading ? '--' : `${pingData}ms`}</div>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[85%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Secondary Tools Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Link to="/tools" className="flex items-center gap-4 p-6 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-all active:scale-95 text-left group">
              <div className="p-3 bg-white rounded-lg ambient-shadow">
                <span className="material-symbols-outlined text-primary">apps</span>
              </div>
              <div>
                <div className="font-headline font-bold text-on-surface">Tool Hub</div>
                <div className="text-xs font-label text-on-surface-variant">View all working tools</div>
              </div>
            </Link>
            <Link to="/vpn-check" className="flex items-center gap-4 p-6 bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-all active:scale-95 text-left group">
              <div className="p-3 bg-white rounded-lg ambient-shadow">
                <span className="material-symbols-outlined text-primary">verified_user</span>
              </div>
              <div>
                <div className="font-headline font-bold text-on-surface">VPN Detection</div>
                <div className="text-xs font-label text-on-surface-variant">Check IP reputation</div>
              </div>
            </Link>
          </div>
        </div>
        {/* Right Sidebar Ad Area */}
        <aside className="w-full xl:w-[300px] shrink-0">
          <div className="sticky top-28 space-y-8">
            <div className="w-full min-h-[600px] bg-surface-container-low flex flex-col items-center justify-center rounded-xl relative overflow-hidden border border-outline-variant/10">
              <span className="font-label text-[10px] uppercase tracking-widest text-outline absolute top-2 left-4 z-10">Advertisement</span>
              <AdUnit slot="auto" format="vertical" className="w-full h-[600px] z-20 mix-blend-multiply" />
            </div>
            <div className="bg-primary-container/10 p-6 rounded-xl border border-primary/5">
              <h4 className="font-headline font-bold text-primary mb-2">Technical Note</h4>
              <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                Your IP address is a unique identifier for your network connection. It allows servers to know where to send the data you request.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
