import { useEffect, useId, useRef } from "react";
import { motion } from "framer-motion";
import { surprise } from "../config/surprise";

const HEARTS = Array.from({ length: 26 }, (_, id) => ({
  id,
  left: `${(id * 37) % 100}%`,
  delay: `${(id % 9) * 0.14}s`,
  size: 16 + (id % 6) * 8,
  duration: `${3.4 + (id % 5) * 0.45}s`,
}));

export default function HugOverlay({ onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="hug"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="hug-sky" aria-hidden="true">
        {HEARTS.map((heart) => (
          <span
            key={heart.id}
            style={{
              left: heart.left,
              fontSize: heart.size,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
            }}
          >
            ♥
          </span>
        ))}
      </div>
      <div className="hug-card">
        <p id={titleId}>{surprise.finale.hugMessage}</p>
        <button ref={closeRef} type="button" className="glow-btn glow-btn-small" onClick={onClose}>
          I’ll keep this hug
        </button>
      </div>
    </motion.div>
  );
}
