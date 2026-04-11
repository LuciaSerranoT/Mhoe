// LETRAS GLB (PRUEBA ESCALA ENANA)
gltfLoader.load('/mhoe.glb', (gltf) => {

  const originalModel = gltf.scene;
  modelGroup = new THREE.Group();

  const box = new THREE.Box3().setFromObject(originalModel);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();

  box.getSize(size);
  box.getCenter(center);

  originalModel.position.sub(center);

  // 🧪 PRUEBA EXTREMA: ESCALA ENANA
  const testScale = 0.01;

  originalModel.scale.setScalar(testScale);

  const borderModel = originalModel.clone(true);

  originalModel.traverse((child) => {
    if (child.isMesh) {
      child.material = blueBalloonMaterial;
    }
  });

  borderModel.traverse((child) => {
    if (child.isMesh) {
      child.material = lilacBalloonMaterial;
      child.scale.multiplyScalar(1.04);
    }
  });

  modelGroup.add(borderModel);
  modelGroup.add(originalModel);

  modelGroup.position.y = isMobile ? -0.6 : 0.15;

  scene.add(modelGroup);

  console.log("GLB cargado con escala 0.01 (PRUEBA)");
});