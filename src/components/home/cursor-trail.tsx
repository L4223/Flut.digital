'use client';

import { useEffect, useRef, useState } from 'react';

const RING_SIZE = 28;

/**
 * A soft ring that trails the native cursor. The system cursor always stays
 * visible; the ring is only added for fine pointers without reduced motion.
 */
const CursorTrail = () => {
  const [enabled, setEnabled] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let scale = 1;
    let targetScale = 1;
    let visible = false;
    let frameId: number | null = null;

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      scale += (targetScale - scale) * 0.2;
      const ring = ringRef.current;
      if (ring) {
        ring.style.transform = `translate3d(${current.x - RING_SIZE / 2}px, ${current.y - RING_SIZE / 2}px, 0) scale(${scale})`;
      }
      const settled =
        Math.abs(target.x - current.x) < 0.1 &&
        Math.abs(target.y - current.y) < 0.1 &&
        Math.abs(targetScale - scale) < 0.01;
      frameId = settled ? null : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (frameId === null) frameId = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      target.x = event.clientX;
      target.y = event.clientY;
      if (!visible && ringRef.current) {
        visible = true;
        current.x = target.x;
        current.y = target.y;
        ringRef.current.style.opacity = '1';
      }
      kick();
    };
    const onOver = (event: PointerEvent) => {
      const interactive = (event.target as Element | null)?.closest?.('a, button, [role="button"], input, textarea, select, label');
      targetScale = interactive ? 1.6 : 1;
      if (ringRef.current) ringRef.current.style.borderColor = interactive ? 'hsl(var(--accent) / 0.5)' : 'hsl(var(--accent) / 0.8)';
      kick();
    };
    const onLeave = () => {
      visible = false;
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-[1.5px] opacity-0 transition-[opacity,border-color] duration-300"
      style={{ width: RING_SIZE, height: RING_SIZE, borderColor: 'hsl(var(--accent) / 0.8)' }}
    />
  );
};

export default CursorTrail;
