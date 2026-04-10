import React, { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { saveToHistory } from '../../utils/history';

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
      {/* Ad Placeholder Banner - MAXIMIZED */}
      <div className="w-full flex justify-center mb-12">
        <div className="w-full max-w-[970px] min-h-[100px] sm:min-h-[250px] bg-surface-container flex items-center justify-center rounded-xl overflow-hidden relative group border border-outline-variant/10">
          <div className="text-outline text-xs font-label tracking-widest uppercase opacity-80 absolute top-4 left-6">Advertisement - Premium Partner</div>
          <div className="text-outline-variant font-medium text-lg">970x250 Premium Billboard Layout</div>
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
            <div className="max-w-2xl">
              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-primary mb-6">How VPN Detection Works</h2>
              <div className="prose prose-slate max-w-none space-y-6 text-on-surface-variant leading-relaxed">
                <p>
                  While you cannot strictly "prove" an IP is a VPN by scanning it directly from your browser, there are sophisticated databases that categorize the Autonomous System Numbers (ASN) belonging to different IPs.
                </p>
                <p>
                  An IP address allocated to a known residential internet service provider (like Comcast or AT&T) is designated as a standard user. However, if the IP block is owned by hosting providers like DigitalOcean, Amazon Web Services, or specialized proxy farms, our detection algorithm flags the connection as non-human or anonymized.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Ad Placeholder Sidebar MAXIMIZED */}
          <div className="w-full h-full min-h-[600px] bg-surface-container-low rounded-xl flex flex-col items-center justify-center relative overflow-hidden group border border-outline-variant/10">
            <div className="text-outline text-xs font-label tracking-widest uppercase opacity-80 mb-4 z-10">Advertisement</div>
            <div className="w-[300px] h-[600px] bg-white text-outline-variant flex items-center justify-center border font-headline italic">
              300x600 Vertical Fill Ad
            </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
};

export default VpnProxyCheck;
