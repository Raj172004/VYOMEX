export const easings = {
  smooth: [0.22, 1, 0.36, 1] as const,

  spring: {
    type: "spring" as const,
    stiffness: 180,
    damping: 18,
  },
};