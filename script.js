/**
 * DATA LANDING PAGE (EDIT DI SINI)
 * Anda dapat mengubah isi landing page dengan mengedit objek di bawah ini.
 */
const PAGE_DATA = {
    character: {
        name: "BOAS",
        image: "https://www.pngmart.com/files/13/Katsuki-Bakugo-PNG-Transparent-Image.png", // Link gambar HD transparan yang stabil
        pageNumber: "05"
    },
    menu: [
        { label: "Home", link: "#" },
        { label: "About", link: "#" },
        { label: "Contact", link: "#" },
        { label: "Gallery", link: "#" }
    ],
    settings: {
        scrollText: "Scroll Down",
        siteTitle: "Boas Sababang"
    }
};

/**
 * FUNGSI RENDER
 */
function initLandingPage() {
    // 1. Set Title & Background Text
    document.title = PAGE_DATA.settings.siteTitle;
    document.getElementById('bg-name').innerText = PAGE_DATA.character.name;
    document.getElementById('page-num').innerText = PAGE_DATA.character.pageNumber;

    // 2. Set Character Image
    const charImg = document.getElementById('char-img');
    charImg.src = PAGE_DATA.character.image;

    // 3. Render Menu
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = PAGE_DATA.menu.map(item => `
        <li><a href="${item.link}" data-section="${item.label.toLowerCase()}">${item.label}</a></li>
    `).join('');

    // Add Menu Click Logic
    document.querySelectorAll('#menu-list a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section') + '-section';
            
            // Hide all sections
            document.querySelectorAll('.character-container, .page-content').forEach(sec => {
                sec.classList.remove('active');
            });

            // Show target section
            const targetSec = document.getElementById(sectionId);
            if (targetSec) {
                targetSec.classList.add('active');
            }
        });
    });

    // 4. Set Scroll Hint
    document.querySelector('.scroll-hint span').innerText = PAGE_DATA.settings.scrollText;

    // 5. Add Parallax, Fire & Background Music
    addParallax();
    initFireEffect();
    startBackgroundMusic();
}

/**
 * AUTO PLAY BACKGROUND MUSIC
 */
function startBackgroundMusic() {
    const music = document.getElementById('bg-music');
    music.volume = 0.4;

    // Putar otomatis saat klik pertama
    document.addEventListener('click', () => {
        music.play().catch(e => console.log("Autoplay blocked."));
    }, { once: true });

    // Klik 2 kali untuk menghidupkan atau mematikan musik (Toggle)
    document.addEventListener('dblclick', () => {
        if (music.paused) {
            music.play().catch(e => console.log("Autoplay blocked."));
            console.log("Musik dihidupkan melalui double click.");
        } else {
            music.pause();
            console.log("Musik dimatikan melalui double click.");
        }
    });
}

/**
 * EFEK PARALLAX SEDERHANA
 */
function addParallax() {
    const wrapper = document.querySelector('.main-wrapper');
    const bgText = document.querySelector('.bg-text');
    const charImg = document.querySelector('.character-container img');

    wrapper.addEventListener('mousemove', (e) => {
        const { width, height } = wrapper.getBoundingClientRect();
        const mouseX = (e.clientX / width) - 0.5;
        const mouseY = (e.clientY / height) - 0.5;

        // Move Background Text (Slower)
        bgText.style.transform = `translate(${mouseX * 50}px, ${mouseY * 50}px)`;

        // Move Character (Faster)
        charImg.style.transform = `translate(${mouseX * -30}px, ${mouseY * -30}px)`;
    });
}

/**
 * ANIMASI API (FIRE PARTICLE SYSTEM)
 */
function initFireEffect() {
    const canvas = document.getElementById('fire-canvas');
    const ctx = canvas.getContext('2d');
    const wrapper = document.querySelector('.main-wrapper');

    let particles = [];
    const particleCount = 60;

    function resize() {
        canvas.width = wrapper.offsetWidth;
        canvas.height = wrapper.offsetHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 5 + 2;
            this.speedY = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 1.5;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.005;
            this.color = this.getRandomFireColor();
        }

        getRandomFireColor() {
            const colors = ['#ff4d00', '#e62e2e', '#ff9500', '#ffcc00'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            this.life -= this.decay;
            if (this.life <= 0) {
                this.reset();
            }
        }

        draw() {
            ctx.globalAlpha = this.life;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            // Add glow
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        }
    }

    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    createParticles();
    animate();
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', initLandingPage);
