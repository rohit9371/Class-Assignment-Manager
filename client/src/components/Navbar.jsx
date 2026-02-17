import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaUserTie, FaUser } from "react-icons/fa";
import logo from '../assets/favicon.png'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {

  const navigate=useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "#home", id: "" },
    { name: "About Us", href: "#about", id: "about" },
    { name: "Contact Us", href: "#contact", id: "contact-us"},
  
  ];

  const handleNavClick = (id) => {
  
      setActiveSection(id);
      setIsOpen(false);
    const element = document.getElementById(id);
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
   
    navigate(`/${id}`);
    
    
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 text-lg ${
      scrolled ? "bg-white/95 backdrop-blur-sm shadow-lg dark:bg-dark.card/95" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer">
            <img
              className="h-10 w-auto hover:opacity-80 transition-opacity"
              src={logo}
              alt="Logo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = {logo};
              }}
            />
          </div>

          <div className="hidden md:flex items-center space-x-8 text-lg">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={` font-body hover:text-primary relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                  activeSection === item.id
                    ? "text-primary after:w-full"
                    : "text-accent after:w-0 hover:after:w-full"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 cursor-pointer">
            <button onClick={() => navigate('/login')} className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-200 hover:shadow-md">
              <FaUserTie className="h-4 w-4" />
              <span>Teacher Login</span>
            </button>
            <button onClick={() => navigate('/login')} className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-md hover:scale-105">
              <FaUser className="h-4 w-4" />
              <span>Student Login</span>
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className=" inline-flex items-center justify-center p-2 rounded-full text-accent hover:text-primary hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6 transform rotate-180 transition-transform duration-200" />
              ) : (
                <FaBars className="block h-6 w-6 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-x-60"
            : "opacity-0 -translate-x-full pointer-events-none"
        } fixed inset-0 z-50 bg-background/95 backdrop-blur-sm dark:bg-dark.background/95`}
      >
        <div className="pt-24 pb-6 px-6 space-y-6">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-1/2 text-left px-6 py-3 text-body font-body rounded-full transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-primary text-primary-foreground transform scale-105"
                  : "text-accent hover:bg-secondary/80 hover:scale-102"
              }`}
            >
              {item.name}
            </button>
          ))}
          <div className="space-y-4 pt-6">
            <button className="w-full flex items-center space-x-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-all duration-200 hover:shadow-md">
              <FaUserTie className="h-4 w-4" />
              <span>Admin Login</span>
            </button>
            <button className="w-full flex items-center space-x-2 px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 hover:shadow-md">
              <FaUser className="h-4 w-4" />
              <span>Student Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;