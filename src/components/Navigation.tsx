import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UserCircleIcon, VideoCameraIcon, BookOpenIcon, ChatBubbleLeftRightIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import MobileMenu from './MobileMenu';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '#features', label: 'Features', icon: <CodeBracketIcon className="w-7 h-7" /> },
    { href: '#videos', label: 'Videos', icon: <VideoCameraIcon className="w-7 h-7" /> },
    { href: '#users', label: 'Users', icon: <UserCircleIcon className="w-7 h-7" /> },
    { href: '#blog', label: 'Blog', icon: <BookOpenIcon className="w-7 h-7" /> },
    { href: '#community', label: 'Community', icon: <ChatBubbleLeftRightIcon className="w-7 h-7" /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
              OpenSox
            </Link>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-10 mx-auto">
            {menuItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setIsHovered(item.href)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Link
                  href={item.href}
                  className="px-5 py-4 text-2xl text-gray-300 hover:text-white transition-colors flex items-center space-x-2 rounded-lg hover:bg-white/5"
                >
                  {item.icon && <span className="text-blue-500">{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
                <AnimatePresence>
                  {isHovered === item.href && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center"
          >
            <Link
              href="/signin"
              className="relative text-2xl font-medium text-white px-8 py-4 rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </Link>
          </motion.div>

          <MobileMenu menuItems={menuItems} />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation; 