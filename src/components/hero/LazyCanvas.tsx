"use client";

import React, { useEffect, useState, useRef } from "react";

interface LazyCanvasProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function LazyCanvas({ children, fallback }: LazyCanvasProps) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        rootMargin: "300px 0px", // Pre-mount 300px before entering viewport
        threshold: 0,
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      {inView ? children : fallback || <div className="w-full h-full bg-black" />}
    </div>
  );
}
