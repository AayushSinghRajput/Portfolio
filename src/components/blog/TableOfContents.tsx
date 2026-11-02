import { useEffect, useState } from 'react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  isMobile?: boolean;
}

const TableOfContents = ({ content, isMobile = false }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState('');
  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  // Extract headings from markdown content
  useEffect(() => {
    const regex = /^(#{2,4})\s+(.+)$/gm;
    const items: HeadingItem[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      items.push({ id, text, level });
    }

    setHeadings(items);
  }, [content]);

  // Track active heading on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' },
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      className={
        isMobile
          ? 'space-y-1'
          : 'sticky top-28 max-h-[calc(100vh-140px)] overflow-y-auto p-5 bg-[#FFFFFF] border border-[#DAD4C9] rounded-xl shadow-xs'
      }
      aria-label="Table of contents"
    >
      {!isMobile && (
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#20201D] mb-4 pb-2 border-b border-[#DAD4C9]">
          On this page
        </h4>
      )}
      <ul className={`space-y-2 ${isMobile ? '' : 'border-l border-[#DAD4C9] pl-3'}`}>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.id);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  window.history.pushState(null, '', `#${heading.id}`);
                }
              }}
              className={`block text-xs font-mono transition-colors duration-200 leading-relaxed ${
                heading.level === 3 ? 'pl-3 text-[11px]' : heading.level === 4 ? 'pl-5 text-[10px]' : ''
              } ${
                activeId === heading.id
                  ? 'text-[#E65336] font-semibold border-l-2 border-[#E65336] -ml-[13px] pl-[11px]'
                  : 'text-[#5E5B54] hover:text-[#20201D]'
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
