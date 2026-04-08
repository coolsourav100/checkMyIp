// client/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppLayout from './components/layout/AppLayout';

import Home from './pages/Home';
import ToolsIndex from './pages/Tools/ToolsIndex';
import DnsLookup from './pages/Tools/DnsLookup';
import VpnProxyCheck from './pages/Tools/VpnProxyCheck';
import BlogIndex from './pages/Blog/BlogIndex';
import BlogArticle from './pages/Blog/BlogArticle';
import History from './pages/History';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';
import ErrorBoundary from './components/common/ErrorBoundary';

const App = () => {
  return (
    <HelmetProvider>
      <AppLayout>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/dns-lookup" element={<DnsLookup />} />
            <Route path="/vpn-check" element={<VpnProxyCheck />} />
            <Route path="/history" element={<History />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/how-to-hide-your-ip-address" element={<BlogArticle />} />
          </Routes>
        </ErrorBoundary>
      </AppLayout>
    </HelmetProvider>
  );
};

export default App;
