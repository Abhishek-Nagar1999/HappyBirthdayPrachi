import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { surprise } from "../config/surprise";

export default function LoveCards({ onRead }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(() => new Set());

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    onRead(id);
  };

  return (
    <section className="chapter" aria-labelledby="cards-title">
      <p className="eyebrow">{surprise.cardsHeading.eyebrow}</p>
      <h2 id="cards-title">{surprise.cardsHeading.title}</h2>
      <ul className="card-grid">
        {surprise.cards.map((card, index) => {
          const isOpen = open.has(card.id);
          return (
            <li key={card.id}>
              <button
                type="button"
                className={isOpen ? "love-card is-open" : "love-card"}
                aria-expanded={isOpen}
                aria-label={
                  isOpen
                    ? `${card.title}. ${card.message} Press to close.`
                    : `${card.title}. Press to open this note.`
                }
                onClick={() => toggle(card.id)}
              >
                <motion.span
                  className="love-card-inner"
                  animate={{ rotateY: isOpen ? 180 : 0 }}
                  transition={{ duration: reduce ? 0.01 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="face front" aria-hidden="true">
                    <span className="card-index">0{index + 1}</span>
                    <span className="card-heart">♥</span>
                    <span className="card-title">{card.title}</span>
                    <span className="card-cue">Tap to open</span>
                  </span>
                  <span className="face back" aria-hidden="true">
                    <span className="card-title">{card.title}</span>
                    <span className="card-message">{card.message}</span>
                  </span>
                </motion.span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
