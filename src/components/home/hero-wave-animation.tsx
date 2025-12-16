
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
        new THREE.PointsMaterial({ size: 0.025, color: new THREE.Color(0x1C91FF) })
    );
    waves.rotation.x = -Math.PI / 2;
    scene.add(waves);
    
    const pos = waves.geometry.getAttribute('position');
    const originalPos = pos.clone();
    const displacedPos = pos.clone();

    const clock = new THREE.Clock();
    const rotationSpeed = 0.1;
    
    const mouse = new THREE.Vector2(-1, -1);
    const raycaster = new THREE.Raycaster();
    raycaster.params.Points.threshold = 0.2;

    const handleMouseMove = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, false);
    
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(waves);

      for (let i = 0; i < pos.count; i++) {
        const originalX = originalPos.getX(i);
        const originalZ = originalPos.getZ(i);

        const noise = 0.3 * simplex.noise(originalX / 2 + t * rotationSpeed, originalZ / 2 + t * rotationSpeed);
        
        let y = noise;
        
        const currentX = displacedPos.getX(i);
        const currentY = displacedPos.getY(i);
        displacedPos.setX(i, currentX + (originalX - currentX) * 0.05);
        displacedPos.setY(i, currentY + (originalZ - currentY) * 0.05);

        pos.setX(i, displacedPos.getX(i));
        pos.setY(i, displacedPos.getY(i));
        pos.setZ(i, y);
      }
      
      if (intersects.length > 0) {
        const intersectPoint = intersects[0].point;
        const radius = 2.0;
        const force = -0.3;

        for (let i = 0; i < pos.count; i++) {
          const dx = pos.getX(i) - intersectPoint.x;
          // Because the plane is rotated, the visual "depth" is the y-axis of the geometry
          const dy = pos.getY(i) - intersectPoint.z; 
          const dz = pos.getZ(i) - intersectPoint.y;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < radius) {
            const factor = (1 - dist / radius);
            const angle = Math.atan2(dy, dx);
            const displacement = factor * force * -0.1;
            
            displacedPos.setX(i, pos.getX(i) + Math.cos(angle) * displacement);
            displacedPos.setY(i, pos.getY(i) + Math.sin(angle) * displacement);

            pos.setX(i, displacedPos.getX(i));
            pos.setY(i, displacedPos.getY(i));
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
