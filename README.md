# 🌐 CheckMyIP

**Live:** [checkmyip.in](https://www.checkmyip.in/)

A frontend network-utilities toolkit built with React — check your IP, geolocation, and run a set of common network diagnostic tools, all from the browser.

## Features

- **IP & Geolocation Lookup** — instantly see your public IP and location data
- **DNS Lookup** — resolve domain DNS records
- **VPN / Proxy Check** — detect if a connection is using a VPN or proxy
- **Speed Test** — check connection speed
- **Ping Check** — test latency to a target host
- **Port Check** — check if a specific port is open
- **WHOIS Lookup** — look up domain registration info
- **Network Security Check** — basic connection security diagnostics
- **History** — view past lookups in-session
- **Blog** — network/security-related articles
- SEO-friendly routing with per-page meta tags (via `react-helmet-async`)

## Tech Stack

- **React 18** with **React Router v7**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Axios** for API requests to public network-data providers

## Getting Started

```bash
# Clone the repo
git clone https://github.com/coolsourav100/checkMyIp.git
cd checkMyIp

# Install dependencies
npm install

# Run locally
npm start
```

Visit `http://localhost:3000` to view the app.

## Project Structure

```
src/
├── components/
│   ├── layout/          # App shell, nav, footer
│   └── common/          # Shared components (e.g. ErrorBoundary)
├── pages/
│   ├── Home.jsx
│   ├── Tools/           # Individual network tool pages
│   ├── Blog/
│   ├── Legal/
│   └── History.jsx
├── services/            # API call logic
├── App.js
└── index.js
```

## Known Issues / Roadmap

- `services/ipService.js` currently references a local backend endpoint left over from an earlier iteration — this needs to be replaced with a direct call to a public IP/geolocation API (e.g. ipapi.co, ip-api.com) since this project is frontend-only.
- Add loading/error states consistently across all tool pages.
- Add a `.env.example` documenting any public API keys required (if a provider needs one).

## License

MIT
