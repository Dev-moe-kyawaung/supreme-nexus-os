import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Text3D, Float } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

function Portal({ position, label, color, onClick }) {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.y = state.clock.elapsedTime * 0.8;
    mesh.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
  });

  return (
    <Float>
      <mesh ref={mesh} position={position} onClick={onClick}>
        <octahedronGeometry args={[1.8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} wireframe />
      </mesh>
      <Text3D position={[position[0], position[1] + 3, position[2]]} size={0.6}>
        {label}
      </Text3D>
    </Float>
  );
}

export default function HolographicDesktop() {
  const [currentStyle, setCurrentStyle] = useState('Welcome to Nexus OS');

  const styles = [
    { label: 'Next.js Nexus', color: '#00f5ff', demo: 'nexusforge' },
    { label: '3D Dimension', color: '#f72585', demo: 'nexusdimension' },
    { label: 'SvelteKit Blade', color: '#7209b7', demo: 'astralblade' },
    { label: 'Astro Canvas', color: '#ffffff', demo: 'stellercanvas' },
    // ကျန်တဲ့ 8 ခုကိုလည်း ဒီလို ထည့်နိုင်ပါတယ် — တစ်ချက်နှိပ်ရုံနဲ့ switch လုပ်ပြီး iframe/modal နဲ့ live demo ပြပါမယ်
  ];

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 35] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00f5ff" />
        <Stars radius={200} depth={50} count={12000} factor={4} />
        
        {styles.map((style, i) => (
          <Portal
            key={i}
            position={[
              Math.sin((i / styles.length) * Math.PI * 2) * 14,
              Math.cos(i) * 6 - 4,
              Math.cos((i / styles.length) * Math.PI * 2) * 14 - 10
            ]}
            label={style.label}
            color={style.color}
            onClick={() => {
              setCurrentStyle(style.label);
              window.dispatchEvent(new CustomEvent('openDemo', { detail: style.demo }));
            }}
          />
        ))}
      </Canvas>

      <div className="absolute top-8 left-8 glass p-8 rounded-3xl max-w-xs">
        <div className="text-primary text-xs tracking-widest mb-2">CURRENT BOOT SEQUENCE</div>
        <h2 className="text-4xl font-bold gradient-text">{currentStyle}</h2>
        <p className="text-sm text-white/70 mt-4">Click any holographic portal to instantly load that supreme portfolio style.</p>
      </div>
    </div>
  );
}

