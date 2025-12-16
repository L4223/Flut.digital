
"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroWaveAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    const currentMount = mountRef.current;
    
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 3);
    camera.lookAt(0,0,0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 10000;
    const positions = new Float32Array(count * 3);
    const plane_size = 20;

    for(let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 0] = (Math.random() - 0.5) * plane_size;
        positions[i3 + 1] = 0; 
        positions[i3 + 2] = (Math.random() - 0.5) * plane_size;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const textureLoader = new THREE.TextureLoader();
    const particleTexture = textureLoader.load('data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="white"/></svg>'));

    const particlesMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            uniform float uTime;
            
            void main() {
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                
                modelPosition.y += sin(modelPosition.x * 0.4 + uTime * 0.5) * 0.35;
                modelPosition.y += sin(modelPosition.z * 0.5 + uTime * 0.3) * 0.35;
                
                vec4 viewPosition = viewMatrix * modelPosition;
                vec4 projectedPosition = projectionMatrix * viewPosition;

                gl_Position = projectedPosition;
                gl_PointSize = 8.0 * (1.0 / -viewPosition.z);
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
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particles.rotation.x = -0.4;
    scene.add(particles);
    
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const clock = new THREE.Clock();
    
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      particlesMaterial.uniforms.uTime.value = elapsedTime;

      camera.position.x += (mouse.x * 0.2 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 0.2 - (camera.position.y - 0.5)) * 0.02;
      camera.lookAt(scene.position);
      
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
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 opacity-70" />;
};

export default HeroWaveAnimation;
