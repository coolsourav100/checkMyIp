import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavClass = ({ isActive }) =>
    `font-medium transition-colors duration-200 ${isActive ? 'text-[#003a94] dark:text-blue-400 font-bold border-b-2 border-[#003a94]' : 'text-slate-600 dark:text-slate-400 hover:text-[#0050c4]'}`;

  const getMobileNavClass = ({ isActive }) =>
    `block w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 text-base ${isActive ? 'text-[#003a94] dark:text-blue-400 font-bold bg-primary-fixed/30' : 'text-slate-600 dark:text-slate-400 hover:text-[#0050c4] hover:bg-surface-container-high'}`;

  return (
    <header className="bg-[#f7f9fb] dark:bg-slate-950 full-width top-0 z-50 sticky">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-[#003a94] dark:text-blue-400 tracking-tighter font-headline">
            <img src="/logo.png" alt="Check My IP Logo" className="w-8 h-8 rounded-lg shadow-sm" />
            Check My IP
          </Link>
          <nav className="hidden md:flex items-center gap-6 font-['Space_Grotesk'] text-sm tracking-tight">
            <NavLink to="/tools" className={getNavClass}>Tools</NavLink>
            <NavLink to="/speed-test" className={getNavClass}>Speed Test</NavLink>
            <NavLink to="/blog" className={getNavClass}>Blog</NavLink>
            <NavLink to="/history" className={getNavClass}>History</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-surface-container-high transition-colors active:scale-95"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-outline-variant/15 bg-[#f7f9fb] dark:bg-slate-950 px-4 pb-4 animate-[slideDown_0.2s_ease-out]">
          <nav className="flex flex-col gap-1 py-2 font-['Space_Grotesk']">
            <NavLink to="/tools" className={getMobileNavClass} onClick={() => setMobileMenuOpen(false)}>
              <span className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">apps</span>
                Tools
              </span>
            </NavLink>
            <NavLink to="/speed-test" className={getMobileNavClass} onClick={() => setMobileMenuOpen(false)}>
              <span className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">speed</span>
                Speed Test
              </span>
            </NavLink>
            <NavLink to="/blog" className={getMobileNavClass} onClick={() => setMobileMenuOpen(false)}>
              <span className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">article</span>
                Blog
              </span>
            </NavLink>
            <NavLink to="/history" className={getMobileNavClass} onClick={() => setMobileMenuOpen(false)}>
              <span className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">history</span>
                History
              </span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
