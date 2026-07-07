document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Country Data by Continent (using ISO 2-letter country codes) ---
    const countryData = {
        asia: [
            { name: "India", code: "in" },
            { name: "Japan", code: "jp" },
            { name: "China", code: "cn" },
            { name: "Singapore", code: "sg" },
            { name: "Indonesia", code: "id" },
            { name: "Thailand", code: "th" },
            { name: "Malaysia", code: "my" },
            { name: "Sri Lanka", code: "lk" },
            { name: "Philippines", code: "ph" },
            { name: "Nepal", code: "np" },
            { name: "South Korea", code: "kr" },
            { name: "Bangladesh", code: "bd" },
            { name: "Bhutan", code: "bt" },
            { name: "Brunei", code: "bn" },
            { name: "Myanmar", code: "mm" },
            { name: "Cambodia", code: "kh" },
            { name: "Kazakhstan", code: "kz" },
            { name: "Kyrgyzstan", code: "kg" },
            { name: "Laos", code: "la" },
            { name: "Lebanon", code: "lb" },
            { name: "Maldives", code: "mv" },
            { name: "Mongolia", code: "mn" },
            { name: "Afghanistan", code: "af" }
        ],
        gulf: [
            { name: "United Arab Emirates", code: "ae" },
            { name: "Saudi Arabia", code: "sa" },
            { name: "Qatar", code: "qa" },
            { name: "Oman", code: "om" },
            { name: "Bahrain", code: "bh" },
            { name: "Kuwait", code: "kw" },
            { name: "Jordan", code: "jo" }
        ],
        europe: [
            { name: "United Kingdom", code: "gb" },
            { name: "Germany", code: "de" },
            { name: "France", code: "fr" },
            { name: "Netherlands", code: "nl" },
            { name: "Spain", code: "es" },
            { name: "Italy", code: "it" },
            { name: "Switzerland", code: "ch" },
            { name: "Belgium", code: "be" }
        ],
        america: [
            { name: "United States", code: "us" },
            { name: "Canada", code: "ca" },
            { name: "Mexico", code: "mx" },
            { name: "Brazil", code: "br" },
            { name: "Argentina", code: "ar" },
            { name: "Colombia", code: "co" },
            { name: "Peru", code: "pe" },
            { name: "Chile", code: "cl" }
        ],
        africa: [
            { name: "South Africa", code: "za" },
            { name: "Kenya", code: "ke" },
            { name: "Nigeria", code: "ng" },
            { name: "Egypt", code: "eg" },
            { name: "Morocco", code: "ma" },
            { name: "Ghana", code: "gh" },
            { name: "Algeria", code: "dz" },
            { name: "Tunisia", code: "tn" }
        ]
    };

    // --- 2. Interactive Region Tabs Switching ---
    const tabButtons = document.querySelectorAll(".tab-btn");
    const countryGrid = document.getElementById("country-grid");

    function renderCountries(region) {
        if (!countryGrid || !countryData[region]) return;

        // Smooth fade-out transition
        countryGrid.style.opacity = "0";

        setTimeout(() => {
            countryGrid.innerHTML = ""; // Clear existing grid cards
            
            // Build new region country cards
            countryData[region].forEach(country => {
                const card = document.createElement("div");
                card.className = "country-card reveal-up";
                card.innerHTML = `
                    <img src="https://flagcdn.com/w80/${country.code}.png" 
                         srcset="https://flagcdn.com/w160/${country.code}.png 2x"
                         alt="${country.name} flag" 
                         class="country-flag-img" 
                         loading="lazy">
                    <span class="country-name">${country.name}</span>
                `;
                countryGrid.appendChild(card);
            });

            // Smooth fade-in transition
            countryGrid.style.opacity = "1";
        }, 200);
    }

    if (tabButtons && tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                // Remove active styling on all tabs
                tabButtons.forEach(t => t.classList.remove("active"));
                // Add active style to selected tab
                btn.classList.add("active");
                
                const selectedRegion = btn.getAttribute("data-region");
                renderCountries(selectedRegion);
            });
        });

        // Initialize with default first region (Asia)
        renderCountries("asia");
    }

    // --- 3. Success Stories Carousel/Slider ---
    const sliderWrapper = document.getElementById("reviews-wrapper");
    const slides = document.querySelectorAll(".review-slide");
    const dotsContainer = document.getElementById("slider-nav");

    if (sliderWrapper && slides.length > 0 && dotsContainer) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        // Dynamically create navigation indicator dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("button");
            dot.className = `slide-dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute("data-slide", i);
            dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
            dotsContainer.appendChild(dot);

            dot.addEventListener("click", () => {
                goToSlide(i);
                resetAutoplay();
            });
        }

        const dots = document.querySelectorAll(".slide-dot");

        function goToSlide(index) {
            currentSlide = index;
            // Shift wrapper horizontally
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update active state class on dots
            dots.forEach((dot, idx) => {
                if (idx === currentSlide) {
                    dot.classList.add("active");
                } else {
                    dot.classList.remove("active");
                }
            });
        }

        function nextSlide() {
            let next = (currentSlide + 1) % totalSlides;
            goToSlide(next);
        }

        function startAutoplay() {
            slideInterval = setInterval(nextSlide, 5000); // Shift every 5 seconds
        }

        function resetAutoplay() {
            clearInterval(slideInterval);
            startAutoplay();
        }

        // Initialize autoplay
        startAutoplay();
    }
});
