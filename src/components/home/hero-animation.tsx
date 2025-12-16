
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
    camera.position.set(0, 1, 5); // Move camera slightly up

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Point Cloud Geometry
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 5000;
    const positions = new Float32Array(count * 3);

    const grid_size = 30;
    for(let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 0] = (Math.random() - 0.5) * grid_size; // x
        positions[i3 + 1] = (Math.random() - 0.5) * 5;        // y
        positions[i3 + 2] = (Math.random() - 0.5) * grid_size; // z
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));


    // Create a circular texture for the points
    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="white"/></svg>'));

    // Material
     const particlesMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            uniform float uTime;
            attribute float aRandom;
            varying float vScroll;

            void main() {
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
                // Constant sea-like wave
                modelPosition.y += sin(modelPosition.x * 0.2 + uTime * 0.5) * 0.25;
                modelPosition.y += sin(modelPosition.z * 0.3 + uTime * 0.3) * 0.25;
                
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectedPosition = projectionMatrix * viewPosition;

                gl_Position = projectedPosition;
                gl_PointSize = 7.0 * (1.0 / -viewPosition.z);
            }
        `,
        fragmentShader: `
            uniform vec3 uColor;
            uniform sampler2D uTexture;
            void main() {
                vec4 texColor = texture2D(uTexture, gl_PointCoord);
                gl_FragColor = vec4(uColor, texColor.r * 0.8);
            }
        `,
        uniforms: {
            uTime: { value: 0 },
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
    
    // Mouse movement
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      particlesMaterial.uniforms.uTime.value = elapsedTime;

      // Make camera gently follow mouse
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 0.5 - (camera.position.y - 1.0)) * 0.02;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
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
      window.removeEventListener('mousemove', handleMouseMove);
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
