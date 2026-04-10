import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#f2f4f6] dark:bg-slate-900 border-t border-[#c1c7d1]/15 full-width mt-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 w-full px-4 sm:px-8 py-8 sm:py-12 max-w-7xl mx-auto font-['Manrope'] text-sm">
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Check My IP Logo" className="w-8 h-8 rounded-lg shadow-sm" />
            <div className="text-xl font-bold text-[#003a94] dark:text-blue-400 font-headline">Check My IP</div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-[200px]">
            Precision network utilities for the modern digital era. Monitor, secure, and understand your connectivity.
          </p>
          {/* <div className="flex gap-4">
            <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors">hub</span>
            <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors">lan</span>
            <span className="material-symbols-outlined text-slate-400 hover:text-primary cursor-pointer transition-colors">terminal</span>
          </div> */}
        </div>
        <div className="space-y-4">
          <div className="font-bold text-on-surface uppercase tracking-wider font-headline text-xs text-[#003a94] dark:text-blue-400">Core Tools</div>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-[#003a94] dark:hover:text-blue-300 underline underline-offset-4 transition-all duration-300 ease-in-out">IP Lookup</Link>
            <Link to="/dns-lookup" className="text-slate-500 dark:text-slate-400 hover:text-[#003a94] dark:hover:text-blue-300 underline underline-offset-4 transition-all duration-300 ease-in-out">DNS Lookup</Link>
            <Link to="/ping-check" className="text-slate-500 dark:text-slate-400 hover:text-[#003a94] dark:hover:text-blue-300 underline underline-offset-4 transition-all duration-300 ease-in-out">Ping Test</Link>
            <Link to="/speed-test" className="text-slate-500 dark:text-slate-400 hover:text-[#003a94] dark:hover:text-blue-300 underline underline-offset-4 transition-all duration-300 ease-in-out">Speed Test</Link>
          </nav>
        </div>
        <div className="space-y-4">
          <div className="font-bold text-on-surface uppercase tracking-wider font-headline text-xs text-[#003a94] dark:text-blue-400">Security</div>
          <nav className="flex flex-col gap-2">
            <Link to="/vpn-check" className="text-slate-500 dark:text-slate-400 hover:text-[#003a94] dark:hover:text-blue-300 underline underline-offset-4 transition-all duration-300 ease-in-out">VPN & Proxy Detection</Link>
            <Link to="/whois-lookup" className="text-slate-500 dark:text-slate-400 hover:text-[#003a94] dark:hover:text-blue-300 underline underline-offset-4 transition-all duration-300 ease-in-out">Whois Lookup</Link>
            <Link to="/port-check" className="text-slate-500 dark:text-slate-400 hover:text-[#003a94] dark:hover:text-blue-300 underline underline-offset-4 transition-all duration-300 ease-in-out">Port Scanner</Link>
            <Link to="/security-check" className="text-slate-500 dark:text-slate-400 hover:text-[#003a94] dark:hover:text-blue-300 underline underline-offset-4 transition-all duration-300 ease-in-out">Network Security</Link>
          </nav>
        </div>
        <div className="space-y-4">
          <div className="font-bold text-on-surface uppercase tracking-wider font-headline text-xs text-[#003a94] dark:text-blue-400">Legal</div>
          <nav className="flex flex-col gap-2">
            <Link to="/privacy" className="text-slate-500 dark:text-slate-400 hover:text-[#003a94] dark:hover:text-blue-300 underline underline-offset-4 transition-all duration-300 ease-in-out">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-500 dark:text-slate-400 hover:text-[#003a94] dark:hover:text-blue-300 underline underline-offset-4 transition-all duration-300 ease-in-out">Terms of Service</Link>
          </nav>
        </div>
      </div>
      <div className="w-full px-4 sm:px-8 py-4 sm:py-6 max-w-7xl mx-auto border-t border-[#c1c7d1]/10 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-xs font-['Manrope']">© 2026 Check My IP. Precision Network Utilities.</p>
      </div>
    </footer>
  );
};

export default Footer;
