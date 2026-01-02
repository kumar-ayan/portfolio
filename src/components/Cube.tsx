import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Html } from '@react-three/drei';

export const Cube = () => {
    const meshRef = useRef<Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshBasicMaterial color="#0088FF" wireframe />
            <Html position={[0, 0, 0]} transform>
                <div className="font-mono text-xs text-white bg-black p-1 opacity-80 pointer-events-none select-none">
                    AI_CORE
                </div>
            </Html>
        </mesh>
    );
};
