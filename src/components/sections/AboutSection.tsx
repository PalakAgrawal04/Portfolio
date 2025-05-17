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
  const resumeBtnRef = useRef<HTMLAnchorElement>(null);

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

      // Animate resume button
      gsap.fromTo(
        resumeBtnRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
      <div className="container mx-auto px-12 ">
        <SectionTitle 
          title="About Me" 
          subtitle={<span className="whitespace-nowrap">Learn more about my background, skills, and passion for web development.</span>}
        />

        <div className="grid md:grid-cols-2 gap-12 mt-12">
          <div ref={imageRef} className="opacity-0">
            <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
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
              My journey in web development started with a fascination for creating beautiful and functional websites. 
              I've been creating responsive and user-friendly websites that solve real problems.
            </p>

            <p className="about-paragraph text-accent mb-6 opacity-0">
              I specialize in React, Next.js, and modern CSS frameworks like Tailwind CSS. 
              I believe in writing clean, maintainable code and creating seamless user experiences 
              that delight users and help businesses achieve their goals.
            </p>

            <p className="about-paragraph text-accent mb-6 opacity-0">
              When I'm not coding, you can find me exploring new design trends, 
              contributing to open-source projects, or sharing my knowledge through blogging.
              I'm always eager to learn and grow, and I love collaborating with others to create amazing digital experiences.
            </p>

            {/* Resume Download Button */}
            <a
              href="/resume.pdf"  // Place your resume.pdf in the public folder
              ref={resumeBtnRef}
              download
              className="inline-block mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary  hover:text-primary transition-colors duration-300 opacity-0"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
