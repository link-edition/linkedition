// --- Configuration ---

const profileData = {
    name: "Asadbek Komilov",
    bio: "Digital Creator | Visionary | Developer",
    image: "profile.png"
};

// Bento Grid Items
const links = [
    {
        name: "Official Website",
        desc: "Mening shaxsiy portfolio saytim.",
        url: "https://example.com",
        icon: "fas fa-globe",
        span: "col-span-2",
    },
    {
        name: "Telegram Channel",
        desc: "Foydali kontentlar blogi.",
        url: "https://t.me/username",
        icon: "fab fa-telegram-plane",
        span: "col-span-1",
    },
    {
        name: "Instagram",
        desc: "Lifestyle & Photos.",
        url: "https://instagram.com/username",
        icon: "fab fa-instagram",
        span: "col-span-1",
    },
    {
        name: "YouTube",
        desc: "Video darsliklar va sharhlar.",
        url: "https://youtube.com/@username",
        icon: "fab fa-youtube",
        span: "col-span-1",
    },
    {
        name: "GitHub",
        desc: "Open Source Projects.",
        url: "https://github.com/username",
        icon: "fab fa-github",
        span: "col-span-1",
    }
];

const socialIcons = [
    { name: "Telegram", url: "https://t.me/username", icon: "fab fa-telegram" },
    { name: "Instagram", url: "https://instagram.com/username", icon: "fab fa-instagram" },
    { name: "LinkedIn", url: "https://linkedin.com/in/username", icon: "fab fa-linkedin" },
    { name: "Twitter", url: "https://twitter.com/username", icon: "fab fa-twitter" }
];

// --- Rendering Logic ---

document.addEventListener('DOMContentLoaded', () => {
    // Render Content
    renderGrid();

    // Initialize Galaxy Animation
    initGalaxy();
});

function renderGrid() {
    const container = document.getElementById('bento-grid');
    container.innerHTML = '';

    links.forEach(link => {
        const card = document.createElement('a');
        card.href = link.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = `bento-card`;

        card.innerHTML = `
            <div class="card-icon">
                <i class="${link.icon}"></i>
            </div>
            <div class="card-content-wrapper">
                <h3 class="card-title">${link.name}</h3>
                <p class="card-desc">${link.desc}</p>
            </div>
            <div class="arrow-icon">
                <i class="fas fa-chevron-right"></i>
            </div>
        `;

        container.appendChild(card);
    });
}



// --- Milky Way Galaxy Animation ---
function initGalaxy() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 1500; // More stars for density
    const armCount = 3; // Number of spiral arms
    const galaxyRadius = 400; // Size of the galaxy
    const rotationSpeed = 0.0003; // Global rotation speed

    let globalAngle = 0;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        createParticles();
    }

    function createParticles() {
        particles = [];

        // 1. Core Stars (Bright, warm center)
        for (let i = 0; i < 200; i++) {
            const dist = Math.random() * 60; // Small radius for core
            const angle = Math.random() * Math.PI * 2;

            particles.push({
                x: 0, // calculated in draw
                y: 0,
                baseDistance: dist,
                baseAngle: angle,
                size: Math.random() * 2.5 + 1.5,
                color: 'rgba(255, 240, 200, ', // Warm white/gold
                alpha: Math.random() * 0.8 + 0.2,
                type: 'core'
            });
        }

        // 2. Spiral Arm Stars
        for (let i = 0; i < particleCount; i++) {
            // Distance from center (exponential distribution for density near center)
            const dist = Math.pow(Math.random(), 1.5) * (Math.max(width, height) * 0.6);

            // Choose an arm
            const armIndex = i % armCount;
            const armAngle = (armIndex / armCount) * Math.PI * 2;

            // Spiral twist: angle increases with distance
            const spiralAngle = dist * 0.002;

            // Random scatter around the arm
            const scatter = (Math.random() - 0.5) * 1.5; // Spread

            const totalAngle = armAngle + spiralAngle + scatter;

            // Choose color based on distance/randomness
            let colorBase = 'rgba(160, 196, 255, '; // Blueish default
            if (Math.random() > 0.8) colorBase = 'rgba(255, 255, 255, '; // White
            if (Math.random() > 0.95) colorBase = 'rgba(255, 100, 100, '; // Red giants/nebula

            particles.push({
                x: 0,
                y: 0,
                baseDistance: dist,
                baseAngle: totalAngle,
                size: Math.random() * 1.5 + 0.5,
                color: colorBase,
                alpha: Math.random() * 0.6 + 0.1,
                type: 'arm'
            });
        }
    }

    function draw() {
        // Clear with trails (Motion blur effect)
        ctx.fillStyle = 'rgba(3, 0, 20, 0.3)';
        ctx.fillRect(0, 0, width, height);

        ctx.translate(width / 2, height / 2);

        // Update global rotation
        globalAngle += rotationSpeed;

        particles.forEach(p => {
            // Calculate current position with rotation
            const currentAngle = p.baseAngle + globalAngle + (p.type === 'core' ? globalAngle * 2 : 0); // Core spins faster visual trick

            const x = Math.cos(currentAngle) * p.baseDistance;
            const y = Math.sin(currentAngle) * p.baseDistance;

            // 3D Tilt effect (optional, flattening Y slightly)
            const tiltY = y * 0.6; // Looks like an ellipse

            // Draw
            ctx.beginPath();
            ctx.fillStyle = p.color + p.alpha + ')';
            ctx.arc(x, tiltY, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        // Add a bright glow in the very center
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
        gradient.addColorStop(0, 'rgba(255, 220, 150, 0.15)');
        gradient.addColorStop(0.5, 'rgba(100, 150, 255, 0.05)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(-200, -100, 400, 200);

        ctx.translate(-width / 2, -height / 2);

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
}
