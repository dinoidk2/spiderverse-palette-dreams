
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Hobbies', path: '/hobbies' },
    { name: 'Contact', path: '/contact' }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`hidden md:flex fixed top-0 left-0 w-full z-40 px-8 py-4 justify-center transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="flex space-x-8">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const activeBg = (() => {
              switch(link.name) {
                case 'Home': return 'bg-spiderverse-purple text-white';
                case 'Profile': return 'bg-spiderverse-blue text-white';
                case 'Hobbies': return 'bg-spiderverse-yellow text-black';
                case 'Contact': return 'bg-spiderverse-pink text-white';
                default: return 'bg-black text-white';
              }
            })();
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${isActive ? activeBg : 'hover:text-spiderverse-purple'}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      <div className="block md:hidden">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed top-4 right-4 z-50 p-2 rounded-full comic-border bg-white transition-all ${isOpen ? 'rotate-90' : ''}`}
        >
          <div className="w-6 h-0.5 bg-black mb-1.5"></div>
          <div className="w-6 h-0.5 bg-black mb-1.5"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>
        
        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 z-40 bg-gradient-to-br from-spiderverse-purple via-spiderverse-blue to-spiderverse-pink backdrop-blur-md transition-all duration-500 ${
            isOpen ? 'opacity-95' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="nav-link text-white text-3xl my-4 hover:scale-125 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
