"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds (e.g., 100, 200, 300)
  duration?: number; // Duration in milliseconds (default 700)
  direction?: "up" | "down" | "left" | "right" | "none";
  threshold?: number;
  once?: boolean;
  staggerIndex?: number; // Optional index helper to automatically calculate delay (staggerIndex * 100)
}

export default function ScrollReveal({
  children,
  className = "",
  delay,
  duration = 700,
  direction = "up",
  threshold = 0.15,
  once = true,
  staggerIndex,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Calculate final delay in ms
  const computedDelay = typeof delay === "number" 
    ? delay 
    : (typeof staggerIndex === "number" ? staggerIndex * 100 : 0);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    // Fallback if IntersectionObserver is not supported
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold, once]);

  // Compute transform offset based on direction when hidden
  const getHiddenTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(24px)";
      case "down":
        return "translateY(-24px)";
      case "left":
        return "translateX(24px)";
      case "right":
        return "translateX(-24px)";
      case "none":
        return "none";
      default:
        return "translateY(24px)";
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate(0, 0)" : getHiddenTransform(),
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: `${computedDelay}ms`,
    willChange: "opacity, transform",
  };

  return (
    <div
      ref={elementRef}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
}
