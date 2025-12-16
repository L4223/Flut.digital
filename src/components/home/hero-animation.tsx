
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PointCloudAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    const currentMount = mountRef.current;
    
    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Point Cloud Geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count); // To store a random value for each particle

    const grid_size = 30;
    for(let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 0] = (Math.random() - 0.5) * grid_size; // x
        positions[i3 + 1] = (Math.random() - 0.5) * 15;      // y
        positions[i3 + 2] = (Math.random() - 0.5) * grid_size; // z
        randoms[i] = Math.random();
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));


    // Create a circular texture for the points
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="white"/></svg>'));

    // Material
     const particlesMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            uniform float uTime;
            uniform float uScroll;
            attribute float aRandom;

            void main() {
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
                // Initial Wave Position
                float wave = sin(modelPosition.x * 0.2 + uTime * 0.5) * 1.5 + sin(modelPosition.z * 0.2 + uTime * 0.5) * 1.5;
                
                // On scroll, particles move away based on their random value and scroll progress
                float scrollOffset = uScroll * aRandom * 5.0;

                // Animate y position
                modelPosition.y += wave * (1.0 - uScroll); // Wave fades out as we scroll
                modelPosition.y -= scrollOffset; // Particles move down as we scroll

                // Loop particles that go too far down
                modelPosition.y = mod(modelPosition.y + 7.5, 15.0) - 7.5;
                
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectedPosition = projectionMatrix * viewPosition;

                gl_Position = projectedPosition;
                gl_PointSize = 10.0 * (1.0 / -viewPosition.z);
            }
        `,
        fragmentShader: `
            uniform vec3 uColor;
            uniform sampler2D uTexture;
            void main() {
                vec4 texColor = texture2D(uTexture, gl_PointCoord);
                gl_FragColor = vec4(uColor, texColor.r);
            }
        `,
        uniforms: {
            uTime: { value: 0 },
            uScroll: { value: 0 },
            uColor: { value: new THREE.Color(0x1C91FF) },
            uTexture: { value: particleTexture }
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
    });
    
    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Scroll handling
    let scrollY = window.scrollY;
    let scrollTarget = 0;
    let currentScroll = 0;

    const handleScroll = () => {
        scrollY = window.scrollY;
        // Normalize scroll value (0 to 1) over a certain scroll distance
        scrollTarget = Math.min(scrollY / (window.innerHeight * 0.8), 1.0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      // Lerp (linear interpolate) scroll for smoothness
      currentScroll += (scrollTarget - currentScroll) * 0.05;

      particlesMaterial.uniforms.uTime.value = elapsedTime;
      particlesMaterial.uniforms.uScroll.value = currentScroll;

      // Animate camera
      camera.position.y = -currentScroll * 5;

      particles.rotation.y = elapsedTime * 0.02;
      
      renderer.render(scene, camera);
    };
    
    handleScroll();
    animate();

    // Handle resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 opacity-70" />;
};

export default PointCloudAnimation;
