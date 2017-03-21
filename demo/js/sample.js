'use strict';

(function() {

  var utsuroi;

  var clock = new THREE.Clock();

  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 25;
  camera.position.y = 5;
  camera.lookAt(new THREE.Vector3(0, 1, 0));

  var renderer = new THREE.WebGLRenderer({antialias: false});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(1);
  document.body.appendChild(renderer.domElement);

  var ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  var loader = new THREE.JSONLoader();
  loader.load('assets/zensuke.json', createActor);
  function createActor(geometry, materials) {
    materials.forEach(function(m) {
      m.skinning = true;
    });
    var material = new THREE.MultiMaterial(materials);
    var actor = new THREE.SkinnedMesh(geometry, material);
    scene.add(actor);

    var mixer = new THREE.AnimationMixer(actor);
    utsuroi = new Utsuroi(mixer, [
      {name: "Rest Pose", loop: true},
      {name: "Walk", loop: true},
      {name: "Jump"},
      {name: "Attack"}
    ], "Rest Pose");
    utsuroi.play();
  }

  tick();
  function tick() {
    requestAnimationFrame(tick);
    if(utsuroi) {
      var delta = clock.getDelta();
      utsuroi.update(delta);
    }
    renderer.render(scene, camera);
  }
})();
