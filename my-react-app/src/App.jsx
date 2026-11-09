import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { surprise } from "./config/surprise";
import Atmosphere from "./components/Atmosphere";
import HeartTrail from "./components/HeartTrail";
import Welcome from "./components/Welcome";
import MusicToggle from "./components/MusicToggle";
import Progress from "./components/Progress";
import Hero from "./components/Hero";
import GiftBox from "./components/GiftBox";
import LoveCards from "./components/LoveCards";
import MemoryLane from "./components/MemoryLane";
import Reasons from "./components/Reasons";
import LoveLetter from "./components/LoveLetter";
import Finale from "./components/Finale";
import "./birthday.css";

function freshStats() {
  return {
    wished: false,
    giftOpen: false,
    readCards: new Set(),
    seenPhotos: new Set(),
    foundReasons: new Set(),
    letterRead: false,
    finaleSeen: false,
    hugSeen: false,
  };
}

function scoreOf(stats) {
  const parts = [
    1,
    stats.wished ? 1 : 0,
    stats.giftOpen ? 1 : 0,
    stats.readCards.size / surprise.cards.length,
    stats.seenPhotos.size / surprise.memories.length,
    stats.foundReasons.size / surprise.reasons.length,
    stats.letterRead ? 1 : 0,
    stats.finaleSeen ? 1 : 0,
    stats.hugSeen ? 1 : 0,
  ];
  return Math.round((parts.reduce((sum, part) => sum + part, 0) / parts.length) * 100);
}

function addId(prev, key, id) {
  if (prev[key].has(id)) return prev;
  const next = new Set(prev[key]);
  next.add(id);
  return { ...prev, [key]: next };
}

export default function App() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [run, setRun] = useState(0);
  const [stats, setStats] = useState(freshStats);

  useEffect(() => {
    document.title = `For ${surprise.herName} ❤️`;
  }, []);

  const mark = useCallback((key, id) => {
    setStats((prev) => {
      if (id) return addId(prev, key, id);
      if (prev[key]) return prev;
      return { ...prev, [key]: true };
    });
  }, []);

  const onWish = useCallback(() => mark("wished"), [mark]);
  const onGift = useCallback(() => mark("giftOpen"), [mark]);
  const onCard = useCallback((id) => mark("readCards", id), [mark]);
  const onPhoto = useCallback((id) => mark("seenPhotos", id), [mark]);
  const onReason = useCallback((id) => mark("foundReasons", id), [mark]);
  const onLetter = useCallback(() => mark("letterRead"), [mark]);
  const onFinale = useCallback(() => mark("finaleSeen"), [mark]);
  const onHug = useCallback(() => mark("hugSeen"), [mark]);

  const progress = useMemo(() => (started ? scoreOf(stats) : 0), [started, stats]);

  const replay = useCallback(() => {
    setStarted(false);
    setStats(freshStats());
    setRun((value) => value + 1);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [reduce]);

  return (
    <MotionConfig reducedMotion="user">
      <Atmosphere />
      <HeartTrail />
      {/* <MusicToggle src={surprise.musicSrc} /> */}
      {started ? <Progress value={progress} name={surprise.herName} /> : null}

      <AnimatePresence>
        {!started ? <Welcome key="welcome" onOpen={() => setStarted(true)} /> : null}
      </AnimatePresence>

      {started ? (
        <motion.main
          key={run}
          className="story"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hero onWish={onWish} />
          <GiftBox onOpen={onGift} />
          <LoveCards onRead={onCard} />
          <MemoryLane onView={onPhoto} />
          <Reasons onFind={onReason} />
          <LoveLetter onRead={onLetter} />
          <Finale onSeen={onFinale} onHug={onHug} onReplay={replay} />
        </motion.main>
      ) : null}
    </MotionConfig>
  );
}
