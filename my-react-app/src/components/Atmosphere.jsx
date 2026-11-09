import { useMemo } from "react";

function scatter(count, make) {
  return Array.from({ length: count }, (_, id) => ({ id, ...make(id) }));
}

export default function Atmosphere() {
  const petals = useMemo(
    () =>
      scatter(9, (id) => ({
        left: `${(id * 11 + 4) % 100}%`,
        delay: `${(id * 1.7) % 12}s`,
        duration: `${15 + (id % 5) * 2}s`,
        size: 11 + (id % 4) * 3,
      })),
    [],
  );

  const hearts = useMemo(
    () =>
      scatter(7, (id) => ({
        left: `${(id * 14 + 8) % 100}%`,
        delay: `${(id * 2.1) % 14}s`,
        duration: `${18 + (id % 4) * 3}s`,
        size: 12 + (id % 4) * 4,
      })),
    [],
  );

  const sparks = useMemo(
    () =>
      scatter(14, (id) => ({
        left: `${(id * 7 + 3) % 100}%`,
        top: `${(id * 13 + 6) % 100}%`,
        delay: `${(id * 0.45) % 4}s`,
      })),
    [],
  );

  return (
    <div className="atmosphere" aria-hidden="true">
      {sparks.map((spark) => (
        <span
          key={`s-${spark.id}`}
          className="spark"
          style={{ left: spark.left, top: spark.top, animationDelay: spark.delay }}
        />
      ))}
      {petals.map((petal) => (
        <span
          key={`p-${petal.id}`}
          className="petal"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            width: petal.size,
            height: petal.size * 1.35,
          }}
        />
      ))}
      {hearts.map((heart) => (
        <span
          key={`h-${heart.id}`}
          className="floater"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
