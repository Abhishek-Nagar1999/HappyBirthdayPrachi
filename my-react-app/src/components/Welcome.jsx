import { motion, useReducedMotion } from "framer-motion";
import { surprise } from "../config/surprise";

export default function Welcome({ onOpen }) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      className="welcome"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.03, filter: "blur(6px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Welcome"
    >
      <div className="welcome-orb orb-a" aria-hidden="true" />
      <div className="welcome-orb orb-b" aria-hidden="true" />
      <div className="welcome-orb orb-c" aria-hidden="true" />

      <div className="welcome-copy">
        <motion.p
          className="welcome-kicker"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          For {surprise.herName}
        </motion.p>
        <motion.h1
          className="welcome-title"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.8 }}
        >
          {surprise.welcome.title}
        </motion.h1>
        <motion.p
          className="welcome-sub"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
        >
          {surprise.welcome.subtitle}
        </motion.p>
        <motion.button
          type="button"
          className="glow-btn"
          onClick={onOpen}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.7 }}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          {surprise.welcome.button}
        </motion.button>
      </div>
    </motion.section>
  );
}
