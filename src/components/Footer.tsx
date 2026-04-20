import React from 'react';
import { SiGithub } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="w-full py-4 px-6 bg-transparent text-[#8b949e] border-t border-[#1a1a1a] flex justify-center z-10 relative mt-4 font-rock">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-16">
        <a 
          href="mailto:nx2803@gmail.com" 
          className="flex items-center gap-3 hover:text-white transition-colors duration-300 group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" height="18" 
            viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
            className="text-gold opacity-70 group-hover:opacity-100 transition-opacity"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="tracking-widest text-xs uppercase">nx2803@gmail.com</span>
        </a>
        
        <a 
          href="https://github.com/nx2803" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-3 hover:text-white transition-colors duration-300 group"
        >
          <SiGithub className="text-[18px] text-gold opacity-70 group-hover:opacity-100 transition-opacity" />
          <span className="tracking-widest text-xs uppercase">github.com/nx2803</span>
        </a>
      </div>
    </footer>
  );
}
