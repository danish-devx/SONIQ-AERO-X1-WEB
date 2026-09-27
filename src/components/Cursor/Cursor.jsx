import { useEffect, useRef } from "react";
import "./Cursor.css";

function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let animationFrame;

    const handlePointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
    };
    const animateRing = () => {
      ringX += (targetX - ringX) * 0.24;
      ringY += (targetY - ringY) * 0.24;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      animationFrame = window.requestAnimationFrame(animateRing);
    };
    const handlePointerOver = (event) => {
      if (event.target.closest("a, button, input, [data-cursor-hover]")) document.body.classList.add("cursor-hovering");
    };
    const handlePointerOut = (event) => {
      if (!event.relatedTarget?.closest?.("a, button, input, [data-cursor-hover]")) document.body.classList.remove("cursor-hovering");
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    animationFrame = window.requestAnimationFrame(animateRing);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      window.cancelAnimationFrame(animationFrame);
      document.body.classList.remove("cursor-hovering");
    };
  }, []);

  return <><span ref={cursorRef} className="custom-cursor" aria-hidden="true" /><span ref={ringRef} className="custom-cursor-ring" aria-hidden="true" /></>;
}

export default Cursor;
