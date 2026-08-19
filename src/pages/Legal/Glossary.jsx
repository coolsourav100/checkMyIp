import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const glossaryTerms = [
  { term: 'ASN (Autonomous System Number)', definition: 'A unique identifier assigned to a group of IP networks that share a common routing policy. Each ISP, hosting provider, and large organization has its own ASN (e.g., Google is AS15169). ASNs are used by the Border Gateway Protocol (BGP) to route traffic between networks on the internet.' },
  { term: 'BGP (Border Gateway Protocol)', definition: 'The routing protocol that makes the internet work. BGP is responsible for determining the best path for data to travel between autonomous systems. It is often called the "postal service of the internet" because it selects the most efficient route for delivering data packets.' },
  { term: 'CIDR (Classless Inter-Domain Routing)', definition: 'A method of allocating IP addresses and routing that replaced the older classful addressing system. CIDR notation uses a suffix indicating the number of significant bits in the subnet mask (e.g., 192.168.1.0/24 represents 256 addresses). This allows for more flexible and efficient use of IP address space.' },
  { term: 'CORS (Cross-Origin Resource Sharing)', definition: 'A security mechanism that allows or restricts web page requests made from a different domain than the one serving the page. CORS headers control which external domains can access resources on your server, preventing unauthorized cross-site data theft while enabling legitimate API integrations.' },
  { term: 'CSP (Content Security Policy)', definition: 'An HTTP security header that helps prevent cross-site scripting (XSS) attacks by specifying which content sources the browser is allowed to load. A properly configured CSP defines trusted sources for scripts, styles, images, and other resources, blocking anything from unauthorized origins.' },
  { term: 'DDoS (Distributed Denial of Service)', definition: 'A cyberattack where multiple compromised systems (a botnet) flood a target server with traffic, overwhelming its resources and making it unavailable to legitimate users. DDoS attacks can target specific ports, protocols, or application layers, and mitigation typically requires specialized infrastructure.' },
  { term: 'DHCP (Dynamic Host Configuration Protocol)', definition: 'A network protocol that automatically assigns IP addresses and other network configuration parameters to devices on a network. When you connect to Wi-Fi, DHCP is what gives your device an IP address, subnet mask, default gateway, and DNS server addresses without manual configuration.' },
  { term: 'DNS (Domain Name System)', definition: 'The internet\'s hierarchical naming system that translates human-readable domain names (like checkmyip.in) into IP addresses (like 93.184.216.34). DNS operates through a distributed network of servers worldwide and is essential for nearly every internet interaction.' },
  { term: 'DNS over HTTPS (DoH)', definition: 'A protocol that encrypts DNS queries by sending them over HTTPS instead of plain UDP. DoH prevents your ISP, network administrators, and attackers from seeing which domains you are visiting. Major browsers and DNS providers (Cloudflare 1.1.1.1, Google 8.8.8.8) support DoH.' },
  { term: 'Firewall', definition: 'A network security system that monitors and controls incoming and outgoing traffic based on predefined rules. Firewalls can be hardware devices, software applications, or cloud-based services. They examine packets and either allow or block them based on IP addresses, ports, protocols, and application-layer data.' },
  { term: 'Gateway', definition: 'A network node that serves as an entry/exit point between two different networks. Your home router acts as a default gateway, connecting your local network (LAN) to the internet (WAN). Gateways may also perform protocol translation, NAT, and firewall functions.' },
  { term: 'HSTS (HTTP Strict Transport Security)', definition: 'A security header that instructs browsers to only connect to a website over HTTPS, even if the user types http:// in the address bar. HSTS prevents SSL stripping attacks where an attacker downgrades a secure connection to unencrypted HTTP to intercept data.' },
  { term: 'ICMP (Internet Control Message Protocol)', definition: 'A network protocol used for diagnostic and error-reporting purposes. The traditional "ping" command uses ICMP Echo Request and Echo Reply messages to test connectivity. ICMP is also used by traceroute to map the path packets take across the internet.' },
  { term: 'IP Address', definition: 'A numerical label assigned to each device connected to a computer network that uses the Internet Protocol. IPv4 addresses are 32-bit numbers written as four octets (e.g., 192.168.1.1), while IPv6 addresses are 128-bit numbers written as eight groups of hexadecimal digits (e.g., 2001:db8::1).' },
  { term: 'ISP (Internet Service Provider)', definition: 'A company that provides internet access to consumers and businesses. ISPs own or lease network infrastructure and assign IP addresses to their customers. Examples include Comcast, AT&T, Vodafone, Jio, and Airtel. Your ISP can see all unencrypted traffic unless you use a VPN.' },
  { term: 'Latency', definition: 'The time delay between sending a request and receiving a response, measured in milliseconds (ms). Lower latency means faster response times. Latency is affected by physical distance, network congestion, routing efficiency, and processing time at each hop. It is distinct from bandwidth (speed).' },
  { term: 'MAC Address', definition: 'A unique hardware identifier assigned to a network interface controller (NIC) by the manufacturer. MAC addresses are 48-bit identifiers written as six pairs of hexadecimal digits (e.g., 00:1A:2B:3C:4D:5E). Unlike IP addresses, MAC addresses do not change and operate at the data link layer (Layer 2).' },
  { term: 'NAT (Network Address Translation)', definition: 'A technique used by routers to map multiple private IP addresses to a single public IP address. NAT allows all devices on your home network to share one public IP when accessing the internet. While it conserves IPv4 addresses, NAT can complicate peer-to-peer connections and certain protocols.' },
  { term: 'Packet', definition: 'A unit of data transmitted over a network. When you send data (like loading a webpage), it is broken into small packets, each containing a header (with routing information) and a payload (the actual data). Packets may take different routes to reach their destination and are reassembled upon arrival.' },
  { term: 'Port', definition: 'A numbered endpoint (0-65535) that identifies a specific process or service on a networked device. Well-known ports include 80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS), and 25 (SMTP). Ports allow a single IP address to host multiple services simultaneously.' },
  { term: 'Proxy Server', definition: 'An intermediary server that sits between a client and the internet. When you use a proxy, your requests are forwarded through the proxy server, which makes requests on your behalf. Unlike VPNs, proxies typically do not encrypt traffic and usually only handle specific applications (like web browsers).' },
  { term: 'RDAP (Registration Data Access Protocol)', definition: 'The modern replacement for the WHOIS protocol, providing domain registration information in structured JSON format. RDAP supports internationalization, standardized access controls, and HTTPS transport. It is maintained by the IETF and implemented by domain registries worldwide.' },
  { term: 'Router', definition: 'A networking device that forwards data packets between computer networks. Your home router connects your local network to the internet, assigns private IP addresses via DHCP, performs NAT translation, and often includes a built-in firewall and Wi-Fi access point.' },
  { term: 'SSL/TLS (Secure Sockets Layer / Transport Layer Security)', definition: 'Cryptographic protocols that provide secure communication over the internet. SSL is the older, deprecated version; TLS is its successor. TLS 1.3 is the current standard. These protocols encrypt data in transit, authenticate the server\'s identity via certificates, and ensure data integrity. HTTPS uses TLS to secure web traffic.' },
  { term: 'Subnet', definition: 'A logical subdivision of an IP network. Subnetting divides a larger network into smaller, more manageable segments. A subnet mask (e.g., 255.255.255.0 or /24) determines which portion of an IP address identifies the network and which portion identifies individual hosts.' },
  { term: 'TCP (Transmission Control Protocol)', definition: 'A connection-oriented transport protocol that provides reliable, ordered delivery of data between applications. TCP uses a three-way handshake to establish connections and implements flow control and error recovery. HTTP, HTTPS, SSH, and email all use TCP.' },
  { term: 'TTL (Time to Live)', definition: 'In networking, TTL has two meanings: (1) In IP packets, TTL is a counter decremented at each router hop; when it reaches zero, the packet is discarded (preventing infinite routing loops). (2) In DNS, TTL specifies how long a DNS record should be cached before a resolver must query the authoritative server again.' },
  { term: 'UDP (User Datagram Protocol)', definition: 'A connectionless transport protocol that sends data without establishing a connection or guaranteeing delivery. UDP is faster than TCP because it has no handshake or error-recovery overhead, making it ideal for real-time applications like video streaming, VoIP, online gaming, and DNS queries.' },
  { term: 'VPN (Virtual Private Network)', definition: 'A service that creates an encrypted tunnel between your device and a remote server, routing all your internet traffic through it. VPNs mask your real IP address, encrypt your data from your ISP, and can bypass geographic content restrictions. Common protocols include WireGuard, OpenVPN, and IKEv2.' },
  { term: 'WHOIS', definition: 'A query-and-response protocol used to look up domain registration information, including the registrar, registration and expiration dates, nameservers, and (where not redacted) the registrant\'s contact details. WHOIS has largely been superseded by RDAP for programmatic access.' }
];

const Glossary = () => {
  const [search, setSearch] = useState('');

  const filteredTerms = glossaryTerms.filter(t =>
    t.term.toLowerCase().includes(search.toLowerCase()) ||
    t.definition.toLowerCase().includes(search.toLowerCase())
  );

  const letters = [...new Set(filteredTerms.map(t => t.term[0].toUpperCase()))].sort();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Helmet>
        <title>Networking Glossary | 30+ Terms Explained | Check My IP</title>
        <meta name="description" content="A comprehensive glossary of networking terms including IP addresses, DNS, VPN, BGP, ASN, TLS, and more. Plain-language definitions for beginners and professionals." />
        <link rel="canonical" href="https://www.checkmyip.in/glossary" />
      </Helmet>

      <div className="mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4 tracking-tight">Networking Glossary</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          A comprehensive reference of networking, security, and internet protocol terminology. Each term is explained in plain language with technical accuracy.
        </p>
      </div>

      {/* Search */}
      <div className="mb-10">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary rounded-xl py-4 pl-12 pr-4 font-headline text-lg transition-all outline-none"
            placeholder="Search terms..."
            type="text"
          />
        </div>
      </div>

      {/* Letter Navigation */}
      <div className="flex flex-wrap gap-2 mb-10">
        {letters.map(letter => (
          <a key={letter} href={`#letter-${letter}`} className="w-9 h-9 bg-primary/5 hover:bg-primary hover:text-on-primary rounded-lg flex items-center justify-center font-headline font-bold text-sm text-primary transition-colors">
            {letter}
          </a>
        ))}
      </div>

      {/* Terms */}
      <div className="space-y-6">
        {letters.map(letter => (
          <div key={letter} id={`letter-${letter}`}>
            <div className="sticky top-20 bg-surface/95 backdrop-blur-sm py-2 z-10">
              <h2 className="font-headline text-3xl font-bold text-primary/20">{letter}</h2>
            </div>
            <div className="space-y-4 mt-2">
              {filteredTerms
                .filter(t => t.term[0].toUpperCase() === letter)
                .map((item, idx) => (
                  <div key={idx} className="p-5 sm:p-6 border border-outline-variant/15 rounded-xl hover:border-primary/20 transition-colors">
                    <h3 className="font-headline font-bold text-on-surface text-lg mb-2">{item.term}</h3>
                    <p className="text-on-surface-variant leading-relaxed">{item.definition}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-5xl text-outline mb-4 block">search_off</span>
          <p className="text-on-surface-variant">No terms found matching "{search}"</p>
        </div>
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

export default Glossary;
