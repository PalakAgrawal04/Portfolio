'use client';

import { useRef, useEffect, FormEvent, useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate form
      gsap.fromTo(
        '.contact-element',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically send the form data to your backend API
    // For this example, we'll simulate a successful submission after a delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Reset success message after a few seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Get In Touch" 
          subtitle="Interested in working together? Fill out the form below, and I'll get back to you soon."
          alignment="center"
        />
        
        <div className="max-w-lg mx-auto mt-12">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="contact-element opacity-0">
              <label htmlFor="name" className="block text-accent font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="John Doe"
              />
            </div>
            
            <div className="contact-element opacity-0">
              <label htmlFor="email" className="block text-accent font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="john@example.com"
              />
            </div>
            
            <div className="contact-element opacity-0">
              <label htmlFor="subject" className="block text-accent font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Project Inquiry"
              />
            </div>
            
            <div className="contact-element opacity-0">
              <label htmlFor="message" className="block text-accent font-medium mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            
            <div className="contact-element opacity-0">
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              
              {submitSuccess && (
                <p className="text-green-600 mt-4 text-center">
                  Your message has been sent successfully! I'll get back to you soon.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
