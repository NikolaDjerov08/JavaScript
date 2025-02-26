// Setup scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // White background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows
document.getElementById("container").appendChild(renderer.domElement);

// Function to create striped texture dynamically
function createStripedTexture() {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Gray base
    ctx.fillStyle = "#808080";
    ctx.fillRect(0, 0, size, size);

    // Red stripes
    ctx.fillStyle = "#ff0000";
    for (let i = 40; i < size; i += 100) {
        ctx.fillRect(0, i, size, 15);
    }

    // Rivets (small dots for extra detail)
    ctx.fillStyle = "#555";
    for (let x = 10; x < size; x += 50) {
        for (let y = 10; y < size; y += 100) {
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    return new THREE.CanvasTexture(canvas);
}

// Rocket body (Gray with red stripes, metallic effect)
const bodyGeometry = new THREE.CylinderGeometry(1, 1, 5, 64);
const bodyMaterial = new THREE.MeshStandardMaterial({ 
    map: createStripedTexture(),
    metalness: 0.5, // Gives a metallic look
    roughness: 0.3 // Slightly glossy
});
const rocketBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
rocketBody.castShadow = true;
scene.add(rocketBody);

// Base stand (Small cylinder)
const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 32);
const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const base = new THREE.Mesh(baseGeometry, baseMaterial);
base.position.y = -2.75;
base.receiveShadow = true;
scene.add(base);

// Glow effect (Subtle)
const glowGeometry = new THREE.RingGeometry(1.2, 1.4, 32);
const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
const glow = new THREE.Mesh(glowGeometry, glowMaterial);
glow.position.y = -2.5;
glow.rotation.x = Math.PI / 2;
scene.add(glow);

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
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
    glow.material.opacity = 0.5 + Math.sin(Date.now() * 0.002) * 0.5; // Soft glow pulsating effect
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
