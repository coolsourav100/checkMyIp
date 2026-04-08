import React from 'react';
import { Link } from 'react-router-dom';

const ToolsIndex = () => {
  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">Network Utility Hub</h1>
            <p className="text-on-surface-variant text-lg leading-relaxed">Access our comprehensive suite of professional-grade network diagnostics and security auditing tools. Built for speed, precision, and privacy.</p>
          </div>
          <div className="w-full md:w-auto mt-6 md:mt-0">
            {/* Billboard Ad Placeholder */}
            <div className="bg-surface-container-low w-full md:w-[728px] h-[90px] lg:w-[970px] lg:h-[250px] flex items-center justify-center rounded-xl border border-outline-variant/10 relative overflow-hidden hidden sm:flex">
              <span className="text-[10px] uppercase tracking-widest text-outline font-label absolute top-2 left-4 lg:top-4 lg:left-6">Advertisement</span>
              <div className="text-outline-variant font-medium lg:text-lg">Premium Billboard Ad Slot</div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Hero */}
      <section className="mb-16">
        <div className="relative bg-primary-container p-5 sm:p-8 md:p-12 rounded-xl sm:rounded-[2rem] overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-container rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-on-primary-container font-headline text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8">What are you looking for today?</h2>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-6 text-on-primary-container/60 text-2xl">search</span>
              <input className="w-full h-12 sm:h-16 pl-12 sm:pl-16 pr-4 sm:pr-8 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/50 text-base sm:text-lg focus:ring-4 focus:ring-secondary/30 outline-none transition-all" placeholder="Find a tool (e.g., DNS, Proxy, Ping...)" type="text" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tools Grid (8/12 columns) */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* IP Lookup */}
            <Link to="/" className="group bg-surface-container-lowest p-6 rounded-xl border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-[0_24px_48px_rgba(25,28,30,0.06)] flex flex-col h-full">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">my_location</span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">IP Lookup</h3>
              <p className="text-on-surface-variant text-sm mb-6 flex-grow">Retrieve detailed geographical and technical information for any IPv4 or IPv6 address.</p>
              <div className="flex items-center text-primary font-bold text-sm">
                Launch Tool <span className="material-symbols-outlined ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>

            {/* DNS Lookup */}
            <Link to="/dns-lookup" className="group bg-surface-container-lowest p-6 rounded-xl border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-[0_24px_48px_rgba(25,28,30,0.06)] flex flex-col h-full">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">dns</span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">DNS Lookup</h3>
              <p className="text-on-surface-variant text-sm mb-6 flex-grow">Query all DNS record types including A, MX, TXT, and CNAME for any domain globally.</p>
              <div className="flex items-center text-primary font-bold text-sm">
                Launch Tool <span className="material-symbols-outlined ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>

            {/* VPN/Proxy Detection */}
            <Link to="/vpn-check" className="group bg-surface-container-lowest p-6 rounded-xl border border-transparent hover:border-primary/20 transition-all duration-300 hover:shadow-[0_24px_48px_rgba(25,28,30,0.06)] flex flex-col h-full">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined">vpn_lock</span>
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">VPN & Proxy Checker</h3>
              <p className="text-on-surface-variant text-sm mb-6 flex-grow">Advanced algorithm to detect if an IP is associated with a datacenter, known VPN, or hosting provider.</p>
              <div className="flex items-center text-primary font-bold text-sm">
                Launch Tool <span className="material-symbols-outlined ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>

            {/* New Tool Suggestion */}
            <div className="bg-surface-container-low p-6 rounded-xl border border-dashed border-outline-variant/50 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-outline-variant mb-3">add_circle</span>
              <h3 className="font-headline text-lg font-medium text-on-surface-variant">Suggest a tool</h3>
              <p className="text-on-surface-variant text-xs mt-1">Need a specific utility? Let us know.</p>
            </div>
          </div>
        </div>

        {/* Sidebar (3/12 columns) */}
        <aside className="lg:col-span-3 space-y-8">
          {/* Sidebar Ad */}
          <div className="bg-surface-container-low w-full aspect-[3/5] flex flex-col items-center justify-center rounded-xl border border-outline-variant/10 overflow-hidden relative">
            <img alt="Sidebar Ad" className="absolute inset-0 w-full h-full object-cover opacity-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLQEO45y-PnBHc1SX-J9fKMs6bKlZIW-2XywUImHT6ZEPaPafDZlW7kaKAfhLca-Rw7yNAZA9sZMBwN0xV9nW5bQ9UcTdtpVkzdwZ3EiW97iN5guKxlTvACgsMAE6qrVCuS8Jz7LLefwvDdytmCHb5sr_CZgiQckSBTwa7IyJo2x9NaZAX804tdCaVQ3q5RAYqLhkiEkBlu1Qo8b7QHLJO_W8wh5m6qDt8JWa1iqv_WQ3UEb9e9S1XSaDf-p4E5_U-xAd6LiXpwok" />
            <span className="text-[10px] uppercase tracking-widest text-outline font-label mb-4 z-10">Advertisement</span>
            <div className="w-[160px] h-[600px] bg-white shadow-sm flex items-center justify-center border border-outline-variant/20 z-10">
              <span className="text-outline-variant text-[10px]">160 x 600</span>
            </div>
          </div>

          {/* Trending Tools */}
          <div className="bg-surface-container-low p-6 rounded-xl">
            <h4 className="font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">trending_up</span>
              Trending Now
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="group flex items-center justify-between py-2 border-b border-outline-variant/10">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">VPN Audit v2.0</span>
                  <span className="text-[10px] bg-secondary-fixed text-on-secondary-fixed px-2 py-0.5 rounded-full font-label">HOT</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="group flex items-center justify-between py-2 border-b border-outline-variant/10">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">IPv6 Transition Checker</span>
                  <span className="material-symbols-outlined text-xs text-outline-variant">chevron_right</span>
                </Link>
              </li>
              <li>
                <Link to="#" className="group flex items-center justify-between py-2">
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">Global Ping Grid</span>
                  <span className="material-symbols-outlined text-xs text-outline-variant">chevron_right</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ToolsIndex;
