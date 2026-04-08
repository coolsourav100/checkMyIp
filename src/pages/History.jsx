import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHistory, clearHistory } from '../utils/history';

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    // Load history when component mounts
    setHistoryItems(getHistory());
    
    // Optional: add a storage event listener if we want sync across tabs
    const handleStorageChange = () => setHistoryItems(getHistory());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleClearHistory = () => {
    clearHistory();
    setHistoryItems([]);
  };

  const getTypeIcon = (type) => {
    if (type.includes('IP')) return 'my_location';
    if (type.includes('DNS')) return 'dns';
    if (type.includes('VPN')) return 'vpn_lock';
    return 'search';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 min-h-[calc(100vh-200px)] flex flex-col">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="space-y-4">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">Your Search History</h1>
          <p className="text-on-surface-variant max-w-2xl text-lg relative pl-5 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary/20 before:rounded-full">
            All your network queries are securely saved directly in your browser's local storage. None of this data is sent to our servers.
          </p>
        </div>
        {historyItems.length > 0 && (
          <button 
            onClick={handleClearHistory}
            className="flex items-center gap-2 px-6 py-3 bg-error/10 text-error hover:bg-error hover:text-white rounded-xl font-bold tracking-tight transition-all active:scale-95 group shrink-0"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Clear History
          </button>
        )}
      </div>

      <div className="flex-1">
        {historyItems.length === 0 ? (
          <div className="w-full h-full min-h-[40vh] flex flex-col items-center justify-center bg-surface-container-low rounded-xl border border-dashed border-outline-variant/30">
            <span className="material-symbols-outlined text-border text-[6rem] mb-6 text-outline-variant/30">history</span>
            <h3 className="font-headline text-2xl font-bold text-on-surface-variant mb-2">No history recorded yet</h3>
            <p className="text-on-surface-variant/80 mb-8 max-w-md text-center">Run a DNS lookup, check your IP, or scan a VPN and your records will securely appear here.</p>
            <Link to="/tools" className="bg-primary text-white px-8 py-4 rounded-xl font-bold tracking-tight hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
              Explore Tools
            </Link>
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label text-xs uppercase tracking-widest border-b border-outline-variant/10">
                    <th className="px-6 py-4 font-bold">Tool Used</th>
                    <th className="px-6 py-4 font-bold">Target Queried</th>
                    <th className="px-6 py-4 font-bold">Result Summary</th>
                    <th className="px-6 py-4 font-bold">Timestamp</th>
                    <th className="px-6 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {historyItems.map((item) => {
                    const date = new Date(item.timestamp);
                    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                    
                    return (
                      <tr key={item.id} className="hover:bg-surface-container-lowest transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                              <span className="material-symbols-outlined text-[20px]">{getTypeIcon(item.type)}</span>
                            </div>
                            <span className="font-bold text-on-surface">{item.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 font-mono text-sm text-on-surface-variant tracking-tight">{item.target}</td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center px-3 py-1 rounded-sm text-xs font-bold font-label uppercase tracking-widest ${item.summary.includes('Clean') ? 'bg-secondary-container/50 text-secondary border border-secondary/20' : item.summary.includes('VPN') ? 'bg-error-container/50 text-error border border-error/20' : 'bg-surface-container-high text-on-surface'}`}>
                            {item.summary}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-on-surface">{formattedDate}</span>
                            <span className="text-xs text-outline font-label uppercase tracking-wider">{formattedTime}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button 
                            onClick={() => navigator.clipboard.writeText(item.target)}
                            className="p-2 text-outline hover:text-primary transition-colors tooltip relative group/btn"
                            title="Copy Target"
                          >
                            <span className="material-symbols-outlined text-xl">content_copy</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
