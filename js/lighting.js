import { scene, THREE } from './setup.js';

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
