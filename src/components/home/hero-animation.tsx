"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const WaveAnimation = () => {
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

    // Wave geometry
    const geometry = new THREE.PlaneGeometry(20, 10, 50, 50);
    
    // Material with shaders
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        uColor1: { value: new THREE.Color(0x1C91FF) }, // Primary
        uColor2: { value: new THREE.Color(0x40CFFF) }, // Accent
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 0.5 + time) * 0.3;
          pos.z += sin(pos.y * 0.5 + time) * 0.3;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
        void main() {
            float strength = sin(vUv.x * 10.0 + time * 2.0) * 0.5 + 0.5;
            vec3 color = mix(uColor1, uColor2, strength);
            gl_FragColor = vec4(color, 0.4);
        }
      `,
      wireframe: true,
      transparent: true,
    });

    const wave = new THREE.Mesh(geometry, material);
    scene.add(wave);

    // Animation loop
    let clock = new THREE.Clock();
    const animate = () => {
      material.uniforms.time.value = clock.getElapsedTime();
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
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-40" />;
};

export default WaveAnimation;
