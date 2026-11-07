
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BackgroundPointsAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    const currentMount = mountRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    // Decorative layer at 20% opacity: 1.5x is visually identical and far cheaper.
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(pixelRatio);
    currentMount.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const isSmall = window.innerWidth < 768;
    // Portrait screens only see a narrow slice of the cloud, so phones keep the
    // full count and slightly brighter points to stay visible.
    const count = 5000;
    const positions = new Float32Array(count * 3);

    for(let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 0] = (Math.random() - 0.5) * 30;
        positions[i3 + 1] = (Math.random() - 0.5) * 30;
        positions[i3 + 2] = (Math.random() - 0.5) * 30;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const randoms = new Float32Array(count);
    for (let i = 0; i < count; i++) randoms[i] = Math.random();
    particlesGeometry.setAttribute('aRand', new THREE.BufferAttribute(randoms, 1));

    // Custom shader instead of PointsMaterial: with plain size attenuation the
    // points that drift close to the camera grew into large blobs. Here the size
    // is capped and points fade out as they come very close.
    // Points near the mouse light up like stars: they grow, brighten towards a
    // pale blue-white and twinkle. uHover eases in/out so the glow fades softly.
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color().setHex(0x1c91ff, THREE.LinearSRGBColorSpace) },
        uGlowColor: { value: new THREE.Color().setHex(0xd6f3ff, THREE.LinearSRGBColorSpace) },
        uSize: { value: 0.05 },
        uScale: { value: (currentMount.clientHeight * pixelRatio) / 2 },
        uMaxSize: { value: 3 * pixelRatio },
        // The wrapper used to dim the layer with CSS opacity; that is now baked
        // in here so hovered points can shine at full strength.
        uOpacity: { value: isSmall ? 0.32 : 0.1 },
        uMouse: { value: new THREE.Vector2(-9999, -9999) },
        uRadius: { value: 180 * pixelRatio },
        uHover: { value: 0 },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(currentMount.clientWidth * pixelRatio, currentMount.clientHeight * pixelRatio) },
      },
      vertexShader: /* glsl */ `
        attribute float aRand;
        uniform float uSize;
        uniform float uScale;
        uniform float uMaxSize;
        uniform vec2 uMouse;
        uniform float uRadius;
        uniform float uHover;
        uniform float uTime;
        uniform vec2 uResolution;
        varying float vNearFade;
        varying float vGlow;
        varying float vCore;
        // The sprite grows only to make room for the faint halo around it;
        // the dot itself (vCore) keeps exactly its normal size.
        const float HALO = 7.0;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float depth = -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;

          vec2 screen = (gl_Position.xy / gl_Position.w * 0.5 + 0.5) * uResolution;
          float near = 1.0 - smoothstep(0.0, uRadius, distance(screen, uMouse));
          near = sqrt(near);
          float twinkle = 0.75 + 0.25 * sin(uTime * (2.0 + aRand * 3.0) + aRand * 6.2831);
          vGlow = near * near * uHover * twinkle;

          float size = min(uSize * uScale / depth, uMaxSize);
          float sprite = size * (1.0 + HALO * step(0.001, vGlow));
          gl_PointSize = sprite;
          vCore = size / sprite;
          vNearFade = smoothstep(0.5, 2.5, depth);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform vec3 uGlowColor;
        uniform float uOpacity;
        varying float vNearFade;
        varying float vGlow;
        varying float vCore;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c) * 2.0; // 0 at the centre, 1 at the sprite edge
          if (d > 1.0) discard;

          // The dot: same size as always, only brighter and lighter in colour.
          if (d <= vCore) {
            vec3 color = mix(uColor, uGlowColor, vGlow);
            float alpha = mix(uOpacity, 0.95, vGlow) * vNearFade;
            gl_FragColor = vec4(color, alpha);
            return;
          }

          // Around it: a very faint light that fades out over a long gradient.
          float t = (d - vCore) / (1.0 - vCore);
          float light = pow(1.0 - t, 2.5) * 0.28 * vGlow * vNearFade;
          if (light < 0.002) discard;
          gl_FragColor = vec4(mix(uColor, uGlowColor, 0.5), light);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const mouse = new THREE.Vector2();
    // Mouse position in drawing-buffer pixels (origin bottom left), eased in renderFrame.
    const targetPixel = new THREE.Vector2(-9999, -9999);
    let hoverTarget = 0;
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        const firstMove = hoverTarget === 0;
        targetPixel.set(event.clientX * pixelRatio, (currentMount.clientHeight - event.clientY) * pixelRatio);
        if (firstMove) particlesMaterial.uniforms.uMouse.value.copy(targetPixel);
        hoverTarget = 1;
    };
    const handleMouseLeave = () => { hoverTarget = 0; };
    if (finePointer && !reducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    }
    
    const clock = new THREE.Clock();
    const rotationSpeed = 0.2;
    
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      renderFrame();
    };

    const renderFrame = () => {
      const elapsedTime = clock.getElapsedTime();
      
      particles.rotation.y = elapsedTime * 0.05 * rotationSpeed;
      particles.rotation.x = elapsedTime * 0.02 * rotationSpeed;

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      const u = particlesMaterial.uniforms;
      u.uTime.value = elapsedTime;
      u.uMouse.value.lerp(targetPixel, 0.18);
      u.uHover.value += (hoverTarget - u.uHover.value) * 0.06;

      renderer.render(scene, camera);
    };
    
    const start = () => {
      if (reducedMotion || animationFrameId.current || document.hidden) return;
      animate();
    };
    const stop = () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = undefined;
    };
    const handleVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', handleVisibility);

    if (reducedMotion) renderFrame();
    else start();

    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        particlesMaterial.uniforms.uScale.value = (currentMount.clientHeight * pixelRatio) / 2;
        particlesMaterial.uniforms.uResolution.value.set(currentMount.clientWidth * pixelRatio, currentMount.clientHeight * pixelRatio);
        if (!animationFrameId.current) renderer.render(scene, camera);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20" />;
};

export default BackgroundPointsAnimation;
