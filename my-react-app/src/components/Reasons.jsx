import { useState } from "react";
import { surprise } from "../config/surprise";

export default function Reasons({ onFind }) {
  const [active, setActive] = useState(null);
  const [found, setFound] = useState(() => new Set());

  const pick = (reason) => {
    setActive(reason);
    setFound((prev) => {
      if (prev.has(reason.id)) return prev;
      const next = new Set(prev);
      next.add(reason.id);
      return next;
    });
    onFind(reason.id);
  };

  return (
    <section className="chapter" aria-labelledby="reasons-title">
      <p className="eyebrow">{surprise.reasonsHeading.eyebrow}</p>
      <h2 id="reasons-title">{surprise.reasonsHeading.title}</h2>
      <p className="lede">{surprise.reasonsHeading.lede}</p>

      <div className="heart-garden">
        {surprise.reasons.map((reason, index) => {
          const isFound = found.has(reason.id);
          const isActive = active?.id === reason.id;
          return (
            <button
              key={reason.id}
              type="button"
              className={isFound ? "reason-heart is-found" : "reason-heart"}
              style={{ "--tilt": `${(index % 2 === 0 ? -1 : 1) * (6 + (index % 3) * 3)}deg` }}
              aria-pressed={isActive}
              onClick={() => pick(reason)}
            >
              <span aria-hidden="true">♥</span>
              <span className="sr-only">{reason.text}</span>
            </button>
          );
        })}
      </div>

      <p className="reason-note" aria-live="polite">
        {active ? active.text : surprise.reasonsHeading.prompt}
      </p>
      <p className="reason-count">
        {found.size} of {surprise.reasons.length} little reasons found
      </p>
    </section>
  );
}
