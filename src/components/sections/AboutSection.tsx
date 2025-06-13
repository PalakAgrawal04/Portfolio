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
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const decorativeElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Create a master timeline for coordinated animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });

      // Animate decorative elements first
      tl.fromTo(
        '.decorative-dot',
        { 
          scale: 0,
          rotation: 0,
          opacity: 0 
        },
        {
          scale: 1,
          rotation: 360,
          opacity: 0.1,
          duration: 1,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        }
      );

      // Enhanced image animation with multiple effects
      tl.fromTo(
        imageRef.current,
        { 
          x: -100, 
          opacity: 0,
          scale: 0.8,
          rotationY: -15
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=0.5'
      );

      // Image container floating animation
      gsap.to(imageContainerRef.current, {
        y: -10,
        duration: 3,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        delay: 1.5,
      });

      // Enhanced content paragraphs with typing effect
      tl.fromTo(
        '.about-paragraph',
        { 
          y: 50, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.3,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.8'
      );

      // Enhanced resume button with bounce effect
      tl.fromTo(
        resumeBtnRef.current,
        { 
          y: 40, 
          opacity: 0,
          scale: 0.8,
          rotationX: -20
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        },
        '-=0.4'
      );

      // Continuous subtle animations for engagement
      gsap.to('.about-paragraph', {
        x: 5,
        duration: 4,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
        delay: 2,
      });

      // Image hover effects (enhanced)
      const imageContainer = imageContainerRef.current;
      if (imageContainer) {
        imageContainer.addEventListener('mouseenter', () => {
          gsap.to(imageContainer, {
            scale: 1.05,
            rotationY: 5,
            duration: 0.4,
            ease: 'power2.out',
          });
          gsap.to(imageContainer.querySelector('img'), {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out',
          });
        });

        imageContainer.addEventListener('mouseleave', () => {
          gsap.to(imageContainer, {
            scale: 1,
            rotationY: 0,
            duration: 0.4,
            ease: 'power2.out',
          });
          gsap.to(imageContainer.querySelector('img'), {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
      }

      // Resume button enhanced hover effects
      const resumeBtn = resumeBtnRef.current;
      if (resumeBtn) {
        resumeBtn.addEventListener('mouseenter', () => {
          gsap.to(resumeBtn, {
            scale: 1.05,
            y: -3,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        resumeBtn.addEventListener('mouseleave', () => {
          gsap.to(resumeBtn, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }

      // Paragraph hover effects
      document.querySelectorAll('.about-paragraph').forEach((paragraph) => {
        paragraph.addEventListener('mouseenter', () => {
          gsap.to(paragraph, {
            x: 10,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        paragraph.addEventListener('mouseleave', () => {
          gsap.to(paragraph, {
            x: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });

      // Parallax effect for decorative elements
      gsap.to('.decorative-dot', {
        y: -20,
        duration: 6,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      {/* Decorative animated elements */}
      <div ref={decorativeElementsRef} className="absolute inset-0 pointer-events-none">
        <div className="decorative-dot absolute top-20 left-4 sm:left-10 w-2 h-2 bg-primary rounded-full"></div>
        <div className="decorative-dot absolute top-40 right-8 sm:right-20 w-3 h-3 bg-secondary rounded-full"></div>
        <div className="decorative-dot absolute bottom-32 left-8 sm:left-20 w-1 h-1 bg-primary rounded-full"></div>
        <div className="decorative-dot absolute bottom-20 right-4 sm:right-10 w-2 h-2 bg-secondary rounded-full"></div>
        <div className="decorative-dot absolute top-60 left-1/2 w-1 h-1 bg-primary rounded-full"></div>
        <div className="decorative-dot absolute top-80 right-1/3 w-2 h-2 bg-secondary rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <SectionTitle 
          title="About Me" 
          subtitle="Learn more about my background, skills, and passion for web development."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mt-8 sm:mt-10 md:mt-12">
          <div ref={imageRef} className="opacity-0 order-1 md:order-1">
            <div 
              ref={imageContainerRef}
              className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] mx-auto max-w-sm sm:max-w-md md:max-w-none rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              <Image 
                src="/images/about-image.jpg" 
                alt="Palak - About Me"
                fill
                className="object-cover transition-transform duration-500"
              />
              {/* Overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          <div ref={contentRef} className="relative order-2 md:order-2">
            <p className="about-paragraph text-accent mb-4 sm:mb-5 md:mb-6 opacity-0 cursor-pointer transition-colors duration-300 hover:text-primary/80 text-sm sm:text-base leading-relaxed">
              I'm a passionate web developer with expertise in front-end technologies. 
              My journey in web development started with a fascination for creating beautiful and functional websites. 
              I've been creating responsive and user-friendly websites that solve real problems.
            </p>

            <p className="about-paragraph text-accent mb-4 sm:mb-5 md:mb-6 opacity-0 cursor-pointer transition-colors duration-300 hover:text-primary/80 text-sm sm:text-base leading-relaxed">
              I specialize in React, Next.js, and modern CSS frameworks like Tailwind CSS. 
              I believe in writing clean, maintainable code and creating seamless user experiences 
              that delight users and help businesses achieve their goals.
            </p>

            <p className="about-paragraph text-accent mb-6 sm:mb-7 md:mb-6 opacity-0 cursor-pointer transition-colors duration-300 hover:text-primary/80 text-sm sm:text-base leading-relaxed">
              When I'm not coding, you can find me exploring new design trends, 
              contributing to open-source projects, or sharing my knowledge through blogging.
              I'm always eager to learn and grow, and I love collaborating with others to create amazing digital experiences.
            </p>

            {/* Resume Download Button */}
            <div className="flex justify-center md:justify-start">
              <a
                href="/resume.pdf"
                ref={resumeBtnRef}
                download
                className="inline-block mt-4 sm:mt-5 md:mt-6 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300 opacity-0 shadow-lg hover:shadow-xl cursor-pointer relative overflow-hidden group text-sm sm:text-base"
              >
                <span className="relative z-10">Download Resume</span>
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}