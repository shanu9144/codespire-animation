"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";
import Wrapper from "../ui/Wrapper";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const hoverTimeoutRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleServiceMouseEnter = (serviceLabel) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredService(serviceLabel);
  };

  const handleServiceMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredService(null);
    }, 150); // 150ms delay before closing
  };

  const handleProductMouseEnter = (productLabel) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredProduct(productLabel);
  };

  const handleProductMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredProduct(null);
    }, 150); // 150ms delay before closing
  };

  useEffect(() => {
    const controlHeaderVisibility = () => {
      const currentScrollY = window.scrollY;

      // Show header when at the top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up - show header
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", controlHeaderVisibility);
    return () => window.removeEventListener("scroll", controlHeaderVisibility);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const services = [
    { label: "AI Pod as a Service", href: "/services#ai-pod-as-a-service" },
    { label: "Digital Engineering", href: "/services#digital-engineering" },
    { label: "Application Development and Testing", href: "/services#application-development-and-testing" },
    { label: "Data and Analytics", href: "/services#data-and-analytics" },
    { label: "Salesforce and ServiceNow", href: "/services#salesforce-and-servicenow" },
    { label: "24/7 SRE Support", href: "/services#sre-support" },
  ];

  const products = [
    { label: "Smart RFQ AI", href: "/products/smart-rfq-ai" },
    { label: "Supplier Match AI", href: "/products/supplier-match-ai" },
    { label: "Forecast AI", href: "/products/forecast-ai" },
  ];

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products", children: products },
    { label: "Services", href: "/services", children: services },
    { label: "Our Team", href: "/about" },
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
        <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          {/* Header Left - Logo and Brand */}
          <div className="header-left">
            <Link href="/" className="flex items-center cursor-pointer focus:outline-none focus-visible:outline-none hover:outline-none">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center cursor-pointer focus:outline-none focus-visible:outline-none"
                data-magnetic="true"
                data-magnetic-strength="0.3"
                data-magnetic-radius="80"
              >
                <Image
                  src="/assets/codespirelogo.png"
                  alt="CodeSpire Solutions"
                  width={140}
                  height={40}
                  className="h-6 sm:h-7 md:h-8 w-auto"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Header Center - Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-end pr-4 xl:pr-6">
            <ul className="flex items-center gap-4 lg:gap-6 xl:gap-8 text-gray-700 font-medium">
              {menuItems?.map((item) => (
                <li 
                  key={item.href} 
                  className="relative cursor-pointer"
                  onMouseEnter={() => item.children && (item.label === 'Services' ? handleServiceMouseEnter(item.label) : handleProductMouseEnter(item.label))}
                  onMouseLeave={() => item.label === 'Services' ? handleServiceMouseLeave() : handleProductMouseLeave()}
                >
                  {item.children ? (
                    <>
                      <Link href={item.href} className="hover:text-primary transition-colors inline-flex items-center cursor-pointer">
                        {item.label}
                        <svg className={`ml-1 w-4 h-4 text-gray-500 transition-all duration-300 ${(hoveredService === item.label || hoveredProduct === item.label) ? 'text-primary rotate-0' : 'rotate-180'}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd"/></svg>
                      </Link>
                      <div className={`absolute left-0 top-full mt-2 transition-all duration-200 ${(hoveredService === item.label || hoveredProduct === item.label) ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                        <div 
                          className="min-w-[240px] rounded-lg border border-gray-100 bg-white shadow-lg p-2 cursor-default"
                          onMouseEnter={() => item.label === 'Services' ? handleServiceMouseEnter(item.label) : handleProductMouseEnter(item.label)}
                          onMouseLeave={() => item.label === 'Services' ? handleServiceMouseLeave() : handleProductMouseLeave()}
                        >
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50 hover:text-primary cursor-pointer">
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link href={item.href} className="hover:text-primary transition-colors cursor-pointer">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Header Right - CTA Button and Mobile Menu */}
          <div className="header-right ml-2 sm:ml-4 lg:ml-6">
            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <Link href="/schedule-demo">
                <Button 
                  variant="primary" 
                  size="sm"
                  className="group"
                >
                  <span className="flex items-center gap-2 text-white">
                    Schedule a Demo
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 sm:p-3 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
              aria-label="Toggle menu"
            >
              <div className="relative">
                {isMenuOpen ? (
                  <X size={20} className="sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
                ) : (
                  <Menu size={20} className="sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
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
              className="md:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="py-4 sm:py-6 space-y-1 sm:space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    {item.children ? (
                      <div className="px-3 sm:px-4">
                        <button
                          onClick={() => item.label === 'Services' ? setIsServicesOpen((o) => !o) : setIsProductsOpen((o) => !o)}
                          className="w-full flex items-center justify-between px-2 py-2 sm:py-3 text-left text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 font-medium cursor-pointer text-sm sm:text-base"
                        >
                          <span>{item.label}</span>
                          <svg className={`w-4 h-4 transition-transform ${(item.label === 'Services' ? isServicesOpen : isProductsOpen) ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                        </button>
                        <AnimatePresence>
                          {(item.label === 'Services' ? isServicesOpen : isProductsOpen) && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-4">
                              {item.children.map((child) => (
                                <Link key={child.href} href={child.href} onClick={() => setIsMenuOpen(false)} className="block px-2 py-2 text-sm text-gray-700 hover:text-primary cursor-pointer">
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 sm:px-6 py-2 sm:py-3 text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-300 group font-medium cursor-pointer text-sm sm:text-base"
                      >
                        <span className="flex items-center justify-between">
                          {item.label}
                          <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: menuItems.length * 0.1, duration: 0.3 }}
                  className="px-4 sm:px-6 pt-3 sm:pt-4"
                >
                  <Link href="/schedule-demo">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="w-full group"
                    >
                      <span className="flex items-center justify-center gap-2 text-white">
                        Schedule a Demo
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </Button>
                  </Link>
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
