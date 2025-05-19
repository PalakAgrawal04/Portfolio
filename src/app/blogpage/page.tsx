'use client';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

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

// Background decorative elements
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

// Blog Card Component with hover effects
const BlogCard = ({ title, snippet, image, link, date, readTime, category }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    
    // Subtle hover animation setup
    const onMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      gsap.to(card, {
        rotationY: (x - 0.5) * 5, // subtle rotation based on mouse position
        rotationX: (y - 0.5) * -5,
        ease: "power2.out",
        duration: 0.5,
        transformPerspective: 1000,
        transformOrigin: "center"
      });
    };
    
    const onMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        ease: "power3.out",
        duration: 0.5
      });
    };
    
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
    >
      {/* Image container with overlay effect on hover */}
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={image} 
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          width={400}
          height={225}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        {/* Category tag */}
        <div className="absolute top-4 right-4 bg-accent text-white text-xs font-medium px-2 py-1 rounded">
          {category}
        </div>
      </div>
      
      {/* Content section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-xs text-primary/60 mb-2">
          <span>{date}</span>
          <span>{readTime} min read</span>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-primary/80 mb-4 text-sm flex-grow">
          {snippet}
        </p>
        
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors duration-200 mt-auto"
        >
          Read More
          <svg 
            className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

// Featured Blog Component
const FeaturedBlog = ({ title, snippet, image, link, date, readTime, category }) => {
  const featuredRef = useRef(null);
  
  useEffect(() => {
    const featured = featuredRef.current;
    
    const onMouseMove = (e) => {
      const { left, top, width, height } = featured.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      // Move the image slightly based on mouse position
      const imgElement = featured.querySelector('.featured-img');
      if (imgElement) {
        gsap.to(imgElement, {
          x: (x - 0.5) * 20,
          y: (y - 0.5) * 20,
          ease: "power2.out",
          duration: 0.5
        });
      }
    };
    
    const onMouseLeave = () => {
      const imgElement = featured.querySelector('.featured-img');
      if (imgElement) {
        gsap.to(imgElement, {
          x: 0,
          y: 0,
          ease: "power3.out",
          duration: 0.5
        });
      }
    };
    
    featured.addEventListener('mousemove', onMouseMove);
    featured.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
      featured.removeEventListener('mousemove', onMouseMove);
      featured.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);
  
  return (
    <div 
      ref={featuredRef}
      className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 grid md:grid-cols-2 mb-12"
    >
      {/* Image container with parallax effect */}
      <div className="relative h-64 md:h-auto overflow-hidden">
        <Image 
          src={image} 
          alt={title}
          className="featured-img object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          width={600}
          height={400}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        {/* Featured tag */}
        <div className="absolute top-4 left-4 bg-primary text-white text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full">
          Featured
        </div>
        
        {/* Category tag */}
        <div className="absolute top-4 right-4 bg-accent text-white text-xs font-medium px-2 py-1 rounded">
          {category}
        </div>
      </div>
      
      {/* Content section */}
      <div className="p-6 md:p-8 flex flex-col justify-center">
        <div className="flex justify-between items-center text-sm text-primary/60 mb-3">
          <span>{date}</span>
          <span>{readTime} min read</span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
          {title}
        </h2>
        
        <p className="text-primary/80 mb-6">
          {snippet}
        </p>
        
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary font-medium group-hover:text-accent transition-colors duration-200"
        >
          Read Full Article
          <svg 
            className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

// Filter component
const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button 
        onClick={() => setActiveCategory('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          activeCategory === 'all' 
            ? 'bg-primary text-white shadow-md shadow-primary/20' 
            : 'bg-primary/10 text-primary hover:bg-primary/20'
        }`}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button 
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category 
              ? 'bg-accent text-white shadow-md shadow-accent/20' 
              : 'bg-accent/10 text-accent hover:bg-accent/20'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

// Search component
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full py-3 px-4 pl-12 rounded-lg bg-white shadow-md focus:ring-2 focus:ring-accent/50 focus:outline-none transition-all duration-300"
      />
      <svg 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/50" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" 
          clipRule="evenodd" 
        />
      </svg>
    </div>
  );
};

export default function BlogPage() {
  const pageRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample blog data - replace with your actual data
  const blogPosts = [
    {
      id: 1,
      title: "Front-End Devs vs. AI: Do We Still Matter?",
      snippet: "Is AI coming for front-end developers' jobs? As someone who's been in the trenches of CSS and JavaScript, I've gone from panic to partnership with AI tools. In this article, I share my personal journey with AI in front-end development, explore what AI can and cannot do, and offer practical advice on how to stay relevant in this rapidly evolving landscape. Spoiler alert: We're not being replaced—we're being upgraded.",
      image: "/images/blog1.jpeg",
      link: "https://medium.com/@palaka2805/front-end-devs-vs-ai-do-we-still-matter-e9fd1dfb3ee8",
      date: "May 20, 2025",
      readTime: 5,
      category: "Development"
    },
    // {
    //   id: 2,
    //   title: "Color Psychology in UX Design",
    //   snippet: "Discover how color choices affect user perception and behavior, and how to strategically use color to enhance your website's user experience.",
    //   image: "/images/blog/color-psychology.jpg",
    //   link: "https://medium.com/your-username/color-psychology-ux",
    //   date: "March 18, 2025",
    //   readTime: 9,
    //   category: "Design"
    // },
    // {
    //   id: 3,
    //   title: "NextJS vs Gatsby: Choosing the Right React Framework",
    //   snippet: "A detailed comparison of two popular React frameworks, examining their performance, features, learning curve, and ideal project scenarios.",
    //   image: "/images/blog/react-frameworks.jpg",
    //   link: "https://medium.com/your-username/nextjs-gatsby-comparison",
    //   date: "March 5, 2025",
    //   readTime: 12,
    //   category: "Development"
    // }
  ];
  
  // Extract unique categories from blog posts
  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  // Filter posts based on active category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.snippet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Get featured post (first post or filtered first post)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  // Regular posts (excluding featured post)
  const regularPosts = filteredPosts.length > 0 ? filteredPosts.slice(1) : [];
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for page elements
      gsap.fromTo('.page-header', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
      
      gsap.fromTo('.header-underline',
        { width: '0%' },
        { width: '100%', duration: 0.6, ease: 'power3.out', delay: 0.5 }
      );
      
      gsap.fromTo('.page-subtitle',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.7 }
      );
      
      // Animate search and filter with slight delay
      gsap.fromTo('.search-filter-container',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.9 }
      );
      
      // Animate featured post
      gsap.fromTo('.featured-blog',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.0 }
      );
      
      // Animate blog cards with stagger
      gsap.fromTo('.blog-card',
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.15, 
          ease: 'back.out(1.2)',
          delay: 1.2
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);
  
  return (
    <div ref={pageRef} className="relative min-h-screen bg-secondary pt-24 pb-16">
      {/* Animated background elements */}
      <AnimatedBlob />
      <BackgroundDecorator />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        {/* Page header */}
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-0.5 w-8 bg-primary"></div>
            <span className="text-primary/80 font-medium tracking-[0.25em] text-sm">MY THOUGHTS</span>
          </div>
          
          <h1 className="page-header font-serif font-bold text-5xl md:text-6xl lg:text-7xl text-primary leading-tight mb-4">
            Blog
            <span className="relative">
              <span className="header-underline absolute bottom-2 left-0 h-1 bg-accent/40 w-full"></span>
            </span>
          </h1>
          
          <p className="page-subtitle text-primary/80 text-lg max-w-2xl leading-relaxed">
            Sharing my insights, experiences, and knowledge about web development, design trends, 
            and creative processes that shape the digital world.
          </p>
        </div>
        
        {/* Search and filter section */}
        <div className="search-filter-container mb-12">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
          />
        </div>
        
        {/* Featured blog post */}
        {featuredPost && (
          <div className="featured-blog mb-16">
            <FeaturedBlog 
              title={featuredPost.title}
              snippet={featuredPost.snippet}
              image={featuredPost.image}
              link={featuredPost.link}
              date={featuredPost.date}
              readTime={featuredPost.readTime}
              category={featuredPost.category}
            />
          </div>
        )}
        
        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.length > 0 ? (
            regularPosts.map((post) => (
              <div key={post.id} className="blog-card">
                <BlogCard 
                  title={post.title}
                  snippet={post.snippet}
                  image={post.image}
                  link={post.link}
                  date={post.date}
                  readTime={post.readTime}
                  category={post.category}
                />
              </div>
            ))
          ) : (
            searchQuery || activeCategory !== 'all' ? (
              <div className="col-span-full py-16 text-center">
                <div className="text-primary/60 text-2xl mb-4">No matching articles found</div>
                <p className="text-primary/80 mb-6">
                  Try adjusting your search or filter to find what you're looking for
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-md hover:translate-y-[-2px] transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  Reset Filters
                </Button>
              </div>
            ) : null
          )}
        </div>
        
        {/* Newsletter subscription section */}
        <div className="mt-20 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 bg-gradient-to-r from-primary/5 to-accent/5">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                Stay Updated
              </h2>
              <p className="text-primary/80 mb-6">
              Follow me on Medium for the latest blog updates!
              </p>
            </div>
          </div>
        </div>
        
        {/* Back to top button */}
        <div className="flex justify-center mt-16">
          <button 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
            className="flex items-center space-x-2 text-primary hover:text-accent transition-colors duration-300 group"
          >
            <svg 
              className="w-5 h-5 transform rotate-180 group-hover:-translate-y-1 transition-transform duration-300" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="font-medium">Back to Top</span>
          </button>
        </div>
      </div>
    </div>
  );
}