import { THREE, camera, renderer, scene } from './setup.js';
import { modelGroup, floatingStars } from './models.js';
import { rotationState } from './interactions.js';

let currentRotationY = 0;
let currentRotationX = 0;

export function startAnimation() {
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    if (modelGroup) {
      currentRotationY += (rotationState.targetY - currentRotationY) * 0.08;
      currentRotationX += (rotationState.targetX - currentRotationX) * 0.08;

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
}

export function setupResizeListener() {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}
