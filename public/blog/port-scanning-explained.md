---
title: "Port Scanning Explained: How It Works, Common Ports, and Security Implications"
author: "Marcus Chen"
date: "2026-02-20"
excerpt: "Port scanning is a fundamental technique in network security. Learn how port scanners work, the difference between open, closed, and filtered ports, and how to secure your server against port-based attacks."
tags: ["Port Scanning", "Network Security", "Server Administration", "Firewall"]
---

# Port Scanning Explained: How It Works, Common Ports, and Security Implications

Port scanning is one of the most fundamental techniques in network security. Whether you're a system administrator auditing your own infrastructure or a security researcher investigating potential vulnerabilities, understanding how port scanning works is essential.

This comprehensive guide covers the technical mechanics of port scanning, explains common port numbers and their associated services, discusses the security implications of open ports, and provides practical guidance for securing your servers.

---

## What is a Port?

A network port is a virtual endpoint that identifies a specific process or service on a networked device. Think of an IP address as a building's street address and ports as individual apartment numbers within that building.

Ports are numbered from 0 to 65535 and are divided into three ranges:

- **Well-Known Ports (0–1023):** Reserved for standard services like HTTP (80), HTTPS (443), SSH (22), FTP (21), and DNS (53). These require root/administrator privileges to bind to on most operating systems.
- **Registered Ports (1024–49151):** Used by specific applications and services. Examples include MySQL (3306), PostgreSQL (5432), and Microsoft SQL Server (1433).
- **Dynamic/Ephemeral Ports (49152–65535):** Temporarily assigned by the operating system for client-side connections. When your browser connects to a web server on port 443, your computer uses a random ephemeral port as the source.

---

## How Port Scanning Works

A port scanner sends network packets to a range of ports on a target host and analyzes the responses to determine which ports are open, closed, or filtered.

### TCP Connect Scan

The most straightforward scanning technique. The scanner attempts to complete a full TCP three-way handshake (SYN → SYN-ACK → ACK) with each target port.

- **Open Port:** The handshake completes successfully. The server is actively listening on this port.
- **Closed Port:** The server responds with a RST (Reset) packet, indicating no service is listening.
- **Filtered Port:** No response is received (the packet was likely dropped by a firewall).

This scan type is easy to detect because it creates complete connections that are logged by the target system.

### SYN Scan (Half-Open Scan)

Also called a "stealth scan," the SYN scan only sends the initial SYN packet. If the server responds with SYN-ACK (indicating an open port), the scanner immediately sends a RST instead of completing the handshake. This avoids creating a full connection, making it harder to detect in server logs.

### UDP Scan

UDP scanning is more challenging because UDP is connectionless — there's no handshake to complete. The scanner sends a UDP packet to each port:

- **No response:** The port may be open (service accepted the packet silently) or filtered (firewall dropped the packet).
- **ICMP "Port Unreachable" response:** The port is definitively closed.
- **UDP response:** The port is open and the service responded.

UDP scans are significantly slower than TCP scans because of the need to wait for timeouts.

### Browser-Based Scanning Limitations

Our [Port Scanner tool](/port-check) runs in your web browser, which means it uses HTTP requests rather than raw TCP packets. This introduces some limitations:

- Browsers enforce a list of "blocked ports" that cannot be accessed for security reasons.
- CORS restrictions may affect results for certain services.
- Timing-based inference (timeout = filtered, immediate error = closed, connection = open) is used instead of direct TCP packet analysis.

For enterprise-grade scanning, tools like Nmap, Masscan, or Zmap run at the operating system level and have full access to raw TCP/UDP sockets.

---

## Common Ports and Their Services

Understanding what services run on which ports is crucial for interpreting scan results:

| Port | Protocol | Service | Security Notes |
|------|----------|---------|----------------|
| 21 | TCP | FTP | Transmits credentials in plaintext. Use SFTP (port 22) instead. |
| 22 | TCP | SSH | Secure remote administration. Keep updated, use key-based auth. |
| 25 | TCP | SMTP | Email relay. Open SMTP servers are often abused for spam. |
| 53 | TCP/UDP | DNS | Domain name resolution. Used in DNS amplification attacks. |
| 80 | TCP | HTTP | Unencrypted web traffic. Should redirect to HTTPS. |
| 110 | TCP | POP3 | Legacy email retrieval. Use encrypted POP3S (port 995). |
| 143 | TCP | IMAP | Email access. Use encrypted IMAPS (port 993). |
| 443 | TCP | HTTPS | Encrypted web traffic. The standard for modern websites. |
| 445 | TCP | SMB | Windows file sharing. Often targeted by ransomware. |
| 3306 | TCP | MySQL | Database server. Never expose to the public internet. |
| 3389 | TCP | RDP | Windows Remote Desktop. Frequently targeted by brute-force attacks. |
| 5432 | TCP | PostgreSQL | Database server. Restrict access via firewall. |
| 8080 | TCP | HTTP Alt | Common alternative HTTP port for web applications and proxies. |
| 8443 | TCP | HTTPS Alt | Alternative HTTPS port for admin interfaces. |

---

## Port States Explained

Port scanners classify ports into three states:

### Open

An open port means a service is actively listening and accepting connections. This is normal and expected for services you intentionally run (like a web server on port 443). However, unexpectedly open ports could indicate:

- A misconfigured service
- Malware listening for commands
- A backdoor installed by an attacker
- A development/debug service accidentally left running in production

### Closed

A closed port means the port is accessible (not blocked by a firewall) but no service is listening. The host actively rejects the connection with a RST packet. Closed ports aren't a direct security risk, but they reveal that the host is online and responsive.

### Filtered

A filtered port means a firewall, packet filter, or network device is blocking access. The scanner cannot determine whether a service is running because packets are being silently dropped. This is the most secure state for ports that don't need to be publicly accessible.

---

## Security Best Practices

### 1. Minimize Your Attack Surface

Only expose the ports that are absolutely necessary for your service to function. A typical web server should only have ports 80 and 443 open. Everything else should be filtered by a firewall.

### 2. Use a Firewall

Configure `iptables` (Linux), Windows Firewall, or a cloud provider's security groups to explicitly allow only required ports and block everything else. Use a default-deny policy: block all traffic except what you explicitly permit.

### 3. Disable Unnecessary Services

If you don't need FTP, don't run an FTP server. If you don't need remote desktop, disable RDP. Every running service is a potential attack vector.

### 4. Keep Services Updated

Vulnerabilities in services like SSH, Apache, and MySQL are regularly discovered and patched. Running outdated software on an open port is an invitation for exploitation.

### 5. Use Non-Standard Ports (Security Through Obscurity)

While not a primary defense, running SSH on port 2222 instead of 22 or a web admin panel on a non-standard port can reduce automated bot attacks that target default ports. However, a full port scan will still discover these services.

### 6. Implement Rate Limiting and Fail2Ban

Use tools like Fail2Ban to automatically block IP addresses that make too many failed connection attempts. This defends against brute-force attacks on open ports.

### 7. Regular Port Auditing

Periodically scan your own infrastructure using our [Port Scanner](/port-check) or a dedicated tool like Nmap. Compare the results against your expected configuration to detect unauthorized services.

---

## Conclusion

Port scanning is a double-edged sword: it's an essential security tool for defenders and a primary reconnaissance technique for attackers. Understanding how it works, what each port state means, and how to secure your exposed services is fundamental to maintaining a strong security posture.

Use our free [Port Scanner tool](/port-check) to audit your own servers and verify that only the intended services are accessible from the public internet.
