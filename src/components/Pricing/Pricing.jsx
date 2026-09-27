import { useEffect, useState } from "react";
import "./Pricing.css";

const finishes = [
  { name: "Obsidian", className: "obsidian", colorway: "obsidian" },
  { name: "Titanium", className: "titanium", colorway: "titanium" },
  { name: "Cloud", className: "cloud", colorway: "cloud" },
];

const included = ["AERO X1 headphones", "Travel case", "USB-C audio cable"];

function Pricing({ colorway, onColorwayChange }) {
  const selectedFinish =
    finishes.find((finish) => finish.colorway === colorway) || finishes[0];
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    if (!isCheckoutOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsCheckoutOpen(false);
    };

    document.body.classList.add("modal-open");
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCheckoutOpen]);

  return (
    <section className="pricing" id="shop">
      <div className="pricing-container">
        <div className="pricing-topline">
          <span>07 / MAKE IT YOURS</span>
          <span>READY WHEN YOU ARE</span>
        </div>

        <div className="pricing-intro">
          <div>
            <p className="pricing-kicker">THE EVERYDAY FLAGSHIP</p>
            <h2>
              One great
              <br />
              <span>decision.</span>
            </h2>
          </div>
          <p className="pricing-copy">
            The complete AERO X1 experience, with every cable, case, and quiet
            detail included. Choose the finish that belongs in your everyday.
          </p>
        </div>

        <div className="pricing-builder">
          <div className="pricing-product-stage">
            <div className="pricing-stage-mark">S</div>
            <div className="pricing-stage-ring" />
            <span className="pricing-stage-label">AERO / X1</span>
            <span className="pricing-stage-caption">
              {selectedFinish.name.toUpperCase()} FINISH
            </span>
          </div>

          <div className="pricing-options">
            <div className="pricing-option-group">
              <span className="pricing-label">SELECT FINISH</span>
              <div className="pricing-finishes">
                {finishes.map((finish) => (
                  <button
                    key={finish.name}
                    type="button"
                    className={
                      selectedFinish.colorway === finish.colorway
                        ? "is-selected"
                        : ""
                    }
                    onClick={() => onColorwayChange(finish.colorway)}
                    aria-pressed={selectedFinish.colorway === finish.colorway}
                  >
                    <i className={finish.className} />
                    {finish.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pricing-option-group">
              <span className="pricing-label">IN THE BOX</span>
              <ul className="pricing-included">
                {included.map((item) => (
                  <li key={item}>
                    <span>+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pricing-card">
            <div className="pricing-card-top">
              <span>AERO X1 / {selectedFinish.name.toUpperCase()}</span>
              <span>01 / 01</span>
            </div>
            <div className="pricing-price">
              <small>Starting at</small>
              <strong>$299</strong>
              <span>or 4 payments of $74.75</span>
            </div>
            <button
              type="button"
              className="pricing-buy"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Choose AERO X1 <span>→</span>
            </button>
            <div className="pricing-trust">
              <span>Free shipping</span>
              <span>30-day returns</span>
              <span>2-year warranty</span>
            </div>
          </div>
        </div>
      </div>
      {isCheckoutOpen && (
        <div
          className="checkout-backdrop"
          role="presentation"
          onClick={() => setIsCheckoutOpen(false)}
        >
          <div
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="checkout-close"
              aria-label="Close purchase dialog"
              onClick={() => setIsCheckoutOpen(false)}
            >
              ×
            </button>
            <span className="checkout-kicker">AERO X1 / READY TO RESERVE</span>
            <h3 id="checkout-title">
              Your listening
              <br />
              <span>starts here.</span>
            </h3>
            <div className="checkout-summary">
              <span>{selectedFinish.name} finish</span>
              <strong>$299</strong>
            </div>
            <p>
              Production checkout is ready to connect. Your selected finish has
              been saved for the next step.
            </p>
            <button
              type="button"
              className="checkout-confirm"
              onClick={() => setIsCheckoutOpen(false)}
            >
              Continue to checkout <span>→</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Pricing;
