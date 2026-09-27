import { useState } from "react";
import "./Newsletter.css";

function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  return <section className="newsletter"><div className="newsletter-container"><div><p className="newsletter-kicker">THE SONIQ SIGNAL</p><h2>Stay close<br /><span>to the sound.</span></h2></div><div className="newsletter-form-wrap">{submitted ? <p className="newsletter-success">You are on the list. We will be in touch.</p> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label htmlFor="newsletter-email">Product drops, listening notes, and considered updates.</label><div><input id="newsletter-email" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Join the Soniq newsletter">↗</button></div></form>}<span className="newsletter-note">No noise. Unsubscribe anytime.</span></div></div></section>;
}
export default Newsletter;
