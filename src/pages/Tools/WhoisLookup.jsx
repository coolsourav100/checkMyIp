import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { saveToHistory } from '../../utils/history';
import AdUnit from '../../components/ads/AdUnit';

const WhoisLookup = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!domain) return;

    let cleanDomain = domain.trim().toLowerCase();
    if (cleanDomain.startsWith('http://')) cleanDomain = cleanDomain.substring(7);
    if (cleanDomain.startsWith('https://')) cleanDomain = cleanDomain.substring(8);
    if (cleanDomain.split('/').length > 1) cleanDomain = cleanDomain.split('/')[0];

    // Remove www.
    if (cleanDomain.startsWith('www.')) cleanDomain = cleanDomain.substring(4);

    setLoading(true);
    setError('');
    setResults(null);

    try {
      // Using RDAP (Registration Data Access Protocol), the modern JSON replacement for WHOIS
      const res = await axios.get(`https://rdap.org/domain/${cleanDomain}`);
      setResults(res.data);
      saveToHistory('WHOIS Lookup', cleanDomain, `Retrieved registration data`);
    } catch (err) {
      console.error(err);
      setError('Failed to retrieve WHOIS data. Check the domain format or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getEventDate = (action) => {
    if (!results || !results.events) return 'N/A';
    const event = results.events.find(e => e.eventAction === action);
    if (!event) return 'N/A';
    return new Date(event.eventDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getRegistrar = () => {
    if (!results || !results.entities) return 'Unknown';
    const reg = results.entities.find(e => e.roles && e.roles.includes('registrar'));
    if (reg && reg.vcardArray && reg.vcardArray[1]) {
      const nameCard = reg.vcardArray[1].find(c => c[0] === 'fn');
      if (nameCard) return nameCard[3];
    }
    return 'Unknown';
  };

  return (
    <>
      <Helmet>
        <title>WHOIS Domain Lookup | Find Registration Data</title>
        <meta name="description" content="Retrieve domain registration records, registrar information, expiration dates, and nameservers using our fast RDAP and WHOIS lookup tool." />
        <link rel="canonical" href="https://www.checkmyip.in/whois-lookup" />
      </Helmet>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-4">
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
              WHOIS Domain Lookup
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
              Retrieve domain registration records, registrar information, expiration dates, and nameservers using the modern RDAP protocol.
            </p>
          </section>

          <div className="surface-container-lowest p-1 rounded-xl">
            <div className="bg-surface-container-low rounded-[calc(0.5rem+4px)] p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
              <form onSubmit={handleLookup} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full space-y-2">
                  <label className="font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Domain Name</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">person_search</span>
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
                  <span>{loading ? 'Searching...' : 'Lookup'}</span>
                  <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>search</span>
                </button>
              </form>

              {error && (
                <div className="bg-error-container text-on-error-container p-4 rounded-lg font-medium text-sm flex items-center gap-3">
                  <span className="material-symbols-outlined">error</span>
                  {error}
                </div>
              )}

              {results && !loading && (
                <div className="space-y-6 pt-4">
                  <div className="flex items-center justify-between border-b border-outline-variant/15 pb-4">
                    <h2 className="font-headline text-xl font-bold text-primary">Registration Data</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm">
                      <div className="text-[10px] uppercase tracking-widest font-label text-outline mb-1">Domain Name</div>
                      <div className="font-headline font-bold text-lg text-primary">{results.ldhName || domain}</div>
                    </div>
                    <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm">
                      <div className="text-[10px] uppercase tracking-widest font-label text-outline mb-1">Registrar</div>
                      <div className="font-headline font-bold text-lg">{getRegistrar()}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm">
                      <span className="material-symbols-outlined text-outline mb-2">event</span>
                      <div className="text-[10px] uppercase tracking-widest font-label text-outline mb-1">Registration Date</div>
                      <div className="font-headline font-bold">{getEventDate('registration')}</div>
                    </div>
                    <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm border-l-4 border-l-secondary">
                      <span className="material-symbols-outlined text-secondary mb-2">event_available</span>
                      <div className="text-[10px] uppercase tracking-widest font-label text-outline mb-1">Expiration Date</div>
                      <div className="font-headline font-bold text-secondary">{getEventDate('expiration')}</div>
                    </div>
                    <div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm">
                      <span className="material-symbols-outlined text-outline mb-2">update</span>
                      <div className="text-[10px] uppercase tracking-widest font-label text-outline mb-1">Last Updated</div>
                      <div className="font-headline font-bold">{getEventDate('last changed')}</div>
                    </div>
                  </div>

                  {results.nameservers && results.nameservers.length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-headline text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">dns</span>
                        Nameservers
                      </h3>
                      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden shadow-sm">
                        {results.nameservers.map((ns, idx) => (
                          <div key={idx} className="p-4 border-b border-outline-variant/10 last:border-0 font-headline">
                            {ns.ldhName}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.status && results.status.length > 0 && (
                    <div className="mt-8">
                      <h3 className="font-headline text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">info</span>
                        Domain Status
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {results.status.map((stat, idx) => (
                          <span key={idx} className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                            {stat.replace(/_/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>

          {/* Educational Content */}
          <article className="bg-surface-container-low rounded-xl p-5 sm:p-8 md:p-12 space-y-6">
            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-primary mb-4">What is WHOIS and RDAP?</h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed">
              <p>WHOIS is the original protocol used to look up who owns a domain name. Created in the 1980s, WHOIS queries return registration information including the registrar, creation date, expiration date, nameservers, and sometimes the registrant's contact details. However, with the implementation of GDPR and other privacy regulations, most registrars now redact personal contact information from public WHOIS records.</p>
              
              <h3 className="font-headline text-xl font-semibold text-on-surface mt-6 mb-2">RDAP: The Modern Replacement</h3>
              <p>Registration Data Access Protocol (RDAP) is the successor to WHOIS, developed by the IETF (Internet Engineering Task Force). Unlike the plain-text WHOIS protocol, RDAP returns data in structured JSON format, supports internationalization, and implements standardized access controls. Our tool uses RDAP endpoints to retrieve the most accurate and up-to-date registration data available.</p>
              
              <h3 className="font-headline text-xl font-semibold text-on-surface mt-6 mb-2">Why Check Domain Registration?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Verify Domain Ownership:</strong> Confirm who owns a domain before entering into business relationships or purchasing a domain.</li>
                <li><strong>Check Expiration Dates:</strong> Monitor when domains are set to expire—useful for acquiring expired domains or ensuring your own domains don't lapse.</li>
                <li><strong>Investigate Suspicious Sites:</strong> Newly registered domains are often associated with phishing campaigns. Checking the registration date can reveal red flags.</li>
                <li><strong>Technical Administration:</strong> Identify the authoritative nameservers and registrar lock status for DNS troubleshooting.</li>
              </ul>
            </div>
          </article>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="w-full min-h-[600px] rounded-xl overflow-hidden">
            <AdUnit slot="auto" format="vertical" className="w-full h-[600px]" />
          </div>
        </aside>
      </div>
    </div>
    </>
  );
};

export default WhoisLookup;
