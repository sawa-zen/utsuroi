'use strict';

(function() {
  var manipulator;
  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 20;
  camera.position.y = 5;
  camera.lookAt(new THREE.Vector3(0, 1, 0));

  var renderer = new THREE.WebGLRenderer({antialias: false});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(1);
  renderer.gammaOutput = true;
  document.body.appendChild(renderer.domElement);

  var ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  var loader = new THREE.GLTFLoader();
  loader.load('assets/zensuke.gltf', (gltf) {
    scene.add(gltf.scene)
    manipulator = new Utsuroi.Manipulator(gltf.scene, gltf.animations);
    manipulator.play('Rest Pose', true);
  })

  tick();
  function tick() {
    requestAnimationFrame(tick);
    if (manipulator) manipulator.update();
    renderer.render(scene, camera);
  }

  var buttonList = document.getElementById('buttonList');
  buttonList.addEventListener('click', onClickButtons);

  function onClickButtons(event) {
    var target = event.target;
    manipulator.to(target.dataset.action, 200, !!target.dataset.loop);
  }
})();
