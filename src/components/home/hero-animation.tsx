"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const PointCloudAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    const currentMount = mountRef.current;
    
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;
    camera.rotation.x = -0.3;


    // Renderer
    let newRenderer: THREE.WebGLRenderer;
    if (renderer) {
        newRenderer = renderer;
    } else {
        newRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        setRenderer(newRenderer);
    }
    
    newRenderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    newRenderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(newRenderer.domElement);

    // Point Cloud Geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 20000;
    const positions = new Float32Array(count * 3);
    const grid_size = 30;

    for(let i = 0; i < count * 3; i++) {
        const i3 = i * 3;
        positions[i3 + 0] = (Math.random() - 0.5) * grid_size; // x
        positions[i3 + 1] = 0; // y
        positions[i3 + 2] = (Math.random() - 0.5) * grid_size; // z
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: new THREE.Color(0x1C91FF), // Primary color
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
    });
    
    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate particles to form a wave
      const positions = particles.geometry.attributes.position.array as Float32Array;

      for(let i = 0; i < count; i++) {
          const i3 = i * 3;
          const x = positions[i3 + 0];
          const z = positions[i3 + 2];
          
          positions[i3 + 1] = Math.sin(x * 0.3 + elapsedTime) * 0.75 + Math.sin(z * 0.3 + elapsedTime) * 0.75;
      }
      particles.geometry.attributes.position.needsUpdate = true;


      particles.rotation.y = elapsedTime * 0.05;
      
      newRenderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      newRenderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount && newRenderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(newRenderer.domElement);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-70" />;
};

export default PointCloudAnimation;
