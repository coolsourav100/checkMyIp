import React, { useState, useRef, useCallback } from 'react';
import { saveToHistory } from '../../utils/history';
import AdUnit from '../../components/ads/AdUnit';

// Test file URLs — public Cloudflare/CDN test endpoints, no API key needed
const DOWNLOAD_TEST_URLS = [
  'https://speed.cloudflare.com/__down?bytes=10000000',   // 10MB
  'https://speed.cloudflare.com/__down?bytes=25000000',   // 25MB
];

const UPLOAD_URL = 'https://speed.cloudflare.com/__up';

const STATUS = {
  IDLE: 'idle',
  PINGING: 'pinging',
  DOWNLOADING: 'downloading',
  UPLOADING: 'uploading',
  DONE: 'done',
  ERROR: 'error',
};

const formatSpeed = (mbps) => {
  if (mbps === null) return '—';
  return mbps.toFixed(1);
};

// Arc gauge: draws a progress arc from bottom-left to bottom-right
const SpeedGauge = ({ speed, maxSpeed = 200, status }) => {
  const radius = 90;
  const cx = 120;
  const cy = 120;
  const startAngle = 210;
  const endAngle = 330;
  const totalArc = endAngle; // 270 degrees arc
  const clampedSpeed = Math.min(speed || 0, maxSpeed);
  const fraction = clampedSpeed / maxSpeed;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (totalArc / 360) * circumference;
  const dashOffset = arcLength - fraction * arcLength;

  const polarToXY = (angle) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const start = polarToXY(startAngle);
  const end = polarToXY(startAngle + totalArc);
  const largeArc = totalArc > 180 ? 1 : 0;
  const trackPath = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;

  const isActive = status === STATUS.DOWNLOADING || status === STATUS.UPLOADING;

  return (
    <svg width="240" height="200" viewBox="0 0 240 200">
      {/* Track */}
      <path d={trackPath} fill="none" stroke="#e0e3e5" strokeWidth="12" strokeLinecap="round" />
      {/* Progress */}
      <path
        d={trackPath}
        fill="none"
        stroke={status === STATUS.UPLOADING ? '#006874' : '#003a94'}
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={arcLength}
        strokeDashoffset={dashOffset}
        style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
      />
      {/* Speed Text */}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="38" fontWeight="800" fontFamily="Space Grotesk" fill="#003a94">
        {speed !== null ? formatSpeed(speed) : '—'}
      </text>
      <text x={cx} y={cy + 20} textAnchor="middle" fontSize="12" fontFamily="Inter" fill="#717781">
        Mbps
      </text>
      {/* Status label */}
      <text x={cx} y={cy + 44} textAnchor="middle" fontSize="9" fontFamily="Inter" fill={isActive ? '#003a94' : '#717781'} letterSpacing="2">
        {status === STATUS.DOWNLOADING ? 'DOWNLOAD' : status === STATUS.UPLOADING ? 'UPLOAD' : status === STATUS.PINGING ? 'PINGING' : status === STATUS.DONE ? 'COMPLETE' : 'READY'}
      </text>
    </svg>
  );
};

const SpeedTest = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [ping, setPing] = useState(null);
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [liveSpeed, setLiveSpeed] = useState(null);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const measurePing = async () => {
    const times = [];
    for (let i = 0; i < 5; i++) {
      const start = performance.now();
      try {
        await fetch('https://speed.cloudflare.com/__down?bytes=1', { cache: 'no-store' });
        times.push(performance.now() - start);
      } catch (e) { /* skip */ }
    }
    if (times.length === 0) throw new Error('Ping failed');
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    return Math.round(avg);
  };

  const measureDownload = async () => {
    let totalBytes = 0;
    let totalMs = 0;
    const controller = new AbortController();
    abortRef.current = controller;

    for (const url of DOWNLOAD_TEST_URLS) {
      const start = performance.now();
      const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
      const reader = res.body.getReader();
      let bytes = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.length;
        // Calculate live speed
        const elapsed = (performance.now() - start) / 1000;
        if (elapsed > 0) {
          const liveMbps = (bytes * 8) / (elapsed * 1_000_000);
          setLiveSpeed(liveMbps);
        }
      }
      totalBytes += bytes;
      totalMs += performance.now() - start;
    }

    const seconds = totalMs / 1000;
    return (totalBytes * 8) / (seconds * 1_000_000); // Mbps
  };

  const measureUpload = async () => {
    const sizeMB = 10;
    const data = new Uint8Array(sizeMB * 1024 * 1024);
    crypto.getRandomValues(data.slice(0, 1024)); // only fill first 1KB for speed
    const blob = new Blob([data]);

    const controller = new AbortController();
    abortRef.current = controller;

    const start = performance.now();
    await fetch(UPLOAD_URL, {
      method: 'POST',
      body: blob,
      signal: controller.signal,
      cache: 'no-store',
    });
    const elapsed = (performance.now() - start) / 1000;
    const mbps = (sizeMB * 8) / elapsed;

    // Animate upload gauge
    let progress = 0;
    const animate = setInterval(() => {
      progress = Math.min(progress + mbps / 20, mbps);
      setLiveSpeed(progress);
      if (progress >= mbps) clearInterval(animate);
    }, 100);
    await new Promise(r => setTimeout(r, 1200));
    clearInterval(animate);

    return mbps;
  };

  const runTest = useCallback(async () => {
    setStatus(STATUS.PINGING);
    setError(null);
    setPing(null);
    setDownloadSpeed(null);
    setUploadSpeed(null);
    setLiveSpeed(null);

    try {
      // 1. Ping
      const pingMs = await measurePing();
      setPing(pingMs);

      // 2. Download
      setStatus(STATUS.DOWNLOADING);
      const dlMbps = await measureDownload();
      setDownloadSpeed(dlMbps);
      setLiveSpeed(null);

      // 3. Upload
      setStatus(STATUS.UPLOADING);
      setLiveSpeed(0);
      const ulMbps = await measureUpload();
      setUploadSpeed(ulMbps);
      setLiveSpeed(null);

      // 4. Save to history
      saveToHistory(
        'Speed Test',
        'speedtest.cloudflare.com',
        `${dlMbps.toFixed(1)} Mbps ↓ / ${ulMbps.toFixed(1)} Mbps ↑`
      );

      setStatus(STATUS.DONE);
    } catch (err) {
      if (err.name === 'AbortError') return;
      setError('Could not complete the test. Please check your connection and try again.');
      setStatus(STATUS.ERROR);
    }
  }, []);

  const isRunning = [STATUS.PINGING, STATUS.DOWNLOADING, STATUS.UPLOADING].includes(status);
  const gaugeSpeed = isRunning ? liveSpeed : status === STATUS.DONE
    ? (status === STATUS.UPLOADING ? uploadSpeed : downloadSpeed)
    : null;

  // Show final download speed when done
  const displaySpeed = status === STATUS.DONE
    ? downloadSpeed
    : liveSpeed;

  const getQuality = (mbps) => {
    if (mbps === null) return null;
    if (mbps >= 100) return { label: 'Excellent', color: 'text-green-600', bg: 'bg-green-50' };
    if (mbps >= 25) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (mbps >= 5) return { label: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { label: 'Poor', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const quality = getQuality(downloadSpeed);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16 sm:pb-20">
      <div className="flex flex-col xl:flex-row gap-8 items-start">
        {/* Left Ad */}
        <aside className="hidden xl:block w-[300px] shrink-0 sticky top-28">
          <div className="w-[300px] min-h-[600px] bg-surface-container-low flex flex-col items-center justify-center rounded-xl relative overflow-hidden border border-outline-variant/10">
            <span className="font-label text-[10px] uppercase tracking-widest text-outline absolute top-2 left-4 z-10">Advertisement</span>
            <AdUnit slot="auto" format="vertical" className="w-[300px] h-[600px]" />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0 space-y-8">
          {/* Header */}
          <div>
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight mb-2">
              Network Speed Test
            </h1>
            <p className="text-on-surface-variant max-w-xl">
              Measure your real-world Internet download speed, upload speed, and latency using Cloudflare's edge servers.
            </p>
          </div>

          {/* Main Speed Test Card */}
          <section className="bg-surface-container-lowest rounded-xl p-4 sm:p-6 md:p-8 ambient-shadow relative overflow-hidden">
            {/* Subtle background glow */}
            <div className={`absolute inset-0 transition-all duration-1000 pointer-events-none ${status === STATUS.DOWNLOADING ? 'bg-primary/3' : status === STATUS.UPLOADING ? 'bg-secondary/3' : 'bg-transparent'}`} />

            <div className="flex flex-col items-center">
              {/* Gauge */}
              <div className="relative scale-75 sm:scale-100 origin-center">
                <SpeedGauge
                  speed={displaySpeed}
                  maxSpeed={500}
                  status={status}
                />
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-sm mt-2 sm:mt-4 mb-6 sm:mb-8">
                <div className="text-center">
                  <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">Ping</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-headline text-lg sm:text-2xl font-bold text-on-surface">{ping ?? '—'}</span>
                    {ping && <span className="font-label text-xs text-slate-400">ms</span>}
                  </div>
                </div>
                <div className="text-center border-x border-outline-variant/20">
                  <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">Download</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`font-headline text-lg sm:text-2xl font-bold ${downloadSpeed ? 'text-primary' : 'text-on-surface'}`}>
                      {downloadSpeed ? formatSpeed(downloadSpeed) : '—'}
                    </span>
                    {downloadSpeed && <span className="font-label text-xs text-slate-400">Mbps</span>}
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">Upload</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`font-headline text-lg sm:text-2xl font-bold ${uploadSpeed ? 'text-secondary' : 'text-on-surface'}`}>
                      {uploadSpeed ? formatSpeed(uploadSpeed) : '—'}
                    </span>
                    {uploadSpeed && <span className="font-label text-xs text-slate-400">Mbps</span>}
                  </div>
                </div>
              </div>

              {/* Stage Indicator */}
              {isRunning && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-label text-xs uppercase tracking-widest text-primary">
                    {status === STATUS.PINGING && 'Measuring latency...'}
                    {status === STATUS.DOWNLOADING && 'Testing download speed...'}
                    {status === STATUS.UPLOADING && 'Testing upload speed...'}
                  </span>
                </div>
              )}

              {/* Quality Badge when done */}
              {status === STATUS.DONE && quality && (
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${quality.bg}`}>
                  <span className={`font-bold text-sm ${quality.color}`}>{quality.label} Connection</span>
                </div>
              )}

              {/* Error */}
              {status === STATUS.ERROR && (
                <p className="text-error text-sm mb-4 text-center">{error}</p>
              )}

              {/* GO Button */}
              <button
                onClick={runTest}
                disabled={isRunning}
                className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full font-headline text-3xl sm:text-4xl font-bold tracking-tighter ambient-shadow transition-all active:scale-95
                  ${isRunning
                    ? 'bg-surface-container-high text-outline cursor-not-allowed'
                    : 'bg-gradient-to-br from-primary to-[#0050c4] text-white hover:scale-105 hover:shadow-primary/30 hover:shadow-lg'
                  }`}
              >
                {isRunning
                  ? <span className="material-symbols-outlined text-3xl animate-spin">refresh</span>
                  : status === STATUS.DONE ? 'REDO' : 'GO'
                }
              </button>
            </div>
          </section>

          {/* Result Details Card — shown after completion */}
          {status === STATUS.DONE && (
            <section className="bg-surface-container-lowest rounded-xl p-4 sm:p-6 md:p-8 ambient-shadow">
              <h2 className="font-headline text-xl font-bold text-primary mb-6">Detailed Results</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { label: 'Ping', value: `${ping} ms`, icon: 'network_ping', color: 'text-primary' },
                  { label: 'Download', value: `${formatSpeed(downloadSpeed)} Mbps`, icon: 'download', color: 'text-primary' },
                  { label: 'Upload', value: `${formatSpeed(uploadSpeed)} Mbps`, icon: 'upload', color: 'text-secondary' },
                  { label: 'Quality', value: quality.label, icon: 'grade', color: quality.color },
                ].map((item) => (
                  <div key={item.label} className="bg-surface-container-low rounded-xl p-5 text-center">
                    <span className={`material-symbols-outlined text-2xl ${item.color} mb-2 block`}>{item.icon}</span>
                    <div className={`font-headline text-xl font-bold ${item.color}`}>{item.value}</div>
                    <div className="font-label text-[10px] text-outline uppercase tracking-widest mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Educational Content */}
          <section className="bg-surface-container-low rounded-xl p-5 sm:p-8">
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-surface mb-6">What affects your speed?</h2>
            <div className="space-y-5">
              {[
                { n: '01', title: 'Hardware Bottlenecks', body: 'Older routers or network cards may not support modern gigabit speeds. Ensure your hardware is rated for your service plan.' },
                { n: '02', title: 'Wi-Fi Interference', body: 'Wi-Fi signals degrade through concrete walls and interference from other 2.4GHz devices. Use 5GHz or ethernet for best results.' },
                { n: '03', title: 'ISP Network Congestion', body: 'Peak hours (evenings, weekends) cause shared bandwidth contention. Re-test at different times of day for a complete picture.' },
              ].map((item) => (
                <div key={item.n} className="flex gap-4">
                  <span className="font-headline text-xl font-light text-primary/30 shrink-0 mt-0.5">{item.n}</span>
                  <div>
                    <h3 className="font-headline font-bold text-on-surface mb-1">{item.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Ad Sidebar */}
        <aside className="w-full xl:w-[300px] shrink-0">
          <div className="sticky top-28 space-y-6">
            <div className="w-full min-h-[600px] bg-surface-container-low flex flex-col items-center justify-center rounded-xl relative overflow-hidden border border-outline-variant/10">
              <span className="font-label text-[10px] uppercase tracking-widest text-outline absolute top-2 left-4 z-10">Advertisement</span>
              <AdUnit slot="auto" format="vertical" className="w-full h-[600px]" />
            </div>
            {/* Tips Card */}
            <div className="bg-primary text-white p-6 rounded-xl">
              <h4 className="font-headline font-bold mb-3">Optimize Results</h4>
              <ul className="space-y-3 font-label text-xs opacity-90">
                {[
                  'Use an Ethernet cable for most accurate data',
                  'Close high-bandwidth background apps',
                  'Re-test at different times of day',
                  'Test on multiple devices to isolate issues',
                ].map((tip) => (
                  <li key={tip} className="flex gap-2 items-start">
                    <span className="material-symbols-outlined text-sm mt-0.5 shrink-0">check_circle</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SpeedTest;
