import "./Footer.css";

const exploreLinks = [
  ["Experience", "#experience"],
  ["Technology", "#technology"],
  ["Design", "#design"],
  ["Specifications", "#specs"],
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-hero">
          <div>
            <a className="footer-logo" href="#home" aria-label="SONIQ home"><span>S</span><b>SONIQ</b></a>
            <p className="footer-tagline">Sound, refined.<br />Made for the way forward.</p>
          </div>
          <div className="footer-hero-copy"><span>THE HOURS BETWEEN</span><strong>Make space<br /><em>for what matters.</em></strong></div>
          <a className="footer-top" href="#home">Back to top <span aria-hidden="true">↑</span></a>
        </div>

        <div className="footer-wordmark" aria-hidden="true">SONIQ</div>

        <div className="footer-content">
          <div className="footer-status"><span className="footer-status-dot" />AERO X1 / AVAILABLE NOW</div>
          <div className="footer-links">
            <div><span>Explore</span>{exploreLinks.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>
            <div><span>Connect</span><a href="mailto:hello@soniq.audio">Support</a><a href="#faq">FAQ</a><a href="#shop">Shop AERO X1</a></div>
            <div><span>Follow</span><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.youtube.com" target="_blank" rel="noreferrer">YouTube ↗</a><a href="mailto:hello@soniq.audio">hello@soniq.audio</a></div>
          </div>
        </div>

        <div className="footer-bottom"><span>© 2026 SONIQ AUDIO</span><span>DESIGNED FOR DEEP LISTENING</span><span><a href="#privacy">Privacy</a> / <a href="#terms">Terms</a></span></div>
      </div>
    </footer>
  );
}

export default Footer;
