"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ReactNode,
  useEffect,
} from "react";

interface ParallaxProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Parallax({
  children,
  strength = 30,
  className = "",
}: ParallaxProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 120,
    damping: 20,
  });

  const springY = useSpring(y, {
    stiffness: 120,
    damping: 20,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      x.set(((e.clientX - centerX) / centerX) * strength);

      y.set(((e.clientY - centerY) / centerY) * strength);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [strength, x, y]);

  return (
    <motion.div
      className={className}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
}