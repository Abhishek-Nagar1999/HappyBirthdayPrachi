export default function Progress({ value, name }) {
  const safe = Math.max(0, Math.min(100, value));

  return (
    <div
      className="progress"
      role="progressbar"
      aria-valuenow={safe}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Surprise explored, ${safe} percent`}
    >
      <span className="progress-label">For {name}</span>
      <span className="progress-track" aria-hidden="true">
        <span className="progress-fill" style={{ width: `${safe}%` }} />
      </span>
      <span className="progress-value">{safe}%</span>
    </div>
  );
}
