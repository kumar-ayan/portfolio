import React, { Suspense, useEffect, useState } from 'react';

// Lazy-load the entire Three.js + React Three Fiber bundle
const R3FCanvas = React.lazy(() =>
  import('@react-three/fiber').then((mod) => ({ default: mod.Canvas }))
);

interface LazyCanvasProps {
  children: React.ReactNode;
  camera?: Record<string, unknown>;
  className?: string;
  style?: React.CSSProperties;
  /** Delay mount until after first paint to avoid blocking LCP */
  deferMs?: number;
}

export const LazyCanvas = ({
  children,
  camera,
  className,
  style,
  deferMs = 0,
}: LazyCanvasProps) => {
  const [ready, setReady] = useState(deferMs === 0);

  useEffect(() => {
    if (deferMs <= 0) {
      setReady(true);
      return;
    }
    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), {
        timeout: deferMs,
      });
      return () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setReady(true), deferMs);
      return () => clearTimeout(id);
    }
  }, [deferMs]);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <R3FCanvas camera={camera} className={className} style={style}>
        {children}
      </R3FCanvas>
    </Suspense>
  );
};
