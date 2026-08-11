// client/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';

import AppLayout from './components/layout/AppLayout';

import Home from './pages/Home';
import ToolsIndex from './pages/Tools/ToolsIndex';
import DnsLookup from './pages/Tools/DnsLookup';
import VpnProxyCheck from './pages/Tools/VpnProxyCheck';
import SpeedTest from './pages/Tools/SpeedTest';
import PingCheck from './pages/Tools/PingCheck';
import PortCheck from './pages/Tools/PortCheck';
import WhoisLookup from './pages/Tools/WhoisLookup';
import NetworkSecurity from './pages/Tools/NetworkSecurity';
import BlogIndex from './pages/Blog/BlogIndex';
import BlogArticle from './pages/Blog/BlogArticle';
import History from './pages/History';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';
import ErrorBoundary from './components/common/ErrorBoundary';

import About from './pages/Legal/About';

const App = () => {
  return (
    <HelmetProvider>
      <Analytics />
      <AppLayout>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/dns-lookup" element={<DnsLookup />} />
            <Route path="/vpn-check" element={<VpnProxyCheck />} />
            <Route path="/speed-test" element={<SpeedTest />} />
            <Route path="/ping-check" element={<PingCheck />} />
            <Route path="/port-check" element={<PortCheck />} />
            <Route path="/whois-lookup" element={<WhoisLookup />} />
            <Route path="/security-check" element={<NetworkSecurity />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:id" element={<BlogArticle />} />
          </Routes>
        </ErrorBoundary>
      </AppLayout>
    </HelmetProvider>
  );
};

export default App;
