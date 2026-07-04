"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 180,
    damping: 25,
  });

  const y = useSpring(mouseY, {
    stiffness: 180,
    damping: 25,
  });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left - 150);
    mouseY.set(e.clientY - rect.top - 150);
  }

  return (
    <div
      onMouseMove={handleMove}
      className="absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{
          x,
          y,
        }}
        className="
          absolute
          h-[300px]
          w-[300px]
          rounded-full
          bg-blue-500/10
          blur-[120px]
          pointer-events-none
        "
      />
    </div>
  );
}