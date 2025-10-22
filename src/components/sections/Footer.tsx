'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { fontClasses } from '../../config/fonts';
import Wrapper from '../ui/Wrapper';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Products', href: '/products' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
    social: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/codespire-solutions', icon: Linkedin },
    ],
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'info@codespiresolutions.com',
      href: 'mailto:info@codespiresolutions.com',
    },
    { icon: Phone, label: '+510-543-7536', href: 'tel:+16028373370' },
    { icon: MapPin, label: '4754 U.S. Route 40, Tipp City, OH 45371, USA', href: 'https://maps.google.com/?q=4754%20U.S.%20Route%2040%2C%20Tipp%20City%2C%20OH%2045371' },
    { icon: MapPin, label: '25th Floor, Gold Tower, Wave One, 2514, Sector 18, Noida, Uttar Pradesh 201301', href: 'https://maps.google.com/?q=25th%20Floor%2C%20Gold%20Tower%2C%20Wave%20One%2C%202514%2C%20Sector%2018%2C%20Noida%2C%20Uttar%20Pradesh%20201301' },
  ];

  return (
    <footer className="bg-[#1e2875] border-t border-[#1e2875] p-12">
      <Wrapper className="py-12 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4 focus:outline-none focus:ring-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <Image
                  src="/assets/codespirelogo.png"
                  alt="CodeSpire Logo"
                  width={150}
                  height={40}
                  className="h-10 w-auto brightness-0 invert"
                />
              </motion.div>
            </Link>
            <p className={`text-gray-300 mb-6 max-w-md ${fontClasses.descriptionMedium}`}>
              From Idea to Enterprise-Grade AI in a Blink. Transforming
              businesses with cutting-edge AI solutions and expert engineering.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-0"
                  >
                    <item.icon size={20} className="mr-3" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 relative group focus:outline-none focus:ring-0"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 relative group focus:outline-none focus:ring-0"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              {footerLinks.social.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-0"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm">
              © {currentYear} CodeSpire Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;