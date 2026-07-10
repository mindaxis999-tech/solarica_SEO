document.addEventListener("DOMContentLoaded", () => {
    const breadcrumbList = document.getElementById("breadcrumb-list");
    if (!breadcrumbList) return;

    // 1. Map ugly file endpoints to beautiful client-facing display titles
    const pageMap = {
        "index.html": "Home",
        "products.html": "products",
        "who-we-are.html": "We Solarica",
        "our-journey.html": "Our Journey",
        "our-companies.html": "Our Companies",
        "board-of-directors.html": "Board of Directors",
        "awards-and-certifications.html": "Awards & Certifications",
        "projects.html": "Projects & Schemes",
        "pm-surya-ghar-yojana.html": "PM Surya Ghar Yojana",
        "pm-kusum-yojana-solar-pump-scheme.html": "KUSUM Yojana",
        "saur-krushi-yojana-solar-pump.html": "Saur Krushi Pump Yojana",
        "commercial-solar-projects.html": "Commercial Setups",
        "industrial-projects.html": "Industrial Setups",
        "power-projects.html": "Power Projects",
        "contact.html": "Contact Us",
        "careers.html": "Careers",
        // Category Page Maps
        "solar-street-light.html": "Solar Street Lights",
        "solar-garden-lights.html": "Solar Garden Lights",
        "solar-decorative-lights.html": "Solar Decorative Lights",
        "solar-inverter.html": "Solar Inverters",
        "solar-water-pumps.html": "Solar Water Pumps",
        "solar-water-heater.html": "Solar Water Heaters",
        "solar-structures.html": "Solar Mounting Structures",
        "solar-panels.html": "Solar Panels",
        "ac-led-lights.html": "AC Lights",
        "home-lights.html": "Home Lights",
        "solar-control-panels-automation.html": "Control Panels",
        "ev-chargers.html": "EV Chargers",
        "ev-batteries.html": "EV Batteries",
        "poles.html": "Lighting Poles",
        "light-accessories.html": "Light Accessories",
        "ev-charging-stations.html": "Charging Stations",
        "industrial-works.html": "Industrial Fabrication & Works",
        "solar-amc-services.html": "AMC & Maintenance Services"
    };

    // 2. Parse the current browser navigation details
    const pathName = window.location.pathname;
    const pageFile = pathName.substring(pathName.lastIndexOf('/') + 1) || "index.html";
    const urlParams = new URLSearchParams(window.location.search);
    
    // 3. Always plant the root "Home" anchor link first
    let breadcrumbHtml = `<li class="breadcrumb-item"><a href="index.html">Home</a></li>`;

    // 4. Build custom paths based on what page your user is looking at
    if (pageFile !== "index.html") {
        
        // CASE A: User is inside the Filtered Catalog view
        if (pageFile === "products.html") {
            const categoryParam = urlParams.get("category");
            if (categoryParam) {
                // If a category filter parameter exists, provide a link back to the full catalog first
                breadcrumbHtml += `<li class="breadcrumb-item"><a href="products.html">products</a></li>`;
                breadcrumbHtml += `<li class="breadcrumb-item active">${decodeURIComponent(categoryParam)}</li>`;
            } else {
                breadcrumbHtml += `<li class="breadcrumb-item active">products</li>`;
            }
        } 
        
        // CASE B: User is inside a Product Category Page
        else if ([
            "solar-street-light.html",
            "solar-garden-lights.html",
            "solar-decorative-lights.html",
            "solar-inverter.html",
            "solar-water-pumps.html",
            "solar-water-heater.html",
            "solar-structures.html",
            "solar-panels.html",
            "ac-led-lights.html",
            "home-lights.html",
            "solar-control-panels-automation.html",
            "ev-chargers.html",
            "ev-batteries.html",
            "poles.html",
            "light-accessories.html",
            "ev-charging-stations.html",
            "industrial-works.html",
            "solar-amc-services.html"
        ].includes(pageFile)) {
            const displayTitle = pageMap[pageFile] || pageFile.replace(".html", "").replace("-", " ");
            breadcrumbHtml += `<li class="breadcrumb-item"><a href="products.html">products</a></li>`;
            breadcrumbHtml += `<li class="breadcrumb-item active">${displayTitle}</li>`;
        }
        
        // CASE C: Projects and Schemes sub-pages
        else if ([
            "pm-surya-ghar-yojana.html",
            "pm-kusum-yojana-solar-pump-scheme.html",
            "saur-krushi-yojana-solar-pump.html",
            "commercial-solar-projects.html",
            "industrial-projects.html",
            "power-projects.html"
        ].includes(pageFile)) {
            const displayTitle = pageMap[pageFile] || pageFile.replace(".html", "").replace("-", " ");
            breadcrumbHtml += `<li class="breadcrumb-item"><a href="projects.html">Projects & Schemes</a></li>`;
            breadcrumbHtml += `<li class="breadcrumb-item active">${displayTitle}</li>`;
        }
        
        // CASE D: About Us sub-pages
        else if ([
            "who-we-are.html",
            "our-journey.html",
            "our-companies.html",
            "board-of-directors.html",
            "awards-and-certifications.html"
        ].includes(pageFile)) {
            const displayTitle = pageMap[pageFile] || pageFile.replace(".html", "").replace("-", " ");
            breadcrumbHtml += `<li class="breadcrumb-item"><a href="about-solarica-groups.html">About Us</a></li>`;
            breadcrumbHtml += `<li class="breadcrumb-item active">${displayTitle}</li>`;
        }
        
        // CASE E: Standard internal landing sub-pages
        else {
            const displayTitle = pageMap[pageFile] || pageFile.replace(".html", "").replace("-", " ");
            breadcrumbHtml += `<li class="breadcrumb-item active">${displayTitle}</li>`;
        }
    }

    // 5. Build layout nodes onto document canvas DOM tree
    breadcrumbList.innerHTML = breadcrumbHtml;
});