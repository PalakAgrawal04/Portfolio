'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Send, CheckCircle, Coffee, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [activeField, setActiveField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Background elements animation
      gsap.fromTo(
        '.decoration-circle',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.4,
          duration: 1.5,
          ease: 'elastic.out(1, 0.3)',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        }
      );
      
      // Heading animation
      gsap.fromTo(
        '.contact-title',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
      
      // Form elements staggered animation
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
      
      // Card animation
      gsap.fromTo(
        '.contact-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField('');
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormValues({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="py-20 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="decoration-circle absolute top-20 left-10 w-32 h-32 rounded-full bg-primary-light "></div>
      <div className="decoration-circle absolute bottom-40 right-10 w-48 h-48 rounded-full bg-primary-light "></div>
      <div className="decoration-circle absolute bottom-10 right-230 w-24 h-24 rounded-full bg-primary-light "></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Left side content */}
          <div className="lg:w-2/5">
            <h2 className="contact-title text-4xl font-bold text-primary mb-6">
              Get In Touch
            </h2>
            
            <p className="contact-element opacity-0 text-primary mb-8">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. 
              Fill out the form, and I'll get back to you soon.
            </p>
            
            <div className="contact-element opacity-0 flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center shadow-md">
                <Coffee className="text-primary" size={22} />
              </div>
              <div>
                <h3 className="font-medium text-primary">Let's chat</h3>
                <p className="text-primary-light">I'd love to hear from you</p>
              </div>
            </div>
            
            {/* Social media links */}
            {/* <div className="contact-element opacity-0 flex gap-4 mt-8">
              {['instagram', 'twitter', 'github', 'linkedin'].map((platform) => (
                <a 
                  key={platform}
                  href={`#${platform}`} 
                  className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center shadow-sm hover:bg-amber-100 hover:shadow-md transition-all duration-300"
                  aria-label={platform}
                >
                  <span className="text-amber-800 capitalize text-xs font-medium">{platform.charAt(0).toUpperCase()}</span>
                </a>
              ))}
            </div> */}
          </div>
          
          {/* Right side form */}
          <div className="lg:w-3/5">
            <div className="contact-card bg-primary-light/20 rounded-2xl shadow-lg p-8 border border-primary/40">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'name', label: 'Your Name', type: 'text' },
                    { name: 'email', label: 'Your Email', type: 'email' }
                  ].map((field) => (
                    <div className="contact-element opacity-0" key={field.name}>
                      <div className={`relative transition-all duration-300 ${activeField === field.name ? 'transform -translate-y-1' : ''}`}>
                        <label 
                          htmlFor={field.name} 
                          className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                            activeField === field.name ? 'text-primary' : 'text-primary-light'
                          }`}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formValues[field.name]}
                          onChange={handleChange}
                          onFocus={() => handleFocus(field.name)}
                          onBlur={handleBlur}
                          className="w-full p-3 rounded-lg bg-white/80 border border-primary/20 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-300"
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                        />
                        <div 
                          className={`h-0.5 bg-amber-600 scale-x-0 transition-transform duration-300 origin-left ${
                            activeField === field.name ? 'scale-x-100' : ''
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="contact-element opacity-0">
                  <div className={`relative transition-all duration-300 ${activeField === 'subject' ? 'transform -translate-y-1' : ''}`}>
                    <label 
                      htmlFor="subject" 
                      className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                        activeField === 'subject' ? 'text-primary' : 'text-primary-light'
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formValues.subject}
                      onChange={handleChange}
                      onFocus={() => handleFocus('subject')}
                      onBlur={handleBlur}
                      className="w-full p-3 rounded-lg bg-white/80 border border-primary/20 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all duration-300"
                      placeholder="What is this regarding?"
                    />
                    <div 
                      className={`h-0.5 bg-amber-600 scale-x-0 transition-transform duration-300 origin-left ${
                        activeField === 'subject' ? 'scale-x-100' : ''
                      }`}
                    ></div>
                  </div>
                </div>
                
                <div className="contact-element opacity-0">
                  <div className={`relative transition-all duration-300 ${activeField === 'message' ? 'transform -translate-y-1' : ''}`}>
                    <label 
                      htmlFor="message" 
                      className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                        activeField === 'message' ? 'text-primary' : 'text-primary-light'
                      }`}
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formValues.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      className="w-full p-3 rounded-lg bg-white/80 border border-primary/20 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none resize-none transition-all duration-300"
                      placeholder="Tell me about your project or inquiry..."
                    ></textarea>
                    <div 
                      className={`h-0.5 bg-amber-600 scale-x-0 transition-transform duration-300 origin-left ${
                        activeField === 'message' ? 'scale-x-100' : ''
                      }`}
                    ></div>
                  </div>
                </div>
                
                <div className="contact-element opacity-0">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg text-white font-medium relative overflow-hidden group transition-all duration-300 ${
                      submitSuccess ? 'bg-green-600' : 'bg-primary-dark hover:bg-primary'
                    }`}
                  >
                    <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 ease-out group-hover:w-full"></div>
                    <div className="relative flex items-center justify-center gap-2">
                      {submitSuccess ? (
                        <>
                          <CheckCircle size={18} />
                          <span>Message Sent!</span>
                        </>
                      ) : isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </button>
                  
                  {submitSuccess && (
                    <div className="mt-4 py-3 px-4 bg-green-100 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
                      <CheckCircle size={16} />
                      <span>Your message has been sent successfully! I'll get back to you soon.</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="contact-element opacity-0 mt-6 text-center">
                <p className="text-primary/60 text-sm">
                  Prefer direct email? Contact me at{' '}
                  <a href="mailto:hello@palak.dev" className="text-primary font-medium hover:underline">
                  palak@palakagrawal.in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}