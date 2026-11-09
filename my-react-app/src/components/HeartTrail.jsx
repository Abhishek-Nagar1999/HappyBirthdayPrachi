import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function HeartTrail() {
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const springX = useSpring(x, { stiffness: 280, damping: 28, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 280, damping: 28, mass: 0.45 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return undefined;

    const move = (event) => {
      x.set(event.clientX + 14);
      y.set(event.clientY + 16);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.span
      className="heart-trail"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      ♥
    </motion.span>
  );
}
