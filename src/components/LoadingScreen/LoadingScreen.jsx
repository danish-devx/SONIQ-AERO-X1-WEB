import { useEffect, useState } from "react";
import "./LoadingScreen.css";

function LoadingScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsExiting(true), 1500);
    const completeTimer = window.setTimeout(onComplete, 2150);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`loading-screen${isExiting ? " loading-screen--exiting" : ""}`} aria-label="Loading Soniq Aero X1" role="status">
      <div className="loading-screen__content">
        <div className="loading-screen__brand">
          <span className="loading-screen__mark">S</span>
          <span>SONIQ</span>
        </div>
        <p className="loading-screen__eyebrow">Aero X1 / Wireless audio</p>
        <div className="loading-screen__progress" aria-hidden="true">
          <span />
        </div>
        <p className="loading-screen__status">Tuning your sound experience</p>
      </div>
      <span className="loading-screen__index">01 / 01</span>
    </div>
  );
}

export default LoadingScreen;
