import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { surprise } from "../config/surprise";
import ConfettiBurst from "./ConfettiBurst";

function Cake({ blown }) {
  return (
    <div className={blown ? "cake is-blown" : "cake"} aria-hidden="true">
      <div className="candles">
        {["c1", "c2", "c3", "c4", "c5"].map((id, index) => (
          <span key={id} className="candle" style={{ "--i": index }}>
            <span className="smoke" />
            <span className="flame" />
            <span className="stick" />
          </span>
        ))}
      </div>
      <div className="layer layer-top">
        <span className="drip" />
        <span className="drip drip-b" />
        <span className="drip drip-c" />
      </div>
      <div className="layer layer-mid" />
      <div className="layer layer-base" />
      <div className="plate" />
    </div>
  );
}

export default function Hero({ onWish }) {
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(0);
  const [blown, setBlown] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const wish = () => {
    onWish();
    setBurst((value) => value + 1);
    setBlown(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setBlown(true), reduce ? 0 : 180);
  };

  return (
    <motion.section
      className="chapter hero"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-labelledby="hero-title"
    >
      <p className="eyebrow">{surprise.hero.eyebrow}</p>
      <h1 id="hero-title" className="hero-title">
        {surprise.hero.title}
      </h1>
      <p className="lede hero-lede">{surprise.hero.message}</p>

      <div className="cake-wrap">
        <ConfettiBurst burst={burst} variant="fall" />
        <Cake blown={blown} />
      </div>

      <button type="button" className="glow-btn glow-btn-small" onClick={wish}>
        {burst > 0 ? surprise.hero.wishedButton : surprise.hero.wishButton}
      </button>
    </motion.section>
  );
}
