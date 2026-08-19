import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const faqData = [
  {
    category: 'IP Address Basics',
    questions: [
      {
        q: 'What is an IP address?',
        a: 'An IP (Internet Protocol) address is a unique numerical identifier assigned to every device connected to a network that uses the Internet Protocol. It serves two primary functions: identifying the host or network interface and providing the location of the device in the network. Think of it as a return address on a piece of mail—it tells the internet where to send the data you request. There are two versions in use today: IPv4 (e.g., 192.168.1.1) and IPv6 (e.g., 2001:0db8:85a3::8a2e:0370:7334).'
      },
      {
        q: 'What is the difference between IPv4 and IPv6?',
        a: 'IPv4 uses a 32-bit address scheme, allowing approximately 4.3 billion unique addresses (e.g., 192.168.0.1). IPv6 uses a 128-bit address scheme, supporting approximately 340 undecillion addresses (e.g., 2001:db8::1). IPv6 was developed because the world ran out of IPv4 addresses. Beyond size, IPv6 also offers built-in IPsec security, simplified packet headers for faster routing, and stateless address autoconfiguration (SLAAC), eliminating the need for DHCP in many cases.'
      },
      {
        q: 'What is the difference between a public and private IP address?',
        a: 'A public IP address is globally unique and assigned by your Internet Service Provider (ISP). It is visible to the outside internet and is what websites see when you connect. A private IP address is used within your local network (home or office) and is not directly accessible from the internet. Common private IP ranges include 192.168.x.x, 10.x.x.x, and 172.16.x.x through 172.31.x.x. Your router uses Network Address Translation (NAT) to translate between your private and public IPs.'
      },
      {
        q: 'Can someone hack me with just my IP address?',
        a: 'Your IP address alone is not enough for someone to directly hack your computer. However, it can be used as a starting point for targeted attacks such as DDoS (Distributed Denial of Service), port scanning to find vulnerabilities, or social engineering against your ISP. To enhance your security, keep your operating system and router firmware updated, use a firewall, and consider using a VPN to mask your real IP address when browsing sensitive sites or using public Wi-Fi.'
      },
      {
        q: 'Does my IP address change?',
        a: 'It depends on your ISP and connection type. Most residential connections use dynamic IP addresses, which change periodically (usually every few days or when your router restarts). Some ISPs offer static IP addresses, which remain constant—these are more common for business accounts or web hosting. Mobile devices typically receive a new IP address each time they connect to a cellular network. You can check whether your IP has changed by visiting our homepage.'
      }
    ]
  },
  {
    category: 'Privacy & Security',
    questions: [
      {
        q: 'What information can websites see from my IP address?',
        a: 'When you visit a website, your IP address reveals your approximate geographic location (usually accurate to the city level), your Internet Service Provider (ISP), your Autonomous System Number (ASN), and the type of connection you are using. Websites cannot determine your exact street address, name, or other personal details from your IP alone. However, when combined with browser cookies, fingerprinting techniques, and tracking scripts, your IP contributes to a broader profile that advertisers and analytics platforms use to track you across the web.'
      },
      {
        q: 'How can I hide my IP address?',
        a: 'There are several methods to mask your real IP address: (1) Use a VPN (Virtual Private Network), which encrypts all your traffic and routes it through a remote server, replacing your IP with the VPN server\'s IP. (2) Use the Tor network, which routes your traffic through multiple encrypted relays for maximum anonymity, though at the cost of speed. (3) Use a proxy server, which acts as an intermediary but typically does not encrypt your traffic. For most users, a reputable paid VPN service offers the best balance of privacy, speed, and ease of use.'
      },
      {
        q: 'How do I know if my VPN is working?',
        a: 'The simplest way to verify your VPN is working is to check your IP address before and after connecting. Visit our homepage to see your current IP. If the IP address changes to match the VPN server\'s location after you connect, your VPN is functioning correctly. Additionally, use our VPN Detection tool to check whether your new IP is recognized as a VPN/datacenter IP. Also verify there are no DNS leaks by performing a DNS lookup—your queries should be routed through your VPN provider\'s DNS servers, not your ISP\'s.'
      }
    ]
  },
  {
    category: 'Network Tools',
    questions: [
      {
        q: 'What is DNS and why does it matter?',
        a: 'DNS (Domain Name System) is the internet\'s phonebook. It translates human-readable domain names (like checkmyip.in) into machine-readable IP addresses (like 93.184.216.34). Without DNS, you would need to memorize numerical IP addresses for every website. DNS matters for security because compromised DNS (through hijacking or poisoning) can redirect you to malicious sites without your knowledge. Using secure DNS providers like Cloudflare (1.1.1.1) or Google DNS (8.8.8.8) with DNS-over-HTTPS can protect against these attacks.'
      },
      {
        q: 'What is a ping test and what does it measure?',
        a: 'A ping test measures the round-trip time (RTT) for a small data packet to travel from your device to a server and back. It is expressed in milliseconds (ms). Lower ping times indicate a faster, more responsive connection. Typical ping values: under 20ms is excellent (ideal for gaming), 20-50ms is good, 50-100ms is average, and over 100ms may cause noticeable lag in real-time applications. Our ping tool uses HTTP requests rather than traditional ICMP pings, as browsers cannot send ICMP packets for security reasons.'
      },
      {
        q: 'What is a port scan and is it legal?',
        a: 'A port scan checks which network ports on a server are open, closed, or filtered. Open ports indicate running services (e.g., port 80 for HTTP, port 443 for HTTPS, port 22 for SSH). Port scanning your own servers is a legitimate security practice. However, scanning someone else\'s servers without permission may violate computer fraud laws in many jurisdictions. Our tool is designed for checking your own infrastructure and publicly accessible services.'
      },
      {
        q: 'What is an ASN (Autonomous System Number)?',
        a: 'An Autonomous System Number (ASN) is a unique identifier assigned to a group of IP networks that share a single routing policy. ISPs, large organizations, and hosting providers each have their own ASN. For example, Google operates AS15169, and Cloudflare operates AS13335. ASNs are essential for the Border Gateway Protocol (BGP), which is how internet routers determine the best path to forward traffic. Knowing an IP\'s ASN can tell you which organization controls that network.'
      },
      {
        q: 'How accurate is IP geolocation?',
        a: 'IP geolocation accuracy varies significantly depending on the database used and the type of connection. For broadband connections in urban areas, accuracy to the city level is typically 80-90%. For rural areas and mobile networks, accuracy decreases because ISPs may route traffic through distant regional hubs. IP geolocation is never accurate to a street address—it provides an approximation based on how ISPs allocate IP blocks to geographic regions. VPN and proxy users will see the server\'s location rather than their own.'
      }
    ]
  },
  {
    category: 'Speed Test & Performance',
    questions: [
      {
        q: 'How does an internet speed test work?',
        a: 'Our speed test measures three key metrics: (1) Ping/Latency—the time it takes for a small packet to make a round trip to the test server. (2) Download speed—measured by downloading test files from Cloudflare\'s edge servers and calculating the transfer rate in Megabits per second (Mbps). (3) Upload speed—measured by uploading a data blob to the server and timing the transfer. The results reflect your real-world connection performance at the time of testing, which can vary based on network congestion, distance to the test server, and local network conditions.'
      },
      {
        q: 'Why is my speed test result different from my ISP plan?',
        a: 'Several factors cause discrepancies: (1) ISP plans advertise "up to" speeds, not guaranteed minimums. (2) Wi-Fi connections are slower than ethernet due to interference, distance from the router, and shared bandwidth. (3) Network congestion during peak hours reduces available bandwidth. (4) Your router or modem may have hardware limitations. (5) Background applications consuming bandwidth affect test results. For the most accurate measurement, use an ethernet cable, close other applications, and test at different times of day.'
      }
    ]
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Build structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(cat => cat.questions.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a
      }
    })))
  };

  let globalIndex = 0;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Helmet>
        <title>Frequently Asked Questions | Check My IP</title>
        <meta name="description" content="Find answers to common questions about IP addresses, VPNs, DNS, network security, speed testing, and how our tools work." />
        <link rel="canonical" href="https://www.checkmyip.in/faq" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          Everything you need to know about IP addresses, network diagnostics, online privacy, and how our free tools work.
        </p>
      </div>

      <div className="space-y-12">
        {faqData.map((category, catIdx) => (
          <section key={catIdx}>
            <h2 className="font-headline text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-sm font-bold">{catIdx + 1}</span>
              {category.category}
            </h2>
            <div className="space-y-3">
              {category.questions.map((item) => {
                const currentIndex = globalIndex++;
                const isOpen = openIndex === currentIndex;
                return (
                  <div key={currentIndex} className="border border-outline-variant/15 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(currentIndex)}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 hover:bg-surface-container-low/50 transition-colors"
                    >
                      <h3 className="font-headline font-bold text-on-surface text-base sm:text-lg leading-snug">{item.q}</h3>
                      <span className={`material-symbols-outlined text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                        <p className="text-on-surface-variant leading-relaxed text-base">{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 bg-primary-container/10 p-8 rounded-xl border border-primary/5">
        <h2 className="font-headline text-xl font-bold text-primary mb-3">Still have questions?</h2>
        <p className="text-on-surface-variant mb-4">Can't find what you're looking for? Reach out to us and we'll do our best to help.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
          <span className="material-symbols-outlined text-sm">mail</span>
          Contact Us
        </Link>
      </div>

      <div className="pt-8 border-t border-outline-variant/20 mt-12">
        <Link to="/" className="text-primary font-bold hover:underline flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default FAQ;
