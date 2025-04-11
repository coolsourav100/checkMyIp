// client/src/App.jsx
import React from 'react';
import IpDisplay from './components/IpDisplay';
import CookieConsent from './components/CookieConsent';
import AdUnit from './components/ads/AdUnit';
import Header from './components/Header';
import SpeedTest from './components/SpeedTest';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import ContactPage from './components/ContactPage';
import { HelmetProvider } from 'react-helmet-async';
import Footer from './components/Footer';

const App = () => {
  return (
    <HelmetProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
        <Header />

        {/* Main content container with relative positioning */}
        <div className="relative flex-grow">
          {/* Left sidebar - positioned absolutely below header */}
          <aside className="hidden xl:block absolute left-0 top-2 h-[calc(100vh-4rem)] w-72 p-6">
            <AdUnit
              slot="9876543210"
              format="vertical"
              className="sticky top-8"
            />
          </aside>

          {/* Main content area with proper margins */}
          <main className="mx-auto px-6 py-12 
                         xl:mx-72 xl:max-w-[calc(100vw-144px)] 
                         overflow-x-hidden">
            <Routes>
              <Route path="/" element={<IpDisplay />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/speedtest" element={<SpeedTest />} />
            </Routes>
          </main>

          {/* Right sidebar - positioned absolutely below header */}
          <aside className="hidden xl:block absolute right-0 top-2 h-[calc(100vh-4rem)] w-72 p-6">
            <AdUnit
              format="auto"
              slot="1234567890"
              className="sticky top-8"
            />
          </aside>
        </div>

        <Footer />
        {/* <CookieConsent /> */}
      </div>
    </HelmetProvider>
  );
};

export default App;
