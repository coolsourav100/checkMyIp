import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to a backend API
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Helmet>
        <title>Contact Us | Check My IP</title>
        <meta name="description" content="Get in touch with the Check My IP team. Report issues, suggest features, or ask questions about our free network diagnostic tools." />
        <link rel="canonical" href="https://www.checkmyip.in/contact" />
      </Helmet>

      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">Contact Us</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          Have a question, found a bug, or want to suggest a new feature? We'd love to hear from you. Fill out the form below and our team will respond within 48 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary">mail</span>
          </div>
          <h3 className="font-headline font-bold text-on-surface mb-2">Email</h3>
          <p className="text-on-surface-variant text-sm">contact@checkmyip.in</p>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary">schedule</span>
          </div>
          <h3 className="font-headline font-bold text-on-surface mb-2">Response Time</h3>
          <p className="text-on-surface-variant text-sm">Within 48 hours</p>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-primary">help</span>
          </div>
          <h3 className="font-headline font-bold text-on-surface mb-2">FAQ</h3>
          <Link to="/faq" className="text-primary text-sm font-bold hover:underline">Check our FAQ first →</Link>
        </div>
      </div>

      {submitted ? (
        <div className="bg-secondary-container/30 border border-secondary/20 p-8 rounded-xl text-center">
          <span className="material-symbols-outlined text-5xl text-secondary mb-4 block">check_circle</span>
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-3">Message Sent!</h2>
          <p className="text-on-surface-variant max-w-md mx-auto">Thank you for reaching out. We have received your message and will get back to you within 48 hours at the email address you provided.</p>
          <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }} className="mt-6 text-primary font-bold hover:underline">
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Your Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary rounded-xl py-4 px-4 font-body text-base transition-all outline-none"
                placeholder="John Doe"
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary rounded-xl py-4 px-4 font-body text-base transition-all outline-none"
                placeholder="you@example.com"
                type="email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary rounded-xl py-4 px-4 font-body text-base transition-all outline-none"
              required
            >
              <option value="">Select a topic...</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="question">General Question</option>
              <option value="partnership">Partnership / Business</option>
              <option value="privacy">Privacy Concern</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-label text-[11px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary rounded-xl py-4 px-4 font-body text-base transition-all outline-none resize-none"
              placeholder="Describe your question or feedback in detail..."
              rows="6"
              required
            />
          </div>

          <button type="submit" className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 flex items-center gap-2">
            <span className="material-symbols-outlined">send</span>
            Send Message
          </button>
        </form>
      )}

      <div className="pt-8 border-t border-outline-variant/20 mt-12">
        <Link to="/" className="text-primary font-bold hover:underline flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;
