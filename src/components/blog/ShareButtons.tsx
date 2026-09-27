import { Link2, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const { toast } = useToast();
  const fullUrl =
    typeof window !== 'undefined' && window.location.origin
      ? `${window.location.origin}${url}`
      : `https://www.aayushkumarsingh.com.np${url}`;
  const encoded = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    await navigator.clipboard.writeText(fullUrl);
    toast({ title: 'Link copied!', description: 'The article URL has been copied to clipboard.' });
  };

  const links = [
    {
      label: 'Copy link',
      icon: Link2,
      onClick: copyLink,
      href: undefined,
    },
    {
      label: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encoded}`,
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground mr-1">Share:</span>
      {links.map((link) =>
        link.href ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg glass-card hover:scale-110 transition-transform text-muted-foreground hover:text-foreground"
            aria-label={`Share on ${link.label}`}
          >
            <link.icon size={16} />
          </a>
        ) : (
          <button
            key={link.label}
            onClick={link.onClick}
            className="p-2 rounded-lg glass-card hover:scale-110 transition-transform text-muted-foreground hover:text-foreground"
            aria-label={link.label}
          >
            <link.icon size={16} />
          </button>
        ),
      )}
    </div>
  );
};

export default ShareButtons;
