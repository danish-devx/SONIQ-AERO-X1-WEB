import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./AdaptiveANC.css";

const ANC_LEVELS = [
  {
    id: "silent",
    number: "01",
    title: "Silent",
    value: 100,
    description:
      "Maximum noise reduction for deep focus, travel, and moments when you need the world to disappear.",
  },
  {
    id: "aware",
    number: "02",
    title: "Aware",
    value: 55,
    description:
      "Stay immersed in your music while keeping important sounds around you within reach.",
  },
  {
    id: "off",
    number: "03",
    title: "Open",
    value: 0,
    description:
      "Let your surroundings in naturally when you want a completely open listening experience.",
  },
];

function AdaptiveANC() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const waveRef = useRef(null);

  const [activeLevel, setActiveLevel] = useState("silent");

  const currentLevel = ANC_LEVELS.find(
    (level) => level.id === activeLevel
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduceMotion) {
        gsap.set(
          [
            ".anc-eyebrow",
            ".anc-heading",
            ".anc-intro",
            ".anc-controls",
            ".anc-visual",
            ".anc-bottom-content",
          ],
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
          }
        );

        return;
      }

      /* -----------------------------------------
         Eyebrow
      ----------------------------------------- */

      gsap.from(".anc-eyebrow", {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".adaptive-anc",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      /* -----------------------------------------
         Main Heading
      ----------------------------------------- */

      gsap.from(".anc-heading", {
        y: 75,
        opacity: 0,
        duration: 1,
        ease: "power4.out",

        scrollTrigger: {
          trigger: ".adaptive-anc",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      /* -----------------------------------------
         Intro
      ----------------------------------------- */

      gsap.from(".anc-intro", {
        y: 35,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".adaptive-anc",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      /* -----------------------------------------
         Controls
      ----------------------------------------- */

      gsap.from(".anc-controls", {
        x: -50,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".anc-main",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      /* -----------------------------------------
         Visual
      ----------------------------------------- */

      gsap.from(".anc-visual", {
        x: 80,
        opacity: 0,
        scale: 0.9,
        duration: 1.1,
        ease: "power4.out",

        scrollTrigger: {
          trigger: ".anc-main",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      /* -----------------------------------------
         Bottom Content
      ----------------------------------------- */

      gsap.from(".anc-bottom-content", {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".anc-bottom",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      /* -----------------------------------------
         Floating Noise Particles
      ----------------------------------------- */

      gsap.to(".anc-noise-dot", {
        y: -18,
        opacity: 0.25,
        duration: 2.2,
        stagger: {
          each: 0.18,
          repeat: -1,
          yoyo: true,
        },
        ease: "sine.inOut",
      });

      /* -----------------------------------------
         Visual Rotation
      ----------------------------------------- */

      gsap.to(".anc-orbit", {
        rotation: 360,
        duration: 32,
        repeat: -1,
        ease: "none",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* -----------------------------------------
     Active ANC animation
  ----------------------------------------- */

  useEffect(() => {
    if (!visualRef.current || !waveRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    gsap.fromTo(
      visualRef.current,
      {
        scale: 0.96,
        opacity: 0.75,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      waveRef.current,
      {
        scale: 0.85,
        opacity: 0.4,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.65,
        ease: "power3.out",
      }
    );
  }, [activeLevel]);

  return (
    <section
      ref={sectionRef}
      className="adaptive-anc"
      id="anc"
    >
      <div className="anc-container">

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="anc-header">

          <span className="anc-eyebrow">
            SONIQ / ADAPTIVE ANC
          </span>

          <h2 className="anc-heading">
            Silence,
            <span>when you need it.</span>
          </h2>

          <p className="anc-intro">
            AERO X1 continuously responds to your environment,
            giving you control over how much of the outside world
            reaches your ears.
          </p>

        </div>


        {/* =========================================
            MAIN ANC AREA
        ========================================= */}

        <div className="anc-main">

          {/* LEFT CONTROL PANEL */}

          <div className="anc-controls">

            <div className="anc-control-top">

              <span className="anc-control-label">
                NOISE CONTROL
              </span>

              <span className="anc-control-status">
                ACTIVE
              </span>

            </div>


            <div className="anc-levels">

              {ANC_LEVELS.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  className={`anc-level ${
                    activeLevel === level.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveLevel(level.id)
                  }
                  aria-pressed={
                    activeLevel === level.id
                  }
                >
                  <span className="anc-level-number">
                    {level.number}
                  </span>

                  <span className="anc-level-info">

                    <strong>
                      {level.title}
                    </strong>

                    <small>
                      {level.value === 100
                        ? "Maximum isolation"
                        : level.value === 55
                        ? "Balanced awareness"
                        : "Natural environment"}
                    </small>

                  </span>

                  <span className="anc-level-indicator">
                    {activeLevel === level.id
                      ? "●"
                      : "○"}
                  </span>
                </button>
              ))}

            </div>


            <div className="anc-description">

              <span>
                {currentLevel.value}% CONTROL
              </span>

              <p>
                {currentLevel.description}
              </p>

            </div>


            <div className="anc-micro-stats">

              <div>
                <strong>∞</strong>
                <span>adaptive response</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>environment aware</span>
              </div>

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div
            ref={visualRef}
            className="anc-visual"
            aria-hidden="true"
          >

            <div className="anc-visual-header">

              <span>
                AERO X1
              </span>

              <span>
                {currentLevel.title.toUpperCase()}
              </span>

            </div>


            {/* NOISE FIELD */}

            <div className="anc-noise-field">

              <span className="anc-noise-dot dot-1"></span>
              <span className="anc-noise-dot dot-2"></span>
              <span className="anc-noise-dot dot-3"></span>
              <span className="anc-noise-dot dot-4"></span>
              <span className="anc-noise-dot dot-5"></span>
              <span className="anc-noise-dot dot-6"></span>
              <span className="anc-noise-dot dot-7"></span>
              <span className="anc-noise-dot dot-8"></span>

            </div>


            {/* CENTRAL SYSTEM */}

            <div className="anc-system">

              <div className="anc-orbit">

                <span></span>
                <span></span>
                <span></span>

              </div>


              <div
                ref={waveRef}
                className="anc-wave-field"
              >

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>


              <div className="anc-core">

                <span className="anc-core-small">
                  SONIQ
                </span>

                <strong>
                  ANC
                </strong>

                <span className="anc-core-mode">
                  {currentLevel.title}
                </span>

              </div>

            </div>


            {/* NOISE LABELS */}

            <div className="anc-label anc-label-left">
              <span>OUTSIDE</span>
              <strong>NOISE</strong>
            </div>

            <div className="anc-label anc-label-right">
              <span>INSIDE</span>
              <strong>FOCUS</strong>
            </div>


            <div className="anc-visual-footer">

              <span>
                REAL-TIME PROCESSING
              </span>

              <span>
                {String(currentLevel.value).padStart(3, "0")}
              </span>

            </div>

          </div>

        </div>


        {/* =========================================
            BOTTOM FEATURES
        ========================================= */}

        <div className="anc-bottom">

          <div className="anc-bottom-content">

            <span className="anc-feature-number">
              01
            </span>

            <div>
              <h3>
                Hear less.
              </h3>

              <p>
                Reduce unwanted background noise without
                changing the character of your music.
              </p>
            </div>

          </div>


          <div className="anc-bottom-content">

            <span className="anc-feature-number">
              02
            </span>

            <div>
              <h3>
                Hear more.
              </h3>

              <p>
                Switch to awareness when you need to stay
                connected with your surroundings.
              </p>
            </div>

          </div>


          <div className="anc-bottom-content">

            <span className="anc-feature-number">
              03
            </span>

            <div>
              <h3>
                Stay in control.
              </h3>

              <p>
                Three listening modes let you decide how much
                of the outside world gets through.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AdaptiveANC;