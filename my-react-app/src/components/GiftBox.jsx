import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { surprise } from "../config/surprise";
import ConfettiBurst from "./ConfettiBurst";

export default function GiftBox({ onOpen }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [burst, setBurst] = useState(0);

  const unwrap = () => {
    if (open) return;
    setOpen(true);
    setBurst(1);
    onOpen();
  };

  return (
    <section className="chapter" aria-labelledby="gift-title">
      <p className="eyebrow">{surprise.gift.eyebrow}</p>
      <h2 id="gift-title">{surprise.gift.title}</h2>
      <p className="lede">{open ? surprise.gift.openedHint : surprise.gift.hint}</p>

      <div className={open ? "gift-stage is-open" : "gift-stage"}>
        <ConfettiBurst burst={burst} variant="rise" />
        <motion.figure
          className="risen-photo"
          initial={false}
          animate={
            open
              ? { y: reduce ? -170 : -188, opacity: 1, scale: 1, rotate: -2 }
              : { y: 36, opacity: 0, scale: 0.72, rotate: 0 }
          }
          transition={{ delay: open && !reduce ? 0.55 : 0, duration: reduce ? 0.2 : 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={surprise.gift.image} alt={surprise.gift.imageAlt} />
          <figcaption>{surprise.gift.caption}</figcaption>
        </motion.figure>

        <button
          type="button"
          className="gift-hit"
          onClick={unwrap}
          disabled={open}
          aria-label={open ? "Gift unwrapped" : "Unwrap your gift"}
        >
          <span className="gift-glow" aria-hidden="true" />
          <span className="gift-shadow" aria-hidden="true" />
          <span className={open ? "gift-box is-still" : "gift-box"} aria-hidden="true">
            <motion.span
              className="lid"
              style={{ transformOrigin: "center bottom", transformStyle: "preserve-3d" }}
              initial={false}
              animate={open ? { rotateX: -118, y: -24 } : { rotateX: 0, y: 0 }}
              transition={{ delay: open && !reduce ? 0.22 : 0, duration: reduce ? 0.2 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="lid-top" />
              <span className="ribbon ribbon-lid" />
              <motion.span
                className="bow"
                initial={false}
                animate={open ? { y: -64, scale: 0.3, opacity: 0, rotate: -18 } : { y: 0, scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: reduce ? 0.15 : 0.5 }}
              >
                <span className="loop loop-left" />
                <span className="loop loop-right" />
                <span className="knot" />
                <span className="tail tail-left" />
                <span className="tail tail-right" />
              </motion.span>
            </motion.span>
            <span className="box-body">
              <span className="ribbon ribbon-v" />
              <span className="ribbon ribbon-h" />
            </span>
          </span>
        </button>
      </div>
    </section>
  );
}
