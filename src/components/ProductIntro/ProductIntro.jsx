import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ProductIntro.css";

function ProductIntro() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef(null);
  const specRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        });

        tl.fromTo(
          eyebrowRef.current,
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
        );

        tl.fromTo(
          titleRef.current,
          {
            y: 55,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.4",
        );

        tl.fromTo(
          descriptionRef.current,
          {
            y: 30,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.55",
        );

        tl.fromTo(
          featuresRef.current?.children,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.35",
        );

        tl.fromTo(
          specRef.current,
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3",
        );
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="product-intro" id="technology">
      <div className="product-intro-bg-word" aria-hidden="true">
        SONIQ
      </div>

      <div className="product-intro-container">
        <div ref={eyebrowRef} className="product-intro-eyebrow">
          <span className="product-intro-eyebrow-line" />

          <span>01 / PRODUCT PHILOSOPHY</span>

          <span className="product-intro-eyebrow-number">AERO X1</span>
        </div>

        <div className="product-intro-main">
          <div className="product-intro-heading-wrap">
            <h2 ref={titleRef} className="product-intro-title">
              Built around
              <br />
              <span>silence.</span>
            </h2>
          </div>

          <div ref={descriptionRef} className="product-intro-copy">
            <div className="product-intro-copy-number">01</div>

            <p>
              AERO X1 is designed around one simple idea: great sound should
              feel effortless.
            </p>

            <p>
              From adaptive noise cancellation to its precision-tuned acoustic
              architecture, every element is engineered to remove distractions
              and bring your attention back to what matters.
            </p>

            <div className="product-intro-copy-line">
              <span />
            </div>

            <span className="product-intro-copy-caption">
              PRECISION / COMFORT / CONTROL
            </span>
          </div>
        </div>

        <div ref={featuresRef} className="product-intro-features">
          <article className="product-intro-feature">
            <div className="product-intro-feature-top">
              <span>01</span>

              <span className="product-intro-feature-mark">↗</span>
            </div>

            <div className="product-intro-feature-icon">
              <span />
            </div>

            <h3>
              Adaptive
              <br />
              Silence
            </h3>

            <p>
              Intelligent noise cancellation continuously responds to your
              environment for a quieter, more focused listening experience.
            </p>
          </article>

          <article className="product-intro-feature">
            <div className="product-intro-feature-top">
              <span>02</span>

              <span className="product-intro-feature-mark">↗</span>
            </div>

            <div className="product-intro-feature-icon product-intro-feature-icon--rings">
              <span />
            </div>

            <h3>
              Spatial
              <br />
              Clarity
            </h3>

            <p>
              Precision-tuned drivers create a detailed, balanced soundstage
              designed to keep every layer of your music present.
            </p>
          </article>

          <article className="product-intro-feature">
            <div className="product-intro-feature-top">
              <span>03</span>

              <span className="product-intro-feature-mark">↗</span>
            </div>

            <div className="product-intro-feature-icon product-intro-feature-icon--dot">
              <span />
            </div>

            <h3>
              All-Day
              <br />
              Comfort
            </h3>

            <p>
              Balanced weight, soft memory cushions and a carefully shaped
              headband keep AERO X1 comfortable from morning to night.
            </p>
          </article>
        </div>

        <div ref={specRef} className="product-intro-specs">
          <div className="product-intro-spec">
            <span>DRIVER</span>
            <strong>40MM</strong>
          </div>

          <div className="product-intro-spec-divider" />

          <div className="product-intro-spec">
            <span>BATTERY</span>
            <strong>40 HRS</strong>
          </div>

          <div className="product-intro-spec-divider" />

          <div className="product-intro-spec">
            <span>LATENCY</span>
            <strong>&lt; 40MS</strong>
          </div>

          <div className="product-intro-spec-divider" />

          <div className="product-intro-spec">
            <span>WEIGHT</span>
            <strong>248G</strong>
          </div>

          <div className="product-intro-spec-divider" />

          <div className="product-intro-spec">
            <span>CODEC</span>
            <strong>HI-RES</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductIntro;
