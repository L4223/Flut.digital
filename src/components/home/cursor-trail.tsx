
'use client';

import { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const dotOutlineRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  const mousePos = useRef({ x: -100, y: -100 });
  const previousMousePos = useRef({ x: -100, y: -100 });
  const isHoveringLink = useRef(false);
  const isMoving = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const onMouseMove = (event: MouseEvent) => {
    mousePos.current.x = event.clientX;
    mousePos.current.y = event.clientY;

    if (!isMoving.current) {
        isMoving.current = true;
        if (dotRef.current) {
            dotRef.current.style.opacity = '1';
        }
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      isMoving.current = false;
      if (dotRef.current) {
        dotRef.current.style.opacity = '0';
      }
    }, 100);
  };

  const onMouseOver = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button')) {
      isHoveringLink.current = true;
    }
  };
  
  const onMouseOut = (event: MouseEvent) => {
     const target = event.target as HTMLElement;
     if (target.closest('a, button')) {
      isHoveringLink.current = false;
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    
    const animate = () => {
      // Lerp for smooth following of the outline
      previousMousePos.current.x += (mousePos.current.x - previousMousePos.current.x) * 0.15;
      previousMousePos.current.y += (mousePos.current.y - previousMousePos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
      }
      if (dotOutlineRef.current) {
        // Apply offset to better center the cursor tip
        const offsetX = 12.5; // Half of width
        const offsetY = 12.5; // Half of height
        dotOutlineRef.current.style.transform = `translate(${previousMousePos.current.x - offsetX}px, ${previousMousePos.current.y - offsetY}px)`;
        
        // Scale effect on hover
        const scale = isHoveringLink.current ? 1.8 : 1;
        const opacity = isHoveringLink.current ? 0.5 : 1;
        dotOutlineRef.current.style.width = `${25 * scale}px`;
        dotOutlineRef.current.style.height = `${25 * scale}px`;
        dotOutlineRef.current.style.opacity = `${opacity}`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div 
        ref={dotOutlineRef} 
        className="fixed top-0 left-0 rounded-full pointer-events-none transition-[width,height,opacity] duration-300"
        style={{
            zIndex: 9999,
            width: '25px',
            height: '25px',
            border: '1.5px solid hsl(var(--accent))',
        }}
      />
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
            zIndex: 9999,
            width: '5px',
            height: '5px',
            backgroundColor: 'hsl(var(--accent))',
            opacity: '0',
        }}
      />
       <style jsx global>{`
        *:not(input, textarea) {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CursorTrail;
