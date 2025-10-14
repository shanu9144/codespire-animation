'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Wrapper from '../ui/Wrapper';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    company: {
      title: 'COMPANY',
      links: [
        { label: 'Our Team', href: '/our-team' },
        { label: 'About Us', href: '/about' },
        { label: 'Products', href: '/products' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    legal: {
      title: 'LEGAL',
      links: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  };

  const socialLinks = [
    { 
      label: 'LinkedIn', 
      href: '#', 
      icon: Linkedin,
      color: 'hover:text-blue-400',
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: 'info@codespiresolutions.com',
      href: 'mailto:info@codespiresolutions.com',
    },
    { 
      icon: Phone, 
      label: '(602) 837-3370', 
      href: 'tel:+16028373370',
    },
    { 
      icon: MapPin, 
      label: '25th Floor, Gold Tower, Wave One, 2514, Sector 18, Noida, Uttar Pradesh 201301', 
      href: 'https://maps.google.com/?q=25th%20Floor%2C%20Gold%20Tower%2C%20Wave%20One%2C%202514%2C%20Sector%2018%2C%20Noida%2C%20Uttar%20Pradesh%20201301',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 border-t border-gray-800">
      <Wrapper className="py-16 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-16"
        >
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Company Info - Takes up 4 columns */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-4 space-y-6"
            >
              {/* Logo */}
              <Link href="/" className="inline-block group">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center"
                >
                  <Image
                    src="/assets/codespirelogo.png"
                    alt="CodeSpire Logo"
                    width={180}
                    height={48}
                    className="h-12 w-auto brightness-0 invert group-hover:opacity-80 transition-opacity duration-200"
                  />
                </motion.div>
              </Link>

              {/* Description */}
              <p className="text-white text-lg leading-relaxed max-w-md">
                From Idea to Enterprise-Grade AI in a Blink. Transforming
                businesses with cutting-edge AI solutions and expert engineering.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center text-white hover:text-gray-300 transition-colors duration-200 group"
                    >
                      <item.icon size={18} className="mr-3 text-gray-300 group-hover:text-white transition-colors duration-200" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Navigation Links - Takes up 8 columns */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 gap-8 lg:gap-12">
                {Object.entries(footerSections).map(([key, section]) => (
                  <motion.div 
                    key={key}
                    variants={itemVariants}
                    className="space-y-4"
                  >
                    <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <motion.li 
                          key={linkIndex}
                          variants={itemVariants}
                        >
                          <Link
                            href={link.href}
                            className="text-white hover:text-gray-300 transition-colors duration-200 relative group text-sm"
                          >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-200 group-hover:w-full"></span>
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            variants={itemVariants}
            className="pt-8 border-t border-gray-800"
          >
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white text-sm">
                © {currentYear} CodeSpire Solutions. All rights reserved.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
