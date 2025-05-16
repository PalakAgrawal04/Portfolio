'use client';

import { useRef, useEffect } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate image
      gsap.fromTo(
        imageRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
      
      // Animate content paragraphs
      gsap.fromTo(
        '.about-paragraph',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="About Me" 
          subtitle="Learn more about my background, skills, and passion for web development."
        />
        
        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div ref={imageRef} className="opacity-0">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <Image 
                src="/images/about-image.jpg" 
                alt="Palak - About Me"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div ref={contentRef}>
            <p className="about-paragraph text-accent mb-6 opacity-0">
              I'm a passionate web developer with expertise in front-end technologies. 
              My journey in web development started 5 years ago, and since then, 
              I've been creating responsive and user-friendly websites that solve real problems.
            </p>
            
            <p className="about-paragraph text-accent mb-6 opacity-0">
              I specialize in React, Next.js, and modern CSS frameworks like Tailwind CSS. 
              I believe in writing clean, maintainable code and creating seamless user experiences 
              that delight users and help businesses achieve their goals.
            </p>
            
            <p className="about-paragraph text-accent opacity-0">
              When I'm not coding, you can find me exploring new design trends, 
              contributing to open-source projects, or sharing my knowledge through blogging 
              and mentoring aspiring developers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
