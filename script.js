"use strict";

const canvas = document.getElementById("c");

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//resize時にupdateが必要なもの
const resize = () => {
  size.width = window.innerWidth;
  size.Height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(window.devicePixelRatio);
};

window.addEventListener("resize", resize);

//Scene
const scene = new THREE.Scene();

//Texture
const loader = new THREE.TextureLoader();
const texture = loader.load("./img/test.jpg");

const geometries = [];
const materials = [];
const planes = [];

for (let i = 0; i < 5; i++) {
  //Geometry
  const geometry = new THREE.PlaneBufferGeometry(1, 1, 64, 64);
  geometries.push(geometry);

  //Material
  const material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  materials.push(material);

  //Mesh
  const plane = new THREE.Mesh(geometries[i], materials[i]);
  plane.position.x = (i - 2) * 1.4;
  plane.position.z = (i % 2) * -1;
  planes.push(plane);

  scene.add(planes[i]);
}

//Light
const frontLight = new THREE.PointLight("#fafafa", 1.6);
const backLight = new THREE.PointLight("#fafafa", 1.6);
frontLight.position.set(0, -2, 2);
backLight.position.set(0, -2, -2);
scene.add(frontLight, backLight);

//Camera
let cameraActive = false;

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000
);
camera.position.z = 5;

const upperCamera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000
);
upperCamera.position.set(0, 2, 3);

scene.add(camera, upperCamera);

//Orbit Control
const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 10;
controls.minDistance = 2;
controls.autoRotate = true;

const upperControls = new THREE.OrbitControls(upperCamera, canvas);
upperControls.maxDistance = 10;
upperControls.minDistance = 2;
upperControls.autoRotate = true;

//Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(new THREE.Color("#111111"), 1);

//Raycaster
const raycaster = new THREE.Raycaster();

//Mouse
const mouse = {
  x: undefined,
  y: undefined,
};

const animate = () => {
  controls.update();
  upperControls.update();

  if (!cameraActive) {
    renderer.render(scene, camera);
  } else {
    renderer.render(scene, upperCamera);
  }

  raycaster.setFromCamera(mouse, camera);

  for (const plane of planes) {
    const intersects = raycaster.intersectObject(plane);
    if (intersects.length > 0) {
      plane.rotation.y = Math.PI;
    } else {
      plane.rotation.y = 0;
    }
  }

  window.requestAnimationFrame(animate);
};

animate();

//Event Listener
const cameraBtn = document.getElementById("btn");
cameraBtn.addEventListener("click", () => {
  cameraActive = !cameraActive;
});

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / innerHeight) * 2 + 1;
});

const onClick = () => {
  let selectedObject;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planes, true);
  if (intersects.length > 0) {
    selectedObject = intersects[0];
    const id = selectedObject.object.id;
    console.log(id);

    switch (id) {
      case 6:
        window.open("https://shugosaito.github.io/resas-api/", "_blank");
        break;
      case 7:
        window.open("https://shugosaito.github.io/blackjack/", "_blank");
        break;
      case 8:
        window.open("https://shugosaito.github.io/To-Do-App/", "_blank");
        break;
      case 9:
        window.open("https://shugosaito.github.io/candy/", "_blank");
        break;
      case 10:
        window.open("https://salty-crag-73377.herokuapp.com/", "_blank");
        break;
    }
  }
};

//Gsap animation
renderer.domElement.addEventListener("click", onClick, true);

const planeMove = () => {
  const timeline = gsap.timeline({ onComplete: planeMove });

  timeline.to(planes[0].position, 2, {
    y: (Math.random() - 0.5) * 4,
  });
  timeline.to(planes[0].position, 2, {
    y: 0,
  });
  timeline.to(planes[1].position, 2, {
    y: (Math.random() - 0.5) * 4,
  });
  timeline.to(planes[1].position, 2, {
    y: 0,
  });
  timeline.to(planes[2].position, 2, {
    y: (Math.random() - 0.5) * 4,
  });
  timeline.to(planes[2].position, 2, {
    y: 0,
  });
  timeline.to(planes[3].position, 2, {
    y: (Math.random() - 0.5) * 4,
  });
  timeline.to(planes[3].position, 2, {
    y: 0,
  });
  timeline.to(planes[4].position, 2, {
    y: (Math.random() - 0.5) * 4,
  });
  timeline.to(planes[4].position, 2, {
    y: 0,
  });
};

planeMove();
