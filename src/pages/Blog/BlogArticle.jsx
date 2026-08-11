import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet-async';

const BlogArticle = () => {
  const { id } = useParams();
  const [meta, setMeta] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const metaRes = await fetch('/blog/posts.json');
        const posts = await metaRes.json();
        const postMeta = posts.find(p => p.id === id);
        
        if (postMeta) {
          setMeta(postMeta);
          const contentRes = await fetch(`/blog/${id}.md`);
          if (contentRes.ok) {
            const md = await contentRes.text();
            setContent(md);
          } else {
            setContent('# Error\nFailed to load content.');
          }
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-on-surface text-xl">
        Article not found.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{meta.title} | Check My IP Blog</title>
        <meta name="description" content={meta.summary} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.summary} />
        <meta property="og:image" content={meta.image} />
      </Helmet>
      {/* Article Header Section */}
      <header className="pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="flex flex-col gap-4">
          <nav className="flex items-center gap-2 text-xs font-label uppercase tracking-widest text-outline">
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span className="material-symbols-outlined text-[10px]">chevron_right</span>
            <span className="text-secondary">{meta.category}</span>
          </nav>
          <h1 className="font-headline text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight leading-tight">
            {meta.title}
          </h1>
          <div className="flex items-center gap-6 mt-4 border-b border-outline-variant/15 pb-8 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-primary mt-2 flex justify-center text-3xl">account_circle</span>
              </div>
              <div>
                <p className="text-sm font-bold">{meta.author}</p>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-outline-variant/30"></div>
            <div>
              <p className="text-xs font-label text-outline uppercase tracking-wider">Published</p>
              <p className="text-sm font-medium">{new Date(meta.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pb-16 sm:pb-24">
        {/* Left Article Content */}
        <article className="lg:col-span-8 flex flex-col gap-8">
          <div className="rounded-xl overflow-hidden aspect-[21/9]">
            <img alt={meta.title} className="w-full h-full object-cover" src={meta.image} />
          </div>
          <div className="prose prose-slate max-w-none font-body text-lg leading-relaxed text-on-surface-variant space-y-6">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </article>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <div className="sticky top-24 flex flex-col gap-8">
            {/* Sidebar Ad */}
            <div className="bg-surface-container-low rounded-xl p-4 flex flex-col items-center border border-outline-variant/10 min-h-[600px]">
              <span className="text-[10px] font-label text-outline uppercase tracking-[0.2em] mb-4">Advertisement</span>
              <div className="w-[300px] h-[600px] bg-white rounded-lg flex items-center justify-center text-outline-variant text-center px-4 italic text-sm border">
                Premium Vertical Ad Unit<br/>(300 x 600)
              </div>
            </div>

            {/* Newsletter Card */}
            <div className="bg-primary p-8 rounded-xl text-on-primary">
              <h3 className="font-headline text-2xl font-bold mb-4">Stay Anonymous</h3>
              <p className="text-sm text-on-primary-container mb-6 leading-relaxed">Get weekly updates on network security tools and privacy alerts directly in your inbox.</p>
              <div className="flex flex-col gap-3">
                <input className="bg-on-primary/10 border-none rounded-lg text-sm focus:ring-2 focus:ring-on-primary placeholder:text-on-primary/50 py-3 px-4" placeholder="Email Address" type="email" />
                <button className="bg-white text-primary font-bold py-3 rounded-lg text-sm transition-all hover:bg-primary-fixed">Join 50k+ Readers</button>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
};

export default BlogArticle;
