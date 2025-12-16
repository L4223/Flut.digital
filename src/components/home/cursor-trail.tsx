
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CursorTrail = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(-10, -10); // Start off-screen
    const lastMouse = new THREE.Vector2(-10, -10);

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Particle setup
    const particleCount = 200;
    const particles: {
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      alpha: number;
      life: number;
    }[] = [];

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const alphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        position: new THREE.Vector3(0, 0, 0),
        velocity: new THREE.Vector3(0, 0, 0),
        alpha: 0,
        life: 0,
      });
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      alphas[i] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 4.0 * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vAlpha;
        void main() {
          if (vAlpha <= 0.0) discard;
          float circle = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (circle > 0.4) discard;
          gl_FragColor = vec4(color, vAlpha);
        }
      `,
      uniforms: {
        color: { value: new THREE.Color(0x40CFFF) }, // Accent color
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    
    let particleIndex = 0;

    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      // Interpolate mouse position for smoother trail
      lastMouse.lerp(mouse, 0.1);

      // Get 3D position in scene
      const target = new THREE.Vector3(lastMouse.x, lastMouse.y, 0.5);
      target.unproject(camera);
      const dir = target.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));


      // Emit new particles
      for (let i = 0; i < 3; i++) { // Emit a few particles per frame
        particleIndex = (particleIndex + 1) % particleCount;
        const p = particles[particleIndex];
        p.position.copy(pos);
        p.velocity.set(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          0
        );
        p.alpha = 1.0;
        p.life = 1.0;
      }
      
      // Update particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        if (p.life > 0) {
          p.life -= 0.02;
          if (p.life <= 0) {
            p.alpha = 0;
          } else {
            p.position.add(p.velocity);
            p.alpha = p.life;
          }
          positions[i * 3] = p.position.x;
          positions[i * 3 + 1] = p.position.y;
          positions[i * 3 + 2] = p.position.z;
          alphas[i] = p.alpha;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.alpha.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
        if (currentMount) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    };
    
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-20 pointer-events-none" />;
};

export default CursorTrail;
