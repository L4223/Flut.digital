
"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const PointCloudAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

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
    if (!rendererRef.current) {
        rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    }
    const renderer = rendererRef.current;
    
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Point Cloud Geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 10000;
    const positions = new Float32Array(count * 3);
    const grid_size = 25;

    for(let i = 0; i < count * 3; i++) {
        const i3 = i * 3;
        positions[i3 + 0] = (Math.random() - 0.5) * grid_size; // x
        positions[i3 + 1] = 0; // y
        positions[i3 + 2] = (Math.random() - 0.5) * grid_size; // z
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create a circular texture for the points
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="white"/></svg>'));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: new THREE.Color(0x1C91FF), // Primary color
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        map: particleTexture,
        alphaTest: 0.5,
    });
    
    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Scroll handling
    let scrollY = window.scrollY;
    const handleScroll = () => {
        scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);


    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
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

      // Animate camera based on scroll
      camera.position.y = 2 - scrollY * 0.005;

      particles.rotation.y = elapsedTime * 0.05;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 opacity-70" />;
};

export default PointCloudAnimation;
