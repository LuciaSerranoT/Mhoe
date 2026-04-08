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
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor('#bfc3cb', 1);

// Luces generales
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

// Luz extra para las estrellas
const starLight = new THREE.DirectionalLight(0xffffff, 2.4);
starLight.position.set(-6, 4, 12);
scene.add(starLight);

// Material interior letras
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

// Material borde letras
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

// Material estrellas plateadas más claras y brillantes
const silverStarMaterial = new THREE.MeshPhysicalMaterial({
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

let modelGroup = null;
let targetRotationY = 0;
let targetRotationX = 0;
let currentRotationY = 0;
let currentRotationX = 0;

const floatingStars = [];

const gltfLoader = new GLTFLoader();
const objLoader = new OBJLoader();

// LETRAS GLB
gltfLoader.load(
  '/mhoe.glb',
  (gltf) => {
    const originalModel = gltf.scene;
    modelGroup = new THREE.Group();

    const box = new THREE.Box3().setFromObject(originalModel);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    originalModel.position.sub(center);

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 8.5 / maxDim;
    originalModel.scale.setScalar(scale);

    const borderModel = originalModel.clone(true);

    originalModel.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) {
          child.geometry.computeVertexNormals();
        }

        child.material = blueBalloonMaterial;
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });

    borderModel.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) {
          child.geometry.computeVertexNormals();
        }

        child.material = lilacBalloonMaterial;
        child.scale.multiplyScalar(1.04);
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });

    modelGroup.add(borderModel);
    modelGroup.add(originalModel);
    modelGroup.position.y = 0.15;

    scene.add(modelGroup);
  },
  (xhr) => {
    if (xhr.total) {
      console.log(`GLB cargado: ${((xhr.loaded / xhr.total) * 100).toFixed(0)}%`);
    }
  },
  (error) => {
    console.error('Error cargando el GLB:', error);
  }
);

// ESTRELLAS OBJ
objLoader.load(
  '/18763_Cushion_Star_starfish_v2.obj',
  (obj) => {
    const starTemplate = obj;

    const starBox = new THREE.Box3().setFromObject(starTemplate);
    const starSize = new THREE.Vector3();
    const starCenter = new THREE.Vector3();

    starBox.getSize(starSize);
    starBox.getCenter(starCenter);

    starTemplate.position.sub(starCenter);

    const maxStarDim = Math.max(starSize.x, starSize.y, starSize.z);
    const normalizedScale = maxStarDim > 0 ? 1.45 / maxStarDim : 1;
    starTemplate.scale.setScalar(normalizedScale);

    starTemplate.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) {
          child.geometry.computeVertexNormals();
        }
        child.material = silverStarMaterial;
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });

    for (let i = 0; i < 14; i++) {
      const star = starTemplate.clone(true);

      const x = (Math.random() - 0.5) * 24;
      const y = (Math.random() - 0.5) * 14;
      const z = -6 - Math.random() * 10;

      const scale = 0.95 + Math.random() * 1.25;

      star.position.set(x, y, z);
      star.scale.multiplyScalar(scale);

      star.rotation.x = Math.random() * Math.PI;
      star.rotation.y = Math.random() * Math.PI;
      star.rotation.z = Math.random() * Math.PI;

      scene.add(star);

      floatingStars.push({
        mesh: star,
        baseX: x,
        baseY: y,
        baseZ: z,
        speed: 0.35 + Math.random() * 0.6,
        floatAmount: 0.08 + Math.random() * 0.22,
        driftAmount: 0.04 + Math.random() * 0.12,
        rotX: (Math.random() - 0.5) * 0.01,
        rotY: (Math.random() - 0.5) * 0.01,
        rotZ: (Math.random() - 0.5) * 0.01,
        offset: Math.random() * Math.PI * 2
      });
    }
  },
  (xhr) => {
    if (xhr.total) {
      console.log(`OBJ cargado: ${((xhr.loaded / xhr.total) * 100).toFixed(0)}%`);
    }
  },
  (error) => {
    console.error('Error cargando el OBJ:', error);
  }
);

// Scroll
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = maxScroll > 0 ? scrollTop / maxScroll : 0;

  targetRotationY = scrollProgress * Math.PI * 1.8;
  targetRotationX = -0.12 + scrollProgress * 0.22;
});

// Ratón
window.addEventListener('mousemove', (event) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

  targetRotationY += mouseX * 0.002;
  targetRotationX = mouseY * 0.1;
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsed = clock.getElapsedTime();

  if (modelGroup) {
    currentRotationY += (targetRotationY - currentRotationY) * 0.08;
    currentRotationX += (targetRotationX - currentRotationX) * 0.08;

    modelGroup.rotation.y = currentRotationY;
    modelGroup.rotation.x = currentRotationX;
    modelGroup.position.y = Math.sin(elapsed * 1.2) * 0.14;
  }

  floatingStars.forEach((star) => {
    star.mesh.position.y =
      star.baseY + Math.sin(elapsed * star.speed + star.offset) * star.floatAmount;

    star.mesh.position.x =
      star.baseX + Math.cos(elapsed * star.speed * 0.7 + star.offset) * star.driftAmount;

    star.mesh.rotation.x += star.rotX;
    star.mesh.rotation.y += star.rotY;
    star.mesh.rotation.z += star.rotZ;
  });

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Formulario
const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !email || !mensaje) {
      alert('Por favor, completa todos los campos antes de enviar.');
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
      alert('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    alert('¡Gracias! Tu mensaje se ha enviado correctamente. Pronto nos pondremos en contacto contigo.');
    form.reset();
  });
}

const links = document.querySelectorAll('.main-nav a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  links.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});