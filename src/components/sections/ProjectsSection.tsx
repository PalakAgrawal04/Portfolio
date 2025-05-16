'use client';

import { useRef, useEffect } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A fully responsive e-commerce website with shopping cart functionality.',
    tags: ['Next.js', 'Tailwind CSS', 'Stripe'],
    imageUrl: '/images/project1.jpg',
    projectUrl: '/projects/e-commerce',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A drag-and-drop task management application with authentication.',
    tags: ['React', 'Firebase', 'GSAP'],
    imageUrl: '/images/project2.jpg',
    projectUrl: '/projects/task-management',
  },
  {
    id: 3,
    title: 'Blog Platform',
    description: 'A modern blog platform with a custom CMS and comment system.',
    tags: ['Next.js', 'Sanity CMS', 'Vercel'],
    imageUrl: '/images/project3.jpg',
    projectUrl: '/projects/blog-platform',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate projects
      gsap.fromTo(
        '.project-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="My Projects" 
          subtitle="Explore some of my recent work and the technologies I've been working with."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card opacity-0">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
