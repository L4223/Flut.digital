"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// 2D simplex noise — Ashima Arts / Stefan Gustavson (MIT License).
const SIMPLEX_NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;          // pointer position in the plane's local XY
uniform float uMouseStrength; // 0..1, eased in/out on the CPU
uniform float uSize;
uniform float uScale;         // half the drawing-buffer height, like PointsMaterial

${SIMPLEX_NOISE_GLSL}

void main() {
  vec3 p = position;
  float t = uTime * 0.1;
  p.z = 0.3 * snoise(vec2(p.x / 2.0 + t, p.y / 2.0 + t));

  vec2 d = p.xy - uMouse;
  float dist = length(d);
  float radius = 2.0;
  if (dist < radius && dist > 0.0001) {
    p.xy += normalize(d) * (1.0 - dist / radius) * 0.3 * uMouseStrength;
  }

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize * (uScale / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uColor;
void main() {
  gl_FragColor = vec4(uColor, 1.0);
}
`;

const MAX_PIXEL_RATIO = 2;

const HeroWaveAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 3, 7);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    const pixelRatio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(12, 8, 200, 150);
    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(100, 100) },
      uMouseStrength: { value: 0 },
      uSize: { value: 0.02 },
      uScale: { value: (currentMount.clientHeight * pixelRatio) / 2 },
      // Stored without colour-space conversion: the shader writes the brand hex as-is.
      uColor: { value: new THREE.Color().setHex(0x1c91ff, THREE.LinearSRGBColorSpace) },
    };

    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const waves = new THREE.Points(geometry, material);
    waves.rotation.x = -Math.PI / 2;
    scene.add(waves);

    const ndcMouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2(100, 100);
    const raycaster = new THREE.Raycaster();
    const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();
    let pointerInside = false;

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointerInside = event.clientY >= rect.top && event.clientY <= rect.bottom;
      ndcMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      ndcMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndcMouse, camera);
      if (raycaster.ray.intersectPlane(interactionPlane, hit)) {
        // The plane is rotated -90° around X, so world Z maps to local -Y.
        targetMouse.set(hit.x, -hit.z);
      }
    };

    const clock = new THREE.Clock();
    let frameId: number | null = null;
    let inView = true;

    const renderFrame = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(targetMouse, 0.1);
      const strengthTarget = pointerInside ? 1 : 0;
      uniforms.uMouseStrength.value += (strengthTarget - uniforms.uMouseStrength.value) * 0.08;
      renderer.render(scene, camera);
    };

    const loop = () => {
      renderFrame();
      frameId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reducedMotion || frameId !== null || !inView || document.hidden) return;
      frameId = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    };

    // Reduced motion: one still frame of the wave, no loop, no pointer reaction.
    if (reducedMotion) {
      uniforms.uTime.value = 12;
      renderer.render(scene, camera);
    } else {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    observer.observe(currentMount);

    const handleVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', handleVisibility);

    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      uniforms.uScale.value = (currentMount.clientHeight * pixelRatio) / 2;
      if (frameId === null) renderer.render(scene, camera);
    };
    window.addEventListener('resize', handleResize);

    start();

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      if (renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="absolute inset-0 -z-10 opacity-70" />;
};

export default HeroWaveAnimation;
