import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileAvatar from '@/assets/profile-avatar.jpg';

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image */}
          <div className="mb-8 fade-in-up">
            <div className="relative inline-block">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-glow">
                <img 
                  src={profileAvatar} 
                  alt="Aayush Singh Rajput - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-glow"></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <div className="fade-in-up stagger-1">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                <span className="text-gradient">Aayush Singh Rajput</span>
              </h1>
              <div className="text-2xl md:text-3xl text-accent font-semibold mb-6">
                Full Stack Developer
              </div>
            </div>

            <div className="fade-in-up stagger-2">
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Crafting clean and efficient web solutions using modern technologies. 
                Passionate about creating seamless user experiences and scalable applications.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up stagger-3">
              <Button 
                size="lg" 
                className="gradient-primary text-primary-foreground hover:scale-105 transition-transform shadow-primary"
                onClick={() => scrollToSection('#projects')}
              >
                View Projects
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="hover:scale-105 transition-transform"
                onClick={() => scrollToSection('#contact')}
              >
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 fade-in-up stagger-4">
              <a 
                href="https://github.com/aayush-singh-rajput" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card hover:scale-110 transition-transform hover:shadow-accent"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/aayush-singh-rajput" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full glass-card hover:scale-110 transition-transform hover:shadow-accent"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:aayush@example.com"
                className="p-3 rounded-full glass-card hover:scale-110 transition-transform hover:shadow-accent"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown 
              size={24} 
              className="text-muted-foreground cursor-pointer hover:text-accent transition-colors"
              onClick={() => scrollToSection('#about')}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;