document.addEventListener("DOMContentLoaded", () => {
    
    const navPlaceholder = document.getElementById('navbar-placeholder');
    
   if (navPlaceholder) {
        fetch('navbar.html?v=1.1')
            .then(res => {
                if (!res.ok) throw new Error("Navbar file not found.");
                return res.text();
            })
            .then(data => {
                navPlaceholder.innerHTML = data;
                initNavbarLogic(); 
                
                // ADD THIS EXACT LINE RIGHT HERE:
                window.dispatchEvent(new Event('navbarLoaded'));
            })
            .catch(err => console.error(err));
    }

    function initNavbarLogic() {
        const topBar = document.getElementById("nav-top-bar");
        const mainHeader = document.getElementById("nav-main-header");
        const logoContainer = document.getElementById("nav-logo");
        
        const mobileBtn = document.getElementById("mobile-menu-btn");
        const mobileIcon = document.getElementById("mobile-icon");
        const mobileMenu = document.getElementById("mobile-menu");

        // Scroll Shrink Logic
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                if(topBar) topBar.classList.add("scrolled");
                if(mainHeader) mainHeader.classList.add("scrolled");
                if(logoContainer) logoContainer.classList.add("scrolled");
            } else {
                if(topBar) topBar.classList.remove("scrolled");
                if(mainHeader) mainHeader.classList.remove("scrolled");
                if(logoContainer) logoContainer.classList.remove("scrolled");
            }
        });

        // Mobile Hamburger Button Logic
        if (mobileBtn && mobileMenu) {
            mobileBtn.addEventListener("click", () => {
                mobileMenu.classList.toggle("open");
                
                if (mobileMenu.classList.contains("open")) {
                    mobileIcon.classList.remove("fa-bars");
                    mobileIcon.classList.add("fa-xmark");
                } else {
                    mobileIcon.classList.remove("fa-xmark");
                    mobileIcon.classList.add("fa-bars");
                }
            });
        }

        // Mobile Dropdown Accordion Logic
        const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');
        
        mobileDropdownTriggers.forEach(trigger => {
            trigger.addEventListener("click", () => {
                const parentItem = trigger.parentElement;
                
                // Close other open accordions
                document.querySelectorAll('.mobile-item.has-mobile-dropdown').forEach(item => {
                    if (item !== parentItem) {
                        item.classList.remove('active');
                        item.querySelector('.mobile-dropdown-content').style.maxHeight = null;
                        item.querySelector('i.fa-chevron-down').style.transform = "rotate(0deg)";
                    }
                });

                // Toggle the clicked accordion
                parentItem.classList.toggle('active');
                const content = parentItem.querySelector('.mobile-dropdown-content');
                const icon = trigger.querySelector('i.fa-chevron-down');

                if (parentItem.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    icon.style.transform = "rotate(180deg)";
                } else {
                    content.style.maxHeight = null;
                    icon.style.transform = "rotate(0deg)";
                }
            });
        });

        // --- Google Translate Custom Selector Logic ---
        const translateTrigger = document.getElementById('translate-trigger');
        const translateDropdown = document.getElementById('translate-dropdown');
        const mobileTranslateTrigger = document.getElementById('mobile-translate-trigger');
        const mobileTranslateDropdown = document.getElementById('mobile-translate-dropdown');

        // Toggle Desktop dropdown
        if (translateTrigger && translateDropdown) {
            translateTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                translateDropdown.classList.toggle('show');
                if (mobileTranslateDropdown) mobileTranslateDropdown.classList.remove('show');
            });
        }

        // Toggle Mobile dropdown
        if (mobileTranslateTrigger && mobileTranslateDropdown) {
            mobileTranslateTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileTranslateDropdown.classList.toggle('show');
                if (translateDropdown) translateDropdown.classList.remove('show');
            });
        }

        // Close dropdowns on clicking elsewhere
        document.addEventListener('click', () => {
            if (translateDropdown) translateDropdown.classList.remove('show');
            if (mobileTranslateDropdown) mobileTranslateDropdown.classList.remove('show');
        });

        // Initialize Google Translate Widget
        initGoogleTranslate();

        // Handle language option clicks
        const bindLanguageLinks = (linkSelector, triggerBtnSelector) => {
            document.querySelectorAll(linkSelector).forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const lang = this.getAttribute('data-lang');

                    // Set cookie to persist translation across pages
                    if (lang === 'en') {
                        // Clear translate cookie to restore English
                        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
                    } else {
                        document.cookie = "googtrans=/en/" + lang + "; path=/;";
                        document.cookie = "googtrans=/en/" + lang + "; path=/; domain=" + window.location.hostname;
                    }

                    const googleCombo = document.querySelector('.goog-te-combo');
                    if (googleCombo) {
                        googleCombo.value = lang;
                        googleCombo.dispatchEvent(new Event('change'));
                        
                        // Update text in trigger button
                        const triggerSpan = document.querySelector(triggerBtnSelector + ' span');
                        if (triggerSpan) {
                            triggerSpan.textContent = this.textContent;
                        }
                    } else {
                        // If widget not ready yet, reload page to apply cookie translation
                        window.location.reload();
                    }
                    
                    // Close dropdowns
                    if (translateDropdown) translateDropdown.classList.remove('show');
                    if (mobileTranslateDropdown) mobileTranslateDropdown.classList.remove('show');
                });
            });
        };

        bindLanguageLinks('#translate-dropdown a', '#translate-trigger');
        bindLanguageLinks('#mobile-translate-dropdown a', '#mobile-translate-trigger');

        // Check if there is an active translation cookie on page load to update button label
        const getTransCookie = () => {
            const matches = document.cookie.match(/googtrans=\/en\/([a-z]+)/);
            return matches ? matches[1] : null;
        };

        const activeLang = getTransCookie();
        if (activeLang) {
            // Find option text matching code
            const updateTriggerTextOnLoad = (dropdownSelector, triggerBtnSelector) => {
                const activeLink = document.querySelector(`${dropdownSelector} a[data-lang="${activeLang}"]`);
                const triggerSpan = document.querySelector(`${triggerBtnSelector} span`);
                if (activeLink && triggerSpan) {
                    triggerSpan.textContent = activeLink.textContent;
                }
            };
            // Wait slightly for navbar render to execute
            setTimeout(() => {
                updateTriggerTextOnLoad('#translate-dropdown', '#translate-trigger');
                updateTriggerTextOnLoad('#mobile-translate-dropdown', '#mobile-translate-trigger');
            }, 100);
        }
    }

    function initGoogleTranslate() {
        // Inject styles to hide default top banner & tooltips
        injectGoogleTranslateStyles();

        // Create hidden container if not exists
        let googleDiv = document.getElementById('google_translate_element');
        if (!googleDiv) {
            googleDiv = document.createElement('div');
            googleDiv.id = 'google_translate_element';
            // Off-screen styling instead of display: none
            googleDiv.style.position = 'absolute';
            googleDiv.style.top = '-9999px';
            googleDiv.style.left = '-9999px';
            googleDiv.style.width = '0';
            googleDiv.style.height = '0';
            googleDiv.style.overflow = 'hidden';
            document.body.appendChild(googleDiv);
        }

        // Define callback
        window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                autoDisplay: false
            }, 'google_translate_element');
        };

        // Inject script
        if (!document.querySelector('script[src*="translate.google.com"]')) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            document.body.appendChild(script);
        }
    }

    function injectGoogleTranslateStyles() {
        const styleId = 'google-translate-custom-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                /* Hide Google Translate Default Top Banner Bar & Ballon tooltips */
                .goog-te-banner-frame.skiptranslate,
                .goog-te-banner-frame,
                iframe.goog-te-banner-frame,
                .goog-te-balloon-frame,
                .goog-tooltip,
                .goog-tooltip:hover {
                    display: none !important;
                }
                body {
                    top: 0 !important;
                    position: static !important;
                }
                .goog-text-highlight {
                    background-color: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
});