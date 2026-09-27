import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home, BookOpen, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.warn("404 Error: Non-existent route requested:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-background text-foreground px-4">
      <SEOHead
        title="404 - Page Not Found | Aayush Kumar Singh"
        description="The page you are looking for does not exist or has been moved."
      />

      {/* Decorative Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center glass-card p-8 sm:p-12 rounded-3xl border border-border/70 shadow-2xl">
        <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-cyan-400 mb-6 border border-primary/20">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-2 text-gradient">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 text-foreground">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
          The link you followed may be broken or the page may have been moved.
          Let's get you back on track:
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <Button asChild className="gradient-primary text-primary-foreground font-medium rounded-xl gap-2">
            <Link to="/">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </Button>

          <Button asChild variant="outline" className="border-border hover:bg-muted/30 font-medium rounded-xl gap-2">
            <Link to="/blog">
              <BookOpen className="w-4 h-4" />
              Read Blog
            </Link>
          </Button>
        </div>

        <div className="text-xs text-muted-foreground/60 font-mono">
          Route attempted: <span className="text-foreground/80">{location.pathname}</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
