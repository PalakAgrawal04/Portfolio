'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Star, Globe, Zap } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string;
}

export default function ProjectCard({
  title = "Amazing Project",
  description = "This is an innovative project with cutting-edge features and beautiful design elements.",
  tags = ["React", "Animation", "Design"],
  imageUrl = "/api/placeholder/600/400",
  projectUrl = "#",
}: ProjectCardProps) {
  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  
  // Track mouse position for the glow effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;
    if (!card || !content) return;

    // Configure animations
    const setupAnimations = () => {
      // Initial state
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
    };

    // Handle 3D rotation effect
    const handleMove = (e) => {
      if (!isHovered) return;
      const rect = card.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const rotateY = ((mouseX - centerX) / centerX) * 10;
      const rotateX = -((mouseY - centerY) / centerY) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    // Reset card position
    const handleMouseLeave = () => {
      setIsHovered(false);
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    };

    // Set up event listeners
    setupAnimations();
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', () => setIsHovered(true));

    return () => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', () => setIsHovered(true));
    };
  }, [isHovered]);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      window.open(projectUrl, '_blank');
      setIsClicked(false);
    }, 800);
  };

  return (
    <div className="p-4 relative">
      {/* Card container with 3D effect */}
      <div
        ref={cardRef}
        className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
          isClicked ? "scale-95" : "scale-100"
        }`}
        style={{
          backgroundColor: "#ffff",
          boxShadow: isHovered 
            ? "0 20px 40px rgba(0,0,0,0.15), 0 0 20px rgba(146, 95, 45, 0.3)" 
            : "0 10px 30px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          border: "1px solid #e8dcc9"
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Animated glow effect */}
        {isHovered && (
          <div 
            className="absolute w-40 h-40 rounded-full blur-3xl"
            style={{
              background: "radial-gradient(circle, rgba(146, 95, 45, 0.5) 0%, rgba(146, 95, 45, 0) 70%)",
              top: mousePosition.y - 80,
              left: mousePosition.x - 80,
              pointerEvents: "none",
              opacity: 0.6,
            }}
          />
        )}
        
        {/* Image container with parallax effect */}
        <div className="relative h-48 overflow-hidden">
          <div 
            className="absolute inset-0 transition-transform duration-700 ease-out"
            style={{ 
              transform: isHovered ? 'scale(1.1) translateY(-5px)' : 'scale(1) translateY(0)'
            }}
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Overlay with animating stripes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end">
            <div className="w-full h-16 overflow-hidden relative">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className={`absolute h-1 bg-primary left-0 right-0 opacity-30 transition-transform duration-700`}
                  style={{ 
                    top: i * 10 + 'px',
                    transform: `translateX(${isHovered ? '0%' : '-100%'})`,
                    transitionDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Floating tags with staggered animation */}
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {tags.map((tag, index) => (
              <div
                key={tag}
                className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all duration-500"
                style={{
                  transform: isHovered ? 'translateX(0)' : 'translateX(100px)',
                  opacity: isHovered ? 1 : 0,
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                {index === 0 && <Globe size={12} />}
                {index === 1 && <Zap size={12} />}
                {index === 2 && <Star size={12} />}
                {tag}
              </div>
            ))}
          </div>
        </div>
        
        {/* Content section */}
        <div 
          ref={contentRef}
          className="p-6 relative z-10"
        >
          <h3 
            className="text-xl font-bold mb-3 text-primary transition-all duration-500"
            style={{
              transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
              textShadow: isHovered ? '0 0 10px rgba(146, 95, 45, 0.3)' : 'none'
            }}
          >
            {title}
          </h3>
          
          <p 
            className="text-amber-900/80 mb-6 transition-all duration-500"
            style={{
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              maxHeight: '80px',
              overflow: 'hidden'
            }}
          >
            {description}
          </p>
          
          {/* Interactive button */}
          <button
            onClick={handleClick}
            className={`relative bg-primary text-white px-6 py-2 rounded-lg font-medium group overflow-hidden transition-all duration-300 ${
              isClicked ? "bg-primary-600 scale-90" : ""
            }`}
          >
            <div className="relative z-10 flex items-center gap-2">
              <span>Explore</span>
              <ChevronRight 
                size={18} 
                className={`transition-transform duration-300 ${
                  isHovered ? "translate-x-1" : ""
                }`}
              />
            </div>
            
            {/* Button background animation */}
            <div 
              className="absolute inset-0 transition-transform duration-500 ease-out bg-primary"
              style={{
                transform: isHovered ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.5s ease'
              }}
            />
          </button>
        </div>
        
        {/* Border animation */}
        {isHovered && (
          <>
            <div className="absolute inset-0 border border-primary/50 rounded-xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-amber-600 animate-pulse" />
          </>
        )}
      </div>
    </div>
  );
}