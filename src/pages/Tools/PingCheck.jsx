import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { saveToHistory } from '../../utils/history';

const PingCheck = () => {
  const [host, setHost] = useState('');
  // const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  // const [error, setError] = useState('');
  const [activeWait, setActiveWait] = useState(false);

  const handlePing = async (e) => {
    e.preventDefault();
    if (!host) return;

    let cleanHost = host.trim().toLowerCase();
    if (cleanHost.startsWith('http://')) cleanHost = cleanHost.substring(7);
    if (cleanHost.startsWith('https://')) cleanHost = cleanHost.substring(8);
    if (cleanHost.split('/').length > 1) cleanHost = cleanHost.split('/')[0];

    // setLoading(true);
    // setError('');
    setResults([]);
    setActiveWait(true);

    const pingResults = [];

    // Perform 4 HTTP Pings
    for (let i = 0; i < 4; i++) {
      const start = performance.now();
      let status = 'Error';
      let time = 0;
      try {
        // Using a cache-busting parameter to prevent browser caching from invalidating the test
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

        await fetch(`https://${cleanHost}/?ping=${performance.now()}`, {
          mode: 'no-cors',
          cache: 'no-store',
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        time = performance.now() - start;
        status = 'Success';
      } catch (err) {
        time = performance.now() - start;
        status = err.name === 'AbortError' || err.message.includes('abort') ? 'Timeout' : 'Error/Closed';
      }

      const newResult = { seq: i + 1, time: Math.round(time), status };
      pingResults.push(newResult);

      // Update state progressively
      setResults([...pingResults]);

      // Wait 1 second between pings unless it's the last one
      if (i < 3) {
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    setActiveWait(false);
    // setLoading(false);

    // Save to history
    saveToHistory('Ping Test', cleanHost, `Completed 4 pings`);
  };

  const calculateStats = () => {
    if (!results || results.length === 0) return null;
    let min = Infinity, max = 0, sum = 0, successCount = 0;
    results.forEach(r => {
      if (r.status === 'Success') {
        successCount++;
        if (r.time < min) min = r.time;
        if (r.time > max) max = r.time;
        sum += r.time;
      }
    });
    if (successCount === 0) return { min: 0, max: 0, avg: 0, loss: 100 };
    return {
      min, max, avg: Math.round(sum / successCount), loss: ((4 - successCount) / 4) * 100
    };
  };

  const stats = calculateStats();

  return (
    <>
      <Helmet>
        <title>Ping Test Tool | Measure Website Latency & Reachability</title>
        <meta name="description" content="Use our free HTTP Ping tool to test server reachability, measure network latency (TTFB), and detect packet loss to any website or IP address." />
        <link rel="canonical" href="https://www.checkmyip.in/ping-check" />
      </Helmet>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-4">
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight leading-tight">
              HTTP Ping Test
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
              Verify server reachability and measure network latency. This tool performs application-level (HTTP) pings from your browser to accurately measure web-server response times.
            </p>
          </section>

          <div className="surface-container-lowest p-1 rounded-xl">
            <div className="bg-surface-container-low rounded-[calc(0.5rem+4px)] p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
              <form onSubmit={handlePing} className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full space-y-2">
                  <label className="font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Target Host / IP</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">radar</span>
                    <input
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                      className="w-full bg-surface-container-lowest border-2 border-transparent focus:border-primary rounded-xl py-4 pl-12 pr-4 font-headline text-lg transition-all outline-none"
                      placeholder="e.g. google.com or 8.8.8.8"
                      type="text"
                      required
                    />
                  </div>
                </div>
                <button type="submit" disabled={activeWait} className="w-full md:w-auto bg-gradient-to-r from-primary to-primary-container disabled:opacity-75 disabled:cursor-wait text-on-primary px-10 py-5 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <span>{activeWait ? 'Pinging...' : 'Ping'}</span>
                  <span className={`material-symbols-outlined ${activeWait ? 'animate-spin' : ''}`}>sync_alt</span>
                </button>
              </form>

              {results && results.length > 0 && (
                <div className="space-y-6 pt-4">
                  <h2 className="font-headline text-xl font-bold text-primary border-b border-outline-variant/15 pb-4">Ping Results</h2>

                  <div className="space-y-3">
                    {results.map((r, i) => (
                      <div key={i} className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-headline text-sm">
                            {r.seq}
                          </div>
                          <div className="font-label text-sm text-on-surface">Reply from {host.split('//').pop()}</div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex flex-col text-right">
                            <span className="text-[10px] text-outline uppercase font-label tracking-widest">Time</span>
                            <span className={`font-headline font-bold text-lg ${r.status === 'Success' ? 'text-green-600' : 'text-error'}`}>
                              {r.status === 'Success' ? `${r.time} ms` : r.status}
                            </span>
                          </div>
                          <span className={`material-symbols-outlined text-2xl ${r.status === 'Success' ? 'text-green-500' : 'text-error'}`}>
                            {r.status === 'Success' ? 'check_circle' : 'error'}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Loading skeletal row for next ping */}
                    {activeWait && results.length < 4 && (
                      <div className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 shadow-sm opacity-50 animate-pulse">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold font-headline text-sm">
                            {results.length + 1}
                          </div>
                          <div className="font-label text-sm text-on-surface">Waiting for reply...</div>
                        </div>
                        <span className="material-symbols-outlined animate-spin text-outline">autorenew</span>
                      </div>
                    )}
                  </div>

                  {!activeWait && stats && (
                    <div className="mt-8 pt-6 border-t border-outline-variant/15">
                      <h3 className="font-headline font-bold text-lg mb-4 text-on-surface">Ping Statistics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 text-center">
                          <div className="text-[10px] font-label text-outline uppercase tracking-widest mb-1">Sent / Recv</div>
                          <div className="font-headline font-bold text-xl text-on-surface">4 / {4 - Math.round((stats.loss / 100) * 4)}</div>
                        </div>
                        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 text-center">
                          <div className="text-[10px] font-label text-outline uppercase tracking-widest mb-1">Packet Loss</div>
                          <div className={`font-headline font-bold text-xl ${stats.loss > 0 ? 'text-error' : 'text-green-600'}`}>{stats.loss}%</div>
                        </div>
                        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 text-center">
                          <div className="text-[10px] font-label text-outline uppercase tracking-widest mb-1">Min / Max</div>
                          <div className="font-headline font-bold text-xl text-on-surface">{stats.successCount === 0 ? '--' : `${stats.min} / ${stats.max}`}</div>
                        </div>
                        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/10 text-center">
                          <div className="text-[10px] font-label text-outline uppercase tracking-widest mb-1">Average</div>
                          <div className={`font-headline font-bold text-xl ${stats.avg ? 'text-primary' : 'text-on-surface'}`}>{stats.avg ? `${stats.avg} ms` : '--'}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <article className="bg-surface-container-low rounded-xl p-5 sm:p-8 space-y-6">
            <h2 className="font-headline text-2xl font-bold text-primary">Understanding Network Latency & Ping</h2>
            
            <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
              <section>
                <h3 className="font-headline text-lg font-semibold mb-2 text-on-surface">What is a Ping Test?</h3>
                <p>
                  A ping test is a fundamental network diagnostic tool used to check the reachability of a host (like a website or server) on an Internet Protocol (IP) network. It measures the round-trip time (RTT) for messages sent from the originating host to a destination computer that are echoed back to the source. The name comes from active sonar terminology, where a pulse of sound is sent out and listening for its echo indicates the presence and distance of an object.
                </p>
              </section>

              <section>
                <h3 className="font-headline text-lg font-semibold mb-2 text-on-surface">How HTTP Ping Works</h3>
                <p>
                  Traditional ICMP (Internet Control Message Protocol) Network Pings operate at the network layer and are often blocked by modern web browsers for security reasons. This tool performs <strong>HTTP Pings</strong>. It attempts to load a resource securely over the web, giving you an accurate measurement of real-world latency (TTFB - Time to First Byte) between your device and the destination web server, exactly as a real user would experience it.
                </p>
              </section>

              <section>
                <h3 className="font-headline text-lg font-semibold mb-2 text-on-surface">Why Does Ping Matter?</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Online Gaming:</strong> High ping results in "lag," where your actions are delayed. A ping under 50ms is usually ideal for competitive gaming.</li>
                  <li><strong>Video Conferencing:</strong> High latency causes delays in audio and video, leading to people talking over each other.</li>
                  <li><strong>Web Browsing:</strong> Even with high bandwidth, high latency means websites take longer to start loading.</li>
                </ul>
                <p className="mt-3">
                  Consistent packet loss (where requests never make it back) indicates an unstable connection, routing issues, or an overwhelmed server.
                </p>
              </section>
            </div>
          </article>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="w-full h-full min-h-[600px] bg-surface-container-low flex flex-col items-center justify-center rounded-xl relative overflow-hidden border border-outline-variant/10">
            <span className="font-label text-[10px] uppercase tracking-widest text-outline absolute top-4 left-6 z-10">Advertisement</span>
            <div className="w-[300px] h-[600px] bg-white text-outline-variant font-medium text-center italic border flex items-center justify-center z-10">
              300x600 Vertical Ad
            </div>
          </div>
        </aside>
      </div>
    </div>
    </>
  );
};

export default PingCheck;
