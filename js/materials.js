import { THREE } from './setup.js';

// Material interior letras
export const blueBalloonMaterial = new THREE.MeshPhysicalMaterial({
  color: '#28a3a5',
  metalness: 0,
  roughness: 0.24,
  clearcoat: 1,
  clearcoatRoughness: 0.02,
  sheen: 0.6,
  sheenColor: new THREE.Color('#d8f8ff'),
  envMapIntensity: 0.9
});

// Material borde letras
export const lilacBalloonMaterial = new THREE.MeshPhysicalMaterial({
  color: '#ebaad1',
  metalness: 0,
  roughness: 0.28,
  clearcoat: 1,
  clearcoatRoughness: 0.03,
  sheen: 0.55,
  sheenColor: new THREE.Color('#fff0fa'),
  envMapIntensity: 0.85,
  side: THREE.BackSide
});

// Material estrellas plateadas más claras y brillantes
export const silverStarMaterial = new THREE.MeshPhysicalMaterial({
  color: '#f7f9fd',
  metalness: 1,
  roughness: 0.08,
  clearcoat: 1,
  clearcoatRoughness: 0.02,
  envMapIntensity: 2.4,
  sheen: 0.22,
  sheenColor: new THREE.Color('#ffffff'),
  emissive: new THREE.Color('#eef3ff'),
  emissiveIntensity: 0.12
});
