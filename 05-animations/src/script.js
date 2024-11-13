import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // Sky blue color

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Objects
 */

function createStrokedCube(color, strokeColor) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: color });
  const cube = new THREE.Mesh(geometry, material);

  const edgesGeometry = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({ color: strokeColor });
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

  cube.add(edges);

  return cube;
}

const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

// Red cube
const cube1 = createStrokedCube(0xff0000, 0x000000);
cube1.position.x = -1.5;
group.add(cube1);

// Green cube
const cube2 = createStrokedCube(0x00ff00, 0x000000);
cube2.position.x = 0;
group.add(cube2);

// Blue cube
const cube3 = createStrokedCube(0x0000ff, 0x000000);
cube3.position.x = 1.5;
group.add(cube3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Handle window resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

/**
 * Animations
 */
gsap.to(group.position, { duration: 1, delay: 1, y: 1 });
gsap.to(group.position, { duration: 1, delay: 2, y: -1 });
gsap.to(group.rotation, { duration: 2, delay: 3, y: Math.PI * 2 });

gsap.to(cube1.position, { duration: 1, delay: 5, y: 1 });
gsap.to(cube2.position, { duration: 1, delay: 5.5, y: 1 });
gsap.to(cube3.position, { duration: 1, delay: 6, y: 1 });

gsap.to(cube1.position, { duration: 1, delay: 7, y: 0 });
gsap.to(cube2.position, { duration: 1, delay: 7.5, y: 0 });
gsap.to(cube3.position, { duration: 1, delay: 8, y: 0 });

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
