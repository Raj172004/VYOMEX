"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceIconProps {
  icon: LucideIcon;
}

export default function ServiceIcon({
  icon: Icon,
}: ServiceIconProps) {
  return (
    <motion.div
      whileHover={{
        rotate: 8,
        scale: 1.08,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        flex
        h-16
        w-16
        items-center
        justify-center
        rounded-2xl
        bg-gradient-to-br
        from-blue-50
        to-cyan-50
        shadow-sm
      "
    >
      <Icon
        size={30}
        className="text-blue-600"
      />
    </motion.div>
  );
}