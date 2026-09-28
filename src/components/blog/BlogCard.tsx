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
      className="group glass-card overflow-hidden flex flex-col transition-all duration-500 hover:scale-[1.03] hover:shadow-primary"
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
        {post.coverImage && post.coverImage !== '/placeholder.svg' ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-primary-foreground">
                {post.title.charAt(0)}
              </span>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent z-10 pointer-events-none" />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 text-xs font-semibold bg-primary/80 backdrop-blur-md rounded-full text-white shadow-sm border border-white/10">
            {post.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
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
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* Read more */}
        <div className="flex items-center text-sm font-medium text-accent group-hover:gap-3 gap-2 transition-all">
          Read article
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
