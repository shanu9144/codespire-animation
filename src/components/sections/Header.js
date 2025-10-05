"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import Wrapper from "../ui/Wrapper";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const controlHeaderVisibility = () => {
      const currentScrollY = window.scrollY;

      // Show header when at the top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeaderVisibility);
    return () => window.removeEventListener("scroll", controlHeaderVisibility);
  }, [lastScrollY]);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Our Team", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      initial={{ y: 0 }}
      animate={{
        y: isVisible ? 0 : "-100%",
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <Wrapper>
        <nav className="flex items-center px-6 lg:px-8 py-4">
          {/* Header Left - Logo and Brand */}
          <div className="header-left">
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
                data-magnetic="true"
                data-magnetic-strength="0.3"
                data-magnetic-radius="80"
              >
                <Image
                  src="/assets/codespirelogo.png"
                  alt="CodeSpire Solutions"
                  width={140}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Header Center - Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-end pr-4 lg:pr-6">
            <ul className="flex items-center gap-6 lg:gap-8 text-gray-700 font-medium">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Header Right - CTA Button and Mobile Menu */}
          <div className="header-right ml-2 lg:ml-4">
            {/* Desktop CTA Button */}
            <div className="desktop-only">
              <Button 
                variant="primary" 
                size="md"
                className="group"
              >
                <span className="flex items-center gap-2">
                  Schedule a Demo
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="mobile-nav p-3 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X size={24} className="transition-transform duration-300 group-hover:scale-110" />
                ) : (
                  <Menu size={24} className="transition-transform duration-300 group-hover:scale-110" />
                )}
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-6 space-y-2 border-t border-gray-100">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-6 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 group font-medium"
                    >
                      <span className="flex items-center justify-between">
                        {item.label}
                        <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.1, duration: 0.3 }}
                  className="px-6 pt-4"
                >
                  <Button 
                    variant="primary" 
                    size="md" 
                    className="w-full group"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Schedule a Demo
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    </motion.header>
  );
};

export default Header;
