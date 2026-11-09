import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { surprise } from "../config/surprise";

export default function MemoryLane({ onView }) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef(null);
  const [active, setActive] = useState(null);

  const openAt = (index) => {
    setActive(index);
    onView(surprise.memories[index].id);
  };

  const close = () => setActive(null);
  const isOpen = active != null;

  const step = (direction) => {
    setActive((current) => {
      if (current == null) return current;
      const next = (current + direction + surprise.memories.length) % surprise.memories.length;
      onView(surprise.memories[next].id);
      return next;
    });
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        const direction = event.key === "ArrowRight" ? 1 : -1;
        setActive((current) => {
          if (current == null) return current;
          const next = (current + direction + surprise.memories.length) % surprise.memories.length;
          onView(surprise.memories[next].id);
          return next;
        });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onView]);

  const photo = active == null ? null : surprise.memories[active];

  return (
    <section className="chapter" aria-labelledby="memory-title">
      <p className="eyebrow">{surprise.memoriesHeading.eyebrow}</p>
      <h2 id="memory-title">{surprise.memoriesHeading.title}</h2>
      <p className="lede">{surprise.memoriesHeading.lede}</p>

      <ul className="memory-grid">
        {surprise.memories.map((memory, index) => (
          <li key={memory.id}>
            <motion.button
              type="button"
              className="polaroid"
              style={{ "--tilt": `${memory.tilt}deg` }}
              onClick={() => openAt(index)}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : index * 0.05 }}
            >
              <img src={memory.src} alt={memory.alt} />
              <span className="polaroid-cap">{memory.caption}</span>
            </motion.button>
          </li>
        ))}
      </ul>

      {photo ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <button type="button" className="lightbox-backdrop" aria-label="Close photo" onClick={close} />
          <div className="lightbox-frame">
            <p id={titleId} className="sr-only">
              {photo.caption}
            </p>
            <img src={photo.src} alt={photo.alt} />
            <p className="lightbox-cap">{photo.caption}</p>
            <div className="lightbox-actions">
              <button type="button" onClick={() => step(-1)}>
                Previous
              </button>
              <button type="button" ref={closeRef} onClick={close}>
                Close
              </button>
              <button type="button" onClick={() => step(1)}>
                Next
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
