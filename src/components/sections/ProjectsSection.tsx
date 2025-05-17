'use client';

import { useRef, useEffect } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import ProjectCard from '@/components/ui/ProjectCard';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Project data
const projects = [
  {
    id: 1,
    title: 'TechFiesta Hackathon Website',
    description: `Crafted a hackathon registration portal attracting 5000+ visitors.
    Deployed the website with 150+ team registrations to date.`,
    tags: ['ReactJS', 'GSAP', 'Figma'],
    imageUrl: '/images/techfiesta.jpeg',
    projectUrl: 'https://techfiesta.pict.edu/',
  },
  {
    id: 2,
    title: 'Nike Website Redesign',
    description: `Transformed the Nike website UI using React.js, React DOM, and GSAP,
    enhancing shopping experience with dynamic animations and intuitive navigation.`,
    tags: ['ReactJS', 'GSAP', 'React DOM'],
    imageUrl: '/images/nike.png',
    projectUrl: 'https://nike-trident-reimagine-round1.vercel.app/',
  },
  {
    id: 3,
    title: 'General Mills Website Redesign',
    description: `Redesigned the General Mills website focusing on aesthetic enhancements and seamless UI/UX,
    creating a visually engaging and user-friendly experience.`,
    tags: ['ReactJS', 'GSAP', 'CSS', 'JavaScript'],
    imageUrl: '/images/generalmills.png',
    projectUrl: 'https://general-mills-trident-reimagine-round2.vercel.app/',
  },
  {
    id: 4,
    title: 'Event Coding Website',
    description: `Developed and maintained frontend of event coding website using React, Vite, and Tailwind CSS.
    Integrated backend RESTful APIs using Django REST framework.
    Enhanced UI responsiveness and user experience.`,
    tags: ['ReactJS', 'Tailwind CSS', 'Django REST'],
    imageUrl: '/images/event.png',
    projectUrl: 'https://credenz.co.in/',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
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
          {projects.map((project) => (
            <div key={project.id} className="project-card opacity-0">
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
