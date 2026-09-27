import { useState } from "react";
import "./FAQ.css";

const questions = [
  [
    "Does AERO X1 work with every phone?",
    "Yes. AERO X1 pairs with iOS, Android, Mac, Windows, and any device with Bluetooth or USB-C audio.",
  ],
  [
    "How effective is the adaptive ANC?",
    "The system continuously reads your environment and adjusts in real time. Choose full silence, balanced awareness, or natural transparency.",
  ],
  [
    "Can I use it wired?",
    "Yes. USB-C audio is supported for lossless listening, and the headphones can keep playing while charging.",
  ],
  [
    "What is included in the box?",
    "AERO X1 headphones, protective travel case, USB-C cable, USB-C audio cable, and a quick start card.",
  ],
  [
    "What is the return policy?",
    "Try them for 30 days. Returns are free, simple, and covered by our two-year limited warranty.",
  ],
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="faq" id="faq">
      <div className="faq-container">
        <div className="faq-topline">
          <span>08 / QUESTIONS</span>
          <span>WE ARE LISTENING</span>
        </div>
        <div className="faq-grid">
          <div>
            <h2>
              Good to
              <br />
              <span>know.</span>
            </h2>
            <p>Still curious? Our team is one message away.</p>
            <a href="mailto:hello@soniq.audio">hello@soniq.audio ↗</a>
          </div>
          <div className="faq-list">
            {questions.map(([question, answer], index) => (
              <div
                className={`faq-item ${openIndex === index ? "open" : ""}`}
                key={question}
              >
                <button
                  type="button"
                  aria-expanded={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                >
                  <span>{question}</span>
                  <b>{openIndex === index ? "−" : "+"}</b>
                </button>
                <div className="faq-answer">
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default FAQ;
