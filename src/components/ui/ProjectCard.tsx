'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  projectUrl,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    
    if (!element) return;
    
    const onHover = () => {
      gsap.to(element.querySelector('.project-image'), {
        scale: 1.05,
        duration: 0.4,
        ease: 'power2.out',
      });
    };
    
    const onLeave = () => {
      gsap.to(element.querySelector('.project-image'), {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    };
    
    element.addEventListener('mouseenter', onHover);
    element.addEventListener('mouseleave', onLeave);
    
    return () => {
      element.removeEventListener('mouseenter', onHover);
      element.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-lg overflow-hidden shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="h-48 relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="project-image object-cover transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif text-primary font-semibold mb-2">{title}</h3>
        <p className="text-accent mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs bg-secondary px-2 py-1 rounded text-accent-light"
            >
              {tag}
            </span>
          ))}
        </div>
        <Button href={projectUrl} size="sm">
          View Project
        </Button>
      </div>
    </div>
  );
}
