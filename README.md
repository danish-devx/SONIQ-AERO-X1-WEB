# SONIQ AERO X1

<p align="center">
	<strong>A premium interactive product experience for next-generation wireless headphones.</strong>
</p>

<p align="center">
	<a href="https://soniq-aero-x1-web.vercel.app/">View Live Demo</a>
	&nbsp;&middot;&nbsp;
	<a href="https://github.com/danish-devx">Author Profile</a>
</p>

<p align="center">
	<a href="https://soniq-aero-x1-web.vercel.app/"><img src="https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Live demo on Vercel"></a>
	<img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19">
	<img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8">
	<img src="https://img.shields.io/badge/Three.js-3D%20Experience-black?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js 3D experience">
</p>

> A frontend-only headphone launch experience built to make product storytelling feel tactile, cinematic, and responsive.

## Overview

SONIQ AERO X1 is a React product showcase designed around three ideas:

- Immersive product presentation through a custom React Three Fiber model.
- Quiet editorial visual design with warm paper surfaces, dark technical panels, and a lime brand accent.
- Small but meaningful interactions: colorway selection, ANC modes, sound profile playback, FAQ accordion, newsletter state, cursor feedback, and purchase confirmation.

## Experience Highlights

| Area | What is included |
| --- | --- |
| Product reveal | Interactive 3D headphone model with auto-rotation, orbit controls, lighting, and three finishes |
| Sound | User-initiated Web Audio profile with animated playback state |
| Adaptive ANC | Silent, Aware, and Transparency modes with responsive noise-field feedback |
| Purchase flow | Finish selection, synchronized product details, and a keyboard-friendly confirmation modal |
| Interface | Responsive navigation, reduced-motion support, FAQ accordion, newsletter state, and custom cursor |

## Tech Stack

 - React 19
 - Vite
 - React Three Fiber
 - Three.js
 - Drei
 - GSAP and ScrollTrigger
 - Tailwind CSS v4 through the Vite plugin
 - Manrope and IBM Plex Mono typography
 - ESLint

 ## Requirements

 - Node.js 18 or newer
 - npm
 - A modern browser with WebGL support for the 3D hero

 ## Getting Started

 Install dependencies:

 ```bash
 npm install
 ```

 Start the development server:

 ```bash
 npm run dev
 ```

 Vite will print the local URL, normally `http://localhost:5173`.

 Create a production build:

 ```bash
 npm run build
 ```

 Preview the production build:

 ```bash
 npm run preview
 ```

 Run ESLint:

 ```bash
 npm run lint
 ```

 ## Page Flow

 The page is composed in `src/App.jsx` in this order:

 1. Hero and interactive 3D headphone model
 2. Product philosophy / technology
 3. Sound experience
 4. Adaptive ANC controls
 5. Product design showcase
 6. Comfort design
 7. Power system and battery
 8. Technical specifications
 9. Pricing and finish selection
 10. FAQ accordion
 11. Newsletter signup state
 12. Footer

 ## Navigation Anchors

 The navbar exposes the main chapters rather than every section:

 | Menu item | Target | Page section |
 | --- | --- | --- |
 | Technology | `#technology` | Product philosophy |
 | Experience | `#experience` | Sound experience |
 | Design | `#design` | Product showcase |
 | Specs | `#specs` | Technical specifications |
 | Get AERO X1 | `#shop` | Pricing and purchase UI |

 Navigation uses controlled scrolling with a fixed-header offset. The active underline is calculated from the actual document order so it remains stable when sections overlap the viewport marker.

 ## Interactive Features

 ### 3D product model

 The Hero section builds the AERO X1 headphone model from Three.js geometry. It includes:

 - Titanium, Obsidian, and Cloud colorways.
 - Metallic shell and band materials.
 - Local `RoomEnvironment` lighting with no external environment dependency.
 - Orbit controls, auto-rotation, contact shadows, responsive camera behavior, and floating motion.

 The selected colorway is lifted to App state. Hero and Pricing always stay synchronized.

 ### Sound experience

 The Sound Experience section contains a user-initiated six-second Web Audio profile. It never autoplays. The button resumes the browser audio context, starts a layered ambient tone, updates its play state, and cleans up the audio context when stopped or unmounted.

 ### Adaptive ANC

 The ANC section offers Silent, Aware, and Transparency modes with animated noise-field feedback. Controls expose `aria-pressed` state for assistive technology.

 ### Pricing and purchase UI

 The pricing builder supports:

 - Shared Obsidian, Titanium, and Cloud finish selection.
 - Finish details reflected in the product card.
 - Purchase confirmation modal.
 - Escape-key and backdrop close behavior.
 - Body scroll lock while the modal is open.

 The modal is a frontend confirmation flow. It is not connected to a payment provider.

 ### Other interactions

 - FAQ accordion with expanded state.
 - Newsletter form with a local success state.
 - Custom cursor on fine-pointer desktop devices only.
 - Hover states for links, buttons, cards, and product controls.
 - Reduced-motion support for page transitions and scroll animation.

 ## Folder Structure

 ```text
 .
 ├── eslint.config.js
 ├── index.html
 ├── package.json
 ├── README.md
 ├── vite.config.js
 ├── public/
 │   ├── favicon.svg
 │   └── icons.svg
 └── src/
	 ├── App.jsx
	 ├── App.css
	 ├── index.css
	 ├── main.jsx
	 ├── assets/
	 │   ├── hero.png
	 │   ├── react.svg
	 │   └── vite.svg
	 └── components/
		 ├── AdaptiveANC/
		 │   ├── AdaptiveANC.jsx
		 │   └── AdaptiveANC.css
		 ├── Battery/
		 │   ├── Battery.jsx
		 │   └── Battery.css
		 ├── ComfortDesign/
		 │   ├── ComfortDesign.jsx
		 │   └── ComfortDesign.css
		 ├── Cursor/
		 │   ├── Cursor.jsx
		 │   └── Cursor.css
		 ├── FAQ/
		 │   ├── FAQ.jsx
		 │   └── FAQ.css
		 ├── Footer/
		 │   ├── Footer.jsx
		 │   └── Footer.css
		 ├── Hero/
		 │   ├── Hero.jsx
		 │   └── Hero.css
		 ├── Navbar/
		 │   ├── Navbar.jsx
		 │   └── Navbar.css
		 ├── Newsletter/
		 │   ├── Newsletter.jsx
		 │   └── Newsletter.css
		 ├── Pricing/
		 │   ├── Pricing.jsx
		 │   └── Pricing.css
		 ├── ProductIntro/
		 │   ├── ProductIntro.jsx
		 │   └── ProductIntro.css
		 ├── ProductShowcase/
		 │   ├── ProductShowcase.jsx
		 │   └── ProductShowcase.css
		 ├── SmartFeatures/
		 │   ├── SmartFeatures.jsx
		 │   └── SmartFeatures.css
		 ├── SoundExperience/
		 │   ├── SoundExperience.jsx
		 │   └── SoundExperience.css
		 ├── Specifications/
		 │   ├── Specifications.jsx
		 │   └── Specifications.css
		 └── Testimonials/
			 ├── Testimonials.jsx
			 └── Testimonials.css
 ```

 `SmartFeatures` and `Testimonials` are currently reserved component folders. They are not imported by `App.jsx` yet, so they do not render on the live page.

 ## Styling System

 Global design tokens are defined in `src/index.css`:

 - Warm paper surfaces: `--paper`, `--paper-2`, and `--paper-3`.
 - Dark technical surface: `--dark`.
 - Ink and muted text colors.
 - Lime brand accent: `--accent`.
 - Shared borders, shadows, radii, and easing curves.
 - `Manrope` for interface and display text.
 - `IBM Plex Mono` for technical labels and metadata.

 Most components keep their own CSS file so layout, responsive rules, and component behavior remain easy to locate.

 ## Animation Architecture

 `src/main.jsx` registers GSAP ScrollTrigger once at the application entry point. Components use `gsap.context()` so animations are scoped and reverted during cleanup.

 Animation behavior includes:

 - Hero entrance timeline.
 - Scroll-triggered section reveals.
 - ANC noise field and orbit movement.
 - Sound visualizer motion.
 - Mobile menu transitions.
 - Three.js model floating, rotation, and color interpolation.

 Sections that animate check `prefers-reduced-motion` before creating scroll tweens. Global CSS also disables smooth scrolling for reduced-motion users.

 ## Accessibility Notes

 - Semantic sections and navigation landmarks are used throughout.
 - Interactive controls use buttons rather than clickable decorative elements.
 - Colorway and ANC controls expose pressed state.
 - FAQ and purchase modal expose dialog/expanded state.
 - Custom cursor is disabled on touch devices and does not replace keyboard focus.
 - Focus-visible outlines are defined globally.
 - Reduced-motion users do not receive the main motion effects.

 ## Production Notes

 This is currently a frontend-only product experience. These integrations are intentionally not connected yet:

 - Payment gateway and real checkout.
 - Newsletter backend or email provider.
 - Real privacy and terms pages.
 - Product inventory API.
 - Production audio file or streaming source.

 The Vite build currently reports a large JavaScript chunk because Three.js, React Three Fiber, and Drei are bundled with the main application. The next performance step would be lazy-loading or code-splitting the 3D experience while preserving the first-viewport hero behavior.

 ## Verification

 The project is verified with:

 ```bash
 npm run lint
 npm run build
 ```

 Both commands should complete successfully before deployment.
