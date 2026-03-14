/* 
===================================================
   PRAVEEN R - PORTFOLIO INTERACTIVITY
=================================================== 
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Custom Cursor Indicator
    const cursor = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const interactiveElements = document.querySelectorAll('a, button, .hover-lift, .hover-glow, .skill-item, .circular-skill, .project-showcase');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // 2. Typing Animation
    const typingText = document.getElementById('typing-text');
    const words = [
        "Chemical Engineering Student", 
        "Future Process Engineer", 
        "Research & Innovation Enthusiast"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster when deleting
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // pause before next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect after a short delay
    setTimeout(typeEffect, 1500);

    // 3. Scroll Progress Bar
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
        
        // Navigation background change on scroll
        const nav = document.querySelector('.floating-nav');
        if (winScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 4. Reveal Animations on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const skillLines = document.querySelectorAll('.progress-line span');
    const circularSkills = document.querySelectorAll('.circular-progress');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's the skills section, animate the bars/circles
                if (entry.target.classList.contains('skills-category')) {
                    // Animate linear progress bars
                    skillLines.forEach(line => {
                        const percent = line.parentElement.getAttribute('data-percent');
                        line.style.width = percent;
                    });
                    
                    // Animate circular progress bars
                    circularSkills.forEach(circle => {
                        const value = circle.getAttribute('data-value');
                        let count = 0;
                        const speed = 20; // ms
                        
                        const counter = setInterval(() => {
                            count++;
                            circle.style.background = `conic-gradient(var(--clr) ${count * 3.6}deg, rgba(255,255,255,0.05) 0deg)`;
                            if(count == value) {
                                clearInterval(counter);
                            }
                        }, speed);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 5. Background Particles Engine (Lightweight Canvas)
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    
    // Hexagon drawing helper (chemical theme)
    function drawHexagon(ctx, x, y, r) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            ctx.lineTo(x + r * Math.cos(i * Math.PI / 3), y + r * Math.sin(i * Math.PI / 3));
        }
        ctx.closePath();
        ctx.stroke();
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            // Mixed colors for a modern tech feel
            const colors = ['rgba(6, 182, 212, 0.4)', 'rgba(34, 197, 94, 0.4)', 'rgba(59, 130, 246, 0.4)'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.type = Math.random() > 0.8 ? 'hex' : 'circle'; // 20% hexagons
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            if(this.type === 'circle') {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1;
                drawHexagon(ctx, this.x, this.y, this.size * 2);
            }
        }
    }
    
    function initParticles() {
        particlesArray = [];
        const numParticles = Math.min(Math.floor(window.innerWidth / 15), 80); // Responsive amount
        for (let i = 0; i < numParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Connecting lines for a network/molecule effect
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 - distance/1000})`; // Fade based on dist
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }
    
    initParticles();
    animateParticles();
    
    // Handle Window Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    // 6. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    function closeMenu() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    closeMenuBtn.addEventListener('click', closeMenu);
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 8. Active Nav Link Update
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 9. Abstract Modal Logic
    const readAbstractBtn = document.getElementById('readAbstractBtn');
    const abstractModal = document.getElementById('abstractModal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    
    if(readAbstractBtn && abstractModal) {
        readAbstractBtn.addEventListener('click', (e) => {
            e.preventDefault();
            abstractModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
        
        closeModalBtn.addEventListener('click', () => {
            abstractModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        abstractModal.addEventListener('click', (e) => {
            if (e.target === abstractModal) {
                abstractModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Initialize the starting frame
    document.querySelector('.hero-section .profile-container').classList.add('active');
});
