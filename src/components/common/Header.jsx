import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const getNavClass = ({ isActive }) =>
    `font-medium transition-colors duration-200 ${isActive ? 'text-[#003a94] dark:text-blue-400 font-bold border-b-2 border-[#003a94]' : 'text-slate-600 dark:text-slate-400 hover:text-[#0050c4]'}`;

  return (
    <header className="bg-[#f7f9fb] dark:bg-slate-950 full-width top-0 z-50 sticky">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-[#003a94] dark:text-blue-400 tracking-tighter font-headline">Check My IP</Link>
          <nav className="hidden md:flex items-center gap-6 font-['Space_Grotesk'] text-sm tracking-tight">
            <NavLink to="/tools" className={getNavClass}>Tools</NavLink>
            <NavLink to="/speed-test" className={getNavClass}>Speed Test</NavLink>
            <NavLink to="/blog" className={getNavClass}>Blog</NavLink>
            <NavLink to="/history" className={getNavClass}>History</NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
            <input className="bg-surface-container-high border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary w-64 transition-all" placeholder="Search insights..." type="text" />
          </div> */}
          {/* <button className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold active:opacity-80 active:scale-95 transition-all">Sign In</button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
