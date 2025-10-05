"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Zap } from "lucide-react";
import Link from "next/link";
import Button from "../ui/Button";
import { Heading, Text } from "../ui/Typography";
import { useAnimationPerformance } from "../../lib/performance";

const FinalCTABanner = () => {
  const { config, shouldReduceAnimations } = useAnimationPerformance();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    threshold: 0.3,
    margin: "-50px 0px",
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.staggerDelay * 0.8,
        delayChildren: shouldReduceAnimations
          ? 0
          : 0.2 * config.animationDuration,
      },
    },
  };

  const itemVariants = {
    hidden: config.enableComplexAnimations
      ? {
          opacity: 0,
          y: 30,
          scale: 0.95,
        }
      : { opacity: 0 },
    visible: config.enableComplexAnimations
      ? {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.7 * config.animationDuration,
            ease: "easeOut",
          },
        }
      : {
          opacity: 1,
          transition: { duration: 0.3 },
        },
  };

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent overflow-hidden"
    >
      {/* Subtle 3D-themed background (chip + neural network) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Soft radial glow behind headline */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 300px at 50% 45%, rgba(56,75,255,0.18) 0%, rgba(139,92,246,0.12) 35%, rgba(56,75,255,0.06) 60%, rgba(56,75,255,0) 100%)",
            filter: "blur(2px)",
          }}
        />

        <motion.svg
          className="absolute top-8 left-6 opacity-35"
          width="140" height="140" viewBox="0 0 140 140"
          animate={config.enableComplexAnimations ? { rotate: [0, 8, 0] } : {}}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <defs>
            <linearGradient id="ctaChip" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#384bff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <rect x="25" y="25" width="90" height="90" rx="12" fill="url(#ctaChip)" />
          <rect x="40" y="40" width="60" height="60" rx="8" stroke="url(#ctaChip)" strokeWidth="2" fill="none" />
          {Array.from({ length: 8 }).map((_, i) => (
            <rect key={i} x={14 + i * 14} y="12" width="5" height="14" fill="url(#ctaChip)" />
          ))}
        </motion.svg>

        <motion.svg
          className="absolute bottom-8 right-10 opacity-35"
          width="240" height="140" viewBox="0 0 200 120"
          animate={config.enableComplexAnimations ? { y: [0, -8, 0] } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <defs>
            <linearGradient id="ctaNet" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#384bff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          {[[20,60],[70,25],[70,95],[120,40],[120,80],[170,60]].map((p, idx) => (
            <motion.circle key={idx} cx={p[0]} cy={p[1]} r="5" fill="url(#ctaNet)"
              animate={{ r: [4.5, 6, 4.5], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2 + idx * 0.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          <motion.path d="M20 60 L70 25 L120 40 L170 60 M20 60 L70 95 L120 80 L170 60" stroke="url(#ctaNet)" strokeWidth="2" fill="none"
            strokeDasharray="6 6"
            animate={{ strokeDashoffset: [0, 12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </motion.svg>

        {/* Rotating wireframe sphere */}
        <motion.svg
          className="absolute top-1/3 left-1/2 -translate-x-1/2 opacity-25"
          width="220" height="220" viewBox="0 0 200 200"
          animate={config.enableComplexAnimations ? { rotate: 360 } : {}}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          <defs>
            <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#384bff" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="none" stroke="url(#wireGrad)" strokeWidth="1" />
          {Array.from({ length: 5 }).map((_, i) => (
            <ellipse key={`lat-${i}`} cx="100" cy="100" rx={80 - i * 12} ry={30 - i * 4} fill="none" stroke="url(#wireGrad)" strokeWidth="1" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <path key={`lon-${i}`} d={`M100 20 C ${100 + (i-3)*10} 60, ${100 + (i-3)*10} 140, 100 180`} fill="none" stroke="url(#wireGrad)" strokeWidth="1" />
          ))}
        </motion.svg>

        {/* Particle trails */}
        {config.enableComplexAnimations && (
          <>
            {[
              { top: '30%', delay: 0 },
              { top: '55%', delay: 0.6 },
              { top: '70%', delay: 1.2 },
            ].map((p, idx) => (
              <motion.div
                key={idx}
                className="absolute h-1 w-24 rounded-full"
                style={{
                  top: p.top,
                  left: '-10%',
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(139,92,246,0.55) 40%, rgba(34,211,238,0.55) 70%, rgba(255,255,255,0) 100%)',
                  boxShadow: '0 0 16px rgba(139,92,246,0.35)',
                }}
                animate={{ x: ['-10%', '120%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
              />
            ))}
          </>
        )}

        {/* Moving light beam for added depth */}
        <motion.div
          className="absolute inset-y-0 w-1/2 -left-1/4"
          animate={config.enableComplexAnimations ? { x: ["-25%", "125%", "-25%"] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            background: 'linear-gradient(90deg, rgba(56,75,255,0) 0%, rgba(56,75,255,0.10) 50%, rgba(56,75,255,0) 100%)',
            filter: 'blur(2px)'
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon with animation */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <motion.div
              className="relative p-4 bg-primary/10 rounded-full"
              whileHover={
                config.enableComplexAnimations
                  ? {
                      scale: 1.1,
                      rotate: 5,
                    }
                  : {}
              }
              transition={{ duration: 0.3 }}
            >
              <Rocket className="w-12 h-12 text-primary" />

            {/* Orbiting particles around icon */}
            {config.enableComplexAnimations && (
              <>
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(56,75,255,0.6)]" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                </motion.div>
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute top-1/2 -left-1 w-1.5 h-1.5 bg-violet-400 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                  <div className="absolute top-1/2 -right-1 w-1 h-1 bg-blue-300 rounded-full shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                </motion.div>
              </>
            )}

              {/* Accent spark */}
              {config.enableComplexAnimations && (
                <motion.div
                  className="absolute -top-1 -right-1 p-1 bg-primary/20 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="w-4 h-4 text-primary" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Main headline */}
          <motion.div variants={itemVariants} className="mb-6">
            <Heading
              level={2}
              size="h1"
              className="mb-4 bg-gradient-to-r from-gray-900 via-primary to-gray-900 bg-clip-text text-transparent"
            >
              <motion.span
                animate={{
                  textShadow: [
                    '0 0 0px rgba(56,75,255,0)',
                    '0 0 18px rgba(56,75,255,0.35)',
                    '0 0 0px rgba(56,75,255,0)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                Ready to accelerate your enterprise with AI?
              </motion.span>
            </Heading>

            <Text
              size="body-lg"
              color="secondary"
              className="max-w-2xl mx-auto leading-relaxed"
            >
              Transform your business operations, enhance productivity, and
              unlock new possibilities with cutting-edge AI solutions tailored
              for enterprise success.
            </Text>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex justify-center gap-4">
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="group relative overflow-hidden px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark"
                  whileHover={config.enableComplexAnimations ? { scale: 1.05 } : {}}
                  transition={{ duration: 0.2 }}
                />
                <span className="relative z-10">Contact Us</span>
                {config.enableComplexAnimations && (
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" animate={{ x: [-100, 300] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }} />
                )}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="group px-8 py-4 text-lg font-semibold">
                <span className="relative z-10 flex items-center">Schedule a Demo</span>
              </Button>
            </Link>
          </motion.div>

          {/* Bottom accent line */}
          {config.enableComplexAnimations && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center mt-12"
            >
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
                animate={{
                  scaleX: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Subtle border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};

export default FinalCTABanner;
