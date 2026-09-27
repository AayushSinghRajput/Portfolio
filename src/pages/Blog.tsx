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

  const filteredPosts = useMemo(() => {
    let posts = searchQuery ? searchPosts(searchQuery) : allPosts;
    if (activeCategory !== 'All') {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    return posts;
  }, [allPosts, activeCategory, searchQuery]);

  return (
    <div className="bg-background text-foreground min-h-screen">
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

      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Portfolio
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-primary">
                  <PenLine size={28} className="text-primary-foreground" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Blog & <span className="text-gradient">Articles</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Technical deep dives, project breakdowns, hackathon stories, and lessons from my
                journey as a Full Stack Developer & ML Engineer.
              </p>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mt-6" />
            </div>

            {/* Search */}
            <div className="mb-8">
              <BlogSearch value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Category Filters */}
            <div className="flex justify-center flex-wrap gap-2 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSearchQuery('');
                  }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                    activeCategory === cat
                      ? 'bg-gradient-primary border-transparent text-white shadow-lg scale-105'
                      : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="ml-2 text-xs opacity-70">
                      {filteredPosts.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

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
