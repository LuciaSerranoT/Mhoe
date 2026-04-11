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

function getIsMobile() {
  return window.innerWidth < 620;
}

let isMobile = getIsMobile();

camera.position.set(0, 0, isMobile ? 12 : 10);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});

renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor('#bfc3cb', 1);

// luces
scene.add(new THREE.AmbientLight(0xffffff, 3.2));

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

// materiales
const blueBalloonMaterial = new THREE.MeshPhysicalMaterial({
  color: '#28a3a5',
  metalness: 0,
  roughness: 0.24,
  clearcoat: 1
});

const lilacBalloonMaterial = new THREE.MeshPhysicalMaterial({
  color: '#ebaad1',
  metalness: 0,
  roughness: 0.28,
  clearcoat: 1,
  side: THREE.BackSide
});

let modelGroup = null;

const gltfLoader = new GLTFLoader();
const objLoader = new OBJLoader();

// =========================
// 🔥 GLB ARREGLADO DEFINITIVO
// =========================
gltfLoader.load('/mhoe.glb', (gltf) => {

  const model = gltf.scene;
  modelGroup = new THREE.Group();

  model.updateMatrixWorld(true);

  // 🔥 limpiar transforms internos (CLAVE)
  model.traverse((child) => {

    if (child.isMesh) {
      child.geometry?.computeVertexNormals();
      child.castShadow = false;
      child.receiveShadow = false;
    }

    child.position.set(0, 0, 0);
    child.rotation.set(0, 0, 0);
    child.scale.set(1, 1, 1);
  });

  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  model.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z);

  // 🔥 ESCALA REAL FUNCIONAL
  const targetSize = isMobile ? 3 : 8.5;
  const scale = targetSize / maxDim;

  model.scale.setScalar(scale);

  const borderModel = model.clone(true);

  model.traverse((child) => {
    if (child.isMesh) child.material = blueBalloonMaterial;
  });

  borderModel.traverse((child) => {
    if (child.isMesh) {
      child.material = lilacBalloonMaterial;
      child.scale.multiplyScalar(1.04);
    }
  });

  modelGroup.add(borderModel);
  modelGroup.add(model);

  modelGroup.position.y = isMobile ? -0.6 : 0.15;

  scene.add(modelGroup);

  console.log("GLB FIX aplicado correctamente");
});

// resize
window.addEventListener('resize', () => {

  isMobile = getIsMobile();

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.position.set(0, 0, isMobile ? 12 : 10);

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
});