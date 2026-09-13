"use client";
import { Canvas, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ScenePoster from "./ScenePoster";

type V3 = [number, number, number];
type Props = { selected: number | null; onSelect: (layer: number) => void; expanded: boolean; animate: boolean; rotation: number };
function Box({ at, size, color, glow = false }: { at: V3; size: V3; color: string; glow?: boolean }) {
  return <mesh position={at}><boxGeometry args={size} /><meshStandardMaterial color={color} metalness={0.22} roughness={0.46}
    emissive={glow ? color : "#000000"} emissiveIntensity={glow ? 0.42 : 0} /></mesh>;
}
function Platform({ color, active }: { color: string; active: boolean }) {
  return <>
    <Box at={[0, 0, 0]} size={[3.5, 0.15, 2.5]} color={color} />
    <Box at={[0, -0.105, 0]} size={[3.34, 0.06, 2.35]} color="#163e46" />
    <Box at={[0, 0.015, 1.255]} size={[3.20, 0.032, 0.018]} color={active ? "#39c8c0" : "#bbaa7a"} glow={active} />
    {[-1.55, 1.55].flatMap((x) => [-1.05, 1.05].map((z) => <mesh key={`${x}-${z}`} position={[x, 0.09, z]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.052, 0.012, 6, 12]} /><meshStandardMaterial color="#c7b880" metalness={0.7} roughness={0.25} /></mesh>))}
  </>;
}
function Hardware() {
  return <>
    {[-0.85, -0.48, 0.48, 0.85].map((z) => <Box key={z} at={[0, 0.085, z]} size={[2.9, 0.011, 0.016]} color="#b4be84" />)}
    {[-1.15, -0.78, 0.78, 1.15].map((x) => <Box key={x} at={[x, 0.085, 0]} size={[0.016, 0.011, 1.98]} color="#b4be84" />)}
    <Box at={[0, 0.21, 0]} size={[0.8, 0.25, 0.78]} color="#152e36" />
    <Box at={[0, 0.35, 0]} size={[0.61, 0.03, 0.59]} color="#3c6570" />
    {Array.from({ length: 8 }, (_, i) => (i - 3.5) * 0.083).flatMap((p, i) => [
      <Box key={`a${i}`} at={[p, 0.15, 0.45]} size={[0.036, 0.045, 0.14]} color="#ceb47c" />,
      <Box key={`b${i}`} at={[p, 0.15, -0.45]} size={[0.036, 0.045, 0.14]} color="#ceb47c" />,
      <Box key={`c${i}`} at={[0.46, 0.15, p]} size={[0.14, 0.045, 0.036]} color="#ceb47c" />,
      <Box key={`d${i}`} at={[-0.46, 0.15, p]} size={[0.14, 0.045, 0.036]} color="#ceb47c" />,
    ])}
    {[-1.2, -0.64, 0.66, 1.2].map((x, i) => <group key={x}>
      <Box at={[x, 0.2, i % 2 ? -0.76 : 0.65]} size={[0.34, 0.21, 0.3]} color="#26484d" />
      <Box at={[x, 0.095, i % 2 ? 0.7 : -0.75]} size={[0.29, 0.03, 0.32]} color="#b7c9c0" />
    </group>)}
    {[-1.1, 0, 1.1].map((x) => <group key={x}><Box at={[x, 0.22, 1.0]} size={[0.37, 0.27, 0.35]} color="#c0ceca" />
      <Box at={[x, 0.22, 1.181]} size={[0.24, 0.13, 0.013]} color="#1f3740" /></group>)}
  </>;
}
function Protocols() {
  return <>
    <Box at={[0, 0.12, 0]} size={[2.95, 0.025, 0.027]} color="#c6b780" />
    <Box at={[0, 0.12, 0.56]} size={[2.3, 0.025, 0.027]} color="#64beb6" />
    <Box at={[0, 0.12, -0.57]} size={[2.3, 0.025, 0.027]} color="#64beb6" />
    {[-1.06, 0, 1.06].map((x, i) => <group key={x}>
      <Box at={[x, 0.30, 0]} size={[0.7, 0.43, 0.57]} color={i === 1 ? "#225c65" : "#cedbd3"} />
      <Box at={[x, 0.32, 0.295]} size={[0.5, 0.23, 0.019]} color="#173944" />
      {[-0.16, 0, 0.16].map((p) => <Box key={p} at={[x + p, 0.3, 0.31]} size={[0.08, 0.075, 0.02]} color="#a2c7bc" />)}
      <Box at={[x + 0.23, 0.23, 0.32]} size={[0.038, 0.03, 0.025]} color="#77e2b1" glow />
      <Box at={[x - 0.22, 0.69, -0.12]} size={[0.026, 0.48, 0.026]} color="#193b45" />
      <Box at={[x - 0.22, 0.96, -0.12]} size={[0.045, 0.08, 0.045]} color="#cbb887" />
    </group>)}
    {[-0.7, 0.7].flatMap((x) => [-0.78, 0.78].map((z) => <group key={`${x}-${z}`}>
      <Box at={[x, 0.18, z]} size={[0.28, 0.17, 0.26]} color="#789d94" /><Box at={[x, 0.28, z]} size={[0.15, 0.025, 0.14]} color="#b1dacf" />
    </group>))}
  </>;
}
function City() {
  return <>
    <Box at={[0, 0.1, 0.1]} size={[3.0, 0.025, 0.19]} color="#d5ddd5" />
    <Box at={[-0.2, 0.1, 0.1]} size={[0.16, 0.025, 1.9]} color="#d5ddd5" />
    {[[-1.1, 0.7, -0.54], [-0.6, 0.44, -0.55], [0.37, 0.48, -0.48], [0.91, 0.8, -0.44], [1.29, 0.42, -0.41], [-0.8, 0.38, 0.58]].map(([x, h, z], i) => <group key={i}>
      <Box at={[x, 0.095 + h / 2, z]} size={[0.31, h, 0.31]} color={i % 2 ? "#d4e0d7" : "#8da9a6"} />
      {[0, 1, 2].flatMap((row) => [-0.078, 0.078].map((col) => <Box key={`${row}-${col}`} at={[x + col, 0.17 + row * h * 0.25, z + 0.162]}
        size={[0.054, 0.065, 0.014]} color="#bce1cb" glow />))}
    </group>)}
    {[-0.01, 0.4, 0.81, 1.22].map((x) => <group key={x} rotation={[0, 0, 0]}>
      <Box at={[x, 0.19, 0.64]} size={[0.31, 0.07, 0.45]} color="#184d69" />
      <Box at={[x, 0.232, 0.64]} size={[0.013, 0.013, 0.43]} color="#75a5b4" />
    </group>)}
    <group position={[0, 0.85, -1.0]}>
      <Box at={[0, 0, 0]} size={[1.6, 0.8, 0.06]} color="#1b414c" />
      <Box at={[0, -0.5, 0]} size={[0.08, 0.2, 0.09]} color="#576f73" />
      {[0.17, 0.35, 0.29, 0.45, 0.52, 0.40].map((h, i) => <Box key={i} at={[-0.59 + i * 0.235, -0.27 + h / 2, 0.037]} size={[0.115, h, 0.015]} color={i % 2 ? "#a9caa7" : "#48bbae"} glow />)}
    </group>
    {[-1.35, -0.4, 1.46].map((x, i) => <group key={x} position={[x, 0.11, i === 1 ? 0.9 : 0.65]}>
      <Box at={[0, 0.10, 0]} size={[0.04, 0.2, 0.04]} color="#a9986d" />
      <mesh position={[0, 0.24, 0]}><icosahedronGeometry args={[0.15, 0]} /><meshStandardMaterial color="#74a992" roughness={0.9} /></mesh>
    </group>)}
  </>;
}
export default function EcosystemCanvas({ selected, onSelect, expanded, animate, rotation }: Props) {
  const gap = expanded ? 1.42 : 0.84;
  const choose = (e: ThreeEvent<MouseEvent>, index: number) => { e.stopPropagation(); if (e.delta < 5) onSelect(index); };
  return <Canvas camera={{ position: [6.5, 4.7, 7.3], fov: 37, near: 0.1, far: 50 }} dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }} frameloop={animate ? "always" : "demand"}
    fallback={<ScenePoster />}>
    <ambientLight intensity={1.45} /><hemisphereLight args={["#eefbff", "#7d9487", 1.35]} />
    <directionalLight position={[4, 8, 5]} intensity={3.0} /><directionalLight position={[-6, 2, -3]} intensity={1.5} color="#b4e2e7" />
    <group position={[0, -0.38, 0]} rotation={[0, rotation, 0]}>
      {[Hardware, Protocols, City].map((Layer, i) => <group key={i} position={[selected === i ? 0.14 : 0, (i - 1) * gap, 0]}
        onClick={(e) => choose(e, i)}>
        <Platform color={["#6c9585", "#bbcfc4", "#b2c6c5"][i]} active={selected === i} /><Layer />
      </group>)}
      <mesh position={[0, -gap - 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.65, 64]} /><meshBasicMaterial color="#1b4e59" transparent opacity={0.035} depthWrite={false} />
      </mesh>
    </group>
    <OrbitControls makeDefault enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08}
      autoRotate={animate} autoRotateSpeed={0.45} minPolarAngle={0.55} maxPolarAngle={1.3} target={[0, 0.05, 0]} />
  </Canvas>;
}
