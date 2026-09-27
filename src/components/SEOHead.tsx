import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  article?: {
    publishedTime: string;
    author: string;
    tags: string[];
  };
  breadcrumbs?: { name: string; url: string }[];
}

const SITE_URL = 'https://www.aayushkumarsingh.com.np';
const DEFAULT_TITLE = 'Aayush Kumar Singh - Full Stack Developer & ML Engineer';
const DEFAULT_DESCRIPTION =
  'Full Stack Developer & ML Engineer from Kathmandu, Nepal. Specialized in React, Next.js, Node.js, FastAPI, RAG pipelines, LLM integration, and vector databases.';

const SEOHead = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  ogImage = `${SITE_URL}/og-image.jpg`,
  ogType = 'website',
  canonical,
  article,
  breadcrumbs,
}: SEOHeadProps) => {
  const fullTitle = title ? `${title} | Aayush Kumar Singh` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Aayush Kumar Singh" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Article metadata */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:author" content={article.author} />
          {article.tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Breadcrumb structured data */}
      {breadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((bc, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: bc.name,
              item: `${SITE_URL}${bc.url}`,
            })),
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
