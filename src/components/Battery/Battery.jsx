import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Battery.css";

const batteryStats = [["40", "h", "total playback"], ["10", "m", "for 5 hours"], ["24", "/ 7", "always ready"]];

function Battery() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(".battery-reveal", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: .8, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="battery-section" id="battery">
      <div className="battery-container">
        <div className="battery-topline battery-reveal"><span>05 / POWER SYSTEM</span><span>READY WHEN YOU ARE</span></div>
        <div className="battery-heading battery-reveal">
          <div><p className="battery-kicker">ONE CHARGE / ONE WEEKEND</p><h2 className="battery-title">Power that<br /><span>keeps pace.</span></h2></div>
          <p className="battery-copy">Up to 40 hours of listening, with a fast charge that turns a coffee break into an entire evening of music. No low-battery anxiety. Just press play.</p>
        </div>

        <div className="battery-dashboard">
          <div className="battery-visual battery-reveal">
            <div className="battery-visual-header"><span>LIVE POWER / 01</span><span>CONNECTED</span></div>
            <div className="battery-orbit"><div className="battery-orbit-track" /><div className="battery-orbit-progress" /><div className="battery-orbit-core"><strong>84</strong><span>% charged</span></div></div>
            <div className="battery-visual-footer"><span>32H 18M REMAINING</span><span>LAST SYNC / NOW</span></div>
          </div>

          <div className="battery-details battery-reveal">
            <div className="battery-detail-head"><span>CHARGE PROFILE</span><strong>USB-C</strong></div>
            <div className="battery-charge-line"><span className="charge-point active" /><span className="charge-line" /><span className="charge-point active" /><span className="charge-line" /><span className="charge-point" /></div>
            <div className="battery-charge-labels"><span>0%</span><span>10 MIN</span><span>100%</span></div>
            <div className="battery-detail-copy"><strong>Fast when it counts.</strong><p>Ten minutes connected gives you five hours of uninterrupted listening.</p></div>
            <div className="battery-detail-note"><span>01</span><p>Universal USB-C charging<br />works with the gear you already carry.</p></div>
          </div>
        </div>

        <div className="battery-stats battery-reveal">{batteryStats.map(([value, suffix, label]) => <div key={label}><strong>{value}<span>{suffix}</span></strong><span>{label}</span></div>)}</div>
      </div>
    </section>
  );
}

export default Battery;
