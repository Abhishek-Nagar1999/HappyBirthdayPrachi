import { useRef, useState } from "react";

export default function MusicToggle({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hint, setHint] = useState("");

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      setHint("");
    } catch {
      setPlaying(false);
      setHint("Couldn’t play yet. You can drop a song into public/assets/music.");
    }
  };

  return (
    <div className="music-dock">
      <button
        type="button"
        className={playing ? "music-btn is-on" : "music-btn"}
        aria-pressed={playing}
        aria-describedby={hint ? "music-hint" : undefined}
        onClick={toggle}
      >
        <span aria-hidden="true">{playing ? "♫" : "♪"}</span>
        <span className="sr-only">{playing ? "Pause music" : "Play music"}</span>
      </button>
      <span className="music-label" aria-hidden="true">
        {playing ? "Playing" : "Music"}
      </span>
      {hint ? (
        <p id="music-hint" className="music-hint" role="status">
          {hint}
        </p>
      ) : null}
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        loop
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
    </div>
  );
}
