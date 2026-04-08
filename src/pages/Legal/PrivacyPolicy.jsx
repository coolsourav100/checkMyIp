import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">Privacy Policy</h1>
        <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest">Last Updated: April 2026</p>
      </div>

      <div className="space-y-8 text-on-surface leading-relaxed text-lg font-body">
        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            At Check My IP, we believe in minimal data collection. When you use our network utilities (IP checking, DNS lookups, VPN detection), we do not require you to create an account, nor do we collect personally identifiable information (PII) such as your name, email address, or phone number.
          </p>
          <p>
            Client-Side Storage: We utilize your browser's local HTML5 `localStorage` purely for your convenience (e.g., saving your search history). This data never leaves your browser and is never transmitted to our servers.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">2. Usage of Third-Party APIs</h2>
          <p className="mb-4">
            In order to provide you with functional network tools, your queries are routed through completely free and secure third-party APIs:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>ipinfo.io</strong>: Used to determine the geolocation data and ASN of your public IP address.</li>
            <li><strong>dns.google</strong>: Used for secure DNS-over-HTTPS lookups.</li>
            <li><strong>blackbox.ipinfo.app</strong>: Used to safely scan targets against known VPN, Proxy, and Datacenter registries.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">3. Advertising and Cookies</h2>
          <p>
            We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google's <a href="https://adssettings.google.com/" className="text-secondary hover:underline" target="_blank" rel="noreferrer">Ads Settings</a>.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">4. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
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

export default PrivacyPolicy;
