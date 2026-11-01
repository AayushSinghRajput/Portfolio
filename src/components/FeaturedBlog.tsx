import React from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "@/lib/blog";
import { ArrowRight, Clock } from "lucide-react";

export const FeaturedBlog: React.FC = () => {
  const posts = getAllPosts().slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section
      id="articles"
      aria-label="Technical Articles"
      className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#DAD4C9]"
    >
      {/* Section Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-16 pb-6 border-b border-[#DAD4C9]">
        <div>
          <span className="font-mono text-xs text-[#77746C] tracking-widest uppercase block mb-2">
            07 // PUBLICATIONS
          </span>
          <h2 className="text-h1 font-serif text-[#20201D]">
            Engineering Writing
          </h2>
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#20201D] hover:text-[#E65336] transition-colors"
        >
          <span>View All Articles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
        {posts.map((post, idx) => (
          <article
            key={post.slug}
            className="p-6 sm:p-7 bg-[#FFFFFF] border border-[#DAD4C9] hover:border-[#20201D] transition-colors flex flex-col justify-between group rounded"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] text-[#77746C] uppercase tracking-wider">
                <span className="text-[#8A9367]">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readingTime}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#20201D] group-hover:text-[#E65336] transition-colors leading-snug">
                <Link to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>

              <p className="text-xs sm:text-sm text-[#5E5B54] font-sans leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#DAD4C9]/70 flex items-center justify-between font-mono text-xs">
              <span className="text-[#77746C]">{post.date}</span>
              <Link
                to={`/blog/${post.slug}`}
                className="text-[#20201D] group-hover:text-[#E65336] inline-flex items-center gap-1 font-medium"
              >
                <span>Read</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBlog;
