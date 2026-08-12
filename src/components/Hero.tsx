import React, { Suspense, useEffect, useState } from 'react';
import resumePdf from '../assets/Resume.pdf';

// Lazy-load the entire Three.js canvas + particle field
const LazyCanvas = React.lazy(() =>
    import('./LazyCanvas').then((mod) => ({ default: mod.LazyCanvas }))
);
const ParticleField = React.lazy(() =>
    import('./ParticleField').then((mod) => ({ default: mod.ParticleField }))
);

const HeroBackground = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Defer 3D rendering until after first paint
        if ('requestIdleCallback' in window) {
            const id = window.requestIdleCallback(() => setMounted(true), { timeout: 200 });
            return () => window.cancelIdleCallback(id);
        } else {
            const id = setTimeout(() => setMounted(true), 100);
            return () => clearTimeout(id);
        }
    }, []);

    if (!mounted) return null;

    return (
        <Suspense fallback={null}>
            <LazyCanvas camera={{ position: [0, 0, 1] }}>
                <ParticleField />
            </LazyCanvas>
        </Suspense>
    );
};

export const Hero = () => {
    return (
        <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 z-0">
                <HeroBackground />
            </div>

            <div className="relative z-10 w-full text-center pointer-events-none mix-blend-difference text-white">
                <h1 className="text-[15vw] leading-none font-black tracking-tighter select-none">
                    AYAN
                </h1>
                <div className="flex justify-between w-full max-w-5xl mx-auto px-4 mt-4 font-mono text-xs md:text-sm text-accent tracking-widest opacity-80">
                    <span>AI ENGINEER</span>
                    <span>AVAILABLE FOR HIRE</span>
                </div>
            </div>

            <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50 group/btn">
                <a 
                    href={resumePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-white font-mono text-xs md:text-sm tracking-widest transition-all duration-300 backdrop-blur-md rounded-none hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                    RESUME
                    <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </section>
    );
};
