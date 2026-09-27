import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Code, Briefcase, Mail, BookOpen, PenLine, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Skills', href: '/skills', icon: Code },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Experience', href: '/experience', icon: BookOpen },
  { name: 'Education', href: '/education', icon: GraduationCap },
  { name: 'Blog', href: '/blog', icon: PenLine },
  { name: 'Contact', href: '/contact', icon: Mail },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        aria-label="Main Navigation"
        className={`nav-glass transition-all duration-300 ${
          isScrolled
            ? 'py-2.5 shadow-lg shadow-black/10 backdrop-blur-xl bg-background/85 border-b border-border/80'
            : 'py-4 bg-background/60 backdrop-blur-md border-b border-border/40'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <Link
            to="/"
            className="text-lg sm:text-xl font-extrabold tracking-tight text-gradient hover:opacity-90 transition-opacity"
            aria-label="Aayush Kumar Singh - Home"
          >
            Aayush Kumar Singh
          </Link>

          {/* Desktop Navigation Links — All items share the exact same uniform design */}
          <div className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                    active
                      ? 'text-primary font-semibold bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium'
                  }`}
                >
                  <item.icon size={15} className={active ? 'text-primary' : 'text-muted-foreground'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Medium Screens (lg) Compact Nav */}
          <div className="hidden lg:flex xl:hidden items-center space-x-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  title={item.name}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 ${
                    active
                      ? 'text-primary font-semibold bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium'
                  }`}
                >
                  <item.icon size={14} className={active ? 'text-primary' : 'text-muted-foreground'} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Actions: Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle (Light / Dark / System) */}
            <ThemeToggle />

            {/* Mobile Menu Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden w-9 h-9 rounded-full border border-border/60 hover:bg-muted/30"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation — All items share the exact same uniform design */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/80 bg-background/95 backdrop-blur-xl shadow-2xl animate-fadeIn">
            <div className="p-4 space-y-1.5 max-w-md mx-auto">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 w-full p-2.5 rounded-xl text-sm transition-colors ${
                      active
                        ? 'bg-primary/15 text-primary font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium'
                    }`}
                  >
                    <item.icon size={18} className={active ? 'text-primary' : 'text-muted-foreground'} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;