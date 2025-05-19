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
  { title: 'Frontend Developer Intern', company: 'Hey Buddy', duration: 'March 2024 - September 2024', description: 'Developed an admin dashboard using ReactJS, integrated Redux, and ensured responsive performance.' },
  { title: '1st Rank - PISB Internal Hackathon', company: 'PICT IEEE Student Branch', duration: 'July 2024', description: 'Built a responsive tourism website for India Odyssey using ReactJS.' },
];

export default function SkillsAndExperienceSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo('.skill-tree-branch',{ x: -50, opacity: 0 },{ x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },});

      gsap.fromTo('.experience-card',{ y: 50, opacity: 0 },{ y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },});
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-12">
        <SectionTitle title="Experience & Skills" subtitle="Explore my skills and professional journey." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="space-y-6">
            {experienceList.map((exp, index) => (
              <div key={index} className="experience-card bg-white p-6 rounded-xl shadow-md border border-primary/20 transition-transform duration-300 hover:scale-105">
                <h4 className="text-lg font-bold text-primary">{exp.title}</h4>
                <p className="text-accent font-medium">{exp.company} - {exp.duration}</p>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(skillsTree).map(([category, skills], index) => (
              <div key={index} className="skill-tree-branch bg-gradient-to-r from-white  rounded-xl p-6 shadow-md border border-primary/20 transition-transform duration-300 hover:scale-105">
                <h3 className="text-2xl font-semibold text-primary mb-4">{category}</h3>
                <div className="flex flex-wrap gap-4">
                  {skills.map((skill, i) => (
                    <div key={i} className="bg-primary text-white py-2 px-4 rounded-full shadow-md hover:bg-secondary hover:text-primary transition-colors duration-300">{skill}</div>
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
