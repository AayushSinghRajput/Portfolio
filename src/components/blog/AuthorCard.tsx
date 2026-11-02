import { Github, Linkedin, Mail } from 'lucide-react';
import profileAvatar from '@/assets/profile_image.webp';

const AuthorCard = () => {
  return (
    <div className="bg-[#FFFFFF] border border-[#DAD4C9] rounded-xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-xs">
      <img
        src={profileAvatar}
        alt="Aayush Kumar Singh"
        className="w-20 h-20 rounded-full object-cover border-2 border-[#20201D] flex-shrink-0"
        loading="lazy"
      />
      <div className="text-center sm:text-left flex-grow">
        <h4 className="text-lg font-serif text-[#20201D] mb-1">Aayush Kumar Singh</h4>
        <p className="text-xs font-mono text-[#E65336] uppercase tracking-wider mb-3">
          Full Stack Developer &amp; ML Engineer
        </p>
        <p className="text-sm text-[#5E5B54] font-sans leading-relaxed mb-4">
          Building scalable web apps with React, Node.js, and FastAPI — and intelligent ML systems
          with RAG pipelines and LLM integration. Based in Kathmandu, Nepal.
        </p>
        <div className="flex justify-center sm:justify-start gap-2.5">
          <a
            href="https://github.com/AayushSinghRajput"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#F5F1E8] border border-[#DAD4C9] text-[#20201D] hover:border-[#20201D] hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/aayush-kumar-singh-ce"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#F5F1E8] border border-[#DAD4C9] text-[#20201D] hover:border-[#20201D] hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
            aria-label="LinkedIn"
          >
            <Linkedin size={15} />
          </a>
          <a
            href="mailto:aayushsinghrajput2002@gmail.com"
            className="p-2 rounded-lg bg-[#F5F1E8] border border-[#DAD4C9] text-[#20201D] hover:border-[#20201D] hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E65336]"
            aria-label="Email"
          >
            <Mail size={15} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
