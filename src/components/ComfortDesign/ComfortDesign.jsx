import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ComfortDesign.css";

const designNotes = [
  [
    "01",
    "Pressure-balanced",
    "Memory foam cushions distribute contact evenly for long sessions.",
  ],
  [
    "02",
    "Featherweight frame",
    "A 248g magnesium composite frame disappears on your head.",
  ],
  [
    "03",
    "Quiet geometry",
    "Every hinge and surface is shaped to stay out of the way.",
  ],
];

function ComfortDesign() {
  const sectionRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".comfort-reveal",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="comfort-design" id="design-detail">
      <div className="comfort-container">
        <div className="comfort-topline comfort-reveal">
          <span>04 / COMFORT DESIGN</span>
          <span>THE QUIET FIT</span>
        </div>
        <div className="comfort-heading-row">
          <h2 className="comfort-title comfort-reveal">
            Made for the
            <br />
            <span>hours between.</span>
          </h2>
          <p className="comfort-intro comfort-reveal">
            AERO X1 is shaped around the way real people listen: moving,
            working, travelling, and staying with the moment a little longer.
          </p>
        </div>
        <div className="comfort-layout">
          <div className="comfort-orbit comfort-reveal">
            <div className="comfort-orbit-core">
              248<span>g</span>
            </div>
            <div className="comfort-orbit-line line-a" />
            <div className="comfort-orbit-line line-b" />
            <span className="comfort-orbit-label label-a">LOW PRESSURE</span>
            <span className="comfort-orbit-label label-b">ALL DAY FIT</span>
          </div>
          <div className="comfort-notes">
            {designNotes.map(([number, title, copy]) => (
              <article className="comfort-note comfort-reveal" key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
                <b aria-hidden="true">↗</b>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComfortDesign;
