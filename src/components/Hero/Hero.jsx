import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import gsap from "gsap";
import "./Hero.css";

const COLORWAYS = {
  titanium: {
    name: "Titanium",
    shell: "#D9D5CB",
    band: "#D9D5CB",
    cushion: "#26251F",
    plate: "#191913",
    hinge: "#3A3A34",
    accent: "#B8E600",
  },

  obsidian: {
    name: "Obsidian",
    shell: "#1B1B1D",
    band: "#1B1B1D",
    cushion: "#0C0C0D",
    plate: "#101012",
    hinge: "#3D3D40",
    accent: "#B8E600",
  },

  cloud: {
    name: "Cloud",
    shell: "#F3F1EA",
    band: "#F3F1EA",
    cushion: "#DEDBCF",
    plate: "#9C988C",
    hinge: "#B9B6AA",
    accent: "#B8E600",
  },
};

const deg = (v) => THREE.MathUtils.degToRad(v);

function cylinderBetween(a, b, radius, material) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();

  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, len, 20),
    material,
  );

  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.normalize(),
  );

  return mesh;
}

function buildHeadphones(colors) {
  const root = new THREE.Group();
  root.name = "SONIQ_AERO_X1";

  const body = new THREE.Group();
  body.name = "AERO_X1_BODY";
  body.position.y = 0.32;
  root.add(body);

  const M = {
    shell: new THREE.MeshStandardMaterial({
      color: colors.shell,
      metalness: 0.78,
      roughness: 0.3,
    }),
    band: new THREE.MeshStandardMaterial({
      color: colors.band,
      metalness: 0.85,
      roughness: 0.26,
    }),
    cushion: new THREE.MeshStandardMaterial({
      color: colors.cushion,
      metalness: 0,
      roughness: 0.96,
    }),
    plate: new THREE.MeshStandardMaterial({
      color: colors.plate,
      metalness: 0.45,
      roughness: 0.55,
    }),
    hinge: new THREE.MeshStandardMaterial({
      color: colors.hinge,
      metalness: 0.6,
      roughness: 0.4,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: colors.accent,
      metalness: 0.25,
      roughness: 0.4,
    }),
  };

  const RX = 1.02;
  const RY = 1.2;
  const R = 0.64;

  const arc = new THREE.EllipseCurve(0, 0, RX, RY, deg(-24), deg(204));
  const bandCurve = new THREE.CatmullRomCurve3(
    arc.getPoints(72).map((p) => new THREE.Vector3(p.x, p.y, 0)),
  );
  const band = new THREE.Mesh(
    new THREE.TubeGeometry(bandCurve, 90, 0.075, 24),
    M.band,
  );
  band.scale.z = 0.85;
  body.add(band);

  const padArc = new THREE.EllipseCurve(
    0,
    0.02,
    RX * 0.965,
    RY * 0.965,
    deg(30),
    deg(150),
  );
  const padCurve = new THREE.CatmullRomCurve3(
    padArc.getPoints(48).map((p) => new THREE.Vector3(p.x, p.y, 0)),
  );
  const pad = new THREE.Mesh(
    new THREE.TubeGeometry(padCurve, 56, 0.055, 18),
    M.cushion,
  );
  pad.scale.z = 0.8;
  body.add(pad);

  const domeX = (rho) => 0.13 + 0.55 * Math.sqrt(R * R - rho * rho);

  const makeCup = () => {
    const cup = new THREE.Group();

    const shell = new THREE.Mesh(
      new THREE.CylinderGeometry(R, R, 0.26, 64, 1, true),
      M.shell,
    );
    shell.rotation.z = Math.PI / 2;
    shell.name = "cup_shell";
    cup.add(shell);

    const back = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 32), M.shell);
    back.scale.set(0.55, 1, 1);
    back.position.x = 0.13;
    back.name = "cup_back";
    cup.add(back);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(R, 0.016, 14, 96),
      M.hinge,
    );
    rim.rotation.y = Math.PI / 2;
    rim.position.x = 0.125;
    rim.name = "cup_rim";
    cup.add(rim);

    const trim = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.01, 12, 72),
      M.hinge,
    );
    trim.rotation.y = Math.PI / 2;
    trim.position.x = domeX(0.3) + 0.002;
    trim.name = "back_trim";
    cup.add(trim);

    const dot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.03, 32),
      M.accent,
    );
    dot.rotation.z = Math.PI / 2;
    dot.position.x = domeX(0.06) + 0.001;
    dot.name = "touch_dot";
    cup.add(dot);

    const driver = new THREE.Mesh(new THREE.CircleGeometry(0.55, 64), M.plate);
    driver.rotation.y = -Math.PI / 2;
    driver.position.x = -0.02;
    driver.name = "driver_plate";
    cup.add(driver);

    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.1, 32, 16), M.plate);
    cap.scale.set(0.55, 1, 1);
    cap.position.x = -0.045;
    cap.name = "dust_cap";
    cup.add(cap);

    const cushion = new THREE.Mesh(
      new THREE.TorusGeometry(0.48, 0.17, 24, 64),
      M.cushion,
    );
    cushion.rotation.y = Math.PI / 2;
    cushion.scale.set(1, 1, 0.6);
    cushion.position.x = -0.19;
    cushion.name = "ear_cushion";
    cup.add(cushion);
    const stub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 0.24, 24),
      M.hinge,
    );
    stub.position.y = R + 0.04;
    stub.name = "hinge_stub";
    cup.add(stub);
    const usb = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.03, 0.14),
      M.plate,
    );
    usb.position.set(0.02, -R - 0.005, 0.18);
    usb.name = "usbc_port";
    cup.add(usb);

    return cup;
  };

  const createSide = (side) => {
    const cup = makeCup();
    cup.name = side === 1 ? "RIGHT_EAR_CUP" : "LEFT_EAR_CUP";
    cup.position.set(side * 1.08, -1.02, 0);
    cup.rotation.z = -0.14;
    cup.rotation.y = side === 1 ? 0.18 : Math.PI - 0.18;
    cup.updateMatrix();

    const bandEnd = new THREE.Vector3(
      side * RX * Math.cos(deg(-24)),
      RY * Math.sin(deg(-24)),
      0,
    );

    const anchor = new THREE.Vector3(0, R + 0.1, 0).applyMatrix4(cup.matrix);

    const yoke = cylinderBetween(bandEnd, anchor, 0.038, M.hinge);
    yoke.name = `YOKE_ARM_${side === 1 ? "R" : "L"}`;
    body.add(yoke);

    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.052, 0.052, 0.17, 20),
      M.hinge,
    );
    barrel.rotation.x = Math.PI / 2;
    barrel.position.copy(anchor);
    barrel.name = `HINGE_PIVOT_${side === 1 ? "R" : "L"}`;
    body.add(barrel);

    const joint = new THREE.Mesh(
      new THREE.SphereGeometry(0.085, 24, 18),
      M.hinge,
    );
    joint.position.copy(bandEnd);
    joint.name = `BAND_JOINT_${side === 1 ? "R" : "L"}`;
    body.add(joint);

    body.add(cup);
  };

  createSide(1);
  createSide(-1);

  return { root, materials: M };
}

function StudioEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    Object.assign(scene, { environment: envTex });
    pmrem.dispose();

    return () => {
      Object.assign(scene, { environment: null });
      envTex.dispose();
    };
  }, [gl, scene]);

  return null;
}

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    const z = Math.max(6.4, 6.1 / aspect);
    camera.position.set(0, 0.2, z);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}

function ProductModel({ colorway }) {
  const groupRef = useRef(null);

  const modelData = useMemo(() => {
    const data = buildHeadphones(COLORWAYS[colorway]);
    const targets = {};

    Object.entries(data.materials).forEach(([key, material]) => {
      targets[key] = material.color.clone();
    });

    return { ...data, targets };
  }, []);

  const { root, materials, targets } = modelData;

  useEffect(() => {
    const next = COLORWAYS[colorway];
    Object.keys(materials).forEach((key) => {
      if (next[key]) targets[key].set(next[key]);
    });
  }, [colorway, materials, targets]);

  useEffect(() => {
    if (!groupRef.current) return;
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0.82, y: 0.82, z: 0.82 },
      { x: 1, y: 1, z: 1, duration: 1.2, ease: "expo.out" },
    );
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.9) * 0.045;
    }

    Object.keys(materials).forEach((key) => {
      materials[key].color.lerp(targets[key], 0.12);
    });
  });

  useEffect(() => {
    return () => {
      root.traverse((object) => {
        if (object.isMesh) object.geometry?.dispose();
      });
      Object.values(materials).forEach((m) => m.dispose());
    };
  }, [root, materials]);

  return (
    <group ref={groupRef}>
      <primitive object={root} rotation={[0, -0.55, 0]} scale={1.05} />
    </group>
  );
}

function HeroScene({ colorway }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="always"
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0.2, 6.4]} fov={33} />
      <ResponsiveCamera />

      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 4]} intensity={0.85} />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} />

      <StudioEnvironment />

      <Suspense fallback={null}>
        <ProductModel colorway={colorway} />
      </Suspense>

      <ContactShadows
        position={[0, -1.78, 0]}
        opacity={0.3}
        scale={3.6}
        blur={2.5}
        far={2.8}
        resolution={256}
      />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableDamping
        dampingFactor={0.06}
        target={[0, 0.05, 0]}
        autoRotate
        autoRotateSpeed={1.1}
        minPolarAngle={0.25}
        maxPolarAngle={1.65}
      />
    </Canvas>
  );
}

export default function Hero({ colorway, onColorwayChange }) {
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const actionsRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
      );
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.35",
      );
      tl.fromTo(
        descriptionRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.5",
      );
      tl.fromTo(
        actionsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4",
      );
      tl.fromTo(
        visualRef.current,
        { scale: 0.94, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" },
        "-=0.8",
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home" data-colorway={colorway}>
      <div className="hero-bg-word" aria-hidden="true">
        AERO
      </div>

      <div className="hero-grid">
        <div className="hero-content">
          <div ref={eyebrowRef} className="hero-eyebrow">
            <span className="hero-eyebrow-line" />
            <span>SONIQ AERO X1</span>
            <span className="hero-eyebrow-number">01</span>
          </div>

          <h1 ref={titleRef} className="hero-title">
            Silence.
            <br />
            <span>Refined.</span>
          </h1>

          <p ref={descriptionRef} className="hero-description">
            Immersive sound. Intelligent silence. Designed for everything in
            between.
          </p>

          <div ref={actionsRef} className="hero-actions">
            <a href="#technology" className="hero-primary-btn">
              <span>Explore AERO X1</span>
              <span className="hero-btn-arrow">→</span>
            </a>

            <a href="#experience" className="hero-secondary-btn">
              Watch Experience
              <span>↗</span>
            </a>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <span>Starting at</span>
              <strong>$299</strong>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <span>Battery</span>
              <strong>40 HRS</strong>
            </div>
            <div className="hero-meta-divider" />
            <div className="hero-meta-item">
              <span>Weight</span>
              <strong>248G</strong>
            </div>
          </div>
        </div>

        <div ref={visualRef} className="hero-visual">
          <div className="hero-visual-top">
            <span>01</span>
            <span>PRECISION AUDIO</span>
          </div>

          <div className="hero-model">
            <HeroScene colorway={colorway} />
          </div>

          <div className="hero-visual-bottom">
            <span>SONIQ AERO X1</span>
            <span>© 2026</span>
          </div>

          <div className="hero-color-selector">
            <span className="hero-color-label">COLOR</span>

            <div className="hero-color-options">
              {["titanium", "obsidian", "cloud"].map((cw) => (
                <button
                  key={cw}
                  type="button"
                  aria-label={COLORWAYS[cw].name}
                  aria-pressed={colorway === cw}
                  className={`hero-color-btn ${cw} ${colorway === cw ? "active" : ""}`}
                  onClick={() => onColorwayChange(cw)}
                />
              ))}
            </div>

            <span className="hero-color-name">{COLORWAYS[colorway].name}</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>SCROLL TO EXPLORE</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
