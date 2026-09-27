// Blog utilities — frontmatter parsing, post loading, search & filter helpers

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  readingTime: string;
  published: boolean;
  content: string;
}

// ── Frontmatter parser (no external deps) ──────────────────────
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of frontmatter.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let value: string | string[] | boolean = line.slice(colonIdx + 1).trim();

    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse arrays: ["tag1", "tag2"]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''));
    }

    // Parse booleans
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    data[key] = value;
  }

  return { data, content };
}

// ── Calculate reading time ─────────────────────────────────────
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// ── Load all blog posts using Vite glob import ─────────────────
const modules = import.meta.glob<string>('/src/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [filepath, raw] of Object.entries(modules)) {
    const slug = filepath.split('/').pop()?.replace('.md', '') ?? '';
    const { data, content } = parseFrontmatter(raw);

    if (data.published === false) continue;

    posts.push({
      slug,
      title: (data.title as string) ?? 'Untitled',
      date: (data.date as string) ?? '',
      category: (data.category as string) ?? 'General',
      tags: (data.tags as string[]) ?? [],
      excerpt: (data.excerpt as string) ?? content.slice(0, 160) + '…',
      coverImage: (data.coverImage as string) ?? '/placeholder.svg',
      readingTime: (data.readingTime as string) ?? calculateReadingTime(content),
      published: data.published !== false,
      content,
    });
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  const cats = new Set(getAllPosts().map((p) => p.category));
  return ['All', ...Array.from(cats).sort()];
}

export function getRelatedPosts(current: BlogPost, count = 3): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length + (p.category === current.category ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((r) => r.post);
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.toLowerCase();
  return getAllPosts().filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q),
  );
}
