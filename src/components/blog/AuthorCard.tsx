import { Github, Linkedin, Mail } from 'lucide-react';
import profileAvatar from '@/assets/profile_image.png';

const AuthorCard = () => {
  return (
    <div className="glass-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <img
        src={profileAvatar}
        alt="Aayush Kumar Singh"
        className="w-20 h-20 rounded-full object-cover border-2 border-primary/30 flex-shrink-0"
        loading="lazy"
      />
      <div className="text-center sm:text-left">
        <h4 className="text-lg font-bold text-foreground mb-1">Aayush Kumar Singh</h4>
        <p className="text-sm text-accent font-medium mb-3">Full Stack Developer & ML Engineer</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Building scalable web apps with React, Node.js, and FastAPI — and intelligent ML systems
          with RAG pipelines and LLM integration. Based in Kathmandu, Nepal.
        </p>
        <div className="flex justify-center sm:justify-start gap-3">
          <a
            href="https://github.com/AayushSinghRajput"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg glass-card hover:scale-110 transition-transform"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/aayush-kumar-singh-ce"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg glass-card hover:scale-110 transition-transform"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:aayushsinghrajput2002@gmail.com"
            className="p-2 rounded-lg glass-card hover:scale-110 transition-transform"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
