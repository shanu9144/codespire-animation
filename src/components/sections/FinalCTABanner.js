"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Rocket, Zap } from "lucide-react";
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
      {/* Dynamic background elements */}
      {config.enableGradients && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/15" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-primary/5 to-primary/10" />
        </div>
      )}

      {/* Animated floating elements */}
      {config.enableFloatingElements && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large floating orb */}
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            animate={
              config.enableComplexAnimations
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }
                : {}
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Medium floating orb */}
          <motion.div
            className="absolute -bottom-16 -left-16 w-48 h-48 bg-primary/15 rounded-full blur-2xl"
            animate={
              config.enableComplexAnimations
                ? {
                    x: [0, 20, 0],
                    y: [0, -15, 0],
                    scale: [1, 1.1, 1],
                  }
                : {}
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Small accent elements */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-8 h-8 bg-primary/30 rounded-full blur-sm"
            animate={
              config.enableComplexAnimations
                ? {
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }
                : {}
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.div
            className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-primary/40 rounded-full blur-sm"
            animate={
              config.enableComplexAnimations
                ? {
                    y: [0, 8, 0],
                    x: [0, 5, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }
                : {}
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
        </div>
      )}

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
              Ready to accelerate your enterprise with AI?
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

          {/* CTA Button with enhanced styling */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <Link href="/contact">
              <Button
                variant="primary"
                size="lg"
                className="group relative overflow-hidden px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Button background animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark"
                  whileHover={
                    config.enableComplexAnimations
                      ? {
                          scale: 1.05,
                        }
                      : {}
                  }
                  transition={{ duration: 0.2 }}
                />

                {/* Button content */}
                <span className="relative z-10 flex items-center">
                  Contact Us
                  <motion.div
                    className="ml-3"
                    whileHover={
                      config.enableComplexAnimations
                        ? {
                            x: 5,
                          }
                        : {}
                    }
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </span>

                {/* Subtle shimmer effect */}
                {config.enableComplexAnimations && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{
                      x: [-100, 300],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />
                )}
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
