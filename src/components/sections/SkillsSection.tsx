'use client';

import { useRef, useEffect } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Sample skills data
const skills = [
  { name: 'Web Development', percentage: 90 },
  { name: 'UI/UX Design', percentage: 85 },
  { name: 'React.js', percentage: 95 },
  { name: 'Next.js', percentage: 90 },
  { name: 'Tailwind CSS', percentage: 95 },
  { name: 'TypeScript', percentage: 85 },
  { name: 'GSAP Animation', percentage: 80 },
  { name: 'Responsive Design', percentage: 95 },
];

// Areas of expertise
const expertiseAreas = [
  { title: 'UI/UX Design', description: 'Creating intuitive and beautiful user interfaces' },
  { title: 'Web Development', description: 'Building responsive and performant web applications' },
  { title: 'Animation Design', description: 'Adding life to websites with smooth animations' },
  { title: 'App for Interest', description: 'Developing specialized applications for specific interests' },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate skill bars
      gsap.fromTo(
        '.skill-progress',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 75%',
          },
        }
      );
      
      // Animate expertise areas
      gsap.fromTo(
        '.expertise-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: expertiseRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Skills & Expertise" 
          subtitle="An overview of my technical skills and areas of expertise."
        />
        
        <div className="mt-12 grid md:grid-cols-2 gap-12">
          <div ref={skillsRef}>
            <h3 className="text-xl font-serif text-primary font-semibold mb-6">Technical Skills</h3>
            
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-accent font-medium">{skill.name}</span>
                    <span className="text-primary font-medium">{skill.percentage}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="skill-progress h-full bg-primary rounded-full origin-left"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div ref={expertiseRef}>
            <h3 className="text-xl font-serif text-primary font-semibold mb-6">Areas of Expertise</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {expertiseAreas.map((area, index) => (
                <div 
                  key={index}
                  className="expertise-card p-5 bg-secondary rounded-lg border-l-4 border-primary shadow-sm opacity-0"
                >
                  <h4 className="text-lg font-serif text-primary font-medium mb-2">{area.title}</h4>
                  <p className="text-accent text-sm">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
