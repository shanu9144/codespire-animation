"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Brain, Code, Database, Users, Settings, Zap, BarChart3, Cpu, Network, Shield, Rocket, Target } from "lucide-react";
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
      hoverTimeoutRef.current = null;
    }
    // Close products dropdown when hovering over services
    setHoveredProduct(null);
    setHoveredService(serviceLabel);
  };

  const handleServiceMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredService(null);
      hoverTimeoutRef.current = null;
    }, 200); // Increased to 200ms to allow mouse movement to dropdown
  };

  const handleProductMouseEnter = (productLabel) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    // Close services dropdown when hovering over products
    setHoveredService(null);
    setHoveredProduct(productLabel);
  };

  const handleProductMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredProduct(null);
      hoverTimeoutRef.current = null;
    }, 200); // Increased to 200ms to allow mouse movement to dropdown
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

  // Close dropdowns when mouse leaves the entire navigation area
  const handleNavigationMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredService(null);
      setHoveredProduct(null);
      hoverTimeoutRef.current = null;
    }, 50); // Very short delay for immediate response
  };

  const services = [
    { 
      label: "AI Pod as a Service", 
      href: "/services/ai-pod",
      icon: Brain,
      description: "Managed AI teams delivering rapid business outcomes"
    },
    { 
      label: "Digital Engineering", 
      href: "/services/digital-engineering",
      icon: Code,
      description: "AI solutions tailored to your industry's unique challenges"
    },
    { 
      label: "Application Development", 
      href: "/services/app-development",
      icon: Settings,
      description: "UI/UX Design, Scalable Engineering, and Enterprise-Grade Quality"
    },
    { 
      label: "Data and Analytics", 
      href: "/services/data-analytics",
      icon: BarChart3,
      description: "Transform your data into actionable AI-powered insights"
    },
    { 
      label: "Salesforce & ServiceNow", 
      href: "/services/salesforce-servicenow",
      icon: Users,
      description: "Maximize your CRM and ITSM investments with expert implementations"
    },
    { 
      label: "24/7 SRE Support", 
      href: "/services/sre-support",
      icon: Shield,
      description: "Ensure your systems run smoothly around the clock"
    },
  ];

  const products = [
    { 
      label: "Smart RFQ AI", 
      href: "/products/smart-rfq-ai",
      icon: Target,
      description: "Intelligent request for quotation processing"
    },
    { 
      label: "Supplier Match AI", 
      href: "/products/supplier-match-ai",
      icon: Network,
      description: "AI-powered supplier discovery and matching"
    },
    { 
      label: "Forecast AI", 
      href: "/products/forecast-ai",
      icon: Rocket,
      description: "Advanced predictive analytics for business forecasting"
    },
  ];

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products", children: products },
    { label: "Services", href: "/services", children: services },
    { label: "About Us", href: "/about" },
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
            <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                <Image
                  src="/assets/codespirelogo.png"
                  alt="CodeSpire Solutions"
                  width={140}
                  height={40}
                  className="h-6 sm:h-7 md:h-8 w-auto"
                  priority={true}
                />
              </motion.div>
            </Link>
          </div>

          {/* Header Center - Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-end pr-4 xl:pr-6">
            <ul 
              className="flex items-center gap-2 lg:gap-1 xl:gap-2 text-gray-700 font-medium"
              onMouseLeave={handleNavigationMouseLeave}
            >
              {menuItems?.map((item) => (
                <li 
                  key={item.href} 
                  className="relative cursor-pointer"
                  onMouseEnter={() => item.children && (item.label === 'Services' ? handleServiceMouseEnter(item.label) : handleProductMouseEnter(item.label))}
                  onMouseLeave={() => item.label === 'Services' ? handleServiceMouseLeave() : handleProductMouseLeave()}
                >
                  {item.children ? (
                    <>
                      <Link 
                        href={item.href} 
                        className={`relative px-4 py-2 rounded-lg transition-all duration-300 inline-flex items-center cursor-pointer ${
                          (hoveredService === item.label || hoveredProduct === item.label) 
                            ? 'bg-gray-100 text-primary' 
                            : 'hover:bg-gray-50 hover:text-primary'
                        }`}
                      >
                        {item.label}
                        <ChevronDown className={`ml-1 w-4 h-4 transition-all duration-300 ${
                          (hoveredService === item.label || hoveredProduct === item.label) 
                            ? 'text-primary rotate-180' 
                            : 'text-gray-500 rotate-0'
                        }`} />
                      </Link>
                      
                      {/* Modern Grid Dropdown */}
                      <AnimatePresence>
                        {(hoveredService === item.label || hoveredProduct === item.label) && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute left-0 top-full mt-2 z-50"
                          >
                            {/* Invisible bridge to help mouse movement */}
                            <div className="absolute -top-2 left-0 right-0 h-2 bg-transparent"></div>
                            
                            <div 
                              className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 min-w-[600px] cursor-default"
                              onMouseEnter={() => {
                                if (hoverTimeoutRef.current) {
                                  clearTimeout(hoverTimeoutRef.current);
                                  hoverTimeoutRef.current = null;
                                }
                                if (item.label === 'Services') {
                                  setHoveredProduct(null);
                                  handleServiceMouseEnter(item.label);
                                } else {
                                  setHoveredService(null);
                                  handleProductMouseEnter(item.label);
                                }
                              }}
                              onMouseLeave={() => item.label === 'Services' ? handleServiceMouseLeave() : handleProductMouseLeave()}
                            >
                              {/* Header */}
                              <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                  {item.label}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {item.label === 'Services' 
                                    ? 'Comprehensive AI and technology solutions for your business'
                                    : 'Cutting-edge AI products designed for enterprise success'
                                  }
                                </p>
                              </div>
                              
                              {/* Grid Layout */}
                              <div className={`grid gap-4 ${
                                item.children.length <= 3 
                                  ? 'grid-cols-1' 
                                  : item.children.length <= 6 
                                    ? 'grid-cols-2' 
                                    : 'grid-cols-3'
                              }`}>
                                {item.children.map((child, index) => (
                                  <motion.div
                                    key={child.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.3 }}
                                  >
                                    <Link 
                                      href={child.href} 
                                      className="group flex items-start space-x-3 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-transparent hover:border-blue-100 hover:shadow-lg"
                                    >
                                      {/* Icon */}
                                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                        <child.icon className="w-5 h-5 text-white" />
                                      </div>
                                      
                                      {/* Content */}
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-1">
                                          {child.label}
                                        </h4>
                                        <p className="text-xs text-gray-600 group-hover:text-blue-500 transition-colors duration-200 leading-relaxed">
                                          {child.description}
                                        </p>
                                      </div>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                              
                              {/* Footer CTA */}
                              <div className="mt-6 pt-4 border-t border-gray-100">
                                <Link 
                                  href={item.href}
                                  className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                >
                                  View all {item.label.toLowerCase()}
                                  <ChevronDown className="ml-1 w-4 h-4 rotate-[-90deg]" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={item.href} className="px-4 py-2 rounded-lg hover:bg-gray-50 hover:text-primary transition-all duration-300 cursor-pointer">
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
                          className={`w-full flex items-center justify-between px-3 py-3 text-left rounded-lg transition-all duration-300 font-medium cursor-pointer text-sm sm:text-base ${
                            (item.label === 'Services' ? isServicesOpen : isProductsOpen)
                              ? 'bg-gray-100 text-primary'
                              : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${(item.label === 'Services' ? isServicesOpen : isProductsOpen) ? 'rotate-180' : 'rotate-0'}`} />
                        </button>
                        <AnimatePresence>
                          {(item.label === 'Services' ? isServicesOpen : isProductsOpen) && (
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }} 
                              animate={{ height: 'auto', opacity: 1 }} 
                              exit={{ height: 0, opacity: 0 }} 
                              className="pl-4 space-y-2"
                            >
                              {item.children.map((child, childIndex) => (
                                <motion.div
                                  key={child.href}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: childIndex * 0.1, duration: 0.3 }}
                                >
                                  <Link 
                                    href={child.href} 
                                    onClick={() => setIsMenuOpen(false)} 
                                    className="flex items-center space-x-3 px-3 py-3 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-300 cursor-pointer"
                                  >
                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                      <child.icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium">{child.label}</div>
                                      <div className="text-xs text-gray-500 mt-1">{child.description}</div>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 sm:px-6 py-2 sm:py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-300 group font-medium cursor-pointer text-sm sm:text-base"
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
