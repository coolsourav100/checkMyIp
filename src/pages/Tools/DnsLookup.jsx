import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { saveToHistory } from '../../utils/history';

const DnsLookup = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const recordTypes = [
    { type: 'A', id: 1 },
    { type: 'MX', id: 15 },
    { type: 'TXT', id: 16 },
    { type: 'CNAME', id: 5 }
  ];

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!domain) return;
    
    // clean domain input
    let cleanDomain = domain.trim().toLowerCase();
    if (cleanDomain.startsWith('http://')) cleanDomain = cleanDomain.substring(7);
    if (cleanDomain.startsWith('https://')) cleanDomain = cleanDomain.substring(8);
    if (cleanDomain.split('/').length > 1) cleanDomain = cleanDomain.split('/')[0];

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const fetchPromises = recordTypes.map(rt => 
        axios.get(`https://dns.google/resolve?name=${cleanDomain}&type=${rt.id}`)
      );
      
      const responses = await Promise.all(fetchPromises);
      
      const aggregatedResults = [];
      responses.forEach((res, index) => {
        if (res.data.Answer) {
          res.data.Answer.forEach(ans => {
            aggregatedResults.push({
              type: recordTypes[index].type,
              ttl: ans.TTL,
              data: ans.data,
              name: ans.name
            });
          });
        }
      });

      if (aggregatedResults.length === 0) {
        setError('No DNS records found for this domain.');
      } else {
        setResults(aggregatedResults);
        saveToHistory('DNS Lookup', cleanDomain, `${aggregatedResults.length} records retrieved`);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to query DNS servers. Please check the domain format.');
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'A': return 'bg-secondary-fixed text-on-secondary-fixed';
      case 'MX': return 'bg-tertiary-fixed text-on-tertiary-fixed';
      case 'CNAME': return 'bg-primary-fixed text-on-primary-fixed';
      case 'TXT': return 'bg-surface-dim text-on-surface';
      default: return 'bg-outline text-white';
    }
  };

  return (
    <>
      <Helmet>
        <title>DNS Lookup Tool | Find A, MX, TXT, and CNAME Records</title>
        <meta name="description" content="Query global DNS servers instantly to find A, MX, CNAME, and TXT records for any domain or IP address with our free DNS lookup tool." />
        <link rel="canonical" href="https://www.checkmyip.in/dns-lookup" />
      </Helmet>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      {/* Ad Placeholder Leaderboard - MAXIMIZED */}
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
              Free Online DNS Lookup Tool
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
              Query global DNS servers instantly to find A, MX, CNAME, and TXT records for any domain or IP address. Professional-grade network diagnostics with zero latency.
            </p>
          </section>
          {/* Tool Interface */}
          <div className="surface-container-lowest p-1 rounded-xl">
            <div className="bg-surface-container-low rounded-[calc(0.5rem+4px)] p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
              <form onSubmit={handleLookup} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full space-y-2">
                  <label className="font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Domain Name</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">public</span>
                    <input 
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full bg-surface-container-lowest border-2 border-transparent focus:border-primary rounded-xl py-4 pl-12 pr-4 font-headline text-lg transition-all outline-none" 
                      placeholder="e.g. google.com" 
                      type="text" 
                      required
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full md:w-auto bg-gradient-to-r from-primary to-primary-container disabled:opacity-75 disabled:cursor-wait text-on-primary px-10 py-5 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <span>{loading ? 'Querying...' : 'Lookup'}</span>
                  <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>analytics</span>
                </button>
              </form>
              
              {error && (
                <div className="bg-error-container text-on-error-container p-4 rounded-lg font-medium text-sm flex items-center gap-3">
                  <span className="material-symbols-outlined">error</span>
                  {error}
                </div>
              )}
              {/* Results Section */}
              {results && !loading && (
                <div className="space-y-6 pt-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/15 pb-4">
                    <h2 className="font-headline text-xl font-bold text-primary">Lookup Results</h2>
                    <button 
                      onClick={() => navigator.clipboard.writeText(JSON.stringify(results, null, 2))}
                      className="flex items-center gap-2 text-on-primary-fixed-variant hover:text-primary transition-colors text-sm font-bold"
                    >
                      <span className="material-symbols-outlined text-base">content_copy</span>
                      <span>Copy JSON</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.map((rec, i) => (
                      <div key={i} className={`bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm ${rec.type === 'TXT' || rec.type === 'CNAME' ? 'md:col-span-2' : ''}`}>
                        <div className="flex justify-between items-start mb-4">
                          <span className={`${getTypeColor(rec.type)} px-3 py-1 rounded-full text-[10px] font-bold font-label tracking-tighter uppercase`}>Type: {rec.type}</span>
                          <span className="text-outline text-xs font-label">TTL: {rec.ttl}</span>
                        </div>
                        <div className="font-headline text-lg font-bold text-on-surface break-words">{rec.data}</div>
                        <div className="text-on-surface-variant text-xs mt-2 uppercase font-label tracking-widest">{rec.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* How It Works Section */}
          <article className="bg-surface-container-low rounded-xl p-5 sm:p-8 md:p-12 space-y-6 sm:space-y-8">
            <div className="max-w-2xl">
              <h2 className="font-headline text-2xl sm:text-3xl font-bold text-primary mb-6">How DNS Lookup Works</h2>
              <div className="prose prose-slate max-w-none space-y-6 text-on-surface-variant leading-relaxed">
                <p>
                  Domain Name System (DNS) is essentially the phonebook of the internet. When you type a URL like <code className="bg-surface-container px-2 py-1 rounded font-headline text-primary">checkmyip.com</code> into your browser, DNS translates that human-readable name into a machine-readable IP address.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold font-headline">1</div>
                    <h3 className="font-bold text-on-surface">Query Initiation</h3>
                    <p className="text-sm">Your computer asks a recursive DNS resolver for the IP address associated with the domain name.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold font-headline">2</div>
                    <h3 className="font-bold text-on-surface">Root Servers</h3>
                    <p className="text-sm">The resolver queries root servers, which point it to the Top-Level Domain (TLD) server (e.g., .com, .net).</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold font-headline">3</div>
                    <h3 className="font-bold text-on-surface">Authoritative DNS</h3>
                    <p className="text-sm">Finally, the TLD server points to the authoritative nameserver that holds the specific record.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold font-headline">4</div>
                    <h3 className="font-bold text-on-surface">Resolution</h3>
                    <p className="text-sm">The resolver returns the IP address to your browser, allowing it to connect to the web server.</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Ad Placeholder Sidebar */}
          <div className="w-full h-full min-h-[600px] bg-surface-container-low flex flex-col items-center justify-center rounded-xl relative overflow-hidden border border-outline-variant/10">
            <span className="font-label text-[10px] uppercase tracking-widest text-outline absolute top-4 left-6 z-10">Advertisement</span>
            <div className="w-[300px] h-[600px] bg-white text-outline-variant font-medium text-center italic border flex items-center justify-center z-10">
              300x600 Vertical Fill Ad
            </div>
          </div>
          {/* Related Tools Card */}
          <div className="surface-container-lowest p-6 rounded-xl space-y-4">
            <h3 className="font-headline font-bold text-lg text-primary">Network Utilities</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/vpn-check" className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">vpn_lock</span>
                    <span className="text-sm font-medium">VPN Check</span>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-lg">chevron_right</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">security</span>
                    <span className="text-sm font-medium">Whois Lookup</span>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-lg">chevron_right</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-low transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">my_location</span>
                    <span className="text-sm font-medium">IP Lookup</span>
                  </div>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-lg">chevron_right</span>
                </Link>
              </li>
            </ul>
          </div>
          {/* Visual Decorative Card */}
          <div className="relative h-64 rounded-xl overflow-hidden group">
            <img alt="abstract digital connection network" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACsGitVDauBnqMAeCvmYyLguIzkYENV1bmCO2MAUwVlZbEuoVNiFr41kbMg33K0YXp8oJRFMvkQaXwrto0Il39MOgHeaFFs4l_KNvaqxo3vDVtURnaRZ70j91BSwx_jEFMXDQG-XTtPxWlNcfl3Pn4qPZHHoTa3UP_jwZvjhF4Tx5mVhO2K4DIKANXw5ML_Ooa2ykPFvUJcXKW0dqBbqcGk6NBkwKTazGnU_ta_iM8aT1yJEpu26jhdl_cU05eU1qwh4hRthQy-fg" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Network Wisdom</div>
              <p className="text-white font-headline text-lg font-bold leading-tight">Secure your infrastructure with our enterprise tools.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
};

export default DnsLookup;
