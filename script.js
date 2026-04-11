import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const canvas = document.getElementById('background-canvas');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

// 🔥 FUNCIÓN CENTRAL DE MOBILE (IMPORTANTE)
function getIsMobile() {
  return window.innerWidth < 620;
}

let isMobile = getIsMobile();

// 📱 cámara inicial
camera.position.set(0, 0, isMobile ? 12 : 10);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});

// 🔥 PIXEL RATIO FIX
renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor('#bfc3cb', 1);

// Luces (igual)
const ambientLight = new THREE.AmbientLight(0xffffff, 3.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.8);
directionalLight.position.set(3, 5, 8);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.9);
directionalLight2.position.set(-4, 2, 6);
scene.add(directionalLight2);

const pointLight = new THREE.PointLight(0xffffff, 2.6, 60);
pointLight.position.set(0, 4, 10);
scene.add(pointLight);

const starLight = new THREE.DirectionalLight(0xffffff, 2.4);
starLight.position.set(-6, 4, 12);
scene.add(starLight);

// Materiales (igual)
const blueBalloonMaterial = new THREE.MeshPhysicalMaterial({
  color: '#28a3a5',
  metalness: 0,
  roughness: 0.24,
  clearcoat: 1,
  clearcoatRoughness: 0.02,
  sheen: 0.6,
  sheenColor: new THREE.Color('#d8f8ff'),
  envMapIntensity: 0.9
});

const lilacBalloonMaterial = new THREE.MeshPhysicalMaterial({
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

const silverStarMaterial = new THREE.MeshPhysicalMaterial({
  color: '#f7f9fd',
  metalness: 1,
  roughness: 0.08,
  clearcoat: 1,
  clearcoatRoughness: 0.02,
  envMapIntensity: 2.4,
  emissive: new THREE.Color('#eef3ff'),
  emissiveIntensity: 0.12
});

let modelGroup = null;

const gltfLoader = new GLTFLoader();
const objLoader = new OBJLoader();

// =====================
// LETRAS GLB
// =====================
gltfLoader.load('/mhoe.glb', (gltf) => {

  const originalModel = gltf.scene;
  modelGroup = new THREE.Group();

  const box = new THREE.Box3().setFromObject(originalModel);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  originalModel.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  const baseScale = 8.5 / maxDim;

  // 🔥 ESTO ES LO IMPORTANTE
  const finalScale = isMobile
    ? baseScale * 0.45   // 👈 MÁS PEQUEÑO (ANTES ERA 0.65)
    : baseScale;

  originalModel.scale.setScalar(finalScale);

  const borderModel = originalModel.clone(true);

  originalModel.traverse((child) => {
    if (child.isMesh) child.material = blueBalloonMaterial;
  });

  borderModel.traverse((child) => {
    if (child.isMesh) {
      child.material = lilacBalloonMaterial;
      child.scale.multiplyScalar(1.04);
    }
  });

  modelGroup.add(borderModel);
  modelGroup.add(originalModel);

  modelGroup.position.y = isMobile ? 0 : 0.15;

  scene.add(modelGroup);
});

// =====================
// RESIZE FIX REAL
// =====================
window.addEventListener('resize', () => {

  isMobile = getIsMobile();

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.position.set(0, 0, isMobile ? 12 : 10);

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
});