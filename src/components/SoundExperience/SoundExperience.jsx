import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import "./SoundExperience.css";

function SoundExperience() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const specsRef = useRef(null);
  const audioRef = useRef(null);
  const stopTimerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const stopSound = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const now = audio.context.currentTime;
    audio.master.gain.cancelScheduledValues(now);
    audio.master.gain.setTargetAtTime(0, now, 0.08);
    audio.oscillators.forEach((oscillator) => oscillator.stop(now + 0.35));
    window.setTimeout(() => audio.context.close(), 450);
    audioRef.current = null;
    window.clearTimeout(stopTimerRef.current);
    setIsPlaying(false);
  };

  const toggleSound = async () => {
    if (isPlaying) {
      stopSound();
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    await context.resume();
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.14, context.currentTime + 0.8);
    master.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 6.2);
    master.connect(context.destination);

    const oscillators = [110, 164.81, 329.63].map((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = index === 2 ? "sine" : "triangle";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index * 3;
      oscillator.connect(master);
      oscillator.start();
      oscillator.stop(context.currentTime + 6.5);
      return oscillator;
    });

    audioRef.current = { context, master, oscillators };
    setIsPlaying(true);
    stopTimerRef.current = window.setTimeout(() => {
      audioRef.current = null;
      setIsPlaying(false);
      context.close();
    }, 6800);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const ctx = gsap.context(() => {
      const bars = visualRef.current.querySelectorAll(".sound-bar");
      const statItems = specsRef.current.querySelectorAll(".sound-spec");

      gsap.fromTo(
        headingRef.current,
        {
          y: 70,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        },
      );

      gsap.fromTo(
        descriptionRef.current,
        {
          y: 35,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        },
      );

      gsap.fromTo(
        statItems,
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: specsRef.current,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        bars,
        {
          scaleY: 0.15,
        },
        {
          scaleY: 1,
          duration: 1.1,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: {
            trigger: visualRef.current,
            start: "top 78%",
          },
        },
      );

      bars.forEach((bar, index) => {
        gsap.to(bar, {
          scaleY: 0.25 + Math.random() * 0.75,
          duration: 0.8 + Math.random() * 0.8,
          repeat: -1,
          yoyo: true,
          delay: index * 0.035,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      stopSound();
    };
  }, []);

  const bars = [
    0.25, 0.42, 0.68, 0.38, 0.78, 0.55, 0.9, 0.45, 0.72, 0.96, 0.62, 0.82, 0.48,
    0.74, 0.35, 0.66, 0.88, 0.52, 0.76, 0.42, 0.92, 0.58, 0.7, 0.38, 0.64, 0.84,
    0.48, 0.72, 0.56, 0.9, 0.44, 0.68, 0.82, 0.5, 0.74, 0.38, 0.62, 0.86, 0.48,
    0.7,
  ];

  return (
    <section
      ref={sectionRef}
      className={`sound-experience ${isPlaying ? "sound-is-playing" : ""}`}
      id="experience"
    >
      <div className="sound-bg-number" aria-hidden="true">
        02
      </div>

      <div className="sound-container">
        <div className="sound-topline">
          <span>02 / SOUND EXPERIENCE</span>
          <span>ENGINEERED FOR IMMERSION</span>
        </div>

        <div className="sound-grid">
          <div className="sound-content">
            <div className="sound-eyebrow">
              <span className="sound-eyebrow-dot" />
              PRECISION AUDIO
            </div>

            <h2 ref={headingRef} className="sound-title">
              Sound
              <br />
              <span>without limits.</span>
            </h2>

            <p ref={descriptionRef} className="sound-description">
              Every frequency is shaped with precision. AERO X1 combines
              powerful 40mm drivers with intelligent processing to create sound
              that feels wider, deeper and remarkably natural.
            </p>

            <button
              type="button"
              className="sound-play-button"
              onClick={toggleSound}
              aria-pressed={isPlaying}
            >
              <span className="sound-play-icon" aria-hidden="true">
                {isPlaying ? "■" : "▶"}
              </span>
              <span>
                {isPlaying ? "Pause sound profile" : "Play sound profile"}
              </span>
              <small>
                {isPlaying ? "06 SEC / PLAYING" : "USER INITIATED / 06 SEC"}
              </small>
            </button>

            <div ref={specsRef} className="sound-specs">
              <div className="sound-spec">
                <strong>40mm</strong>
                <span>Custom Drivers</span>
              </div>

              <div className="sound-spec-divider" />

              <div className="sound-spec">
                <strong>24-bit</strong>
                <span>Hi-Res Audio</span>
              </div>

              <div className="sound-spec-divider" />

              <div className="sound-spec">
                <strong>360°</strong>
                <span>Spatial Sound</span>
              </div>
            </div>
          </div>

          <div ref={visualRef} className="sound-visual">
            <div className="sound-frame">
              <div className="sound-frame-corner top-left" />
              <div className="sound-frame-corner top-right" />
              <div className="sound-frame-corner bottom-left" />
              <div className="sound-frame-corner bottom-right" />

              <div className="sound-bars">
                {bars.map((height, index) => (
                  <span
                    key={index}
                    className="sound-bar"
                    style={{
                      height: `${35 + height * 65}%`,
                    }}
                  />
                ))}
              </div>

              <div className="sound-center">
                <div className="sound-center-ring">
                  <span>SONIQ</span>
                </div>

                <small>
                  PURE
                  <br />
                  IMMERSION
                </small>
              </div>

              <span className="sound-label sound-label-top">LOW</span>

              <span className="sound-label sound-label-mid">MID</span>

              <span className="sound-label sound-label-bottom">HIGH</span>

              <span className="sound-frequency">20Hz — 40kHz</span>
            </div>

            <div className="sound-visual-caption">
              <span>SONIQ AERO ENGINE</span>
              <span>01.04 / AUDIO</span>
            </div>
          </div>
        </div>

        <div className="sound-bottom">
          <span className="sound-bottom-line" />

          <p>Engineered to make every detail audible.</p>

          <span className="sound-bottom-number">40MM</span>
        </div>
      </div>
    </section>
  );
}

export default SoundExperience;
