"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import Wrapper from "../ui/Wrapper";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
    social: [
      { label: "LinkedIn", href: "#", icon: Linkedin },
    ],
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "hello@codespire.com",
      href: "mailto:hello@codespire.com",
    },
    { icon: Phone, label: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, label: "San Francisco, CA", href: "#" },
  ];

  return (
    <footer className="bg-[#1e2875] border-t border-[#1e2875]">
      <Wrapper className="py-12 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
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
                  className="h-10 w-auto"
                />
              </motion.div>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
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
                    className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    <item.icon size={16} className="mr-3" />
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
                    className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                {footerLinks.social.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} CodeSpire Solutions. All rights reserved.
            </p>
            <p className="text-gray-300 text-sm mt-2 md:mt-0">
              Built with ❤️ for enterprise AI transformation
            </p>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
