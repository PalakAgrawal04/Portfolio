'use client';
import { useRef, useEffect } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const skillsTree = {
  Frontend: ['React.js', 'Next.js', 'Tailwind CSS', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
  Backend: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
  Animation: ['GSAP', 'Framer Motion'],
  Design: ['UI/UX Design', 'Responsive Design', 'Figma'],
  Tools: ['Git & GitHub', 'VS Code'],
};

const experienceList = [
  { 
    title: 'Frontend Developer Intern', 
    company: 'Hey Buddy', 
    duration: 'March 2024 - September 2024', 
    description: 'Developed an admin dashboard using ReactJS, integrated Redux, and ensured responsive performance.' 
  },
];

export default function SkillsAndExperienceSection() {
  const sectionRef = useRef(null);
  const experienceRef = useRef(null);
  const skillsRef = useRef(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Title reveal animation
      gsap.fromTo(
        '.section-title h2, .section-title p',
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
          }
        }
      );

      // Staggered reveal for skill categories
      gsap.fromTo(
        '.skill-tree-branch',
        { x: -30, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 85%',
          }
        }
      );
      
      // Animated skill tags appearance with stagger
      gsap.fromTo(
        '.skill-tag',
        { scale: 0.8, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.4, 
          stagger: 0.05, 
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
          }
        }
      );
      
      // Experience cards slide up animation
      gsap.fromTo(
        '.experience-card',
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.9, 
          stagger: 0.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: experienceRef.current,
            start: 'top 85%',
          }
        }
      );
      
      // Subtle highlight animation for experience titles
      gsap.to('.experience-title', {
        backgroundPosition: '0 0',
        duration: 1.5,
        scrollTrigger: {
          trigger: experienceRef.current,
          start: 'top 80%',
        }
      });
      
      // Hover animations
      const skillBranches = document.querySelectorAll('.skill-tree-branch');
      skillBranches.forEach(branch => {
        branch.addEventListener('mouseenter', () => {
          gsap.to(branch, { 
            scale: 1.03, 
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            duration: 0.3 
          });
        });
        branch.addEventListener('mouseleave', () => {
          gsap.to(branch, { 
            scale: 1, 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            duration: 0.3 
          });
        });
      });
      
      const expCards = document.querySelectorAll('.experience-card');
      expCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { 
            y: -5, 
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            duration: 0.3 
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { 
            y: 0, 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            duration: 0.3 
          });
        });
      });
      
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        <div className="section-title">
          <SectionTitle 
            title="Experience & Skills" 
            subtitle="Explore my skills and professional journey." 
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          <div ref={experienceRef} className="space-y-6">
            {experienceList.map((exp, index) => (
              <div 
                key={index} 
                className="experience-card bg-white p-6 rounded-xl shadow-md border border-primary/20"
              >
                <h4 className="experience-title text-lg font-bold text-primary bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 bg-[length:200%_100%] bg-[position:100%_0]">
                  {exp.title}
                </h4>
                <p className="text-accent font-medium">{exp.company} - {exp.duration}</p>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
          
          <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(skillsTree).map(([category, skills], index) => (
              <div 
                key={index} 
                className="skill-tree-branch bg-gradient-to-r from-white rounded-xl p-6 shadow-md border border-primary/20"
              >
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  <span className="inline-block">{category}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, i) => (
                    <div 
                      key={i} 
                      className="skill-tag bg-primary text-white py-2 px-4 rounded-full shadow-md hover:bg-secondary hover:text-primary transition-colors duration-300"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}