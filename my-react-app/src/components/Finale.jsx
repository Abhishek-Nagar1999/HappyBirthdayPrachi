import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { surprise } from "../config/surprise";
import HugOverlay from "./HugOverlay";

export default function Finale({ onSeen, onHug, onReplay }) {
  const ref = useRef(null);
  const [hugOpen, setHugOpen] = useState(false);
  const closeHug = useCallback(() => setHugOpen(false), []);
  const stars = useMemo(
    () =>
      Array.from({ length: 32 }, (_, id) => ({
        id,
        left: `${(id * 29) % 100}%`,
        top: `${(id * 17) % 72}%`,
        delay: `${(id % 8) * 0.35}s`,
        size: 1 + (id % 3),
      })),
    [],
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onSeen();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [onSeen]);

  return (
    <section className="finale" ref={ref} aria-labelledby="finale-title">
      <div className="night" aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
        <span className="moon" />
      </div>

      <div className="finale-copy">
        <p className="eyebrow light">{surprise.finale.eyebrow}</p>
        <h2 id="finale-title">{surprise.finale.title}</h2>
        {surprise.finale.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="finale-love">{surprise.finale.love}</p>
        <div className="finale-actions">
          <button
            type="button"
            className="glow-btn glow-btn-small"
            onClick={() => {
              setHugOpen(true);
              onHug();
            }}
          >
            {surprise.finale.hugButton}
          </button>
          <button type="button" className="text-btn light" onClick={onReplay}>
            {surprise.finale.replay}
          </button>
        </div>
        <p className="made-for">
          For {surprise.herName}
          {surprise.myName ? `, from ${surprise.myName}` : ""}
        </p>
      </div>
      <AnimatePresence>{hugOpen ? <HugOverlay onClose={closeHug} /> : null}</AnimatePresence>
    </section>
  );
}
