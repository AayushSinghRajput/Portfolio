import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PenLine } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import BlogCard from '@/components/blog/BlogCard';
import BlogSearch from '@/components/blog/BlogSearch';
import { getAllPosts, getCategories, searchPosts } from '@/lib/blog';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allPosts = useMemo(() => getAllPosts(), []);
  const categories = useMemo(() => getCategories(), []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allPosts.length };
    allPosts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    let posts = searchQuery ? searchPosts(searchQuery) : allPosts;
    if (activeCategory !== 'All') {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    return posts;
  }, [allPosts, activeCategory, searchQuery]);

  return (
    <div className="bg-[#F5F1E8] text-[#20201D] min-h-screen">
      <SEOHead
        title="Blog"
        description="Technical articles, project breakdowns, and learning insights from Aayush Kumar Singh — Full Stack Developer & ML Engineer."
        keywords="blog, web development, machine learning, RAG, React, FastAPI, tutorials"
        canonical="/blog"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
        ]}
      />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5E5B54] hover:text-[#E65336] transition-colors mb-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-[#20201D] text-[#F5F1E8] border border-[#20201D]">
                  <PenLine size={24} className="text-[#E65336]" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-[#20201D] mb-4">
                Engineering Writing &amp; Articles
              </h1>
              <p className="text-base sm:text-lg text-[#5E5B54] max-w-2xl mx-auto leading-relaxed font-sans">
                Technical deep dives, architecture breakdowns, hackathon stories, and lessons from shipping production systems.
              </p>
            </div>

            {/* Search */}
            <div className="mb-8">
              <BlogSearch value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Category Filters */}
            <div
              className="flex justify-center flex-wrap gap-2.5 mb-8"
              role="toolbar"
              aria-label="Filter blog posts by category"
            >
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const count = categoryCounts[cat] || 0;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat);
                      setSearchQuery('');
                    }}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-mono tracking-wide transition-all duration-200 border focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336] ${
                      isActive
                        ? 'bg-[#20201D] text-[#F5F1E8] border-[#20201D] shadow-sm scale-105'
                        : 'bg-[#FFFFFF] text-[#5E5B54] border-[#DAD4C9] hover:border-[#20201D] hover:text-[#20201D]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none transition-colors ${
                        isActive
                          ? 'bg-[#E65336] text-white font-semibold'
                          : 'bg-[#E9E3D8] text-[#5E5B54]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Filter Bar */}
            {(activeCategory !== 'All' || searchQuery) && (
              <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#DAD4C9] text-xs font-mono text-[#5E5B54]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span>Filtered by:</span>
                  {activeCategory !== 'All' && (
                    <span className="px-2 py-0.5 bg-[#20201D] text-[#F5F1E8] rounded text-[11px] font-medium">
                      {activeCategory}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="px-2 py-0.5 bg-[#E9E3D8] text-[#20201D] rounded text-[11px]">
                      "{searchQuery}"
                    </span>
                  )}
                  <span>({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="text-[#E65336] hover:underline cursor-pointer font-medium"
                >
                  Reset filters ✕
                </button>
              </div>
            )}

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl font-bold mb-4 text-muted-foreground">
                  No articles found
                </p>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? `No results for "${searchQuery}". Try a different search term.`
                    : 'No articles in this category yet. Check back soon!'}
                </p>
              </div>
            )}

            {/* Article count */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-12 text-sm text-muted-foreground">
                Showing {filteredPosts.length} of {allPosts.length} articles
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
