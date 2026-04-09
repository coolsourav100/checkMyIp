import React, { useState } from 'react';
import { saveToHistory } from '../../utils/history';

const PortCheck = () => {
  const [host, setHost] = useState('');
  const [ports, setPorts] = useState('80, 443, 21, 22, 3306');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!host || !ports) return;

    let cleanHost = host.trim().toLowerCase();
    if (cleanHost.startsWith('http://')) cleanHost = cleanHost.substring(7);
    if (cleanHost.startsWith('https://')) cleanHost = cleanHost.substring(8);
    if (cleanHost.split('/').length > 1) cleanHost = cleanHost.split('/')[0];

    // Parse ports
    const portList = ports.split(',').map(p => p.trim()).filter(p => !isNaN(p) && p !== '');

    setLoading(true);
    const scanResults = [];
    setResults(scanResults); // Set initial empty layout

    for (let i = 0; i < portList.length; i++) {
      const port = portList[i];
      let status = 'Unknown';

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500); // Wait 3.5s

        // HTTP fetch to check port.
        // A closed port usually resolves instantly with Failed to fetch.
        // An open web port returns cross-origin error but finishes.
        // An open non-web port or filtered port hangs until timeout.
        // const start = performance.now();
        await fetch(`http://${cleanHost}:${port}`, { mode: 'no-cors', cache: 'no-store', signal: controller.signal });
        clearTimeout(timeoutId);

        // If it succeeded to connect and finish
        status = 'Open / Responding';
      } catch (err) {
        // Error handling to guess closed vs filtered
        // Note: Modern browsers unify errors to prevent port scanning, 
        // but timeout usually means filtered/open but unresponsive to HTTP.
        if (err.name === 'AbortError' || err.message.includes('abort')) {
          status = 'Filtered / Timeout';
        } else {
          status = 'Closed / Refused';
        }
      }

      scanResults.push({ port, status });
      setResults([...scanResults]);
    }

    setLoading(false);
    saveToHistory('Port Scan', cleanHost, `Scanned ${portList.length} ports`);
  };

  const getStatusColor = (status) => {
    if (status.includes('Open')) return 'bg-green-100 text-green-700 border-green-200';
    if (status.includes('Filtered')) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-red-100 text-red-700 border-red-200';
  }

  const getStatusIcon = (status) => {
    if (status.includes('Open')) return 'lock_open';
    if (status.includes('Filtered')) return 'shield';
    return 'lock';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-4">
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
              Port Scanner
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
              Check if common server ports are open, closed, or filtered by a firewall. Useful for determining server security and verifying service availability.
            </p>
          </section>

          <div className="surface-container-lowest p-1 rounded-xl">
            <div className="bg-surface-container-low rounded-[calc(0.5rem+4px)] p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
              <form onSubmit={handleScan} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div className="md:col-span-2 space-y-2">
                    <label className="font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Target Host / IP</label>
                    <div className="relative group">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">dns</span>
                      <input
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                        className="w-full bg-surface-container-lowest border-2 border-transparent focus:border-primary rounded-xl py-4 pl-12 pr-4 font-headline text-lg transition-all outline-none"
                        placeholder="mywebsite.com"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Ports (Comma separated)</label>
                    <div className="relative group">
                      <input
                        value={ports}
                        onChange={(e) => setPorts(e.target.value)}
                        className="w-full bg-surface-container-lowest border-2 border-transparent focus:border-primary rounded-xl py-4 px-4 font-headline text-lg transition-all outline-none"
                        placeholder="80, 443"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-primary-container disabled:opacity-75 disabled:cursor-wait text-on-primary px-10 py-5 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-2">
                  <span>{loading ? 'Scanning Ports...' : 'Start Port Scan'}</span>
                  <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>troubleshoot</span>
                </button>
              </form>

              {results && (
                <div className="space-y-4 pt-6 mt-6 border-t border-outline-variant/15">
                  <h2 className="font-headline text-xl font-bold text-primary mb-4">Scan Results</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {results.map((r, i) => (
                      <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${getStatusColor(r.status)} shadow-sm`}>
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-2xl opacity-80">{getStatusIcon(r.status)}</span>
                          <div>
                            <div className="font-label text-[10px] uppercase tracking-widest opacity-70">Port {r.port}</div>
                            <div className="font-headline font-bold text-lg">{r.status.split('/')[0].trim()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex items-center justify-between p-4 rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm opacity-60 animate-pulse">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-2xl text-outline animate-spin">sync</span>
                          <div>
                            <div className="font-label text-[10px] uppercase tracking-widest text-outline">Checking...</div>
                            <div className="font-headline font-bold text-lg text-on-surface">Scanning next port</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <article className="bg-surface-container-low rounded-xl p-5 sm:p-8 space-y-4">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-secondary text-3xl">info</span>
              <div>
                <h2 className="font-headline text-xl font-bold text-on-surface mb-2">Notice Regarding Browser Scans</h2>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  This tool utilizes browser-native networking to detect port states. Because of browser security constraints (CORS and safe port limitations), results may represent "Filtered" (timeout) or "Closed" (refusal) probabilistically. For Enterprise-grade TCP scanning, a backend NMAP server would be required.
                </p>
              </div>
            </div>
          </article>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="w-full h-full min-h-[600px] bg-surface-container-low flex flex-col items-center justify-center rounded-xl border border-outline-variant/10">
            <span className="font-label text-[10px] uppercase text-outline">Advertisement</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PortCheck;
