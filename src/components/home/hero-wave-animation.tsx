
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';

const HeroWaveAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    const currentMount = mountRef.current;
    
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 3, 7);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(12, 8, 200, 150);
    const simplex = new SimplexNoise();
    
    const waves = new THREE.Points(
        geometry,
        new THREE.PointsMaterial({ size: 0.02, color: new THREE.Color(0x1C91FF) })
    );
    waves.rotation.x = -Math.PI / 2;
    scene.add(waves);
    
    const pos = waves.geometry.getAttribute('position');
    const originalPos = pos.clone();
    
    const clock = new THREE.Clock();
    const rotationSpeed = 0.1;
    
    const mouse = new THREE.Vector2(-10, -10); // Start off-screen
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points!.threshold = 0.2; // Increase threshold to make it easier to hit points

    const handleMouseMove = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, false);
    
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Calculate wave animation first
      for (let i = 0; i < pos.count; i++) {
        const originalX = originalPos.getX(i);
        const originalY = originalPos.getY(i);
        const noise = 0.3 * simplex.noise(originalX / 2 + t * rotationSpeed, originalY / 2 + t * rotationSpeed);
        pos.setZ(i, noise);
      }
      
      // Then apply mouse interaction
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(waves);

      const force = -0.3;
      const radius = 2.0;

      // Reset previous interaction effect by slowly returning to wave position
      for (let i = 0; i < pos.count; i++) {
        const currentX = pos.getX(i);
        const originalX = originalPos.getX(i);
        const currentY = pos.getY(i);
        const originalY = originalPos.getY(i);
        
        pos.setX(i, currentX + (originalX - currentX) * 0.05);
        pos.setY(i, currentY + (originalY - currentY) * 0.05);
      }


      if (intersects.length > 0) {
        const intersectPoint = intersects[0].point;

        for (let i = 0; i < pos.count; i++) {
          const p = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
          
          // Since the plane is rotated, we check distance on the X/Y plane of the geometry
          const dx = p.x - intersectPoint.x;
          const dy = p.y - intersectPoint.z; // intersect.z is the world's z, which is our geometry's y
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < radius) {
            const factor = (1 - dist / radius);
            const angle = Math.atan2(dy, dx);
            const displacement = factor * force * -0.1;
            
            const newX = pos.getX(i) + Math.cos(angle) * displacement;
            const newY = pos.getY(i) + Math.sin(angle) * displacement;

            pos.setX(i, newX);
            pos.setY(i, newY);
          }
        }
      }

      pos.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      (waves.material as THREE.Material).dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10 opacity-70" />;
};

export default HeroWaveAnimation;
