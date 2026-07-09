// Remove the 'navbarLoaded' wrapper here. We will just use standard DOMContentLoaded.
document.addEventListener("DOMContentLoaded", () => {

    // --- 1. INITIALIZE LENIS SMOOTH SCROLL ---
   // --- 1. INITIALIZE GLOBAL LENIS SMOOTH SCROLL ---
    window.lenis = new Lenis({
        lerp: 0.08,
        duration: 1.5,
        smoothWheel: true
    });
    function raf(time) {
        if (window.lenis) window.lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- 2. CUSTOM CURSOR PHYSICS (Handled globally by cursor.js to prevent conflicts) ---


    // --- 3. FETCH FOOTER ONLY (Navbar is handled by navbar.js now!) ---
   


    // --- 4. GSAP ANIMATIONS ---
   // --- 3. UNIFIED HERO CINEMATIC PARALLAX TIMELINE ---
    gsap.registerPlugin(ScrollTrigger);

    // Initial Core Entrance Animation (Runs once when the page loads)
    const entranceTimeline = gsap.timeline();
    
    // 1. Reveal the main text wrapper container
    entranceTimeline.to(".hero-text-container", { opacity: 1, duration: 0.5 });
    
    // 2. Slide up and fade in the titles (Since their CSS default is visible)
    entranceTimeline.from(".hero-title, .hero-subtitle", { 
        y: 80, 
        opacity: 0, 
        duration: 1.2, 
        stagger: 0.2,
        ease: "power4.out" 
    });

    // 3. FIXED: Explicitly animate buttons TO opacity 1 so they reveal perfectly
    entranceTimeline.to(".hero-buttons", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out"
    }, "-=0.6"); // "-=0.6" overlaps the animation slightly with the subtitle for a fluid flow

    // Scroll-Linked Parallax Timeline (Tied directly to your Lenis scroll axis)
    const heroScrollTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",      
            end: "bottom top",    
            scrub: 0.5,           
            invalidateOnRefresh: true 
        }
    });

    // Background Parallax: Moves down slightly slower than scroll
    heroScrollTimeline.to(".hero-bg-container", {
        yPercent: 25,
        ease: "none"
    }, 0);

    // Text & Button Parallax: Lifts up gracefully and fades out altogether on scroll down
    heroScrollTimeline.to(".hero-text-container", {
        yPercent: -20,
        opacity: 0,
        ease: "power1.out"
    }, 0);

    // --- 5. MARQUEE STRIP ---
    const marqueeParts = document.querySelectorAll(".marquee-part");
    const slider = document.getElementById("marquee-slider");
    let xPercent = 0;
    let direction = -1;

    function animateMarquee() {
        if (xPercent < -100) xPercent = 0;
        else if (xPercent > 0) xPercent = -100;
        
        gsap.set(marqueeParts, { xPercent: xPercent });
        xPercent += 0.1 * direction; 
        requestAnimationFrame(animateMarquee);
    }
    requestAnimationFrame(animateMarquee);

    if(slider) {
        gsap.to(slider, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.25,
                start: 0,
                end: window.innerHeight,
                onUpdate: e => direction = e.direction * -1
            },
            x: "-=300px"
        });
    }

    // --- 6. PRODUCT AUTO SCROLL ---
    const prodContainer = document.getElementById("product-scroll-container");
    let isPaused = false;

    if (prodContainer) {
        prodContainer.addEventListener("mouseenter", () => isPaused = true);
        prodContainer.addEventListener("mouseleave", () => isPaused = false);

        setInterval(() => {
            if (!isPaused) {
                const itemWidth = prodContainer.children[0]?.clientWidth || 320;
                const scrollAmount = itemWidth + 32; 
                const maxScroll = prodContainer.scrollWidth - prodContainer.clientWidth;

                if (prodContainer.scrollLeft >= maxScroll - 10) {
                    prodContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    prodContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        }, 3000);

        const leftBtn = document.getElementById("btn-scroll-left");
        const rightBtn = document.getElementById("btn-scroll-right");

        if(leftBtn) leftBtn.addEventListener("click", () => {
            const itemWidth = prodContainer.children[0]?.clientWidth || 320;
            prodContainer.scrollBy({ left: -(itemWidth + 32), behavior: 'smooth' });
        });

        if(rightBtn) rightBtn.addEventListener("click", () => {
            const itemWidth = prodContainer.children[0]?.clientWidth || 320;
            prodContainer.scrollBy({ left: (itemWidth + 32), behavior: 'smooth' });
        });
    }

    // --- 7. PM SURYA GHAR SLIDER ---
    const suryaImages = document.querySelectorAll(".surya-img");
    let currentSuryaIndex = 0;

    if(suryaImages.length > 0) {
        setInterval(() => {
            suryaImages[currentSuryaIndex].classList.remove("active");
            currentSuryaIndex = (currentSuryaIndex + 1) % suryaImages.length;
            suryaImages[currentSuryaIndex].classList.add("active");
        }, 4000);
    }

    // --- 8. ECOSYSTEM ACCORDION ---
    const ecoCards = document.querySelectorAll(".eco-card");
    
    ecoCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            ecoCards.forEach(c => c.classList.remove("active"));
            card.classList.add("active");
        });
    });
});



// --- 7. IMMERSIVE ECOSYSTEM KINETIC ENGINE ---
const ecoCards = document.querySelectorAll(".eco-kinetic-card");
const ambientBg = document.querySelector(".eco-ambient-core");

// Core variable mapping background accent rings to active selections
const themeGlows = {
    energy: "radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
    systems: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
    industries: "radial-gradient(circle, rgba(100, 116, 139, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
    greenwheels: "radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
    fabtech: "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(15, 23, 42, 0) 70%)"
};

ecoCards.forEach(card => {
    // Triggers beautifully on hover for mouse devices
    card.addEventListener("mouseenter", () => {
        ecoCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        
        // Dynamic Ambient Canvas Adjustments
        const currentTheme = card.getAttribute("data-eco-theme");
        if (ambientBg && themeGlows[currentTheme]) {
            ambientBg.style.background = themeGlows[currentTheme];
        }
    });

    // Mobile click safe guard framework compatibility
    card.addEventListener("click", () => {
        ecoCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
        
        const currentTheme = card.getAttribute("data-eco-theme");
        if (ambientBg && themeGlows[currentTheme]) {
            ambientBg.style.background = themeGlows[currentTheme];
        }
    });
});

// --- 9. VIDEO LAZY LOADING FOR SEO ---
document.addEventListener("DOMContentLoaded", () => {
    const lazyVideos = document.querySelectorAll('video[preload="none"]');
    
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const sources = video.querySelectorAll('source');
                    sources.forEach(source => {
                        if (source.dataset.src) {
                            source.src = source.dataset.src;
                        }
                    });
                    video.load();
                    video.play().catch(err => console.log("Video play failed:", err));
                    observer.unobserve(video);
                }
            });
        }, {
            rootMargin: "0px 0px 200px 0px" // Load video slightly before it enters the viewport
        });
        
        lazyVideos.forEach(video => {
            if (video.classList.contains('hero-video-blur')) {
                // For the hero video, load it after page load to prevent blocking page render speed
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        const sources = video.querySelectorAll('source');
                        sources.forEach(source => {
                            if (source.dataset.src) {
                                source.src = source.dataset.src;
                            }
                        });
                        video.load();
                        video.play().catch(err => console.log("Hero video play failed:", err));
                    }, 1000);
                });
            } else {
                videoObserver.observe(video);
            }
        });
    } else {
        // Fallback for older browsers
        window.addEventListener('load', () => {
            lazyVideos.forEach(video => {
                const sources = video.querySelectorAll('source');
                sources.forEach(source => {
                    if (source.dataset.src) {
                        source.src = source.dataset.src;
                    }
                });
                video.load();
                video.play().catch(err => console.log("Video play failed:", err));
            });
        });
    }
});