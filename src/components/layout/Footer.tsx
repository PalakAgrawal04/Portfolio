export default function Footer() {
    return (
      <footer className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-primary font-serif text-xl font-bold">Palak</p>
              <p className="text-accent mt-2">Web Developer & Designer</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/yourusername" className="text-accent hover:text-primary transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/in/yourusername" className="text-accent hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="https://twitter.com/yourusername" className="text-accent hover:text-primary transition-colors">
                Twitter
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary/20">
            <p className="text-center text-accent text-sm">
              © {new Date().getFullYear()} Palak. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  }
  