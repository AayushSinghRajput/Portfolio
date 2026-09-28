import { Link } from "react-router-dom";
import { getAllPosts } from "@/lib/blog";
import { BookOpen, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedBlog = () => {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="articles" className="py-24 relative overflow-hidden bg-background/50">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-medium text-cyan-400 mb-4">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Knowledge & Engineering Writes</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Latest <span className="text-gradient">Articles & Deep Dives</span>
              </h2>
              <p className="text-muted-foreground max-w-xl text-base sm:text-lg mt-3">
                Architectural breakdowns, hackathon takeaways, and practical guides on full-stack AI development.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <Button asChild variant="outline" className="border-border hover:bg-primary/10 rounded-xl gap-2 font-medium">
                <Link to="/blog">
                  View All Articles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="glass-card rounded-2xl border border-border/70 overflow-hidden flex flex-col justify-between hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div>
                  {/* Category & Date Header */}
                  <div className="p-6 pb-0">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-cyan-400 border border-primary/30">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock size={12} />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar size={13} />
                    <span>
                      {post.date && !isNaN(new Date(post.date).getTime())
                        ? new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : post.date || 'Recent'}
                    </span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-cyan-400 transition-colors"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
