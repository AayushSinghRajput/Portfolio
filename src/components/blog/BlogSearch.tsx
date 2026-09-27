import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const BlogSearch = ({ value, onChange }: BlogSearchProps) => {
  return (
    <div className="relative max-w-md mx-auto">
      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 bg-card/80 border-white/10 backdrop-blur-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default BlogSearch;
