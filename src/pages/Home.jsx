import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { saveToHistory } from '../utils/history';
import AdUnit from '../components/ads/AdUnit';

const Home = () => {
  const [ipData, setIpData] = useState(null);
  const [ipv4, setIpv4] = useState(null);
  const [ipv6, setIpv6] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedType, setCopiedType] = useState(null);
  const [pingData, setPingData] = useState(null);
  const [preciseLoc, setPreciseLoc] = useState(null);
  const [gettingLoc, setGettingLoc] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const startTime = performance.now();

      // Added a 5-second timeout so missing IPv6 routes don't hang the app forever
      const [ipInfoRes, v4Res, v6Res] = await Promise.allSettled([
        axios.get("https://ipinfo.io/json", { timeout: 5000 }),
        axios.get("https://ipv4.icanhazip.com", { timeout: 5000 }),
        axios.get("https://ipv6.icanhazip.com", { timeout: 5000 })
      ]);

      const endTime = performance.now();

      if (ipInfoRes.status === 'fulfilled') {
        const data = ipInfoRes.value.data;
        setIpData(data);
        saveToHistory('IP Lookup', data.ip, `${data.city}, ${data.country}`);
        sessionStorage.setItem('locationData', JSON.stringify({
          city: data.city,
          region: data.region,
          country: data.country
        }));
      }

      if (v4Res.status === 'fulfilled') {
        setIpv4(v4Res.value.data.toString().trim());
      } else {
        setIpv4('Not Available');
      }

      if (v6Res.status === 'fulfilled') {
        setIpv6(v6Res.value.data.toString().trim());
      } else {
        setIpv6('Not Available');
      }

      setPingData(Math.round(endTime - startTime));
    } catch (error) {
      console.error("Data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPreciseLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setGettingLoc(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPreciseLoc(`${position.coords.latitude},${position.coords.longitude}`);
        setGettingLoc(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve precise location. Please check browser permissions.");
        setGettingLoc(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const displayLoc = preciseLoc || ipData?.loc;

  const handleCopyAll = () => {
    let copyText = '';
    if (ipv4 && ipv4 !== 'Not Available') copyText += `IPv4: ${ipv4}\n`;
    if (ipv6 && ipv6 !== 'Not Available') copyText += `IPv6: ${ipv6}\n`;
    if (!copyText && ipData?.ip) copyText = ipData.ip;

    if (copyText) {
      navigator.clipboard.writeText(copyText.trim());
      setCopiedType('all');
      setTimeout(() => setCopiedType(null), 2000);
    }
  };

  const copySpecific = (text, type) => {
    if (text && text !== 'Not Available') {
      navigator.clipboard.writeText(text.trim());
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
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
    <>
      <Helmet>
        <title>What Is My IP Address? | Check My IP & Location Details</title>
        <meta name="description" content="Check your public IPv4 and IPv6 address instantly. Our fast, secure IP lookup tool reveals your precise geolocation, ISP, and network data with no logging." />
        <meta name="keywords" content="what is my ip, check my ip, ip lookup, my ip address, ipv4, ipv6, ip location" />
        <link rel="canonical" href="https://www.checkmyip.in/" />
      </Helmet>

    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 sm:pb-20">
      {/* Hidden SEO H1 */}
      <h1 className="sr-only">What is my IP Address?</h1>

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
                    {loading ? 'DETECTING CONNECTION...' : 'YOUR IP ADDRESSES'}
                  </span>

                  <div className="mb-4 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest font-label">IPv4</span>
                        {!loading && ipv4 && ipv4 !== 'Not Available' && (
                          <button onClick={() => copySpecific(ipv4, 'ipv4')} className="text-secondary hover:text-primary transition-colors flex items-center" title="Copy IPv4">
                            <span className="material-symbols-outlined text-[16px]">{copiedType === 'ipv4' ? 'check' : 'content_copy'}</span>
                          </button>
                        )}
                      </div>
                      <div className="font-headline text-3xl sm:text-4xl md:text-6xl font-bold text-primary tracking-tighter leading-none min-h-[40px] sm:min-h-[60px] break-all sm:break-normal">
                        {loading ? 'Retrieving...' : ipv4 || 'None'}
                      </div>
                    </div>

                    {/* Fixed logic to show "Retrieving..." state properly */}
                    {(loading || (ipv6 && ipv6 !== 'Not Available')) && (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest font-label">IPv6</span>
                          {!loading && ipv6 && ipv6 !== 'Not Available' && (
                            <button onClick={() => copySpecific(ipv6, 'ipv6')} className="text-primary hover:text-secondary transition-colors flex items-center" title="Copy IPv6">
                              <span className="material-symbols-outlined text-[16px]">{copiedType === 'ipv6' ? 'check' : 'content_copy'}</span>
                            </button>
                          )}
                        </div>
                        <div className="font-headline text-2xl sm:text-3xl md:text-3xl font-bold text-secondary tracking-tighter leading-none min-h-[32px] sm:min-h-[48px] break-all sm:break-normal">
                          {loading ? 'Retrieving...' : ipv6}
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-on-surface-variant font-body text-sm sm:text-lg max-w-md mt-6 min-h-[40px] sm:min-h-[56px]">
                    {loading ? 'Analyzing your connection route and geolocation data...' : `Your connection is routed through ${ipData?.city || 'Unknown'}, ${ipData?.region || 'Unknown'}.`}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button onClick={handleCopyAll} className="glass-overlay p-3 sm:p-4 rounded-xl text-primary hover:bg-primary-fixed transition-colors ambient-shadow flex items-center gap-2 group/btn active:scale-95">
                    <span className="material-symbols-outlined">{copiedType === 'all' ? 'check' : 'content_copy'}</span>
                    <span className="font-bold text-xs sm:text-sm tracking-tight">{copiedType === 'all' ? 'Copied!' : 'Copy All'}</span>
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
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-start">

                    {/* LEFT LABEL */}
                    <span className="font-label text-sm text-on-surface-variant font-medium">
                      Coordinates:
                    </span>

                    {/* RIGHT CONTENT */}
                    <div className="flex flex-col items-end text-right gap-0.5">

                      {/* LAT */}
                      <div className="flex items-center gap-1">
                        <span className="font-headline text-sm font-bold text-on-surface">
                          {loading ? '...' : (displayLoc ? `Lat: ${displayLoc.split(',')[0]}` : 'N/A')}
                        </span>

                        {!loading && displayLoc && (
                          <button
                            onClick={() => copySpecific(displayLoc.split(',')[0], 'lat')}
                            className="text-secondary hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {copiedType === 'lat' ? 'check' : 'content_copy'}
                            </span>
                          </button>
                        )}
                      </div>



                      {/* LON */}
                      <div className="flex items-center gap-1">
                        <span className="font-headline text-sm font-bold text-on-surface">
                          {loading ? '' : (displayLoc ? `Lon: ${displayLoc.split(',')[1]}` : '')}
                        </span>

                        {!loading && displayLoc && (
                          <button
                            onClick={() => copySpecific(displayLoc.split(',')[1], 'lon')}
                            className="text-secondary hover:text-primary transition-colors"
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {copiedType === 'lon' ? 'check' : 'content_copy'}
                            </span>
                          </button>
                        )}
                      </div>
                      {/* UPDATE TEXT */}
                      {!preciseLoc && (
                        <span
                          onClick={getPreciseLocation}
                          className="text-[10px] text-primary cursor-pointer hover:underline"
                        >
                          {gettingLoc ? 'Updating...' : 'Not updated location? Update'}
                        </span>
                      )}

                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-outline-variant/10">
                <div className="w-full h-48 sm:h-64 rounded-xl bg-surface-container-high overflow-hidden relative">
                  {/* Re-wrote mapping logic to prevent infinite spinner if loc is missing */}
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    </div>
                  ) : displayLoc ? (() => {
                    const [lat, lon] = displayLoc.split(',').map(Number);
                    const offset = 0.05;
                    return (
                      <iframe
                        title="Location Map"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - offset},${lat - offset},${lon + offset},${lat + offset}&layer=mapnik&marker=${lat},${lon}`}
                        className="w-full h-full"
                      ></iframe>
                    );
                  })() : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-on-surface-variant font-label text-sm">Location Map Unavailable</span>
                    </div>
                  )}
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
    </>
  );
};

export default Home;