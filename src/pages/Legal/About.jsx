import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Helmet>
        <title>About Us | Check My IP — Free Network Diagnostic Tools</title>
        <meta name="description" content="Learn about Check My IP, our mission to provide accurate network diagnostic tools, our data sources, commitment to privacy, and the technology behind our platform." />
        <link rel="canonical" href="https://www.checkmyip.in/about" />
      </Helmet>
      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">About Check My IP</h1>
        <p className="text-on-surface-variant text-lg">Free, fast, and privacy-focused network diagnostic tools for everyone.</p>
      </div>

      <div className="space-y-10 text-on-surface leading-relaxed text-lg font-body">
        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">Our Mission</h2>
          <p className="mb-4">
            Check My IP was created with a simple goal: make network diagnostics accessible to everyone, not just system administrators and security professionals. We believe that understanding your digital footprint is the first step toward online privacy and security.
          </p>
          <p>
            In an era where data is constantly being collected and monetized, we provide transparent tools that let you see exactly what websites, advertisers, and potential attackers can learn about you from your internet connection. Our platform is free to use, requires no account registration, and respects your privacy by design.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">What We Offer</h2>
          <p className="mb-4">Our suite of network diagnostic tools is designed to be simple enough for casual users yet technically robust for professionals:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-surface-container-low p-5 rounded-xl">
              <h3 className="font-headline font-bold text-on-surface mb-2">IP Address Lookup</h3>
              <p className="text-sm text-on-surface-variant">Instantly detect your public IPv4 and IPv6 addresses, geographic location, ISP, and ASN information.</p>
            </div>
            <div className="bg-surface-container-low p-5 rounded-xl">
              <h3 className="font-headline font-bold text-on-surface mb-2">DNS Lookup</h3>
              <p className="text-sm text-on-surface-variant">Query A, AAAA, MX, CNAME, TXT, and NS records for any domain using Google's public DNS-over-HTTPS API.</p>
            </div>
            <div className="bg-surface-container-low p-5 rounded-xl">
              <h3 className="font-headline font-bold text-on-surface mb-2">VPN & Proxy Detection</h3>
              <p className="text-sm text-on-surface-variant">Check if an IP address is associated with a datacenter, VPN service, or anonymous proxy network.</p>
            </div>
            <div className="bg-surface-container-low p-5 rounded-xl">
              <h3 className="font-headline font-bold text-on-surface mb-2">Speed Test</h3>
              <p className="text-sm text-on-surface-variant">Measure your real-world download speed, upload speed, and latency using Cloudflare's global edge network.</p>
            </div>
            <div className="bg-surface-container-low p-5 rounded-xl">
              <h3 className="font-headline font-bold text-on-surface mb-2">Ping Test & Port Scanner</h3>
              <p className="text-sm text-on-surface-variant">Test server reachability with HTTP ping and check common service ports for open, closed, or filtered states.</p>
            </div>
            <div className="bg-surface-container-low p-5 rounded-xl">
              <h3 className="font-headline font-bold text-on-surface mb-2">WHOIS & Security Audit</h3>
              <p className="text-sm text-on-surface-variant">Look up domain registration data via RDAP and audit HTTP security headers and TLS configurations.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">Our Data Sources</h2>
          <p className="mb-4">Transparency is central to our platform. Here are the APIs and services we use to provide accurate data:</p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>ipinfo.io</strong> — Provides IP geolocation data including city, region, country, coordinates, ISP, and ASN. One of the most widely trusted IP intelligence APIs used by thousands of companies worldwide.</li>
            <li><strong>Google Public DNS (dns.google)</strong> — Powers our DNS lookup tool with DNS-over-HTTPS (DoH) queries. Google's DNS resolvers are among the fastest and most reliable in the world.</li>
            <li><strong>blackbox.ipinfo.app</strong> — Provides VPN, proxy, and datacenter IP detection by cross-referencing IP addresses against known hosting provider registries and VPN exit node databases.</li>
            <li><strong>Cloudflare Speed Test Infrastructure</strong> — Our speed test downloads test files from Cloudflare's global edge network (over 300 cities worldwide) to measure real-world connection performance.</li>
            <li><strong>RDAP (rdap.org)</strong> — The modern replacement for WHOIS, providing structured domain registration data in JSON format from authoritative registries.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">Our Commitment</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Accuracy:</strong> We use reliable, real-time data from trusted third-party APIs to ensure your IP, geolocation, and network information is precise and current.</li>
            <li><strong>Privacy:</strong> We don't track your personal identity, store your search history on our servers, or sell your data. All lookup history is stored locally in your browser's localStorage and never transmitted to us.</li>
            <li><strong>Transparency:</strong> We clearly disclose our data sources, explain the limitations of browser-based tools (such as CORS restrictions on port scanning), and provide educational content alongside each tool.</li>
            <li><strong>Education:</strong> Beyond providing tools, our blog and glossary aim to educate users on cybersecurity, encryption, network protocols, and the evolving landscape of internet privacy.</li>
            <li><strong>Accessibility:</strong> All tools are free, require no account, and work directly in your browser on any device — desktop, tablet, or mobile.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">Technical Architecture</h2>
          <p className="mb-4">
            Check My IP is built as a client-side React application. All network diagnostics execute directly in your browser — no data passes through our servers. This architecture means we physically cannot log or store your queries, ensuring maximum privacy.
          </p>
          <p>
            The site is deployed globally via Vercel's edge network, providing fast load times regardless of your geographic location. Our codebase uses React 18, React Router for navigation, React Helmet for SEO, and Tailwind CSS for responsive design.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our tools, want to report a bug, or have suggestions for new features, we'd love to hear from you. While this is a free service, we are always looking to improve our network utilities based on user feedback.
          </p>
          <p className="font-bold mb-2">
            Email: contact@checkmyip.in
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
            <span className="material-symbols-outlined text-sm">send</span>
            Use our contact form →
          </Link>
        </section>

        <div className="pt-8 border-t border-outline-variant/20 mt-12">
          <Link to="/" className="text-primary font-bold hover:underline flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

