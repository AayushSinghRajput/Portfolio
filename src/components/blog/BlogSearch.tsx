import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BlogSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const BlogSearch = ({ value, onChange }: BlogSearchProps) => {
  return (
    <div className="relative max-w-md mx-auto">
      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#77746C]" />
      <Input
        type="text"
        placeholder="Search articles by title or keyword..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 bg-[#FFFFFF] border-[#DAD4C9] text-[#20201D] placeholder:text-[#77746C] focus-visible:ring-1 focus-visible:ring-[#E65336] focus-visible:border-[#E65336] rounded font-sans text-sm"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#77746C] hover:text-[#20201D] transition-colors"
          aria-label="Clear search input"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};

export default BlogSearch;
