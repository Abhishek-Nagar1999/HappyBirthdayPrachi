import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { surprise } from "../config/surprise";

export default function LoveLetter({ onRead }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const letter = surprise.letter;

  const openLetter = () => {
    if (open) return;
    setOpen(true);
    onRead();
  };

  return (
    <section className="chapter" aria-labelledby="letter-title">
      <p className="eyebrow">{letter.eyebrow}</p>
      <h2 id="letter-title">{letter.title}</h2>

      <div className="letter-scene">
        <button
          type="button"
          className={open ? "envelope is-open" : "envelope"}
          onClick={openLetter}
          aria-expanded={open}
          disabled={open}
        >
          <span className="envelope-body" aria-hidden="true">
            <motion.span
              className="flap"
              initial={false}
              animate={{ rotateX: open ? 180 : 0 }}
              transition={{ duration: reduce ? 0.15 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
            <span className="pocket" />
            <motion.span
              className="seal"
              initial={false}
              animate={open ? { scale: 0.4, opacity: 0, y: -20 } : { scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0.1 : 0.35 }}
            >
              ♥
            </motion.span>
          </span>
          <span className="envelope-cue">{open ? "Opened" : "Open the envelope"}</span>
        </button>

        <AnimatePresence>
          {open ? (
            <motion.article
              className="letter"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scaleY: 0.86 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scaleY: 0.92 }}
              transition={{ duration: reduce ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Love letter"
            >
              <p className="letter-salute">{letter.salutation}</p>
              {letter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="letter-closing">{letter.closing}</p>
              <p className="letter-love">{letter.love}</p>
              <p className="letter-sign">{letter.signature}</p>
              {surprise.myName ? <p className="letter-name">{surprise.myName}</p> : null}
              <button type="button" className="text-btn" onClick={() => setOpen(false)}>
                Fold the letter
              </button>
            </motion.article>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
