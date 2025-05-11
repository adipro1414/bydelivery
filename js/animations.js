// Animations JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Create animated delivery truck SVG in hero section
    createDeliveryTruck();
    
    // Animate truck from right to left
    animateTruck();
    
    // Create order image SVG
    createOrderSVG();
    
    // Create mini conveyor above form
    createMiniConveyor();
    
    // Create how it works animations
    createHowItWorksAnimations();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize loading overlay
    initLoadingOverlay();
    
    // Create wavy text in hero section
    createWavyText();
    
    // Initialize enhanced scroll animations
    initEnhancedScrollAnimations();
    
    // Initialize parallax scrolling effect
    initParallaxScrolling();
});

// Loading Overlay
function initLoadingOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('loading-overlay');
    
    const loader = document.createElement('div');
    loader.classList.add('loader');
    
    const bubble1 = document.createElement('div');
    const bubble2 = document.createElement('div');
    
    loader.appendChild(bubble1);
    loader.appendChild(bubble2);
    overlay.appendChild(loader);
    
    document.body.appendChild(overlay);
    
    // Hide loading overlay after page has loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            overlay.classList.add('hidden');
            
            setTimeout(function() {
                overlay.remove();
            }, 500);
        }, 500);
    });
}

// Create animated delivery truck SVG
function createDeliveryTruck() {
    const deliveryAnimation = document.querySelector('.delivery-animation');
    if (!deliveryAnimation) return;
    
    // SVG for delivery truck
    const truckSvg = `
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="sky-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#a7d9ff;stop-opacity:1" />
                <stop offset="80%" style="stop-color:#e6f7ff;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="road-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#444444;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#222222;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="truck-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#39675c;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2a524a;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="truck-side-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#39675c;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2a524a;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="hill-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#4a7c70;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#39675c;stop-opacity:1" />
            </linearGradient>
            <filter id="truck-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        
        <!-- Rounded Sky Background -->
        <path d="M0,20 C0,10 10,0 20,0 H780 C790,0 800,10 800,20 V280 C700,310 600,290 500,300 C400,310 300,290 200,300 C100,310 50,290 0,280 Z" fill="url(#sky-gradient)" />
        
        <!-- Clouds -->
        <g class="clouds">
            <path d="M50,100 C60,90 80,90 90,100 C100,85 120,85 130,100 C140,90 160,90 170,110 C180,100 200,100 200,120 C200,140 180,140 170,130 C160,145 140,145 130,130 C120,145 100,145 90,130 C80,140 60,140 50,120 C50,110 50,100 50,100 Z" fill="white" opacity="0.8" />
            
            <path d="M600,70 C610,60 630,60 640,70 C650,55 670,55 680,70 C690,60 710,60 720,80 C730,70 750,70 750,90 C750,110 730,110 720,100 C710,115 690,115 680,100 C670,115 650,115 640,100 C630,110 610,110 600,90 C600,80 600,70 600,70 Z" fill="white" opacity="0.7" />
            
            <path d="M200,50 C210,40 230,40 240,50 C250,35 270,35 280,50 C290,40 310,40 320,60 C330,50 350,50 350,70 C350,90 330,90 320,80 C310,95 290,95 280,80 C270,95 250,95 240,80 C230,90 210,90 200,70 C200,60 200,50 200,50 Z" fill="white" opacity="0.6" />
        </g>
        
        <!-- Sun with Glow -->
        <circle cx="700" cy="80" r="40" fill="#f9a826" filter="url(#glow)" />
        <circle cx="700" cy="80" r="50" fill="#f9a826" opacity="0.3" />
        <circle cx="700" cy="80" r="60" fill="#f9a826" opacity="0.1" />
        
        <!-- Hills in Background -->
        <path d="M0,280 C100,250 200,270 300,240 C400,220 500,250 600,230 C700,210 800,240 800,240 V300 H0 Z" fill="url(#hill-gradient)" opacity="0.6" />
        <path d="M0,260 C50,280 150,260 200,280 C250,290 350,270 400,290 C450,300 500,280 550,290 C600,300 700,280 800,290 V320 H0 Z" fill="url(#hill-gradient)" opacity="0.8" />
        
        <!-- Trees -->
        <g class="trees">
            <!-- Tree 1 -->
            <path d="M120,280 L125,250 L130,280 Z" fill="#2a524a" />
            <circle cx="125" cy="245" r="15" fill="#4a7c70" />
            
            <!-- Tree 2 -->
            <path d="M160,290 L165,260 L170,290 Z" fill="#2a524a" />
            <circle cx="165" cy="255" r="12" fill="#4a7c70" />
            
            <!-- Tree 3 -->
            <path d="M680,270 L685,240 L690,270 Z" fill="#2a524a" />
            <circle cx="685" cy="235" r="15" fill="#4a7c70" />
            
            <!-- Tree 4 -->
            <path d="M720,285 L725,255 L730,285 Z" fill="#2a524a" />
            <circle cx="725" cy="250" r="12" fill="#4a7c70" />
        </g>
        
        <!-- Curved Road -->
        <path d="M0,300 C150,320 250,300 400,310 C550,320 650,300 800,310 V450 H0 Z" fill="url(#road-gradient)" />
        
        <!-- Road Lines -->
        <path d="M0,350 C150,360 250,350 400,355 C550,360 650,350 800,355" stroke="#ffffff" stroke-width="5" stroke-dasharray="40 20" fill="none" />
        
        <!-- Buildings Silhouette - Rounded -->
        <rect x="50" y="150" width="80" height="150" fill="#39675c" opacity="0.8" rx="15" />
        <rect x="150" y="100" width="60" height="200" fill="#39675c" opacity="0.6" rx="15" />
        <rect x="230" y="180" width="100" height="120" fill="#39675c" opacity="0.7" rx="15" />
        <rect x="600" y="140" width="70" height="160" fill="#39675c" opacity="0.7" rx="15" />
        <rect x="690" y="180" width="90" height="120" fill="#39675c" opacity="0.6" rx="15" />
        
        <!-- Truck Group -->
        <g class="truck-container">
            <!-- Truck Shadow -->
            <ellipse cx="400" cy="340" rx="120" ry="10" fill="#000" opacity="0.3" />
            
            <!-- Truck Cargo/Body - Improved with curves -->
            <path d="M350,250 
                     C350,240 360,240 360,240 
                     H490 
                     C500,240 500,250 500,250 
                     V310 
                     C500,320 490,320 490,320 
                     H360 
                     C350,320 350,310 350,310 Z" 
                  fill="url(#truck-gradient)" />
            
            <!-- Subtle details on cargo -->
            <rect x="360" y="260" width="130" height="5" fill="#ffffff" opacity="0.1" rx="2" />
            <rect x="360" y="295" width="130" height="5" fill="#000000" opacity="0.1" rx="2" />
            
            <!-- Truck Cabin - Improved with curves -->
            <path d="M300,320 
                     L300,280 
                     C300,270 305,260 315,255 
                     L340,240 
                     C345,240 350,240 350,250 
                     V320 Z" 
                  fill="url(#truck-side-gradient)" />
            
            <!-- Cabin Window and Details -->
            <path d="M305,275 
                     L305,260 
                     C305,255 310,252 315,250 
                     L335,242 
                     C340,242 345,245 345,255 
                     V275 Z" 
                  fill="#a8e0d8" />
                  
            <!-- Cabin Interior Detail -->
            <path d="M310,270 
                     L310,260 
                     C310,257 312,255 315,254 
                     L330,248 
                     C333,248 335,250 335,255 
                     V270 Z" 
                  fill="#226b5d" opacity="0.7" />
            
            <!-- Truck Logo Panel -->
            <rect x="375" y="270" width="80" height="25" rx="5" fill="#2a524a" />
            
            <!-- Truck Logo -->
            <text x="415" y="288" font-family="Heebo, sans-serif" font-size="16" fill="#ffffff" text-anchor="middle" font-weight="bold">משלוחים</text>
            
            <!-- Front Lights -->
            <ellipse cx="305" cy="290" rx="5" ry="4" fill="#f9a826" />
            <ellipse cx="305" cy="290" rx="7" ry="6" fill="#f9a826" opacity="0.3" />
            
            <!-- Rear Lights -->
            <ellipse cx="495" cy="290" rx="5" ry="4" fill="#ff6b6b" />
            <ellipse cx="495" cy="290" rx="7" ry="6" fill="#ff6b6b" opacity="0.3" />
            
            <!-- Bumpers -->
            <path d="M300,315 L300,325 Q305,330 350,330 L400,330 Q450,330 500,330 L500,315" fill="#444" opacity="0.8" />
            
            <!-- Truck Wheels - No animations -->
            <circle cx="325" cy="320" r="15" fill="#333333" />
            <circle cx="325" cy="320" r="10" fill="#666666" />
            <circle cx="325" cy="320" r="6" fill="#444444" />
            <circle cx="325" cy="320" r="2" fill="#333333" />
            
            <circle cx="450" cy="320" r="15" fill="#333333" />
            <circle cx="450" cy="320" r="10" fill="#666666" />
            <circle cx="450" cy="320" r="6" fill="#444444" />
            <circle cx="450" cy="320" r="2" fill="#333333" />
            
            <!-- Truck Package - Improved with shadow -->
            <rect x="380" y="230" width="40" height="40" rx="5" fill="#f9a826" />
            <rect x="385" y="235" width="30" height="5" rx="2" fill="#ffffff" opacity="0.3" />
            <line x1="380" y1="250" x2="420" y2="250" stroke="#39675c" stroke-width="2" />
            <line x1="400" y1="230" x2="400" y2="270" stroke="#39675c" stroke-width="2" />
        </g>
    </svg>
    `;
    
    deliveryAnimation.innerHTML = truckSvg;
}

// Animate truck from right to left
function animateTruck() {
    setTimeout(() => {
        const truckContainer = document.querySelector('.truck-container');
        if (!truckContainer) return;
        
        // Reset any existing animations that might be affecting the truck
        gsap.killTweensOf(truckContainer);
        
        // Immediately position truck far right, flipped to face left
        gsap.set(truckContainer, { 
            x: 400, // Start further right to ensure it's fully off-screen
            scaleX: -1, // Flip horizontally
            transformOrigin: "center center" // Ensure proper flipping
        });
        
        // Use a small delay to ensure the initial position is applied
        setTimeout(() => {
            // Animate from right to left
            gsap.to(truckContainer, {
                x: -400, // Move further left to ensure it fully exits screen
                duration: 15,
                ease: "linear",
                repeat: -1,
                onRepeat: function() {
                    // Reset to right side when it reaches left edge
                    gsap.set(truckContainer, { 
                        x: 400,
                        scaleX: -1
                    });
                }
            });
        }, 100);
    }, 500); // Add initial delay to ensure DOM is ready
}

// Create order form SVG
function createOrderSVG() {
    const orderImage = document.querySelector('.order-image');
    if (!orderImage) return;
    
    // SVG for person with package - animated
    const orderSvg = `
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="package-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#f9a826;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#e69113;stop-opacity:1" />
            </linearGradient>
        </defs>
        
        <!-- Ground -->
        <rect x="50" y="250" width="300" height="10" fill="#e0e0e0" rx="2" />
        
        <!-- Person holding package -->
        <g class="person-group">
            <!-- Body -->
            <circle cx="200" cy="130" r="25" fill="#39675c" />
            <path d="M200,155 L200,220" stroke="#39675c" stroke-width="10" stroke-linecap="round" />
            
            <!-- Arms holding package - with subtle animation -->
            <g class="arms">
                <path d="M200,170 L170,190" stroke="#39675c" stroke-width="8" stroke-linecap="round">
                    <animate attributeName="d" values="M200,170 L170,190; M200,170 L170,187; M200,170 L170,190" dur="3s" repeatCount="indefinite" />
                </path>
                <path d="M200,170 L230,190" stroke="#39675c" stroke-width="8" stroke-linecap="round">
                    <animate attributeName="d" values="M200,170 L230,190; M200,170 L230,187; M200,170 L230,190" dur="3s" repeatCount="indefinite" />
                </path>
            </g>
            
            <!-- Legs -->
            <path d="M200,220 L185,250" stroke="#39675c" stroke-width="8" stroke-linecap="round" />
            <path d="M200,220 L215,250" stroke="#39675c" stroke-width="8" stroke-linecap="round" />
            
            <!-- Face -->
            <circle cx="190" cy="125" r="3" fill="white" />
            <circle cx="210" cy="125" r="3" fill="white" />
            <path d="M190,140 Q200,145 210,140" stroke="white" stroke-width="2" fill="none" />
            
            <!-- Package the person is holding - with subtle animation -->
            <g class="package-group">
                <rect x="170" y="170" width="60" height="50" rx="4" fill="url(#package-gradient)">
                    <animate attributeName="y" values="170;168;170" dur="3s" repeatCount="indefinite" />
                </rect>
                <line x1="170" y1="190" x2="230" y2="190" stroke="#fff" stroke-width="1" />
                <line x1="200" y1="170" x2="200" y2="220" stroke="#fff" stroke-width="1" />
                <rect x="180" y="175" width="40" height="10" fill="#fff" opacity="0.6" />
            </g>
        </g>
        
        <!-- Delivery speech bubble -->
        <g class="speech-bubble">
            <ellipse cx="260" cy="100" rx="50" ry="30" fill="white" stroke="#39675c" stroke-width="2" />
            <path d="M230,120 L220,140 L240,115" fill="white" stroke="#39675c" stroke-width="2" />
            <text x="260" y="105" font-family="Heebo, sans-serif" font-size="12" text-anchor="middle" fill="#39675c">בדרך אליך!</text>
        </g>
    </svg>
    `;
    
    orderImage.innerHTML = orderSvg;
}

// Create mini conveyor above form
function createMiniConveyor() {
    const miniConveyor = document.querySelector('.mini-conveyor-animation');
    if (!miniConveyor) return;
    
    // SVG for mini conveyor belt with package - more prominent design
    const conveyorSvg = `
    <svg viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="mini-conveyor-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:#666;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#444;stop-opacity:1" />
            </linearGradient>
            <linearGradient id="mini-package-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#f9a826;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#e69113;stop-opacity:1" />
            </linearGradient>
        </defs>
        
        <!-- Conveyor Support Legs -->
        <rect x="40" y="45" width="10" height="15" fill="#555" rx="1" />
        <rect x="350" y="45" width="10" height="15" fill="#555" rx="1" />
        
        <!-- Main Conveyor Belt - raised above form -->
        <rect x="0" y="25" width="400" height="5" rx="2" fill="#39675c" />
        <rect x="0" y="30" width="400" height="15" rx="0" fill="url(#mini-conveyor-gradient)" />
        <rect x="0" y="45" width="400" height="5" rx="2" fill="#39675c" />
        
        <!-- Clearer Rollers -->
        <circle cx="40" cy="38" r="5" fill="#888" stroke="#777" stroke-width="1">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 40 38" to="360 40 38" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="120" cy="38" r="5" fill="#888" stroke="#777" stroke-width="1">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 120 38" to="360 120 38" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="38" r="5" fill="#888" stroke="#777" stroke-width="1">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 200 38" to="360 200 38" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="280" cy="38" r="5" fill="#888" stroke="#777" stroke-width="1">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 280 38" to="360 280 38" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="360" cy="38" r="5" fill="#888" stroke="#777" stroke-width="1">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 360 38" to="360 360 38" dur="1.5s" repeatCount="indefinite" />
        </circle>
        
        <!-- Moving Package - slightly larger -->
        <g>
            <animateMotion path="M -30 0 L 430 0" dur="3s" repeatCount="indefinite" />
            <rect x="0" y="10" width="20" height="20" fill="url(#mini-package-gradient)" rx="2" />
            <line x1="0" y1="20" x2="20" y2="20" stroke="#fff" stroke-width="1" />
            <line x1="10" y1="10" x2="10" y2="30" stroke="#fff" stroke-width="1" />
        </g>
    </svg>
    `;
    
    miniConveyor.innerHTML = conveyorSvg;
}

// Create animations for the How It Works section
function createHowItWorksAnimations() {
    // Get all timeline icons
    const timelineIcons = document.querySelectorAll('.timeline-icon');
    if (!timelineIcons.length) return;
    
    // Remove any existing connecting arrows
    const existingArrows = document.querySelectorAll('.connecting-arrow');
    existingArrows.forEach(arrow => arrow.remove());
    
    // Add GSAP animations for timeline
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.how-works-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    // Animate the timeline line
    timeline.fromTo('.timeline::after', 
        { height: '0%' },
        { height: '100%', duration: 1.5, ease: 'power2.out' }
    );
    
    // Animate timeline content with more impressive entrance
    timeline.fromTo('.timeline-content', 
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.3, ease: 'back.out(1.2)' },
        '-=1.5'
    );
    
    // Add hover effects for timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.timeline-icon'), {
                scale: 1.1,
                rotate: 5,
                duration: 0.3,
                ease: 'power1.out'
            });
            
            gsap.to(this.querySelector('.timeline-svg'), {
                scale: 1.2,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.timeline-icon'), {
                scale: 1,
                rotate: 0,
                duration: 0.3,
                ease: 'power1.out'
            });
            
            gsap.to(this.querySelector('.timeline-svg'), {
                scale: 1,
                duration: 0.3,
                ease: 'power1.out'
            });
        });
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Check if any animated elements exist
    if (animatedElements.length === 0) return;
    
    // Make service cards visible immediately - fix for invisible cards issue
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '1';
    });
    
    // Setup scrolltrigger for each animated element
    animatedElements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: "top 80%",
            onEnter: () => {
                element.classList.add('animated');
            }
        });
    });
    
    // Animate hero section elements immediately
    const heroElements = document.querySelectorAll('.hero-section .animate-on-scroll');
    setTimeout(() => {
        heroElements.forEach(element => {
            element.classList.add('animated');
        });
    }, 100);
}

// Create wavy text effect - REPLACED WITH NEW ANIMATION
function createWavyText() {
    // Apply to hero text
    const heroTitle = document.querySelector('.hero-text h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    let newHtml = '';
    
    // Create spans for each character, including spaces
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ') {
            newHtml += '<span class="hero-title-char" style="width: 0.3em;">&nbsp;</span>';
        } else {
            newHtml += `<span class="hero-title-char">${char}</span>`;
        }
    }
    
    heroTitle.innerHTML = newHtml;
    
    // Animate each character with staggered delay
    const chars = heroTitle.querySelectorAll('.hero-title-char');
    chars.forEach((char, index) => {
        // Calculate delay: first character should appear immediately, 
        // then each subsequent character with small additional delay
        const delay = 0.08 * index;
        char.style.animationDelay = `${delay}s`;
        
        // Add animated class after delay to trigger animations
        setTimeout(() => {
            char.classList.add('animated');
        }, delay * 1000);
    });
    
    // Add 3D tilt effect on mousemove
    heroTitle.addEventListener('mousemove', (e) => {
        const bounds = heroTitle.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;
        
        const percentX = (mouseX - centerX) / centerX;
        const percentY = (mouseY - centerY) / centerY;
        
        const maxRotate = 10;
        const rotateX = -percentY * maxRotate;
        const rotateY = percentX * maxRotate;
        
        heroTitle.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Move the light effect to follow the mouse
        const beforeElement = window.getComputedStyle(heroTitle, '::before');
        if (beforeElement) {
            const gradientX = mouseX / bounds.width * 100;
            const gradientY = mouseY / bounds.height * 100;
            heroTitle.style.setProperty('--gradient-position', `${gradientX}% ${gradientY}%`);
        }
    });
    
    // Reset transform on mouseleave
    heroTitle.addEventListener('mouseleave', () => {
        heroTitle.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Initialize enhanced scroll animations using GSAP
function initEnhancedScrollAnimations() {
    // Service cards animation - עודכן להסרת תזוזה אנכית ולהשארת פייד בלבד
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        gsap.from(serviceCards, {
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.services-section',
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });
    }
    
    // Timeline animation - staggered entrance
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length > 0) {
        gsap.from(timelineItems, {
            x: (i) => i % 2 === 0 ? -100 : 100,
            opacity: 0,
            stagger: 0.3,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.timeline',
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });
    }
    
    // Order form container
    const orderForm = document.querySelector('.order-form-container');
    if (orderForm) {
        gsap.from(orderForm, {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
            scrollTrigger: {
                trigger: orderForm,
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });
    }
    
    // Order image
    const orderImage = document.querySelector('.order-image svg');
    if (orderImage) {
        gsap.from(orderImage, {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.order-image',
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });
    }
    
    // Footer elements
    const footerElements = document.querySelectorAll('.footer-about, .footer-contact, .footer-links');
    if (footerElements.length > 0) {
        gsap.from(footerElements, {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power1.out",
            scrollTrigger: {
                trigger: '.footer',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    }
    
    // Service svg paths animation
    const svgPaths = document.querySelectorAll('.service-svg path, .timeline-svg path');
    if (svgPaths.length > 0) {
        gsap.from(svgPaths, {
            strokeDashoffset: 1000,
            opacity: 0,
            duration: 2,
            stagger: 0.1,
            ease: "power2.inOut",
            scrollTrigger: {
                trigger: '.services-section',
                start: "top 70%",
                toggleActions: "play none none none"
            }
        });
    }
    
    // ביטול האפקט הצף של הכרטיסיות בעת גלילה
    // window.addEventListener('scroll', function() {
    //     const cards = document.querySelectorAll('.service-card');
    //     cards.forEach((card, index) => {
    //         const scrollPos = window.scrollY;
    //         const offset = scrollPos * 0.03 * (index % 2 === 0 ? 1 : -1);
    //         card.style.transform = `translateY(${offset}px)`;
    //     });
    // });
}

// Initialize parallax scrolling effect
function initParallaxScrolling() {
    // Background shapes parallax effect
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            
            shapes.forEach((shape, index) => {
                const speed = 0.1 * (index + 1);
                const yPos = scrollTop * speed;
                shape.style.transform = `translateY(${-yPos}px) ${index % 2 === 0 ? 'rotate(' + scrollTop * 0.02 + 'deg)' : 'rotate(' + -scrollTop * 0.02 + 'deg)'}`;
            });
        });
    }
    
    // Parallax for hero section
    const heroSection = document.querySelector('.hero-section');
    const heroImage = document.querySelector('.hero-image');
    if (heroSection && heroImage) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const maxScroll = heroSection.offsetHeight;
            const scrollPercentage = Math.min(scrollTop / maxScroll, 1);
            
            if (scrollTop <= maxScroll) {
                heroImage.style.transform = `translateY(${scrollPercentage * 100}px) scale(${1 - scrollPercentage * 0.2})`;
            }
        });
    }
    
    // Apply special rolling effect to timeline dots
    const timelineDots = document.querySelectorAll('.timeline-dot');
    if (timelineDots.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            
            timelineDots.forEach((dot, index) => {
                const rotation = scrollTop * 0.2 * (index + 1);
                dot.style.transform = `rotate(${rotation}deg)`;
            });
        });
    }
    
    // Section headers parallax effect - REMOVED to keep headers centered
    
    // Add scale effect on scroll for service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    if (serviceIcons.length > 0) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            
            serviceIcons.forEach((icon, index) => {
                const iconPos = icon.getBoundingClientRect().top + scrollTop;
                const distance = scrollTop - iconPos;
                
                if (Math.abs(distance) < 300) {
                    const scale = 1 + Math.sin(distance * 0.01) * 0.2;
                    icon.style.transform = `scale(${scale})`;
                }
            });
        });
    }
} 