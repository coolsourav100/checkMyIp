import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Helmet>
        <title>About Us | Check My IP</title>
        <meta name="description" content="Learn about Check My IP, our mission to provide accurate network diagnostic tools, and our commitment to user privacy and security." />
      </Helmet>
      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">About Check My IP</h1>
      </div>

      <div className="space-y-8 text-on-surface leading-relaxed text-lg font-body">
        <section>
          <p className="mb-4">
            Welcome to Check My IP. We are dedicated to providing fast, accurate, and completely free network diagnostic tools for everyone, from casual internet users to seasoned network administrators.
          </p>
          <p>
            Understanding your digital footprint is the first step toward online privacy and security. Our mission is to demystify networking concepts by offering simple yet powerful utilities that help you analyze your connection, verify your VPN, and troubleshoot network latency.
          </p>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">Our Commitment</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Accuracy:</strong> We use reliable, real-time data from trusted APIs to ensure your IP and geolocation information is precise.</li>
            <li><strong>Privacy:</strong> We don't track your personal identity. We believe privacy is a fundamental right.</li>
            <li><strong>Education:</strong> Beyond just providing tools, our blog aims to educate users on cybersecurity, encryption, and the evolving landscape of internet protocols.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-headline text-2xl font-bold text-primary mb-4">Contact Us</h2>
          <p>
            If you have any questions about our tools or want to report an issue, please feel free to reach out. While this is a free service provided as-is, we are always looking to improve our network utilities based on user feedback.
          </p>
          <p className="mt-4 font-bold">
            Email: contact@checkmyip.in
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

export default About;
