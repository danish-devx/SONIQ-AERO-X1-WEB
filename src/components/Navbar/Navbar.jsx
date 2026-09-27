import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Navbar.css";

const navLinks = [
  { name: "Technology", href: "#technology" },
  { name: "Experience", href: "#experience" },
  { name: "Design", href: "#design" },
  { name: "Specs", href: "#specs" },
];

function Navbar() {
  const navbarRef = useRef(null);
  const menuRef = useRef(null);
  const menuLinksRef = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const navbar = navbarRef.current;

    const sections = ["home", ...navLinks.map((link) => link.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .sort(
        (firstSection, secondSection) =>
          firstSection.offsetTop - secondSection.offsetTop,
      );
    const updateNavigation = () => {
      navbar.classList.toggle("navbar-scrolled", window.scrollY > 30);

      const marker = window.scrollY + Math.min(window.innerHeight * 0.35, 300);
      let currentSection = "home";

      sections.forEach((section) => {
        if (section.offsetTop <= marker) currentSection = section.id;
      });

      setActiveSection((previousSection) =>
        previousSection === currentSection ? previousSection : currentSection,
      );
    };

    updateNavigation();
    window.addEventListener("scroll", updateNavigation, { passive: true });
    window.addEventListener("resize", updateNavigation);

    return () => {
      window.removeEventListener("scroll", updateNavigation);
      window.removeEventListener("resize", updateNavigation);
    };
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    if (menuOpen) {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.fromTo(
        menuLinksRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.15,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.45,
        ease: "power3.inOut",
      });
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((previous) => !previous);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleNavClick = (event, href) => {
    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 88;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.history.pushState({}, "", href);
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
    closeMenu();
  };

  return (
    <>
      <header ref={navbarRef} className="navbar">
        <div className="navbar-container">
          <a
            href="#home"
            className="navbar-logo"
            aria-label="SONIQ Home"
            onClick={(event) => handleNavClick(event, "#home")}
          >
            <span className="navbar-logo-mark">S</span>
            <span>SONIQ</span>
          </a>

          <nav className="navbar-links" aria-label="Main navigation">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className={
                  activeSection === link.href.slice(1) ? "is-active" : ""
                }
              >
                <span className="navbar-link-index">0{index + 1}</span>
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          <a
            href="#shop"
            className="navbar-cta"
            onClick={(event) => handleNavClick(event, "#shop")}
          >
            <span>Get AERO X1</span>
            <span className="navbar-cta-arrow" aria-hidden="true">
              ↗
            </span>
          </a>

          <button
            type="button"
            className={`menu-button ${menuOpen ? "menu-button-active" : ""}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}
      >
        <div className="mobile-menu-header">
          <span>SONIQ / 2026</span>
          <span>MENU</span>
        </div>
        <nav aria-label="Mobile navigation">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href)}
              ref={(element) => {
                menuLinksRef.current[index] = element;
              }}
            >
              <span>0{index + 1}</span>
              {link.name}
            </a>
          ))}

          <a
            href="#shop"
            className="mobile-menu-cta"
            ref={(element) => {
              menuLinksRef.current[navLinks.length] = element;
            }}
            onClick={(event) => handleNavClick(event, "#shop")}
          >
            Shop AERO X1 <span>↗</span>
          </a>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
