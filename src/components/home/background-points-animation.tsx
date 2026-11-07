
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

    // Custom shader instead of PointsMaterial: with plain size attenuation the
    // points that drift close to the camera grew into large blobs. Here the size
    // is capped and points fade out as they come very close.
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color().setHex(0x1c91ff, THREE.LinearSRGBColorSpace) },
        uSize: { value: 0.05 },
        uScale: { value: (currentMount.clientHeight * pixelRatio) / 2 },
        uMaxSize: { value: 3 * pixelRatio },
        uOpacity: { value: isSmall ? 0.8 : 0.5 },
      },
      vertexShader: /* glsl */ `
        uniform float uSize;
        uniform float uScale;
        uniform float uMaxSize;
        varying float vNearFade;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float depth = -mvPosition.z;
          gl_PointSize = min(uSize * uScale / depth, uMaxSize);
          vNearFade = smoothstep(0.5, 2.5, depth);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vNearFade;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          if (dot(c, c) > 0.25) discard;
          gl_FragColor = vec4(uColor, uOpacity * vNearFade);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    if (finePointer && !reducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
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
        if (!animationFrameId.current) renderer.render(scene, camera);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 opacity-40 md:opacity-20" />;
};

export default BackgroundPointsAnimation;
