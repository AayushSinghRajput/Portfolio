import BlogCard from './BlogCard';
import type { BlogPost } from '@/lib/blog';

interface RelatedPostsProps {
  posts: BlogPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) return null;

  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-serif text-[#20201D] mb-8">
        Related <span className="text-[#E65336]">Articles</span>
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
