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
      <span className="text-xs font-mono text-[#5E5B54] uppercase tracking-wider mr-1">Share:</span>
      {links.map((link) =>
        link.href ? (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#FFFFFF] border border-[#DAD4C9] hover:border-[#20201D] text-[#5E5B54] hover:text-[#20201D] hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
            aria-label={`Share on ${link.label}`}
          >
            <link.icon size={15} />
          </a>
        ) : (
          <button
            key={link.label}
            onClick={link.onClick}
            className="p-2 rounded-lg bg-[#FFFFFF] border border-[#DAD4C9] hover:border-[#20201D] text-[#5E5B54] hover:text-[#20201D] hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
            aria-label={link.label}
          >
            <link.icon size={15} />
          </button>
        ),
      )}
    </div>
  );
};

export default ShareButtons;
