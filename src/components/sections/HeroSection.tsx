'use client';

import { useEffect, useRef } from 'react';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for text animation
      const tl = gsap.timeline();
      
      tl.fromTo(
        '.hero-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero-button',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        '.hero-illustration',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      );
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center py-20 md:py-0 bg-secondary"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="order-2 md:order-1">
            <h1 className="hero-title font-serif font-bold text-4xl md:text-5xl lg:text-6xl text-primary opacity-0">
              HELLO,<br />
              I&apos;M PALAK !
            </h1>
            <p className="hero-subtitle text-accent text-lg md:text-xl mt-6 max-w-md opacity-0">
              I am a web developer and designer based in INDIA, who is creating beautiful, functional websites and delightful digital experiences that engage, inspire and delight.
            </p>
            <div className="hero-button mt-8 opacity-0">
              <Button href="#projects" size="lg">
                EXPLORE
              </Button>
            </div>
          </div>
          <div 
            ref={illustrationRef}
            className="hero-illustration order-1 md:order-2 opacity-0"
          >
            {/* Replace with your actual image path */}
            <div className="relative w-full max-w-md mx-auto h-[400px]">
              <Image 
                src="/images/hero-illustration.svg" 
                alt="Palak - Web Developer"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
