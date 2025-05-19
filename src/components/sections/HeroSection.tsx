'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';
import Image from 'next/image';

// SVG Blob Animation Component
const AnimatedBlob = () => {
  return (
    <div className="absolute top-0 right-0 w-3/4 h-full -z-10 overflow-hidden">
      <svg viewBox="0 0 800 500" preserveAspectRatio="none" className="h-full w-full">
        <path 
          d="M0,100 C150,200 350,0 500,100 C650,200 700,300 800,200 L800,500 L0,500 Z" 
          className="fill-primary/5 animate-morph"
        />
        <path 
          d="M0,100 C200,150 300,50 500,100 C700,150 750,300 800,200 L800,500 L0,500 Z" 
          className="fill-accent/5 animate-morph-delay"
        />
      </svg>
    </div>
  );
};

// Animated lines/shapes decorator
const BackgroundDecorator = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {/* Top right decorative elements */}
        <div className="absolute top-10 right-20">
          <div className="w-12 h-12 border border-accent/30 rounded-full animate-pulse-slow"></div>
        </div>
        
        {/* Bottom left decorative elements */}
        <div className="absolute bottom-20 left-10">
          <div className="w-24 h-1 bg-primary/20 rotate-45 animate-float-slow"></div>
          <div className="w-24 h-1 bg-primary/20 rotate-45 translate-y-6 translate-x-4"></div>
          <div className="w-24 h-1 bg-primary/20 rotate-45 translate-y-12 translate-x-8"></div>
        </div>
        
        {/* Middle left decorative dot pattern */}
        <div className="absolute top-1/3 left-16 grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-accent/40"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function HeroSection() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const illustrationRef = useRef(null);
  const illustrationContainerRef = useRef(null);
  
  // State for bouncing animation
  const [isHovering, setIsHovering] = useState(false);
  const bounceAnimation = useRef(null);
  
  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovering(true);
    // Create bounce animation on hover
    if (illustrationContainerRef.current) {
      // Clear any existing animation
      if (bounceAnimation.current) {
        bounceAnimation.current.kill();
      }
      
      // Create a new bounce animation
      bounceAnimation.current = gsap.timeline({ repeat: -1, yoyo: true })
        .to(illustrationContainerRef.current, {
          y: "-20px",
          duration: 0.8,
          ease: "power2.inOut"
        })
        .to(illustrationContainerRef.current, {
          y: "0px",
          duration: 0.8,
          ease: "power2.inOut"
        });
    }
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Stop the bouncing animation
    if (bounceAnimation.current) {
      bounceAnimation.current.kill();
      // Return to original position with a smooth animation
      gsap.to(illustrationContainerRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.out"
      });
    }
  };
  
  // Empty function as we don't need to track mouse movement for bouncing
  const handleMouseMove = () => {};
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial bounce animation on load
      gsap.fromTo(illustrationContainerRef.current, 
        { y: -10 },
        { y: 10, duration: 1.5, ease: "power1.inOut", repeat: -1, yoyo: true }
      );
      
      // Timeline for text animation
      const tl = gsap.timeline();
      
      // Letter-by-letter animation for the name
      gsap.set('.name-letter', { 
        opacity: 0,
        y: 40 
      });
      
      tl.fromTo(
        '.hero-greeting',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      )
      .to('.name-letter', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      }, '-=0.4')
      .fromTo(
        '.hero-title-underline',
        { width: '0%' },
        { width: '100%', duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        '.hero-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo(
        '.highlight-word',
        { color: 'rgba(var(--color-primary-rgb), 0.8)' },
        { 
          color: 'rgba(var(--color-accent-rgb), 1)', 
          duration: 0.4,
          stagger: 0.1,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: 1
        },
        '-=0.2'
      )
      .fromTo(
        '.hero-action',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero-illustration',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
        '-=0.7'
      )
      .fromTo(
        '.decorator',
        { opacity: 0 },
        { opacity: 1, duration: 0.7, stagger: 0.1 },
        '-=0.5'
      );
      
      // Slight parallax effect on scroll
      gsap.to('.parallax-bg', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Function to split text into individual letter spans
  const renderLetterSpans = (text) => {
    return text.split('').map((letter, index) => (
      <span key={index} className="name-letter inline-block">
        {letter}
      </span>
    ));
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-secondary overflow-hidden"
    >
      {/* Animated blob background */}
      <AnimatedBlob />
      
      {/* Background decorative elements */}
      <BackgroundDecorator />
      
      {/* Main content container with reduced padding for less whitespace */}
      <div className="container mx-auto px-14 py-12 z-10">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          {/* Left text column - spans 5 columns on desktop */}
          <div ref={textRef} className="md:col-span-5 space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="h-0.5 w-8 bg-primary"></div>
              <span className="text-primary/80 font-medium tracking-[0.25em] text-sm">PORTFOLIO</span>
            </div>
            
            <div className="space-y-3 ">
              <h1 className="font-serif font-bold text-6xl md:text-6xl lg:text-8xl text-primary leading-tight">
                <span className="hero-greeting block mb-1">HELLO,</span>
                <span className="relative inline-block">
                  I'M <span className="">{renderLetterSpans('PALAK')}!</span>
                </span>
              </h1>
              
              <p className="hero-subtitle text-primary/80 text-lg max-w-lg leading-relaxed font-light">
                I am a <span className="highlight-word font-medium">web developer</span> and <span className="highlight-word font-medium">designer</span> based in <span className="font-medium tracking-wide">INDIA</span>, 
                creating beautiful, functional websites and delightful digital experiences.
              </p>
            </div>
            
            <div className="hero-action mt-8 flex space-x-4 items-center pt-4">
              <Button href="#projects" 
                className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-md flex items-center space-x-2 hover:translate-y-[-2px] transition-all duration-300 shadow-lg shadow-primary/20 font-medium tracking-wider">
                <span>EXPLORE</span>
                <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
              
              <a href="#contact" className="group flex items-center text-primary hover:text-accent transition-colors duration-200 font-medium tracking-wide">
                <span>Contact</span>
                <svg className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            
            {/* Social links with improved hover effects */}
            <div className="flex space-x-5 pt-2">
              <a href="https://instagram.com/p_a_l_a_k.28" target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram Profile" className="text-primary/70 hover:text-accent transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href=" https://x.com/Palak0420" target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter Profile" className="text-primary/70 hover:text-accent transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://github.com/PalakAgrawal04" target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub Profile" className="text-primary/70 hover:text-accent transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/palak-agrawal-a19b3b281" target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn Profile" className="text-primary/70 hover:text-accent transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Right illustration column - spans 7 columns for more visual impact */}
          <div ref={illustrationRef} className="hero-illustration md:col-span-7 relative">
            {/* Bounce Animation Container */}
            <div 
              ref={illustrationContainerRef}
              className="relative h-[70vh] md:h-[90vh] cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Main illustration container */}
              <div 
                className="relative h-full w-full transition-all duration-300"
              >
                {/* Add animated decorative elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 border-2 border-accent/20 rounded-full animate-spin-slow opacity-50"></div>
                <div className="absolute top-1/4 -right-6 w-12 h-12 bg-primary/10 rounded-full animate-pulse-slow"></div>
                
                {/* Actual illustration */}
                <div className="relative h-full w-full">
                  <Image
                    src="/images/hero-illustration.png"
                    alt="Palak - Web Developer"
                    fill
                    className="object-contain z-10"
                    priority
                  />
                </div>
                
                {/* Abstract shape behind illustration */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-accent/5 blur-3xl"
                ></div>
                
                {/* Dots pattern */}
                <div 
                  className="absolute bottom-10 right-10 grid grid-cols-4 gap-2 decorator"
                >
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/30"></div>
                  ))}
                </div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-accent/20 rounded-full animate-float-slow"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float"></div>
                  <div className="absolute top-2/3 left-1/3 w-4 h-4 border border-primary/20 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Shadow effect that moves with bounce */}
              <div 
                className={`absolute rounded-full -bottom-4 left-1/2 -translate-x-1/2 w-1/2 h-4 bg-black/10 blur-md transition-all duration-300 ${isHovering ? 'opacity-50 scale-90' : 'opacity-30'}`}
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator with improved animation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-primary/60 animate-bounce-slow hidden md:flex">
        <span className="text-xs tracking-[0.3em] mb-2 font-light">SCROLL</span>
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
}