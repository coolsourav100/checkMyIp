import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { saveToHistory } from '../../utils/history';

const NetworkSecurity = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAudit = async (e) => {
    e.preventDefault();
    if (!domain) return;
    
    let cleanDomain = domain.trim().toLowerCase();
    if (cleanDomain.startsWith('http://')) cleanDomain = cleanDomain.substring(7);
    if (cleanDomain.startsWith('https://')) cleanDomain = cleanDomain.substring(8);
    if (cleanDomain.split('/').length > 1) cleanDomain = cleanDomain.split('/')[0];

    setLoading(true);
    setResults(null);

    // Because browsers strip security headers (HSTS, CSP, X-Frame-Options) from cross-origin 
    // fetch responses for security reasons, and no free CORS-enabled APIs exist for this,
    // we simulate an audit delay to represent what the dashboard *would* look like.
    // In production, this would call a Backend standard Node.js HTTPS request.
    await new Promise(r => setTimeout(r, 2500));

    // Mock response grading - randomizing for demo purposes in UI logic
    const mockGrade = cleanDomain.length % 2 === 0 ? 'A' : 'B';
    setResults({
        grade: mockGrade,
        host: cleanDomain,
        headers: [
            { name: 'Strict-Transport-Security (HSTS)', passed: mockGrade === 'A', value: mockGrade === 'A' ? 'max-age=31536000; includeSubDomains' : 'Missing', description: 'Enforces secure (HTTP over SSL/TLS) connections to the server. To pass, return a valid max-age directive.' },
            { name: 'Content-Security-Policy (CSP)', passed: mockGrade === 'A', value: mockGrade === 'A' ? 'default-src \'self\'' : 'Missing or Weak', description: 'Prevents cross-site scripting (XSS) and other data injection attacks. To pass, return a strong default-src policy.' },
            { name: 'X-Frame-Options', passed: true, value: 'SAMEORIGIN', description: 'Protects visitors against clickjacking attacks. To pass, return DENY or SAMEORIGIN.' },
            { name: 'X-Content-Type-Options', passed: true, value: 'nosniff', description: 'Prevents the browser from interpreting files as a different MIME type. To pass, return nosniff.' },
            { name: 'Referrer-Policy', passed: false, value: 'Missing', description: 'Controls how much referrer information is included with requests. To pass, configure a strict policy like strict-origin-when-cross-origin.' },
        ],
        tls: {
            version: 'TLS 1.3',
            cipher: 'TLS_AES_256_GCM_SHA384',
            valid: true
        }
    });

    setLoading(false);
    saveToHistory('Network Security', cleanDomain, `Audit Grade ${mockGrade}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-4">
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
              Network Security Audit
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
              Scan a domain for modern HTTP security headers, TLS configuration, and best practices to ensure optimal client security.
            </p>
          </section>

          <div className="surface-container-lowest p-1 rounded-xl">
            <div className="bg-surface-container-low rounded-[calc(0.5rem+4px)] p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
              <form onSubmit={handleAudit} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full space-y-2">
                  <label className="font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Domain Name</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">security</span>
                    <input 
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full bg-surface-container-lowest border-2 border-transparent focus:border-primary rounded-xl py-4 pl-12 pr-4 font-headline text-lg transition-all outline-none" 
                      placeholder="e.g. checkmyip.com" 
                      type="text" 
                      required
                    />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full md:w-auto bg-gradient-to-r from-primary to-primary-container disabled:opacity-75 disabled:cursor-wait text-on-primary px-10 py-5 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <span>{loading ? 'Analyzing...' : 'Run Audit'}</span>
                  <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>gpp_good</span>
                </button>
              </form>
              
              {results && !loading && (
                <div className="space-y-8 pt-6 border-t border-outline-variant/15">
                    {/* Grade Header */}
                    <div className="flex flex-col md:flex-row gap-6 items-center bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold font-headline text-white ${results.grade === 'A' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                            {results.grade}
                        </div>
                        <div className="text-center md:text-left space-y-2">
                            <h2 className="font-headline text-2xl font-bold text-primary">{results.host}</h2>
                            <p className="text-on-surface-variant max-w-md">
                                {results.grade === 'A' 
                                    ? 'Excellent! This domain implements modern security standards.'
                                    : 'Fair. This domain is missing some important security configurations.'}
                            </p>
                        </div>
                    </div>

                    {/* TLS info */}
                    <div className="space-y-4">
                        <h3 className="font-headline text-lg font-bold">Transport Layer Security (TLS)</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3">
                                <span className="material-symbols-outlined">lock</span>
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-70">Protocol</div>
                                    <div className="font-headline font-bold text-lg">{results.tls.version}</div>
                                </div>
                            </div>
                            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl flex items-center gap-3">
                                <span className="material-symbols-outlined">enhanced_encryption</span>
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-70">Cipher Suite</div>
                                    <div className="font-headline font-bold text-sm break-all">{results.tls.cipher}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Headers List */}
                    <div className="space-y-4">
                        <h3 className="font-headline text-lg font-bold">HTTP Security Headers</h3>
                        <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl overflow-hidden shadow-sm">
                            {results.headers.map((header, idx) => (
                                <div key={idx} className="p-4 border-b border-outline-variant/10 last:border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="font-headline font-bold text-on-surface flex items-center gap-2">
                                            {header.passed ? (
                                                <span className="material-symbols-outlined text-green-500 text-sm">check_circle</span>
                                            ) : (
                                                <span className="material-symbols-outlined text-error text-sm">cancel</span>
                                            )}
                                            {header.name}
                                            <div className="group/tooltip relative flex items-center">
                                              <span className="material-symbols-outlined text-[14px] text-outline cursor-help p-0.5">info</span>
                                              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/tooltip:block w-72 p-3 bg-surface-container-highest border border-outline-variant/20 text-on-surface text-xs leading-relaxed rounded-lg shadow-xl z-50 font-body normal-case">
                                                {header.description}
                                              </div>
                                            </div>
                                        </div>
                                        <div className="text-sm text-on-surface-variant font-mono mt-1 break-all bg-surface-container px-2 py-1 rounded inline-block">
                                            {header.value}
                                        </div>
                                    </div>
                                    <div className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest self-start sm:self-center shrink-0 ${header.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {header.passed ? 'Passed' : 'Failed'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
              )}
            </div>
          </div>
          
          <article className="bg-surface-container-low rounded-xl p-5 sm:p-8 space-y-4">
              <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary text-3xl">info</span>
                  <div>
                      <h2 className="font-headline text-xl font-bold text-on-surface mb-2">Diagnostic Limitations</h2>
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                          Because modern web browsers strip HTTP Security Headers during cross-origin JavaScript requests to prevent side-channel attacks, a 100% accurate client-side audit is impossible. The data shown in this tool is simulated to represent the expected UI structure. A dedicated proxy server or backend API is required for real-world execution.
                      </p>
                  </div>
              </div>
          </article>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="w-full h-full min-h-[600px] bg-surface-container-low flex flex-col items-center justify-center rounded-xl relative overflow-hidden border border-outline-variant/10">
            <span className="font-label text-[10px] uppercase tracking-widest text-outline absolute top-4 left-6 z-10">Advertisement</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NetworkSecurity;
