import { THREE, scene } from './setup.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { blueBalloonMaterial, lilacBalloonMaterial, silverStarMaterial } from './materials.js';

export let modelGroup = null;
export const floatingStars = [];

const gltfLoader = new GLTFLoader();
const objLoader = new OBJLoader();

export function loadModels() {
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
}
