import { useEffect, useState } from 'react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents = ({ content }: TableOfContentsProps) => {
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

  if (headings.length < 3) return null;

  return (
    <nav className="hidden xl:block sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
        On this page
      </h4>
      <ul className="space-y-2 border-l border-border pl-4">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block text-sm transition-colors duration-200 ${
                heading.level === 3 ? 'pl-3' : heading.level === 4 ? 'pl-6' : ''
              } ${
                activeId === heading.id
                  ? 'text-accent font-medium border-l-2 border-accent -ml-[17px] pl-[calc(1rem+1px)]'
                  : 'text-muted-foreground hover:text-foreground'
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
