'use client';

import { useRef, useEffect, FormEvent, useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import emailjs from 'emailjs-com';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
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

    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);

        await emailjs.send(
          'YOUR_SERVICE_ID',       // Replace with your EmailJS Service ID
          'YOUR_TEMPLATE_ID',      // Replace with your EmailJS Template ID
          {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
          },
          'YOUR_PUBLIC_KEY'        // Replace with your EmailJS Public Key
        );

        setSubmitSuccess(true);
        formRef.current.reset();
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 5000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20  bg-secondary rounded-2xl shadow-lg">
      <div className="container mx-auto  px-6 lg:px-12">
        <SectionTitle title="Get In Touch" alignment="center" />
        <div className="max-w-lg mx-auto mt-12">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {['name', 'email', 'subject', 'message'].map((field) => (
              <div className="contact-element " key={field}>
                <label htmlFor={field} className="block text-primary font-semibold mb-2">{`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}</label>
                {field === 'message' ? (
                  <textarea id={field} name={field} rows={5} required className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none" placeholder={`Enter your ${field}...`}></textarea>
                ) : (
                  <input type={field === 'email' ? 'email' : 'text'} id={field} name={field} required className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none" placeholder={`Enter your ${field}...`} />
                )}
              </div>
            ))}

            <div className="contact-element opacity-0">
              <Button type="submit" disabled={isSubmitting} className="w-full text-white bg-primary hover:bg-secondary transition-colors duration-300">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              {submitSuccess && (
                <p className="text-green-600 mt-4 text-center">Your message has been sent successfully! I will get back to you soon.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
