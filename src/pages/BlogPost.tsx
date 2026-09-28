import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import ReadingProgress from '@/components/blog/ReadingProgress';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';
import AuthorCard from '@/components/blog/AuthorCard';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { getPostBySlug, getRelatedPosts } from '@/lib/blog';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="bg-background text-foreground min-h-screen">
        <Navbar />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg hover:scale-105 transition-transform font-medium"
            >
              <ArrowLeft size={18} />
              Back to Blog
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post, 3);

  // JSON-LD for blog post
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Aayush Kumar Singh',
      url: 'https://www.aayushkumarsingh.com.np',
    },
    publisher: {
      '@type': 'Person',
      name: 'Aayush Kumar Singh',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.aayushkumarsingh.com.np/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        ogType="article"
        canonical={`/blog/${post.slug}`}
        article={{
          publishedTime: post.date,
          author: 'Aayush Kumar Singh',
          tags: post.tags,
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <ReadingProgress />
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            {/* Article Header */}
            <header className="mb-12 max-w-3xl">
              {/* Category */}
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full mb-4">
                {post.category}
              </span>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar size={15} />
                  {post.date && !isNaN(new Date(post.date).getTime())
                    ? new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Recent'}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={15} />
                  {post.readingTime}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                  >
                    <Tag size={11} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
            </header>

            {/* Featured Cover Banner */}
            {post.coverImage && post.coverImage !== '/placeholder.svg' && (
              <div className="mb-12 rounded-2xl overflow-hidden border border-border/70 shadow-2xl max-h-[460px] bg-card/60 backdrop-blur-sm">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {/* Content + ToC Layout */}
            <div className="flex gap-12">
              {/* Main Content */}
              <article className="flex-1 min-w-0">
                <div className="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-accent prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-card prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-li:text-muted-foreground prose-th:text-foreground prose-td:text-muted-foreground prose-table:border-collapse prose-tr:border-border prose-img:rounded-xl">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* Bottom Share */}
                <div className="mt-12 pt-8 border-t border-border">
                  <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
                </div>

                {/* Author Card */}
                <div className="mt-8">
                  <AuthorCard />
                </div>
              </article>

              {/* Table of Contents Sidebar */}
              <aside className="w-64 flex-shrink-0">
                <TableOfContents content={post.content} />
              </aside>
            </div>

            {/* Related Posts */}
            <div className="mt-20 pt-12 border-t border-border">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </div>
        </div>

        {/* Blog posting structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
