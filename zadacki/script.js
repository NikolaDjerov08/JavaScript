// Setup scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set background to white

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows
document.getElementById("container").appendChild(renderer.domElement);

// Function to create striped texture dynamically
function createStripedTexture() {
    const size = 512; // Texture size
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Fill background gray
    ctx.fillStyle = "#808080"; // Gray color
    ctx.fillRect(0, 0, size, size);

    // Draw red stripes
    ctx.fillStyle = "#ff0000"; // Red color
    for (let i = 20; i < size; i += 100) { // More spaced-out stripes
        ctx.fillRect(0, i, size, 15); // 15px thick red stripe
    }

    return new THREE.CanvasTexture(canvas);
}

// Rocket body (Gray with red stripes, smooth shading)
const bodyGeometry = new THREE.CylinderGeometry(1, 1, 5, 64);
const bodyMaterial = new THREE.MeshPhongMaterial({ 
    map: createStripedTexture(), // Apply texture
    shininess: 80, // Add reflections
});
const rocketBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
rocketBody.castShadow = true; // Enable shadows
scene.add(rocketBody);

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
scene.add(directionalLight);

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
