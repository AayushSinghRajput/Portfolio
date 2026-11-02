import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, List, ChevronDown } from 'lucide-react';
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

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5E5B54] hover:text-[#E65336] transition-colors mb-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
            >
              <ArrowLeft size={14} />
              <span>Back to all articles</span>
            </Link>

            {/* Article Header */}
            <header className="mb-10 max-w-3xl">
              {/* Category */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider bg-[#20201D] text-[#F5F1E8] rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#20201D] mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-[#5E5B54] mb-6">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {post.date && !isNaN(new Date(post.date).getTime())
                    ? new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Recent'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.readingTime}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono bg-[#FFFFFF] border border-[#DAD4C9] rounded text-[#5E5B54]"
                  >
                    <Tag size={10} className="text-[#77746C]" />
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
            </header>

            {/* Featured Cover Banner */}
            {post.coverImage && post.coverImage !== '/placeholder.svg' && (
              <div className="mb-10 rounded-xl overflow-hidden border border-[#DAD4C9] shadow-md aspect-[1200/630] w-full bg-[#0A0D16]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {/* Content + ToC Layout (responsive flex) */}
            <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start">
              {/* Main Content */}
              <article className="w-full flex-1 min-w-0">
                {/* Mobile/Tablet Collapsible Table of Contents */}
                <div className="xl:hidden mb-8">
                  <details className="group bg-[#FFFFFF] border border-[#DAD4C9] rounded-xl p-4 text-xs font-mono transition-all">
                    <summary className="cursor-pointer font-semibold text-[#20201D] flex items-center justify-between select-none">
                      <span className="flex items-center gap-2">
                        <List size={14} className="text-[#E65336]" />
                        <span>Table of Contents (Jump to section)</span>
                      </span>
                      <ChevronDown size={14} className="transition-transform group-open:rotate-180 text-[#77746C]" />
                    </summary>
                    <div className="mt-3 pt-3 border-t border-[#DAD4C9]/60">
                      <TableOfContents content={post.content} isMobile />
                    </div>
                  </details>
                </div>

                {/* Article Prose with High-Contrast Editorial Styling */}
                <div className="prose max-w-none font-sans
                  prose-headings:font-serif prose-headings:text-[#20201D] prose-headings:font-normal prose-headings:tracking-tight
                  prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pt-6 prose-h2:border-t prose-h2:border-[#DAD4C9]/50
                  prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#20201D]
                  prose-h4:text-lg prose-h4:text-[#20201D]
                  prose-p:text-[#3C3833] prose-p:leading-relaxed prose-p:text-base sm:prose-p:text-lg prose-p:mb-5
                  prose-strong:text-[#20201D] prose-strong:font-semibold
                  prose-a:text-[#E65336] prose-a:underline hover:prose-a:text-[#C4381C]
                  prose-code:text-[#C4381C] prose-code:bg-[#E9E3D8] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs sm:prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-[#20201D] prose-pre:text-[#F5F1E8] prose-pre:border prose-pre:border-[#20201D] prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
                  prose-blockquote:border-l-4 prose-blockquote:border-[#E65336] prose-blockquote:bg-[#E9E3D8]/40 prose-blockquote:text-[#5E5B54] prose-blockquote:italic prose-blockquote:py-2.5 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:my-6
                  prose-ul:text-[#3C3833] prose-ul:my-4 prose-ul:space-y-1.5 prose-ul:list-disc prose-ul:pl-6
                  prose-ol:text-[#3C3833] prose-ol:my-4 prose-ol:space-y-1.5 prose-ol:list-decimal prose-ol:pl-6
                  prose-li:text-[#3C3833] prose-li:leading-relaxed
                  prose-hr:border-[#DAD4C9] prose-hr:my-10
                  prose-img:rounded-xl prose-img:border prose-img:border-[#DAD4C9]
                  prose-table:text-sm prose-th:text-[#20201D] prose-th:font-mono prose-th:border-b prose-th:border-[#DAD4C9] prose-td:border-b prose-td:border-[#DAD4C9]/60">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
                    {post.content}
                  </ReactMarkdown>
                </div>

                {/* Bottom Share */}
                <div className="mt-12 pt-8 border-t border-[#DAD4C9]">
                  <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
                </div>

                {/* Author Card */}
                <div className="mt-8">
                  <AuthorCard />
                </div>
              </article>

              {/* Table of Contents Sticky Sidebar (Desktop only) */}
              <aside className="hidden xl:block w-72 flex-shrink-0">
                <TableOfContents content={post.content} />
              </aside>
            </div>

            {/* Related Posts */}
            <div className="mt-20 pt-12 border-t border-[#DAD4C9]">
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
