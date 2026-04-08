import React from 'react';
import { Link } from 'react-router-dom';

const BlogIndex = () => {
  return (
    <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Hero Header */}
      <section className="mb-12">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight mb-4">Network Insights & Security Blog</h1>
        <p className="text-on-surface-variant max-w-2xl text-lg">Deep dives into cybersecurity, network protocols, and the future of digital privacy. Engineered for precision.</p>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Blog Content Area */}
        <div className="lg:col-span-8 space-y-12">
          {/* Featured Article */}
          <Link to="/blog/how-to-hide-your-ip-address" className="block relative group cursor-pointer overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_24px_48px_rgba(25,28,30,0.04)]">
            <div className="aspect-[21/9] overflow-hidden">
              <img alt="abstract visualization" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUeiRuSPIBOnPJn2xRgBVyXLqJBTiE3l_f-_V55rPPKSE-aUlFVK4B5rbrmjwsya6csSfnHtAapaRIcweGt94C0Eh313ES3w0lc5R1R1n4vfB1yUHn3Bz32e2A-wwWkfK-5IcC8QwJpQrvCTq2bkwJ4I7_DDaOSSViCRCnNFLvUYbXgUimcU5x1Q5ZlkvUsmyA24ZwTtI776x1hB6CG0UjSlf-GR908JTzsRSb-uN0QaPGoeogS33D25us25ZqWviunRzOW0UFz44" />
            </div>
            <div className="p-5 sm:p-8 md:p-10">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold px-3 py-1 rounded-full font-label tracking-wider uppercase">Featured Insight</span>
                <span className="text-outline font-label text-xs">OCT 24, 2024</span>
              </div>
              <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-4 leading-tight group-hover:text-primary transition-colors">Understanding IPv6: The Backbone of the Next-Generation Internet</h2>
              <p className="text-on-surface-variant text-lg mb-6 leading-relaxed">As IPv4 addresses reach exhaustion, the transition to IPv6 becomes critical. We break down the technical architecture and security benefits of the 128-bit address space.</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
                    <img alt="Marcus Chen avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR_EAYBChYGtVWDOOq1S1X32VklPjolH6JH1K9kP3x6NbcvahMa_9YzCRo5vASR8m4DNK-NoRN-O7MtgL2I4FXG70ak_fClYMJ9v10quFnpBDF4EKKr2vSzhie-eagdpPXORsfeodA9YjGwaAcxGWB9Of5_1g2ARQkHd5kp6Jzs6drgNfE_n4oIZ80bjex2ryr5gs3cM0GGyExOiEd8Epy3DFd59tbDUDbKQoyxjComUfb_-8oDAtJFp0sKIk6xUu22pXWQfYXs9E" />
                  </div>
                  <span className="font-semibold text-sm">Marcus Chen</span>
                </div>
                <div className="flex items-center gap-2 text-primary font-bold text-sm group/btn">
                  Read More
                  <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          </Link>
          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Article 1 */}
            <Link to="/blog/how-to-hide-your-ip-address" className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img alt="VPN concept" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPb8anLWv9X6JIvU8l3pt-kQOXXkChRmCcWbBlvt4JU7NYmrzYu9wy4sqaNb7HjzYNNrYG64GEyQZ5WyRW9svPoJSyl9-x8m5W3lg5gkGwUTShSuyvVfw6jSbANiEBA7XwYPLbKQrR3LFzX67DGKPkRukYGNt_uipVUs5EnP1XyUoB1qgfxoaKl5dfFMsEzas25j7EXNZ0YlTBsg2OkWO-xSRo0Jp96JitPLzvcTZvXcB90KImJ9l8_XG_MCOSuB3dQ7J9Gm5p4W4" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-outline font-label text-[10px] tracking-widest uppercase mb-2">Security</div>
                <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-primary">VPN vs. Proxy: Which is Truly Anonymous?</h3>
                <p className="text-on-surface-variant text-sm mb-6 flex-grow">A technical comparison of data encryption methods and how they impact your network latency and privacy footprint.</p>
                <div className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 self-start">
                  Read More <span className="material-symbols-outlined text-base">chevron_right</span>
                </div>
              </div>
            </Link>
            {/* Article 2 */}
            <Link to="#" className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img alt="Performance concept" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIkZAeyzLczlNyyCvkM0kFKIp54mrA16K2qlTrswvoR8Wf6210nUmWAFOr1p5QWPJhBTmxqewOHtyddJy67DvvOvaQ0Naj2fHTZz-vxm7TsQwqREdOBsfna96boYGJwq4UMlMlkLggIjZW_-BlfwSQP_YAEgPn36xurImbNUZ8vxbutXiXTEmv06BMliNxM2YyhHMB4CmnlJ6ZGRbAXa90cNS3v0m7Gin0wRxPsTv6vOq_t_exxD4fI_OkNVQna2MNHVOyKcuQAuE" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-outline font-label text-[10px] tracking-widest uppercase mb-2">Performance</div>
                <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-primary">Reducing Ping: Optimization for Global Networks</h3>
                <p className="text-on-surface-variant text-sm mb-6 flex-grow">Advanced routing techniques to minimize packet loss and improve throughput for time-sensitive applications.</p>
                <div className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 self-start">
                  Read More <span className="material-symbols-outlined text-base">chevron_right</span>
                </div>
              </div>
            </Link>
            {/* Article 3 */}
            <Link to="#" className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img alt="Dev Tools concept" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE4iKIgp6GFYwPgBu_AjlMqjuyB4EB08N_M6X6WNfO5vL2Tqc0Nz98jWmiXXjG7oBwoSq-lszRpdYIv_M3Va7ujSsiKCmosf6VRWRQeyPrYHRaqnO8PJdartTBkGEy-Xn7kdieIPBqJpAjyHp9euhGDx2u_c0VSUKIKo6PLHDGgJ-Gi49dW0oaoaBIS9djf-2R2MEnNB0Bt66DyTET8tKjvoHyQC01boze7bqxJtzUw8fPQygVujscuh2_8BjO4MmJewNys7ZL5qc" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-outline font-label text-[10px] tracking-widest uppercase mb-2">Dev Tools</div>
                <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-primary">The Evolution of WHOIS Privacy</h3>
                <p className="text-on-surface-variant text-sm mb-6 flex-grow">How GDPR changed the way domain ownership data is stored and retrieved across the global registry system.</p>
                <div className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 self-start">
                  Read More <span className="material-symbols-outlined text-base">chevron_right</span>
                </div>
              </div>
            </Link>
            {/* Article 4 */}
            <Link to="#" className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img alt="Future tech concept" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeajMDiFWjtJhEECMOJUKYBUx2VJJudyXSuPo6P2Uk81lZVvLWAeIizsl_TbnXH0c2dRr7aLIbQN2utYd9I1j2Hn1RdLv4ykf-wRayT6txUsAo5iPxbb9wusRQD9FYFr1kX43L6yov1TwwnM2s3b3ucUEThAJRDCzn1TkJ77_R1ue0_feUrhIs1_NrslJCG2vRfierioKC743zfwEc0iTTQN0vxgA6dWlSySgvqfnBbnyYGN9lKXqNwT9XdSergi_q9DX2OZHzNNQ" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-outline font-label text-[10px] tracking-widest uppercase mb-2">Future Tech</div>
                <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-primary">AI in Threat Detection</h3>
                <p className="text-on-surface-variant text-sm mb-6 flex-grow">Utilizing machine learning models to identify anomalies in network traffic before a breach occurs.</p>
                <div className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 self-start">
                  Read More <span className="material-symbols-outlined text-base">chevron_right</span>
                </div>
              </div>
            </Link>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 pt-8">
            <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface-container-low text-on-surface hover:bg-primary hover:text-white transition-all">1</button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all">2</button>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all">3</button>
            <span className="px-2">...</span>
            <button className="w-10 h-10 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-10">
          {/* Popular Tools */}
          <div className="bg-surface-container-low p-8 rounded-xl">
            <h4 className="font-headline text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">handyman</span>
              Popular Tools
            </h4>
            <div className="space-y-3">
              <Link to="/dns-lookup" className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">DNS Lookup</span>
                <span className="material-symbols-outlined text-sm text-outline">arrow_outward</span>
              </Link>
              <Link to="#" className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">Port Checker</span>
                <span className="material-symbols-outlined text-sm text-outline">arrow_outward</span>
              </Link>
              <Link to="#" className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">VPN Detection</span>
                <span className="material-symbols-outlined text-sm text-outline">arrow_outward</span>
              </Link>
              <Link to="#" className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">Network Security Scan</span>
                <span className="material-symbols-outlined text-sm text-outline">arrow_outward</span>
              </Link>
            </div>
          </div>
          {/* Recent Posts */}
          <div>
            <h4 className="font-headline text-lg font-bold text-on-surface mb-6">Recent Posts</h4>
            <div className="space-y-6">
              <Link to="#" className="flex gap-4 group">
                <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-surface-container">
                  <img alt="Recent post 1" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0GEAYMUcHnjCNmZ1DQlbLzfWTGCn2OaRiAPU2glA_2icgiQfgYBpQ2ng99U5_De1UprYyAaBHBk2vn1sCYlTENyFB_PkcjxgVlHwMtFp-jCGUogIKi0_rh9nMo4oClRlPehWrsdRKajzbrBPBZjbBxqdN893Wed-JAU7xcL5F0gna7FAajhxZ6QxZNrimN3DexThPlqg2-N2A_Y-yjB7-BQh61nt_bJT78WAhF1_M6ElV_UQ00hdjXQtZmXT_4J70YtRkuOqUezY" />
                </div>
                <div>
                  <h5 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">The Physics of Fiber Optics</h5>
                  <span className="text-[10px] text-outline font-label uppercase mt-1 inline-block">2 Days Ago</span>
                </div>
              </Link>
              <Link to="#" className="flex gap-4 group">
                <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-surface-container">
                  <img alt="Recent post 2" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCApdFIGgmos9H8h3EY6BKHbq6UJVpgHkUcNMtVqKOPHuiDYXaoevET0rDpJaKF6F8W88xVZKSWMuka4VKJXdGR8AF_i8VvPzw19JQ33k1BZqCnxbrHb3iaTDnjsHIG0OsRcmDS0q0t6cGj1UQEeHciL4R_zg_qhWAxj2ZjeUW_k1Pa5Qfb_YH10T6LuE3bD_m5TJCuJ2OyyAM6uRTFQ3sm0q3WXZgTWvcRGwJaBEbGbCDw3vBynjZve9QLl3rRPf7w14N1f6Fo2dI" />
                </div>
                <div>
                  <h5 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">Encryption Standards in 2024</h5>
                  <span className="text-[10px] text-outline font-label uppercase mt-1 inline-block">1 Week Ago</span>
                </div>
              </Link>
              <Link to="#" className="flex gap-4 group">
                <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-surface-container">
                  <img alt="Recent post 3" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaYF5HXyX-2M3gr9XWp2A0yWxJW2uvl3ARD4h9442-Qe8z1OoZKfXpItpeQy49f8hS7yEVy4mM6rMcB0iCiN8g44oEgt3m0vH6tvP9YY59iyioM8ioMihLQUo27cef_SMNWelCq6vAfqVDEK1YOMzj3ZmbmCyqpHVIb7CBvEVkB1Tk2bGBeSzSQWvHvpygnUE1ZsxTgtAjduwN6C8ckCmMx-IBQGyznT2JoBmdJ3ZVEFpAbTHPrFcv-8ko2lqLHB2kcg829JFVBOY" />
                </div>
                <div>
                  <h5 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">Mastering Traceroute Maps</h5>
                  <span className="text-[10px] text-outline font-label uppercase mt-1 inline-block">2 Weeks Ago</span>
                </div>
              </Link>
            </div>
          </div>
          {/* AdSense Placeholder */}
          <div className="bg-surface-container-low rounded-xl flex flex-col items-center justify-center py-12 px-6 border border-outline-variant border-opacity-15 min-h-[600px]">
            <span className="text-[10px] font-label text-outline uppercase tracking-widest mb-4">Advertisement</span>
            <div className="w-[300px] h-[600px] bg-white rounded shadow-sm flex items-center justify-center text-outline-variant font-headline italic">
              AdSense 300x600
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogIndex;
