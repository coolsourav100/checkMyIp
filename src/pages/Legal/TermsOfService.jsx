import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">Terms of Service</h1>
        <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest">Last Updated: April 2026</p>
      </div>

      <div className="space-y-8 text-on-surface leading-relaxed text-lg font-body">
        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Check My IP (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these Terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">2. Prohibited Uses</h2>
          <p className="mb-4">
            You agree not to use the Service:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
            <li>To execute unauthorized automated queries, DDoS attacks, or programmatic scraping against the underlying APIs.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">3. Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties of any kind, express or implied, regarding the use or the results of this web site in terms of its correctness, accuracy, reliability, or otherwise. The network utilities rely on public third-party APIs which may experience downtime or return inaccurate data.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">4. Limitation of Liability</h2>
          <p>
            In no event shall Check My IP, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
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

export default TermsOfService;
