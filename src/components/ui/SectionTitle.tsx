'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
}

export default function SectionTitle({
  title,
  subtitle,
  alignment = 'left',
}: SectionTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = {
      title: titleRef.current,
      subtitle: subtitleRef.current,
      line: lineRef.current,
    };
    
    if (!elements.title) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate the title, subtitle, and line when in view
            gsap.timeline()
              .fromTo(
                elements.title,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
              )
              .fromTo(
                elements.line,
                { scaleX: 0, transformOrigin: alignment === 'right' ? 'right' : 'left' },
                { scaleX: 1, duration: 0.5, ease: 'power3.out' },
                '-=0.3'
              )
              .fromTo(
                elements.subtitle,
                { y: 15, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
                '-=0.2'
              );
            
            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(elements.title);
    
    return () => {
      observer.disconnect();
    };
  }, [alignment]);

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  const lineAlignmentClasses = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  return (
    <div className={`mb-10 ${alignmentClasses[alignment]}`}>
      <h2 
        ref={titleRef} 
        className="text-3xl md:text-4xl font-serif font-bold text-primary opacity-0"
      >
        {title}
      </h2>
      <div 
        ref={lineRef}
        className={`h-1 bg-primary w-24 mt-3 mb-4 ${lineAlignmentClasses[alignment]}`}
      />
      {subtitle && (
        <p 
          ref={subtitleRef} 
          className="text-accent text-lg max-w-xl opacity-0"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
