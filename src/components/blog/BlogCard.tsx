import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group bg-[#FFFFFF] border border-[#DAD4C9] hover:border-[#20201D] overflow-hidden flex flex-col transition-all duration-300 rounded shadow-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
    >
      {/* Cover Image */}
      <div className="relative aspect-[1200/630] w-full overflow-hidden bg-[#0A0D16] border-b border-[#DAD4C9]">
        {post.coverImage && post.coverImage !== '/placeholder.svg' ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-xl bg-[#20201D] flex items-center justify-center border border-[#DAD4C9]">
              <span className="text-2xl font-serif text-[#F5F1E8]">
                {post.title.charAt(0)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta row with Category, Date, and Read Time */}
        <div className="flex items-center gap-3 text-xs font-mono text-[#77746C] mb-3 flex-wrap">
          <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase bg-[#20201D] text-[#F5F1E8] rounded">
            {post.category}
          </span>
          <span className="text-[#DAD4C9]">•</span>
          <span className="flex items-center gap-1">
            <Calendar size={13} />
            {post.date && !isNaN(new Date(post.date).getTime())
              ? new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'Recent'}
          </span>
          <span className="text-[#DAD4C9]">•</span>
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-serif text-[#20201D] mb-3 group-hover:text-[#E65336] transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-[#5E5B54] font-sans leading-relaxed mb-4 flex-grow line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] font-mono bg-[#F5F1E8] border border-[#DAD4C9] rounded text-[#5E5B54]"
            >
              #{tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-1.5 py-0.5 text-[10px] font-mono bg-[#E9E3D8] border border-[#DAD4C9] rounded text-[#77746C]">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* Read more */}
        <div className="flex items-center text-xs font-mono uppercase tracking-wider text-[#20201D] group-hover:text-[#E65336] group-hover:gap-2 gap-1.5 transition-all mt-auto pt-3 border-t border-[#DAD4C9]/60">
          <span>Read Article</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
