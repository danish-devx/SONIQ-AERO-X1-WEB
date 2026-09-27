import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./ProductShowcase.css";

const finishes = ["Obsidian", "Titanium", "Cloud"];

function ProductShowcase() {
  const sectionRef = useRef(null);
  const [selectedFinish, setSelectedFinish] = useState(finishes[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".showcase-reveal",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="product-showcase" id="design">
      <div className="showcase-container">
        <div className="showcase-topline showcase-reveal">
          <span>03 / THE OBJECT</span>
          <span>MADE TO DISAPPEAR</span>
        </div>
        <div className="showcase-grid">
          <div className="showcase-copy">
            <p className="showcase-kicker showcase-reveal">
              AERO X1 / FORM STUDY
            </p>
            <h2 className="showcase-title showcase-reveal">
              Nothing extra.
              <br />
              <span>Everything considered.</span>
            </h2>
            <p className="showcase-description showcase-reveal">
              Sculpted for long listening, balanced for real life. The AERO X1
              keeps every surface purposeful so the technology feels quiet
              before you even press play.
            </p>
            <a className="showcase-link showcase-reveal" href="#shop">
              Explore the details <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="showcase-object showcase-reveal" aria-hidden="true">
            <div className="showcase-halo" />
            <div className="showcase-ring showcase-ring-one" />
            <div className="showcase-ring showcase-ring-two" />
            <div className="showcase-object-label">AERO / X1</div>
            <div className="showcase-object-mark">S</div>
            <div className="showcase-object-caption">248G / 40H / ANC</div>
          </div>
        </div>
        <div className="showcase-footer">
          <div className="showcase-finish showcase-reveal">
            <span>Choose your finish · {selectedFinish}</span>
            <div>
              {finishes.map((finish) => (
                <button
                  key={finish}
                  className={selectedFinish === finish ? "selected" : ""}
                  type="button"
                  aria-label={`${finish} finish`}
                  aria-pressed={selectedFinish === finish}
                  onClick={() => setSelectedFinish(finish)}
                >
                  {finish[0]}
                </button>
              ))}
            </div>
          </div>
          <div className="showcase-price showcase-reveal">
            <span>Available now</span>
            <strong>$299</strong>
          </div>
          <a href="#shop" className="showcase-buy showcase-reveal">
            <span>Reserve AERO X1</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;
