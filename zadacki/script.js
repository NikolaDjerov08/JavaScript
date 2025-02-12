// Setup scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set background to white

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

// Function to create striped texture dynamically
function createStripedTexture() {
    const size = 512; // Texture size
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Fill background
    ctx.fillStyle = "orange"; 
    ctx.fillRect(0, 0, size, size);

    // Draw stripes
    ctx.fillStyle = "#6a187d"; 
    for (let i = 0; i < size; i += 50) {
        ctx.fillRect(0, i, size, 10); // 10px red stripe every 50px
    }

    return new THREE.CanvasTexture(canvas);
}

// Rocket body (Gray with red lines)
const bodyGeometry = new THREE.CylinderGeometry(1, 1, 5, 64);
const bodyMaterial = new THREE.MeshStandardMaterial({ 
    map: createStripedTexture() // Apply generated stripe texture
});
const rocketBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
scene.add(rocketBody);

// Lighting
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

// Camera position
camera.position.z = 10;

// Animation loop (Rotating effect)
function animate() {
    requestAnimationFrame(animate);
    rocketBody.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
