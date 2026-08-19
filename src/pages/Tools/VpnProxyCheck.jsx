import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { saveToHistory } from '../../utils/history';
import AdUnit from '../../components/ads/AdUnit';

const VpnProxyCheck = () => {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!ip) {
      setError('Please enter a valid IP address.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      // The API returns 'Y' for VPN/Proxy/Datacenter, 'N' for residential
      const response = await axios.get(`https://blackbox.ipinfo.app/lookup/${ip}`);
      const isVpn = response.data.trim() === 'Y';
      setResult(isVpn);
      saveToHistory('VPN Detection', ip, isVpn ? 'Proxy/VPN' : 'Clean IP');
    } catch (err) {
      console.error(err);
      setError('Failed to query the threat database. Please try again or check the IP format.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>VPN & Proxy Detector | Check IP Reputation & Datacenters</title>
        <meta name="description" content="Identify if an IP address belongs to a residential connection, datacenter, VPN, or proxy host. Protect your platform with advanced fraud and threat detection." />
        <link rel="canonical" href="https://www.checkmyip.in/vpn-check" />
      </Helmet>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      {/* Leaderboard Ad */}
      <div className="w-full flex justify-center mb-12">
        <div className="w-full max-w-[970px] min-h-[100px] sm:min-h-[250px] rounded-xl overflow-hidden relative">
          <AdUnit slot="auto" format="auto" className="w-full h-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Utility Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Hero Section */}
          <section className="space-y-4">
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
              VPN & Proxy Detection
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
              Identify if an IP address is a residential connection or if it is associated with a datacenter, known VPN, or proxy host. Protect your platform from automated traffic and block malicious endpoints.
            </p>
          </section>

          {/* Tool Interface */}
          <div className="surface-container-lowest p-1 rounded-xl">
            <div className="bg-surface-container-low rounded-[calc(0.5rem+4px)] p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
              <form onSubmit={handleCheck} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full space-y-2">
                  <label className="font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Target IP Address</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">travel_explore</span>
                    <input 
                      value={ip}
                      onChange={(e) => setIp(e.target.value)}
                      className="w-full bg-surface-container-lowest border-2 border-transparent focus:border-primary rounded-xl py-4 pl-12 pr-4 font-headline text-lg transition-all outline-none" 
                      placeholder="e.g. 1.1.1.1 or 8.8.8.8" 
                      type="text" 
                      required
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full md:w-auto bg-gradient-to-r from-primary to-primary-container disabled:opacity-75 disabled:cursor-wait text-on-primary px-10 py-5 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <span>{loading ? 'Scanning...' : 'Detect'}</span>
                  <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>radar</span>
                </button>
              </form>

              {error && (
                <div className="bg-error-container text-on-error-container p-4 rounded-lg font-medium text-sm flex items-center gap-3">
                  <span className="material-symbols-outlined">error</span>
                  {error}
                </div>
              )}

              {/* Results Section */}
              {result !== null && !loading && !error && (
                <div className="space-y-6 pt-4 border-t border-outline-variant/15 mt-8">
                  <h2 className="font-headline text-xl font-bold text-primary">Threat Analysis Results</h2>
                  
                  {result === true ? (
                    <div className="bg-error/10 border-l-4 border-error p-6 rounded-r-xl flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-error">
                        <span className="material-symbols-outlined font-bold text-3xl">warning</span>
                        <h3 className="font-headline text-2xl font-bold">Proxy / VPN Detected</h3>
                      </div>
                      <p className="text-on-surface-variant text-lg">
                        The IP address <strong className="text-on-surface">{ip}</strong> is associated with a datacenter network. This is characteristic of VPN nodes, cloud hosting providers, or anonymizing proxies.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-secondary-container/30 border-l-4 border-secondary p-6 rounded-r-xl flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-secondary">
                        <span className="material-symbols-outlined font-bold text-3xl">verified_user</span>
                        <h3 className="font-headline text-2xl font-bold">Clean / Residential IP</h3>
                      </div>
                      <p className="text-on-surface-variant text-lg">
                        The IP address <strong className="text-on-surface">{ip}</strong> does not appear in our known proxy or datacenter registries. It is likely a standard residential or mobile connection.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Educational Content */}
          <article className="bg-surface-container-low rounded-xl p-5 sm:p-8 md:p-12 space-y-6 sm:space-y-8">
            <div className="max-w-none">
              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-primary mb-6">How VPN Detection Works</h2>
              <div className="prose prose-slate max-w-none space-y-6 text-on-surface-variant leading-relaxed">
                <p>
                  While you cannot strictly "prove" an IP is a VPN by scanning it directly from your browser, there are sophisticated databases that categorize the Autonomous System Numbers (ASN) belonging to different IPs.
                </p>
                <p>
                  An IP address allocated to a known residential internet service provider (like Comcast or AT&T) is designated as a standard user. However, if the IP block is owned by hosting providers like DigitalOcean, Amazon Web Services, or specialized proxy farms, our detection algorithm flags the connection as non-human or anonymized.
                </p>

                <h3 className="font-headline text-xl font-semibold text-on-surface mt-8 mb-3">Types of IP Classifications</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                    <h4 className="font-headline font-bold text-on-surface mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-lg">home</span>
                      Residential IPs
                    </h4>
                    <p className="text-sm">Assigned by traditional ISPs to home and mobile users. These are considered "clean" and are typically not flagged by fraud detection systems. Most everyday internet users browse through residential IPs.</p>
                  </div>
                  <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                    <h4 className="font-headline font-bold text-on-surface mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-lg">cloud</span>
                      Datacenter IPs
                    </h4>
                    <p className="text-sm">Belong to cloud hosting providers like AWS, Google Cloud, Azure, DigitalOcean, or Hetzner. While not inherently malicious, datacenter IPs are commonly used by VPN services, bots, and automated scrapers because servers can be provisioned cheaply and at scale.</p>
                  </div>
                  <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                    <h4 className="font-headline font-bold text-on-surface mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-lg">vpn_lock</span>
                      Known VPN Exit Nodes
                    </h4>
                    <p className="text-sm">Major VPN providers (NordVPN, ExpressVPN, Surfshark, etc.) operate thousands of exit nodes worldwide. Security researchers continuously catalog these IP ranges, allowing detection systems to identify VPN traffic with high confidence.</p>
                  </div>
                  <div className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
                    <h4 className="font-headline font-bold text-on-surface mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-lg">public_off</span>
                      Tor Exit Nodes
                    </h4>
                    <p className="text-sm">The Tor network publishes its exit node list publicly. Any traffic originating from these IPs is routed through multiple encrypted relays, making it the strongest form of anonymization available. However, many websites block Tor exit nodes entirely.</p>
                  </div>
                </div>

                <h3 className="font-headline text-xl font-semibold text-on-surface mt-8 mb-3">Why VPN Detection Matters</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Fraud Prevention:</strong> E-commerce platforms use VPN detection to flag suspicious transactions where the billing address and IP geolocation don't match.</li>
                  <li><strong>Content Licensing:</strong> Streaming services enforce regional licensing agreements by detecting VPN usage that circumvents geo-restrictions.</li>
                  <li><strong>Security Auditing:</strong> If you use a VPN for privacy, our tool helps verify that your VPN is actually working and your real IP isn't leaking.</li>
                  <li><strong>Bot Mitigation:</strong> Websites detect datacenter IPs to filter automated traffic from scraping bots and credential-stuffing attacks.</li>
                </ul>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Sidebar Ad */}
          <div className="w-full min-h-[600px] rounded-xl overflow-hidden">
            <AdUnit slot="auto" format="vertical" className="w-full h-[600px]" />
          </div>
        </aside>
      </div>
    </div>
    </>
  );
};

export default VpnProxyCheck;
