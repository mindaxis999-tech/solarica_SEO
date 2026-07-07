document.addEventListener("DOMContentLoaded", () => {
    const breadcrumbList = document.getElementById("breadcrumb-list");
    if (!breadcrumbList) return;

    // 1. Map ugly file endpoints to beautiful client-facing display titles
    const pageMap = {
        "index.html": "Home",
        "products.html": "products",
        "we-solarica.html": "We Solarica",
        "our-journey.html": "Our Journey",
        "our-companies.html": "Our Companies",
        "leadership.html": "Board of Directors",
        "awards.html": "Awards & Certifications",
        "pm-surya-ghar.html": "PM Surya Ghar Yojana",
        "kusum-yojana.html": "KUSUM Yojana",
        "saur-krushi-pump.html": "Saur Krushi Pump Yojana",
        "commercial-projects.html": "Commercial Setups",
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
        "ac-lights.html": "AC Lights",
        "home-lights.html": "Home Lights",
        "control-panels.html": "Control Panels",
        "ev-chargers.html": "EV Chargers",
        "ev-batteries.html": "EV Batteries",
        "poles.html": "Lighting Poles",
        "light-accessories.html": "Light Accessories",
        "charging-station.html": "Charging Stations",
        "industrial-works.html": "Industrial Fabrication & Works",
        "amc-services.html": "AMC & Maintenance Services"
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
            "ac-lights.html",
            "home-lights.html",
            "control-panels.html",
            "ev-chargers.html",
            "ev-batteries.html",
            "poles.html",
            "light-accessories.html",
            "charging-station.html",
            "industrial-works.html",
            "amc-services.html"
        ].includes(pageFile)) {
            const displayTitle = pageMap[pageFile] || pageFile.replace(".html", "").replace("-", " ");
            breadcrumbHtml += `<li class="breadcrumb-item"><a href="products.html">products</a></li>`;
            breadcrumbHtml += `<li class="breadcrumb-item active">${displayTitle}</li>`;
        }
        
        // CASE C: Projects and Schemes sub-pages
        else if ([
            "pm-surya-ghar.html",
            "kusum-yojana.html",
            "saur-krushi-pump.html",
            "commercial-projects.html",
            "industrial-projects.html",
            "power-projects.html"
        ].includes(pageFile)) {
            const displayTitle = pageMap[pageFile] || pageFile.replace(".html", "").replace("-", " ");
            breadcrumbHtml += `<li class="breadcrumb-item">Projects & Schemes</li>`;
            breadcrumbHtml += `<li class="breadcrumb-item active">${displayTitle}</li>`;
        }
        
        // CASE D: About Us sub-pages
        else if ([
            "we-solarica.html",
            "our-journey.html",
            "our-companies.html",
            "leadership.html",
            "awards.html"
        ].includes(pageFile)) {
            const displayTitle = pageMap[pageFile] || pageFile.replace(".html", "").replace("-", " ");
            breadcrumbHtml += `<li class="breadcrumb-item"><a href="about.html">About Us</a></li>`;
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