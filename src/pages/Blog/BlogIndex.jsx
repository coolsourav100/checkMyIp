import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const BlogIndex = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/blog/posts.json')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load blog posts:", err);
        setLoading(false);
      });
  }, []);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const standardPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <>
      <Helmet>
        <title>Network Insights & Security Blog | Check My IP</title>
        <meta name="description" content="Deep dives into cybersecurity, network protocols, and the future of digital privacy. Engineered for precision." />
      </Helmet>
      <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Hero Header */}
      <section className="mb-12">
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight mb-4">Network Insights & Security Blog</h1>
        <p className="text-on-surface-variant max-w-2xl text-lg">Deep dives into cybersecurity, network protocols, and the future of digital privacy. Engineered for precision.</p>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Blog Content Area */}
        <div className="lg:col-span-8 space-y-12">
          
          {loading ? (
             <div className="flex justify-center p-12">
               <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : (
            <>
              {/* Featured Article */}
              {featuredPost && (
                <Link to={`/blog/${featuredPost.id}`} className="block relative group cursor-pointer overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_24px_48px_rgba(25,28,30,0.04)]">
                  <div className="aspect-[21/9] overflow-hidden">
                    <img alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={featuredPost.image} />
                  </div>
                  <div className="p-5 sm:p-8 md:p-10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold px-3 py-1 rounded-full font-label tracking-wider uppercase">{featuredPost.category}</span>
                      <span className="text-outline font-label text-xs">{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</span>
                    </div>
                    <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface mb-4 leading-tight group-hover:text-primary transition-colors">{featuredPost.title}</h2>
                    <p className="text-on-surface-variant text-lg mb-6 leading-relaxed">{featuredPost.summary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden">
                          <span className="material-symbols-outlined text-primary mt-2 flex justify-center text-3xl">account_circle</span>
                        </div>
                        <span className="font-semibold text-sm">{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-bold text-sm group/btn">
                        Read More
                        <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Article Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {standardPosts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.id}`} className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 group">
                    <div className="aspect-video overflow-hidden">
                      <img alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={post.image} />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="text-outline font-label text-[10px] tracking-widest uppercase mb-2">{post.category}</div>
                      <h3 className="font-headline text-xl font-bold mb-3 group-hover:text-primary">{post.title}</h3>
                      <p className="text-on-surface-variant text-sm mb-6 flex-grow">{post.summary}</p>
                      <div className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 self-start">
                        Read More <span className="material-symbols-outlined text-base">chevron_right</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
          
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
              <Link to="/port-check" className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">Port Checker</span>
                <span className="material-symbols-outlined text-sm text-outline">arrow_outward</span>
              </Link>
              <Link to="/vpn-check" className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">VPN Detection</span>
                <span className="material-symbols-outlined text-sm text-outline">arrow_outward</span>
              </Link>
              <Link to="/network-security" className="flex items-center justify-between p-3 bg-surface-container-lowest rounded-lg hover:translate-x-2 transition-transform duration-300">
                <span className="text-sm font-medium">Network Security Scan</span>
                <span className="material-symbols-outlined text-sm text-outline">arrow_outward</span>
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
    </>
  );
};

export default BlogIndex;
