"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, Center, Text3D } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

const TEXT_MATERIAL = new THREE.MeshPhysicalMaterial({
  color: "#0a0a0a",
  emissive: "#000000",
  metalness: 1,
  roughness: 0.1,
  clearcoat: 1,
  clearcoatRoughness: 0.1,
  envMapIntensity: 2,
});

function Letters({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const rRef = useRef<THREE.Group>(null);
  const aRef = useRef<THREE.Group>(null);
  const vRef = useRef<THREE.Group>(null);
  const eRef = useRef<THREE.Group>(null);
  const nRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const p = scrollProgress.current;
    
    if (rRef.current && aRef.current && vRef.current && eRef.current && nRef.current) {
      const spread = p * 20;
      
      // Spread X
      rRef.current.position.x = -6 - spread * 1.5;
      aRef.current.position.x = -3 - spread * 0.8;
      vRef.current.position.x = 0; 
      eRef.current.position.x = 3 + spread * 0.8;
      nRef.current.position.x = 6 + spread * 1.5;
      
      // Fly forward Z
      rRef.current.position.z = p * 15;
      aRef.current.position.z = p * 20;
      vRef.current.position.z = p * 30; 
      eRef.current.position.z = p * 20;
      nRef.current.position.z = p * 15;
      
      // Chaotic rotations
      rRef.current.rotation.y = p * Math.PI * 0.5;
      rRef.current.rotation.z = p * Math.PI * 0.2;
      
      aRef.current.rotation.y = p * Math.PI * 0.3;
      aRef.current.rotation.x = -p * Math.PI * 0.2;
      
      vRef.current.rotation.x = p * Math.PI * 0.1;
      
      eRef.current.rotation.y = -p * Math.PI * 0.3;
      eRef.current.rotation.z = -p * Math.PI * 0.2;
      
      nRef.current.rotation.y = -p * Math.PI * 0.5;
      nRef.current.rotation.x = p * Math.PI * 0.2;
    }

    if (particlesRef.current) {
      // Particles fly upward and scatter on scroll
      particlesRef.current.position.y = p * 10;
      particlesRef.current.scale.set(1 + p * 2, 1 + p * 2, 1 + p * 5);
    }
  });

  const fontUrl = "/fonts/optimer_bold.typeface.json";
  const textProps = {
    font: fontUrl,
    size: 3,
    height: 0.8,
    curveSegments: 32,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelOffset: 0,
    bevelSegments: 8,
    material: TEXT_MATERIAL
  };
  
  return (
    <>
      <group>
        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <group ref={rRef} position={[-6, 0, 0]}>
            <Center><Text3D {...textProps}>R</Text3D></Center>
          </group>
        </Float>
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
          <group ref={aRef} position={[-3, 0, 0]}>
            <Center><Text3D {...textProps}>A</Text3D></Center>
          </group>
        </Float>
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
          <group ref={vRef} position={[0, 0, 0]}>
            <Center><Text3D {...textProps}>V</Text3D></Center>
          </group>
        </Float>
        <Float speed={2.2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group ref={eRef} position={[3, 0, 0]}>
            <Center><Text3D {...textProps}>E</Text3D></Center>
          </group>
        </Float>
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
          <group ref={nRef} position={[6, 0, 0]}>
            <Center><Text3D {...textProps}>N</Text3D></Center>
          </group>
        </Float>
      </group>

      <group ref={particlesRef}>
        <Sparkles count={300} scale={20} size={3} speed={0.4} opacity={0.6} color="#B08A47" noise={1} />
        <Sparkles count={150} scale={30} size={5} speed={0.2} opacity={0.3} color="#ffffff" />
      </group>
    </>
  );
}

function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  useFrame((state) => {
    const p = scrollProgress.current;
    
    // Mouse parallax reduced as we scroll deeper
    const targetX = (state.pointer.x * 2) * (1 - p);
    const targetY = (state.pointer.y * 2) * (1 - p);
    
    // Fly through the V
    const targetZ = 12 - (p * 22);
    
    state.camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    state.camera.lookAt(0, 0, -10 * p);
  });
  return null;
}

export default function Scene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 45 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#050505"]} />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 20, 10]} intensity={3} color="#ffffff" castShadow />
      <directionalLight position={[-10, -20, -10]} intensity={1.5} color="#B08A47" />
      <pointLight position={[0, 0, 5]} intensity={5} color="#B08A47" distance={20} />
      <pointLight position={[0, 5, -5]} intensity={2} color="#ffffff" distance={20} />
      
      <Letters scrollProgress={scrollProgress} />
      
      <Environment preset="studio" />
      
      <CameraRig scrollProgress={scrollProgress} />
      
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  );
}
