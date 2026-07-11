/* ==========================================
   NAILSS LUXE - APPLICATION ENGINE
   ========================================== */

const BACKEND_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? '' 
  : 'https://YOUR_LIVE_BACKEND_URL_HERE';

// 1. DATA AND STATES
let PRODUCTS_DATA = [
    {
        id: "p1",
        name: "Emerald Palace 3D",
        basePrice: 1899.00,
        shapes: ["Coffin", "Almond"],
        lengths: ["Long", "XL"],
        styles: ["Glitz & 3D"],
        finishes: ["Glossy"],
        image: "url('assets/hand_emerald.png')",
        desc: "Deep emerald base adorned with premium multi-sized crystals, champagne pearls, and custom gold metal frame moldings. Perfect for high-profile galas.",
        nailColor: "#1b382b",
        artStyle: "3D Crystals"
    },
    {
        id: "p2",
        name: "Milky Quartz Chrome",
        basePrice: 1299.00,
        shapes: ["Almond", "Stiletto", "Square"],
        lengths: ["Medium", "Long"],
        styles: ["Chrome & Velvet", "Minimalist"],
        finishes: ["Glossy", "Matte"],
        image: "url('assets/hand_chrome.png')",
        desc: "A sheer milky white core topped with premium gold chrome powder strokes. Captures daylight and shines with iridescent holographic undertones.",
        nailColor: "#efebe9",
        artStyle: "Minimal Line Art"
    },
    {
        id: "p3",
        name: "Rose Gold Royalty",
        basePrice: 1899.00,
        shapes: ["Coffin", "Stiletto", "Almond"],
        lengths: ["Long", "XL"],
        styles: ["Glitz & 3D", "Chrome & Velvet"],
        finishes: ["Glossy"],
        image: "url('assets/hand_rosegold.png')",
        desc: "Soft pink base paired with premium rose-gold flakes and handmade rhinestone encrusted statement nails. Crafted to make hands stand out.",
        nailColor: "#ebd0c4",
        artStyle: "3D Crystals"
    },
    {
        id: "p4",
        name: "Noir Velvet Cat-Eye",
        basePrice: 1299.00,
        shapes: ["Almond", "Square", "Coffin"],
        lengths: ["Short", "Medium", "Long"],
        styles: ["Chrome & Velvet"],
        finishes: ["Glossy"],
        image: "url('assets/hand_velvet.png')",
        desc: "Intense magnetic velvet cat-eye shifting between deep violet and cosmic charcoal. Reacts dynamically to surrounding direct illumination.",
        nailColor: "#1e1b1e",
        artStyle: "Solid Color"
    },
    {
        id: "p5",
        name: "Whisper Pink Solid",
        basePrice: 799.00,
        shapes: ["Almond", "Square", "Coffin", "Stiletto"],
        lengths: ["Short", "Medium", "Long", "XL"],
        styles: ["Classic"],
        finishes: ["Glossy", "Matte"],
        image: "linear-gradient(135deg, #f8bbd0 0%, #f48fb1 100%)",
        desc: "Our timeless clean baby pink base, hand-polished with double-strength professional salon top gelcoat. Clean elegance for everyday wear.",
        nailColor: "#f8bbd0",
        artStyle: "Solid Color"
    },
    {
        id: "p6",
        name: "Abstract Earth Lines",
        basePrice: 1299.00,
        shapes: ["Almond", "Square"],
        lengths: ["Short", "Medium"],
        styles: ["Minimalist"],
        finishes: ["Matte"],
        image: "linear-gradient(135deg, #d7ccc8 0%, #a1887f 100%)",
        desc: "Warm terracotta and beige organic shapes painted on a sheer matte background with crisp, abstract black micro-lining details.",
        nailColor: "#d7ccc8",
        artStyle: "Minimal Line Art"
    },
    {
        id: "p7",
        name: "Couture Dragon Art",
        basePrice: 2199.00,
        shapes: ["Stiletto", "Coffin"],
        lengths: ["Long", "XL"],
        styles: ["Glitz & 3D"],
        finishes: ["Glossy"],
        image: "linear-gradient(135deg, #b71c1c 0%, #000000 100%)",
        desc: "Deep lacquer red background with hand-painted detailed gold dragon scaling, 3D resin claw structures, and obsidian gemstone accents.",
        nailColor: "#b71c1c",
        artStyle: "Intricate Custom Art"
    },
    {
        id: "p8",
        name: "French Vanilla Glaze",
        basePrice: 799.00,
        shapes: ["Almond", "Square"],
        lengths: ["Short", "Medium"],
        styles: ["Classic"],
        finishes: ["Glossy"],
        image: "linear-gradient(135deg, #fffde7 0%, #fff9c4 100%)",
        desc: "A warm vintage creamy white french tips layout overlayed with soft chrome glaze powder. Modern twist on a timeless standard aesthetic.",
        nailColor: "#fffde7",
        artStyle: "Solid Color"
    },
    {
        id: "p9",
        name: "Amethyst Quartz Geode",
        basePrice: 1699.00,
        shapes: ["Almond", "Coffin"],
        lengths: ["Medium", "Long"],
        styles: ["Glitz & 3D"],
        finishes: ["Glossy"],
        image: "url('assets/hand_amethyst.png')",
        desc: "Gorgeous lavender purple quartz geode textures layered with gold foil veins. Perfect for a luxurious mystical aesthetic.",
        nailColor: "#b39ddb",
        artStyle: "3D Crystals"
    },
    {
        id: "p10",
        name: "Glacier Blue Chrome",
        basePrice: 1499.00,
        shapes: ["Square", "Almond"],
        lengths: ["Medium", "Long"],
        styles: ["Chrome & Velvet"],
        finishes: ["Glossy"],
        image: "url('assets/hand_glacier.png')",
        desc: "Futuristic high-shine icy blue chrome finish that reflects light like a polished glacier mirror.",
        nailColor: "#bbdefb",
        artStyle: "Solid Color"
    }
];

const SIZES_MAP = {
    "XS": [14, 11, 12, 10, 8],
    "S": [15, 12, 13, 11, 9],
    "M": [16, 12, 13, 11, 10],
    "L": [18, 14, 15, 13, 11]
};

const CURRENCIES = {
    INR: { symbol: "₹", rate: 1.0 },
    USD: { symbol: "$", rate: 0.012 },
    EUR: { symbol: "€", rate: 0.011 },
    GBP: { symbol: "£", rate: 0.0094 },
    AUD: { symbol: "A$", rate: 0.018 }
};

let currentCurrency = "INR";
let cart = [];
let currentUser = JSON.parse(localStorage.getItem('nailss_luxe_user')) || null;
let builderConfig = {
    shape: "Almond",
    length: "Medium",
    sizeMode: "preset", // "preset" | "custom"
    presetSize: "XS",
    customSizes: [14, 11, 12, 10, 8], // thumb, index, middle, ring, pinky in mm
    artTier: "Solid Color",
    artPriceAdd: 799.00,
    referenceFileName: null
};

// 2. NAVIGATIONAL SWITCHER
function initNavigation() {
    const triggers = document.querySelectorAll(".nav-tab-trigger");
    const sections = document.querySelectorAll(".page-section");
    const menuToggle = document.getElementById("menuToggle");
    const mobileDrawer = document.getElementById("mobileDrawer");
    const drawerOverlay = document.getElementById("drawerOverlay");
    const drawerClose = document.getElementById("drawerClose");

    function switchTab(targetId) {
        sections.forEach(sec => {
            sec.classList.remove("active");
            if (sec.id === targetId) {
                sec.classList.add("active");
            }
        });

        // Update nav links
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-target") === targetId) {
                link.classList.add("active");
            }
        });

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Update hash
        if (window.location.hash !== `#${targetId}`) {
            window.location.hash = targetId;
        }
    }

    triggers.forEach(trig => {
        trig.addEventListener("click", (e) => {
            e.preventDefault();
            const target = trig.getAttribute("data-target");
            switchTab(target);
            
            // Close drawer if open
            if (mobileDrawer) mobileDrawer.classList.remove("active");
            if (drawerOverlay) drawerOverlay.classList.remove("active");
        });
    });

    // Handle initial hash routing
    if (window.location.hash) {
        const hashTarget = window.location.hash.substring(1);
        const exists = Array.from(sections).some(sec => sec.id === hashTarget);
        if (exists) {
            switchTab(hashTarget);
        }
    }

  // Safe Drawer triggers check
    if (menuToggle && mobileDrawer && drawerOverlay && drawerClose) {
        menuToggle.addEventListener("click", () => {
            mobileDrawer.classList.add("active");
            drawerOverlay.classList.add("active");
        });

        drawerClose.addEventListener("click", () => {
            mobileDrawer.classList.remove("active");
            drawerOverlay.classList.remove("active");
        });

        drawerOverlay.addEventListener("click", () => {
            mobileDrawer.classList.remove("active");
            drawerOverlay.classList.remove("active");
        });
    }
}


// 3. CURRENCY SWITCHER
function initCurrencySwitcher() {
    const currencySelect = document.getElementById("currency-select");
    currencySelect.addEventListener("change", (e) => {
        currentCurrency = e.target.value;
        updateAllPrices();
    });
}

function formatPrice(amountInBase) {
    const currObj = CURRENCIES[currentCurrency];
    const converted = amountInBase * currObj.rate;
    if (currentCurrency === "INR") {
        return `${currObj.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    } else {
        return `${currObj.symbol}${converted.toFixed(2)}`;
    }
}

function updateAllPrices() {
    // 1. Update elements with specific currency value attributes
    const elements = document.querySelectorAll(".currency-value");
    elements.forEach(el => {
        const usdValue = parseFloat(el.getAttribute("data-usd"));
        if (!isNaN(usdValue)) {
            el.textContent = formatPrice(usdValue);
        }
    });

    // 2. Refresh lists and carts to compute rates
    renderProductGrid();
    renderBestsellers();
    updateCartUI();
    updateBuilderPricingUI();
}


// 4. E-COMMERCE PRODUCTS & FILTERS
let activeFilters = {
    shape: [],
    length: [],
    style: [],
    finish: []
};

function initECommerce() {
    const filterInputs = document.querySelectorAll(".shop-filters input[type='checkbox']");
    const clearFiltersBtn = document.getElementById("clearFilters");
    const sortSelect = document.getElementById("sortSelect");

    // Add filter change events
    filterInputs.forEach(input => {
        input.addEventListener("change", () => {
            const category = input.name;
            const value = input.value;
            
            if (input.checked) {
                activeFilters[category].push(value);
            } else {
                activeFilters[category] = activeFilters[category].filter(val => val !== value);
            }
            renderProductGrid();
        });
    });

    clearFiltersBtn.addEventListener("click", () => {
        filterInputs.forEach(input => input.checked = false);
        activeFilters = { shape: [], length: [], style: [], finish: [] };
        renderProductGrid();
    });

    sortSelect.addEventListener("change", () => {
        renderProductGrid();
    });

    renderProductGrid();
    renderBestsellers();
    initQuickViewEvents();
}

function getFilteredProducts() {
    let products = [...PRODUCTS_DATA];

    // Filter Shape
    if (activeFilters.shape.length > 0) {
        products = products.filter(p => p.shapes.some(s => activeFilters.shape.includes(s)));
    }
    // Filter Length
    if (activeFilters.length > 0) {
        products = products.filter(p => p.lengths.some(l => activeFilters.length.includes(l)));
    }
    // Filter Style
    if (activeFilters.style.length > 0) {
        products = products.filter(p => p.styles.some(s => activeFilters.style.includes(s)));
    }
    // Filter Finish
    if (activeFilters.finish.length > 0) {
        products = products.filter(p => p.finishes.some(f => activeFilters.finish.includes(f)));
    }

    // Sort logic
    const sortVal = document.getElementById("sortSelect").value;
    if (sortVal === "price-low") {
        products.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortVal === "price-high") {
        products.sort((a, b) => b.basePrice - a.basePrice);
    }

    return products;
}

function renderProductGrid() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    const filtered = getFilteredProducts();
    const countEl = document.getElementById("productCount");
    
    countEl.textContent = `Showing ${filtered.length} sets`;
    
    if (filtered.length === 0) {
        grid.innerHTML = `<div class="no-results">No sets match the selected filter combinations.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <div class="product-card" data-id="${p.id}">
            <div class="product-image-container">
                <div class="product-image" style="background: ${p.image}"></div>
                <div class="product-nail-svg-wrapper">
                    ${getMiniHandHTML(p.shapes[0], "Medium", p.nailColor, p.artStyle, p.id)}
                </div>
                <button class="btn btn-primary quick-view-overlay qv-btn" data-id="${p.id}">Quick View</button>
            </div>
            <div class="product-info">
                <div>
                    <span class="product-tags">${p.styles.join(", ")} • ${p.shapes.join("/")}</span>
                    <h3>${p.name}</h3>
                </div>
                <div class="product-price-row">
                    <span class="price-tag">${formatPrice(p.basePrice)}</span>
                </div>
            </div>
        </div>
    `).join("");
}

function renderBestsellers() {
    const track = document.getElementById("homeBestsellers");
    if (!track) return;

    // Grab first 4 items as best sellers
    const bs = PRODUCTS_DATA.slice(0, 4);

    track.innerHTML = bs.map(p => `
        <div class="product-card" data-id="${p.id}">
            <div class="product-image-container">
                <div class="product-image" style="background: ${p.image}"></div>
                <div class="product-nail-svg-wrapper">
                    ${getMiniHandHTML(p.shapes[0], "Medium", p.nailColor, p.artStyle, 'bs_' + p.id)}
                </div>
                <button class="btn btn-primary quick-view-overlay qv-btn" data-id="${p.id}">Quick View</button>
            </div>
            <div class="product-info">
                <div>
                    <span class="product-tags">${p.styles.join(", ")}</span>
                    <h3>${p.name}</h3>
                </div>
                <div class="product-price-row">
                    <span class="price-tag">${formatPrice(p.basePrice)}</span>
                </div>
            </div>
        </div>
    `).join("");
}


// 5. QUICK-VIEW MODAL AND DYNAMIC ATTRIBUTE CHOICE
const quickViewModal = document.getElementById("quickViewModal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const modalOverlay = document.getElementById("modalOverlay");

function initQuickViewEvents() {
    // Catch clicks using event delegation
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("qv-btn")) {
            const pid = e.target.getAttribute("data-id");
            openQuickView(pid);
        }
    });

    modalClose.addEventListener("click", () => quickViewModal.classList.remove("active"));
    modalOverlay.addEventListener("click", () => quickViewModal.classList.remove("active"));
}

function openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    modalBody.innerHTML = `
        <div class="quickview-layout">
            <div class="quickview-image-panel" style="background: ${product.image}">
                <svg viewBox="0 0 100 240">
                    ${getNailSVGMarkup(product.shapes[0], "Medium", product.nailColor, product.artStyle, 'qv_' + product.id)}
                </svg>
            </div>
            <div class="quickview-details-panel">
                <div>
                    <h2>${product.name}</h2>
                    <div class="quickview-price" id="qvDynamicPrice">${formatPrice(product.basePrice)}</div>
                    <p class="quickview-desc">${product.desc}</p>
                    
                    <div class="qv-options-grid">
                        <div class="qv-option-row">
                            <label for="qvShape">Select Shape</label>
                            <select id="qvShape">
                                ${product.shapes.map(s => `<option value="${s}">${s}</option>`).join("")}
                            </select>
                        </div>
                        <div class="qv-option-row">
                            <label for="qvLength">Select Length</label>
                            <select id="qvLength">
                                ${product.lengths.map(l => `<option value="${l}">${l}</option>`).join("")}
                            </select>
                        </div>
                        <div class="qv-option-row">
                            <label for="qvSizing">Sizing Fit</label>
                            <select id="qvSizing">
                                <option value="XS">XS Preset</option>
                                <option value="S">S Preset</option>
                                <option value="M">M Preset</option>
                                <option value="L">L Preset</option>
                                <option value="Custom">Custom Measurements</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button class="btn btn-primary" id="btnQvAddToCart">Add Set to Bag</button>
            </div>
        </div>
    `;

    quickViewModal.classList.add("active");

    // Capture button click
    const btnAddToCart = document.getElementById("btnQvAddToCart");
    btnAddToCart.addEventListener("click", () => {
        const shape = document.getElementById("qvShape").value;
        const length = document.getElementById("qvLength").value;
        const sizing = document.getElementById("qvSizing").value;
        
        let specString = `Shape: ${shape} | Length: ${length} | Sizing: ${sizing}`;
        let itemMeasurements = null;

        if (sizing === "Custom") {
            // Provide arbitrary custom sizing parameters since it's a quick-buy
            itemMeasurements = { thumb: 15, index: 12, middle: 13, ring: 11, pinky: 9 };
            specString = `Shape: ${shape} | Length: ${length} | Sizing: Custom (15, 12, 13, 11, 9 mm)`;
        }

        addToCart({
            id: product.id + "_" + Date.now(),
            productId: product.id,
            name: product.name,
            price: product.basePrice,
            qty: 1,
            shape: shape,
            length: length,
            sizing: sizing,
            customMeasurements: itemMeasurements,
            isCustomBuilder: false,
            gradientStyle: product.image
        });

        quickViewModal.classList.remove("active");
        openCartDrawer();
    });
}


// 6. DYNAMIC NAIL SVG GENERATOR
// Renders vector polygons based on fingernail parameters (shapes: Almond, Coffin, Square, Stiletto)
function getNailSVGMarkup(shape, length, baseColor, artTier, uniqueId = "default") {
    let nailHeight = 150; // Medium default base
    if (length === "Short") nailHeight = 120;
    else if (length === "Long") nailHeight = 185;
    else if (length === "XL") nailHeight = 220;

    let nailWidth = 40; // average
    let cuticleY = 220;
    let nailTopY = cuticleY - nailHeight;
    
    // SVG definitions: polish linear gradient
    let gradDef = `
        <defs>
            <linearGradient id="nailPolishGradient_${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${baseColor}" />
                <stop offset="70%" stop-color="${lightenColor(baseColor, 20)}" />
                <stop offset="100%" stop-color="${baseColor}" />
            </linearGradient>
            <filter id="shadowNail_${uniqueId}" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.5"/>
            </filter>
        </defs>
    `;

    // Visual elements
    let drawPath = "";
    
    // Left Cuticle Corner: (50 - w/2, cuticleY)
    // Right Cuticle Corner: (50 + w/2, cuticleY)
    let leftCuticleX = 50 - nailWidth/2;
    let rightCuticleX = 50 + nailWidth/2;
    let baseCuticleControlY = cuticleY + 12;

    if (shape === "Square") {
        // Flat top straight lines
        drawPath = `M ${leftCuticleX} ${nailTopY} 
                    L ${rightCuticleX} ${nailTopY} 
                    L ${rightCuticleX} ${cuticleY} 
                    A ${nailWidth/2} 15 0 0 1 ${leftCuticleX} ${cuticleY} 
                    Z`;
    } else if (shape === "Coffin") {
        // Tapered in slightly, then flat top
        let topWidth = nailWidth * 0.45;
        let topLeftX = 50 - topWidth/2;
        let topRightX = 50 + topWidth/2;
        drawPath = `M ${topLeftX} ${nailTopY} 
                    L ${topRightX} ${nailTopY} 
                    L ${rightCuticleX} ${cuticleY} 
                    A ${nailWidth/2} 15 0 0 1 ${leftCuticleX} ${cuticleY} 
                    Z`;
    } else if (shape === "Almond") {
        // Curved and rounded at top center point
        let curveTopY = nailTopY - 12;
        drawPath = `M ${leftCuticleX} ${cuticleY - nailHeight*0.4}
                    C ${leftCuticleX} ${nailTopY} 32 ${curveTopY} 50 ${curveTopY}
                    C 68 ${curveTopY} ${rightCuticleX} ${nailTopY} ${rightCuticleX} ${cuticleY - nailHeight*0.4}
                    L ${rightCuticleX} ${cuticleY}
                    A ${nailWidth/2} 15 0 0 1 ${leftCuticleX} ${cuticleY}
                    Z`;
    } else if (shape === "Stiletto") {
        // Sharp point meeting at top center
        let pointTopY = nailTopY - 22;
        drawPath = `M 50 ${pointTopY}
                    L ${rightCuticleX} ${cuticleY - 10}
                    A ${nailWidth/2} 15 0 0 1 ${leftCuticleX} ${cuticleY - 10}
                    Z`;
    }

    // Art Tier overlay styling
    let artOverlay = "";
    if (artTier === "Minimal Line Art" || artTier === "minimal-line-art") {
        // Abstract thin line strokes
        artOverlay = `
            <path d="M 50 ${nailTopY + 10} Q 30 140 60 180" stroke="#d4af37" stroke-width="2" fill="none" class="nail-art-element" />
            <circle cx="60" cy="180" r="3" fill="#d4af37" class="nail-art-element" />
        `;
    } else if (artTier === "3D Crystals" || artTier === "3d-crystals") {
        // 3D sparkles/rhinestones representations at cuticle line
        artOverlay = `
            <circle cx="50" cy="${cuticleY - 8}" r="4.5" fill="#FAF9F6" stroke="#d4af37" stroke-width="1" class="nail-art-element" filter="url(#shadowNail_${uniqueId})"/>
            <circle cx="40" cy="${cuticleY - 5}" r="3.5" fill="#FAF9F6" stroke="#d4af37" stroke-width="1" class="nail-art-element" />
            <circle cx="60" cy="${cuticleY - 5}" r="3.5" fill="#FAF9F6" stroke="#d4af37" stroke-width="1" class="nail-art-element" />
        `;
    } else if (artTier === "Intricate Custom Art" || artTier === "intricate-custom-art") {
        // Elaborate painted floral or gold scaling pattern mockup
        artOverlay = `
            <path d="M 50 ${nailTopY + 15} L 35 150 L 65 170 L 50 190" stroke="#FAF9F6" stroke-width="1.5" fill="none" class="nail-art-element" />
            <circle cx="50" cy="${nailTopY + 15}" r="2" fill="#d4af37" />
            <circle cx="35" cy="150" r="2" fill="#d4af37" />
            <circle cx="65" cy="170" r="2" fill="#d4af37" />
            <path d="M ${leftCuticleX + 4} 190 C 50 200 ${rightCuticleX - 4} 190 50 210" stroke="#d4af37" stroke-width="1" fill="none" />
        `;
    }

    // Specular reflective highlights for shiny luxury look
    let highlightOverlay = `
        <path d="M ${leftCuticleX + 5} ${cuticleY - 20} Q ${leftCuticleX + 8} 120 ${leftCuticleX + 8} ${nailTopY + 20}" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.25" stroke-linecap="round" />
    `;

    return `
        ${gradDef}
        <g filter="url(#shadowNail_${uniqueId})">
            <path d="${drawPath}" fill="url(#nailPolishGradient_${uniqueId})" stroke="#d4af37" stroke-width="1.2" />
            ${artOverlay}
            ${highlightOverlay}
        </g>
    `;
}

// Renders a horizontal row of 5 fingers/nails representing a full hand manicure
function getMiniHandHTML(shape, length, nailColor, artStyle, uniqueId) {
    const fingers = [
        { name: "thumb",  cx: 30,  cy: 125, w: 26, nailW: 22, lengthScale: 0.82 },
        { name: "index",  cx: 70,  cy: 95,  w: 20, nailW: 16, lengthScale: 0.95 },
        { name: "middle", cx: 110, cy: 85,  w: 21, nailW: 17, lengthScale: 1.05 },
        { name: "ring",   cx: 150, cy: 95,  w: 20, nailW: 16, lengthScale: 0.98 },
        { name: "pinky",  cx: 190, cy: 115, w: 16, nailW: 12, lengthScale: 0.78 }
    ];

    let fingerHTML = "";
    let nailHTML = "";

    fingers.forEach((f, idx) => {
        const fingerTopY = f.cy - 8;
        const pathD = `M ${f.cx - f.w/2} 180 
                       L ${f.cx - f.w/2} ${fingerTopY} 
                       A ${f.w/2} ${f.w/2} 0 0 1 ${f.cx + f.w/2} ${fingerTopY} 
                       L ${f.cx + f.w/2} 180 
                       Z`;
        fingerHTML += `<path d="${pathD}" fill="#161211" stroke="rgba(212, 175, 55, 0.12)" stroke-width="1.2" />`;

        const fingerUniqueId = `${uniqueId}_finger_${idx}`;
        const nailMarkup = getNailSVGMarkup(shape, length, nailColor, artStyle, fingerUniqueId);
        nailHTML += `
            <g transform="translate(${f.cx}, ${f.cy}) scale(${f.nailW / 40}, ${f.lengthScale}) translate(-50, -220)">
                ${nailMarkup}
            </g>
        `;
    });

    return `
        <svg viewBox="0 0 220 180" class="mini-hand-svg" style="width: 100%; height: 100%; overflow: visible;">
            <g>
                ${fingerHTML}
                ${nailHTML}
            </g>
        </svg>
    `;
}

// Helpers
function lightenColor(color, percent) {
    let num = parseInt(color.replace("#",""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}


// 7. CUSTOM PRESS-ON BUILDER LOGIC
function initCustomBuilder() {
    const shapeOpts = document.querySelectorAll(".shape-opt");
    const artOpts = document.querySelectorAll(".art-opt");
    const lengthSlider = document.getElementById("lengthSlider");
    const btnPresetSize = document.getElementById("btnPresetSize");
    const btnCustomSize = document.getElementById("btnCustomSize");
    const presetsContainer = document.getElementById("presetsContainer");
    const customSizingContainer = document.getElementById("customSizingContainer");
    const presetButtons = document.querySelectorAll(".preset-btn");
    const customInputs = document.querySelectorAll(".custom-size-form input");
    const refUpload = document.getElementById("refUpload");
    const uploadBox = document.getElementById("uploadBox");
    const btnBuilderAddToCart = document.getElementById("btnBuilderAddToCart");

    // Initialize shapes selection
    shapeOpts.forEach(opt => {
        opt.addEventListener("click", () => {
            shapeOpts.forEach(o => o.classList.remove("active"));
            opt.classList.add("active");
            builderConfig.shape = opt.getAttribute("data-shape");
            triggerBuilderUpdate();
        });
    });

    // Initialize lengths slider
    lengthSlider.addEventListener("input", (e) => {
        const lengthsList = ["Short", "Medium", "Long", "XL"];
        const index = parseInt(e.target.value) - 1;
        builderConfig.length = lengthsList[index];
        
        // Update slider labels active class
        const ticks = document.querySelectorAll(".slider-tick");
        ticks.forEach((tick, idx) => {
            tick.classList.toggle("active", idx === index);
        });
        
        triggerBuilderUpdate();
    });

    // Preset vs Custom Sizing toggle buttons
    btnPresetSize.addEventListener("click", () => {
        btnPresetSize.classList.add("active");
        btnCustomSize.classList.remove("active");
        presetsContainer.classList.remove("hidden");
        customSizingContainer.classList.add("hidden");
        builderConfig.sizeMode = "preset";
        triggerBuilderUpdate();
    });

    btnCustomSize.addEventListener("click", () => {
        btnCustomSize.classList.add("active");
        btnPresetSize.classList.remove("active");
        presetsContainer.classList.add("hidden");
        customSizingContainer.classList.remove("hidden");
        builderConfig.sizeMode = "custom";
        triggerBuilderUpdate();
    });

    // Preset buttons clicks
    presetButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            presetButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            builderConfig.presetSize = btn.getAttribute("data-preset");
            builderConfig.customSizes = [...SIZES_MAP[builderConfig.presetSize]];
            triggerBuilderUpdate();
        });
    });

    // Custom MM inputs checks
    customInputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            let val = parseInt(e.target.value);
            if (val < 6) val = 6;
            if (val > 22) val = 22;
            builderConfig.customSizes[index] = val;
            triggerBuilderUpdate();
        });
    });

    // Art tiers selection
    artOpts.forEach(opt => {
        opt.addEventListener("click", () => {
            artOpts.forEach(o => o.classList.remove("active"));
            opt.classList.add("active");
            builderConfig.artTier = opt.getAttribute("data-art");
            builderConfig.artPriceAdd = parseFloat(opt.getAttribute("data-price"));
            triggerBuilderUpdate();
        });
    });

    // File Upload handling
    uploadBox.addEventListener("click", () => refUpload.click());
    uploadBox.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = "var(--accent-gold)";
    });
    uploadBox.addEventListener("dragleave", () => {
        uploadBox.style.borderColor = "var(--border-color)";
    });
    uploadBox.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadBox.style.borderColor = "var(--border-color)";
        if (e.dataTransfer.files.length > 0) {
            handleRefFile(e.dataTransfer.files[0]);
        }
    });

    refUpload.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleRefFile(e.target.files[0]);
        }
    });

    function handleRefFile(file) {
        if (file.size > 5 * 1024 * 1024) {
            alert("File is too large. Max capacity is 5MB.");
            return;
        }
        builderConfig.referenceFileName = file.name;
        document.getElementById("uploadStatusText").innerHTML = `<strong>Selected reference:</strong> ${file.name}`;
    }

    // Add Builder product to cart
    btnBuilderAddToCart.addEventListener("click", () => {
        const itemPrice = builderConfig.artPriceAdd;
        const sizingDesc = builderConfig.sizeMode === "preset" 
            ? `${builderConfig.presetSize} Preset` 
            : `Custom: (${builderConfig.customSizes.join(", ")} mm)`;

        addToCart({
            id: "custom_" + Date.now(),
            productId: "bespoke-builder",
            name: `Bespoke Builder Set`,
            price: itemPrice,
            qty: 1,
            shape: builderConfig.shape,
            length: builderConfig.length,
            sizing: sizingDesc,
            customMeasurements: builderConfig.sizeMode === "custom" ? [...builderConfig.customSizes] : null,
            artTier: builderConfig.artTier,
            referenceFile: builderConfig.referenceFileName,
            isCustomBuilder: true,
            gradientStyle: "linear-gradient(135deg, #2c1a1a 0%, #1c0e0e 100%)"
        });

        openCartDrawer();
    });

    // Sizing guides modals hooks
    const guideHome = document.getElementById("openSizingGuideHome");
    const guideBuilder = document.getElementById("openSizingGuideBuilder");
    const guideClose = document.getElementById("sizingModalClose");
    const guideModal = document.getElementById("sizingGuideModal");
    const guideOverlay = document.getElementById("sizingModalOverlay");

    [guideHome, guideBuilder].forEach(btn => {
        if (btn) {
            btn.addEventListener("click", () => guideModal.classList.add("active"));
        }
    });

    [guideClose, guideOverlay].forEach(btn => {
        if (btn) {
            btn.addEventListener("click", () => guideModal.classList.remove("active"));
        }
    });

    // Run initial rendering
    triggerBuilderUpdate();
}

function triggerBuilderUpdate() {
    updateBuilderPreviewCanvas();
    updateBuilderPricingUI();
}

function updateBuilderPreviewCanvas() {
    const fingers = ["thumb", "index", "middle", "ring", "pinky"];
    
    fingers.forEach((finger, index) => {
        const svgEl = document.querySelector(`.nail-finger[data-finger='${finger}'] .nail-svg`);
        const mmLabel = document.getElementById(`val-${finger}`);
        
        const widthVal = builderConfig.customSizes[index];
        mmLabel.textContent = `${widthVal}mm`;

        // Update inline SVG markup path dynamically
        // Use luxury champagne base color for custom preview (#b38965 classy velvet tone)
        svgEl.innerHTML = getNailSVGMarkup(builderConfig.shape, builderConfig.length, "#7d5d54", builderConfig.artTier, 'builder_' + finger);
    });
}

function updateBuilderPricingUI() {
    const priceEl = document.getElementById("builderDynamicPrice");
    const summaryEl = document.getElementById("builderSummarySpecs");
    
    if (!priceEl || !summaryEl) return;

    const baseCost = builderConfig.artPriceAdd; 
    priceEl.textContent = formatPrice(baseCost);

    const sizeText = builderConfig.sizeMode === "preset" 
        ? builderConfig.presetSize 
        : "Custom";

    summaryEl.textContent = `${builderConfig.shape} • ${builderConfig.length} • Sizing: ${sizeText} • ${builderConfig.artTier}`;
}


// 8. SHOPPING CART ENGINE
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartTrigger = document.getElementById("cartTrigger");
const cartDrawerClose = document.getElementById("cartDrawerClose");

function initCart() {
    // Open/Close
    cartTrigger.addEventListener("click", openCartDrawer);
    cartDrawerClose.addEventListener("click", closeCartDrawer);
    cartOverlay.addEventListener("click", closeCartDrawer);

    // Event delegation for item modifications inside drawer
    const cartWrapper = document.getElementById("cartItems");
    cartWrapper.addEventListener("click", (e) => {
        const target = e.target;
        const itemId = target.getAttribute("data-id");

        if (target.classList.contains("plus-btn")) {
            changeQty(itemId, 1);
        } else if (target.classList.contains("minus-btn")) {
            changeQty(itemId, -1);
        } else if (target.classList.contains("cart-remove-btn")) {
            removeItem(itemId);
        }
    });

    const btnCheckout = document.getElementById("btnCheckout");
    btnCheckout.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your Shopping bag is empty.");
            return;
        }
        alert("Thank you! Connecting you securely to payment processing (Stripe / Apple Pay / PayPal)...");
        cart = [];
        closeCartDrawer();
        updateCartUI();
    });

    // Populate initial local storage loads if present
    const stored = localStorage.getItem("nailss_luxe_cart");
    if (stored) {
        cart = JSON.parse(stored);
    }
    updateCartUI();
}

function openCartDrawer() {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
}

function closeCartDrawer() {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
}

function addToCart(item) {
    // Check duplication
    const duplicate = cart.find(i => 
        i.productId === item.productId && 
        i.shape === item.shape && 
        i.length === item.length && 
        i.sizing === item.sizing &&
        i.artTier === item.artTier
    );

    if (duplicate) {
        duplicate.qty += 1;
    } else {
        cart.push(item);
    }
    
    saveCart();
    updateCartUI();
}

function changeQty(itemId, amt) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    item.qty += amt;
    if (item.qty <= 0) {
        removeItem(itemId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function removeItem(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem("nailss_luxe_cart", JSON.stringify(cart));
}

function updateCartUI() {
    const cartCountEl = document.getElementById("cartCount");
    const cartDrawerCountEl = document.getElementById("cartDrawerCount");
    const cartItemsWrapper = document.getElementById("cartItems");
    const cartSubtotalEl = document.getElementById("cartSubtotal");

    if (!cartCountEl || !cartItemsWrapper) return;

    // Total Count
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalQty;
    cartDrawerCountEl.textContent = totalQty;

    // Subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartSubtotalEl.textContent = formatPrice(subtotal);

    if (cart.length === 0) {
        cartItemsWrapper.innerHTML = `
            <div class="empty-cart-state">
                <p>Your luxury shopping bag is currently empty.</p>
                <button class="btn btn-secondary nav-tab-trigger" data-target="shop" onclick="document.getElementById('cartDrawerClose').click()">Browse Ready-Made</button>
            </div>
        `;
        return;
    }

    cartItemsWrapper.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image" style="background: ${item.gradientStyle}">
                <svg viewBox="0 0 100 240" style="width: 30px; height: 60px;">
                    ${getNailSVGMarkup(item.shape, item.length, "#7d5d54", item.artTier || "Solid Color", 'cart_' + item.id)}
                </svg>
            </div>
            <div class="cart-item-details">
                <div>
                    <h4>${item.name}</h4>
                    <p class="cart-item-specs">${item.shape} • ${item.length} • Sizing: ${item.sizing}</p>
                    ${item.artTier ? `<p class="cart-item-specs">Tier: ${item.artTier}</p>` : ''}
                    ${item.referenceFile ? `<p class="cart-item-specs" style="color:var(--accent-gold)">Ref: ${item.referenceFile}</p>` : ''}
                </div>
                <div class="cart-item-action-row">
                    <div class="qty-counter">
                        <button class="minus-btn" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                        <span id="qty-${item.id}">${item.qty}</span>
                        <button class="plus-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
                    </div>
                    <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
                </div>
                <div style="margin-top: 8px;">
                    <button class="cart-remove-btn" data-id="${item.id}">Remove</button>
                </div>
            </div>
        </div>
    `).join("");
}


// 9. BLOG AND EDITORIAL CONTENT MODALS
const blogModal = document.getElementById("blogModal");
const blogModalBody = document.getElementById("blogModalBody");
const blogModalClose = document.getElementById("blogModalClose");
const blogOverlay = document.getElementById("blogModalOverlay");

const BLOG_ARTICLES = {
    "1": {
        title: "Damage-Free Application & Care Guide",
        category: "Tutorials",
        date: "June 18, 2026",
        image: "assets/care.png",
        bg: "linear-gradient(135deg, #2b1f1a, #4a3429)",
        content: `
            <p>Bespoke press-on nails offer the look of pristine luxury salon extensions, with none of the underlying nail bed thinning caused by high-power drills. When applied with standard precautions, your sets can remain completely secure for up to three weeks.</p>
            <h3>Step 1: Prep is Everything</h3>
            <p>Use the wooden orange stick provided in your toolkit to gently push back cuticles. Any skin overlapping the nail plate will cause early lifting. Next, use the buffers to lightly scuff the surface shine off your natural nail bed. Buffing creates micro-textures that the glue clings to.</p>
            <h3>Step 2: Dehydrate the Surface</h3>
            <p>Oils are the primary cause of nail glue breakdown. Wipe each finger thoroughly with alcohol prep pads, ensuring all dust is cleared. Let them air-dry completely before touching any adhesive.</p>
            <h3>Step 3: Press & Hold</h3>
            <p>Apply a pea-sized drop of glue onto the center of your natural nail, and a thin sweep onto the inside of the press-on. Align the press-on at a 45-degree angle starting just below the cuticle line, then lower it flat. Press firmly for 30 full seconds, distributing pressure across the center and sides.</p>
        `
    },
    "2": {
        title: "Autumn/Winter 2026 Trend Forecast",
        category: "Trends",
        date: "June 22, 2026",
        image: "assets/trends.png",
        bg: "linear-gradient(45deg, #1b262a, #2a3c42)",
        content: `
            <p>As temperature cycles dip, the texture profiles of nail fashion lean heavily into high-contrast reflections, metallic curves, and textured structural elements. Our head designers highlight what is trending globally.</p>
            <h3>1. Velvet Cat-Eye Chrome</h3>
            <p>Classic cat-eye pigments are taking a back seat to velvet textures. This technique utilizes special wand magnets to orient metallic pigment flakes in multiple directions, creating an illusion of velvet moving underneath direct ambient light.</p>
            <h3>2. 3D Chrome Tendrils</h3>
            <p>Inspired by futuristic styling, organic curves drawn in hard sculpture gel are cured and polished with bright platinum and copper chromes. These metal-like loops stand off the nail, providing an avant-garde architectural appeal.</p>
            <h3>3. Crimson and Blackberry Dark Core</h3>
            <p>Deep wine reds, blackberry purples, and deep charcoals are layered with matte topcoats to resemble soft leather and luxurious cashmere garments.</p>
        `
    },
    "3": {
        title: "Clean Slate: Safe Press-On Removal",
        category: "Care Tips",
        date: "June 25, 2026",
        image: "assets/sizing.png",
        bg: "linear-gradient(75deg, #291a26, #422a3e)",
        content: `
            <p>Preserving your custom nails so they can be reused multiple times requires a safe, chemical-free removal procedure. Ripping them off will pull natural nail layers away. Follow this gentle technique.</p>
            <h3>Step 1: The Warm Soapy Bath</h3>
            <p>Prepare a bowl of warm water. Mix in a generous squirt of dishwashing soap and a tablespoon of natural cuticle oil (or olive oil). Soak your hands for 15 to 20 minutes. The oils will slowly seep under the sides, breaking down the bonds of the adhesive glue.</p>
            <h3>Step 2: Gentle Flossing</h3>
            <p>Use the flat edge of your wooden orange stick to test the edges of the nail. If there is resistance, continue soaking. Do not force it. Once softened, slide the stick underneath the sides to gently lift. You can also use a length of dental floss slid under the cuticle line to saw through the softened adhesive layer.</p>
            <h3>Step 3: Post-Care Storage</h3>
            <p>Once removed, buff away any leftover glue residue from the inside of your press-ons. Clean them with alcohol pads and store them in their luxury boxes, ready for your next manicure application.</p>
        `
    }
};

function initBlog() {
    const readBtns = document.querySelectorAll(".read-blog-trigger");
    
    readBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const articleId = btn.getAttribute("data-article");
            const art = BLOG_ARTICLES[articleId];
            if (!art) return;

            blogModalBody.innerHTML = `
                <div class="blog-article-hero" style="background-image: url('${art.image}')"></div>
                <span class="blog-category" style="margin-bottom:10px; display:inline-block;">${art.category}</span>
                <h1 class="blog-article-title">${art.title}</h1>
                <div class="blog-article-meta">Published on ${art.date} • By Nailss Luxe Editorial Team</div>
                <div class="blog-article-body">
                    ${art.content}
                </div>
            `;
            blogModal.classList.add("active");
        });
    });

    [blogModalClose, blogOverlay].forEach(btn => {
        if (btn) {
            btn.addEventListener("click", () => blogModal.classList.remove("active"));
        }
    });
}


// 10. CONTACT FORM & FAQ INTERACTION
function initSupport() {
    // Form submission
    const form = document.getElementById("contactForm");
    const status = document.getElementById("contactFormStatus");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            status.textContent = "Sending your inquiry...";
            status.className = "form-status-message";

            const name = document.getElementById("contactName").value;
            const email = document.getElementById("contactEmail").value;
            const orderRef = document.getElementById("contactOrder").value;
            const message = document.getElementById("contactMessage").value;

            const inquiryPayload = { name, email, orderRef, message };

            fetch(`${BACKEND_URL}/api/inquiries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inquiryPayload)
            })
            .then(res => {
                if (!res.ok) throw new Error("Inquiry submission failed");
                return res.json();
            })
            .then(data => {
                console.log("Inquiry persisted to backend:", data);
                status.textContent = "Thank you! Your inquiry has been sent to our backend and saved successfully.";
                status.classList.add("success");
                form.reset();
            })
            .catch(err => {
                console.warn("Backend unavailable. Falling back to offline client log.", err);
                
                // Save to local storage for offline inquiries
                let offlineInquiries = JSON.parse(localStorage.getItem("nailss_luxe_offline_inquiries") || "[]");
                offlineInquiries.push({ ...inquiryPayload, timestamp: new Date().toISOString() });
                localStorage.setItem("nailss_luxe_offline_inquiries", JSON.stringify(offlineInquiries));

                status.textContent = "Thank you! Your message has been saved in local browser storage (offline mode) and will sync when online.";
                status.classList.add("success");
                form.reset();
            });
        });
    }

    // Accordion FAQ logic
    const faqHeaders = document.querySelectorAll(".accordion-header");
    faqHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const isActive = item.classList.contains("active");

            // Close other items
            document.querySelectorAll(".accordion-item").forEach(i => i.classList.remove("active"));

            if (!isActive) {
                item.classList.add("active");
                header.setAttribute("aria-expanded", "true");
            } else {
                header.setAttribute("aria-expanded", "false");
            }
        });
    });
}


// 11. FLOATING WHATSAPP CHAT LOGIC
function initWhatsApp() {
    const trigger = document.getElementById("whatsappTrigger");
    const chatBox = document.getElementById("whatsappChatBox");
    const closeBtn = document.getElementById("chatCloseBtn");
    const chatInput = document.getElementById("chatInput");
    const chatSendBtn = document.getElementById("chatSendBtn");
    const messagesContainer = document.getElementById("chatMessages");

    if (!trigger || !chatBox) return; // Safely exit if elements aren't found

    trigger.addEventListener("click", () => {
        chatBox.classList.toggle("active");
        const dot = document.querySelector(".whatsapp-badge .notification-dot");
        if (dot) dot.style.display = "none";
    });

    closeBtn.addEventListener("click", () => {
        chatBox.classList.remove("active");
    });

    function sendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        const userMsg = document.createElement("div");
        userMsg.className = "message outgoing";
        userMsg.innerHTML = `<p>${escapeHTML(text)}</p><span class="msg-time">${getCurrentTime()}</span>`;
        messagesContainer.appendChild(userMsg);

        chatInput.value = "";
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
            const autoResponse = document.createElement("div");
            autoResponse.className = "message incoming";
            
            let replyText = "Hello! A specialist is checking custom designs at the moment. Can you confirm your size presets or send your Sizing Kit reference code?";
            if (text.toLowerCase().includes("size") || text.toLowerCase().includes("measure")) {
                replyText = "Got it! Standard presets (XS-L) fit 85% of clients. You can measure your nails with household tape or purchase a Sizing Kit (₹100 with free shipping).";
            } else if (text.toLowerCase().includes("ship") || text.toLowerCase().includes("deliver")) {
                replyText = "We offer express shipping across India and worldwide! Free domestic delivery kicks in for orders over ₹1,500. Shipping takes 2-4 business days.";
            }

            autoResponse.innerHTML = `<p>${replyText}</p><span class="msg-time">${getCurrentTime()}</span>`;
            messagesContainer.appendChild(autoResponse);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1200);
    }

    chatSendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
}

// 13. SIZING CONVERTER LOGIC
function initSizingConverter() {
    const btnCalc = document.getElementById("btnCalculatePreset");
    const btnApply = document.getElementById("btnApplyCalcToBuilder");
    const resultSize = document.getElementById("calcResultSize");
    
    if (!btnCalc) return;

    btnCalc.addEventListener("click", () => {
        const thumb = parseInt(document.getElementById("calcThumb").value) || 16;
        const index = parseInt(document.getElementById("calcIndex").value) || 12;
        const middle = parseInt(document.getElementById("calcMiddle").value) || 13;
        const ring = parseInt(document.getElementById("calcRing").value) || 11;
        const pinky = parseInt(document.getElementById("calcPinky").value) || 10;
        
        const inputs = [thumb, index, middle, ring, pinky];
        
        // Find best preset size match
        let bestPreset = "XS";
        let minDiff = Infinity;
        
        Object.entries(SIZES_MAP).forEach(([preset, sizes]) => {
            let diff = 0;
            for (let i = 0; i < 5; i++) {
                diff += Math.abs(inputs[i] - sizes[i]);
            }
            if (diff < minDiff) {
                minDiff = diff;
                bestPreset = preset;
            }
        });
        
        // If differences are low, suggest the preset
        if (minDiff <= 5) {
            resultSize.textContent = `${bestPreset} Preset (Perfect fit, deviation ${minDiff}mm)`;
            btnApply.style.display = "inline-block";
            btnApply.setAttribute("data-preset", bestPreset);
        } else {
            resultSize.textContent = `Custom Sizing (${thumb}, ${index}, ${middle}, ${ring}, ${pinky} mm)`;
            btnApply.style.display = "inline-block";
            btnApply.setAttribute("data-preset", "Custom");
            btnApply.setAttribute("data-sizes", JSON.stringify(inputs));
        }
    });

    btnApply.addEventListener("click", () => {
        const preset = btnApply.getAttribute("data-preset");
        
        // Open Custom Builder tab
        document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
        document.getElementById("builder").classList.add("active");
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-target") === "builder") {
                link.classList.add("active");
            }
        });
        
        // Close modal
        document.getElementById("sizingGuideModal").classList.remove("active");
        
        // Apply sizing
        const btnPresetMode = document.getElementById("btnPresetSize");
        const btnCustomMode = document.getElementById("btnCustomSize");
        
        if (preset === "Custom") {
            btnCustomMode.click();
            const sizes = JSON.parse(btnApply.getAttribute("data-sizes"));
            const customInputs = document.querySelectorAll(".custom-size-form input");
            sizes.forEach((val, idx) => {
                if (customInputs[idx]) {
                    customInputs[idx].value = val;
                    builderConfig.customSizes[idx] = val;
                }
            });
        } else {
            btnPresetMode.click();
            document.querySelectorAll(".preset-btn").forEach(btn => {
                if (btn.getAttribute("data-preset") === preset) {
                    btn.click();
                }
            });
        }
        
        triggerBuilderUpdate();
        window.scrollTo({ top: document.getElementById("builder").offsetTop - 100, behavior: "smooth" });
    });
}

// 14. INSTAGRAM REELS VIDEO PLAYER LIGHTBOX
function initReelsPlayer() {
    const reelTriggers = document.querySelectorAll(".reel-trigger");
    const reelModal = document.getElementById("reelModal");
    const reelClose = document.getElementById("reelModalClose");
    const reelOverlay = document.getElementById("reelModalOverlay");
    const captionText = document.getElementById("reelCaptionText");
    const shopSvg = document.getElementById("reelShopNailSvg");
    const shopTitle = document.getElementById("reelShopNailTitle");
    const quickShopBtn = document.getElementById("btnReelQuickShop");
    const videoPlayer = document.getElementById("reelVideoPlayer");
    
    if (!reelModal) return;

    // Simulated reel datasets mapped to actual video assets
    const REELS_DATA = {
        "1": {
            caption: "Chasing direct golden rays with our Midnight Velvet Cat-Eye set. Watch the iron shavings dance dynamically ☀️✨ #pressonnails #luxurybeauty #cateyenails",
            color: "#1e1b1e",
            shape: "Almond",
            art: "Solid Color",
            productName: "Noir Velvet Cat-Eye",
            videoSrc: "assets/video1.mp4"
        },
        "2": {
            caption: "Bespoke Emerald Palace 3D Coffin set. Loaded with authentic crystals and hand-framed gold baroque moldings. Custom client order 👑💅 #3dnails #emerald #glassnails",
            color: "#1b382b",
            shape: "Coffin",
            art: "3D Crystals",
            productName: "Emerald Palace 3D",
            videoSrc: "assets/video2.mp4"
        },
        "3": {
            caption: "Satisfying prep & application of Milky Quartz Chrome sets. That high-shine metallic brush stroke is pure satisfaction 🤍💫 #nailsoftheday #chromenails #tutorial",
            color: "#efebe9",
            shape: "Almond",
            art: "Minimal Line Art",
            productName: "Milky Quartz Chrome",
            videoSrc: "assets/video1.mp4"
        },
        "4": {
            caption: "Hand-painted Couture Dragon Scales on Stiletto Long. 8 hours of master craftsmanship captured in seconds. Absolute royalty ❤️🔥 #handpaintednailart #couturenails",
            color: "#b71c1c",
            shape: "Stiletto",
            art: "Intricate Custom Art",
            productName: "Couture Dragon Art",
            videoSrc: "assets/video2.mp4"
        }
    };

    reelTriggers.forEach(card => {
        card.addEventListener("click", () => {
            const reelId = card.getAttribute("data-reel-id");
            const data = REELS_DATA[reelId];
            if (!data) return;

            captionText.textContent = data.caption;
            shopTitle.textContent = data.productName;
            
            // Set dynamic SVG icon in shop tag
            shopSvg.innerHTML = getNailSVGMarkup(data.shape, "Medium", data.color, data.art, "reel_icon_" + reelId);
            
            // Load and play the real video in lightbox
            if (videoPlayer) {
                videoPlayer.src = data.videoSrc;
                videoPlayer.load();
                videoPlayer.play().catch(err => console.log("Video auto-play blocked or failed:", err));
            }
            
            // Configure quick shop link
            quickShopBtn.onclick = (e) => {
                e.preventDefault();
                reelModal.classList.remove("active");
                if (videoPlayer) {
                    videoPlayer.pause();
                    videoPlayer.src = "";
                }
                
                // Route to shop or builder
                if (data.productName.includes("Bespoke") || data.productName.includes("Custom") || data.productName.includes("Dragon")) {
                    // Route to custom builder tab
                    document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
                    document.getElementById("builder").classList.add("active");
                    document.querySelectorAll(".nav-link").forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("data-target") === "builder") {
                            link.classList.add("active");
                        }
                    });
                    
                    // Set builder to match this design
                    builderConfig.shape = data.shape;
                    builderConfig.artTier = data.art;
                    
                    // Update visual builder active states
                    document.querySelectorAll(".shape-opt").forEach(opt => {
                        opt.classList.toggle("active", opt.getAttribute("data-shape") === data.shape);
                    });
                    document.querySelectorAll(".art-opt").forEach(opt => {
                        opt.classList.toggle("active", opt.getAttribute("data-art") === data.art);
                    });
                    
                    triggerBuilderUpdate();
                    window.scrollTo({ top: document.getElementById("builder").offsetTop - 100, behavior: "smooth" });
                } else {
                    // Search matching shop item
                    const match = PRODUCTS_DATA.find(p => p.name === data.productName);
                    if (match) {
                        openQuickView(match.id);
                    } else {
                        // fallback to shop tab
                        document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
                        document.getElementById("shop").classList.add("active");
                    }
                }
            };

            reelModal.classList.add("active");
        });
    });

    [reelClose, reelOverlay].forEach(btn => {
        if (btn) {
            btn.addEventListener("click", () => {
                reelModal.classList.remove("active");
                if (videoPlayer) {
                    videoPlayer.pause();
                    videoPlayer.src = "";
                }
            });
        }
    });

    // Sound toggle control for the video player
    const soundBtn = document.querySelector(".sound-toggle-btn");
    if (soundBtn && videoPlayer) {
        soundBtn.addEventListener("click", () => {
            videoPlayer.muted = !videoPlayer.muted;
            if (videoPlayer.muted) {
                soundBtn.style.color = "#fff";
            } else {
                soundBtn.style.color = "var(--accent-gold)";
            }
        });
    }

    // Card hover video preview effect
    reelTriggers.forEach(card => {
        const previewVideo = card.querySelector(".card-video-preview");
        if (previewVideo) {
            card.addEventListener("mouseenter", () => {
                previewVideo.play().catch(err => console.log("Preview play failed:", err));
                previewVideo.style.opacity = "1";
            });
            card.addEventListener("mouseleave", () => {
                previewVideo.pause();
                previewVideo.style.opacity = "0";
            });
        }
    });
}

// 15. SECURE CHECKOUT MULTI-STEP ENGINE
function initCheckoutFlow() {
    const btnCheckout = document.getElementById("btnCheckout");
    const checkoutDrawer = document.getElementById("checkoutDrawer");
    const checkoutClose = document.getElementById("checkoutDrawerClose");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartOverlay = document.getElementById("cartOverlay");
    
    const shippingForm = document.getElementById("checkoutShippingForm");
    const paymentArea = document.getElementById("checkoutPaymentArea");
    const reviewArea = document.getElementById("checkoutReviewArea");
    const successArea = document.getElementById("checkoutSuccessArea");
    
    const tabShipping = document.getElementById("tab-shipping");
    const tabPayment = document.getElementById("tab-payment");
    const tabConfirm = document.getElementById("tab-confirm");

    let checkoutState = {
        email: "",
        name: "",
        address: "",
        city: "",
        zip: "",
        country: "IN",
        shippingMethod: "express",
        paymentMethod: "card",
        shippingCost: 299.00
    };

    if (!btnCheckout || !checkoutDrawer) return;

    btnCheckout.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your Shopping bag is empty.");
            return;
        }
        
        // Hide cart drawer, open checkout drawer
        closeCartDrawer();
        checkoutDrawer.classList.add("active");
        cartOverlay.classList.add("active"); // keep overlay visible
        
        // Reset states
        resetCheckoutDrawer();
    });

    checkoutClose.addEventListener("click", () => {
        checkoutDrawer.classList.remove("active");
        cartOverlay.classList.remove("active");
    });

    // Reset checkout forms to state 1
    function resetCheckoutDrawer() {
        shippingForm.classList.remove("hidden");
        paymentArea.classList.add("hidden");
        reviewArea.classList.add("hidden");
        successArea.classList.add("hidden");
        
        tabShipping.style.color = "var(--accent-gold)";
        tabPayment.style.color = "var(--text-muted)";
        tabConfirm.style.color = "var(--text-muted)";
        
        // Auto pre-fill if logged in
        if (currentUser) {
            const coEmail = document.getElementById("coEmail");
            const coName = document.getElementById("coName");
            if (coEmail) coEmail.value = currentUser.email;
            if (coName) coName.value = currentUser.name;
        }
        
        updateShippingCost();
    }

    // Toggle shipping rates
    const shippingRadios = document.getElementsByName("shippingMethod");
    shippingRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            checkoutState.shippingMethod = e.target.value;
            updateShippingCost();
        });
    });

    function updateShippingCost() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        
        // Free shipping above ₹1,500 (or equivalent in other currencies)
        const freeShippingThreshold = 1500.0;
        if (subtotal >= freeShippingThreshold) {
            checkoutState.shippingCost = 0.0;
            document.getElementById("expressShippingCost").textContent = "FREE";
            document.getElementById("standardShippingCost").textContent = "FREE";
        } else {
            if (checkoutState.shippingMethod === "express") {
                checkoutState.shippingCost = 299.00;
            } else {
                checkoutState.shippingCost = 99.00;
            }
            document.getElementById("expressShippingCost").textContent = formatPrice(299.00);
            document.getElementById("standardShippingCost").textContent = formatPrice(99.00);
        }
    }

    // Phase 1 -> Phase 2
    shippingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        checkoutState.email = document.getElementById("coEmail").value;
        checkoutState.name = document.getElementById("coName").value;
        checkoutState.address = document.getElementById("coAddress").value;
        checkoutState.city = document.getElementById("coCity").value;
        checkoutState.zip = document.getElementById("coZip").value;
        checkoutState.country = document.getElementById("coCountry").value;

        // Hide Phase 1, Show Phase 2
        shippingForm.classList.add("hidden");
        paymentArea.classList.remove("hidden");
        
        tabShipping.style.color = "var(--text-secondary)";
        tabPayment.style.color = "var(--accent-gold)";
    });

    // Payment methods toggles
    const btnPayCard = document.getElementById("btnPayCard");
    const btnPayPaypal = document.getElementById("btnPayPaypal");
    const paymentCardForm = document.getElementById("paymentCardForm");
    const paymentPaypalArea = document.getElementById("paymentPaypalArea");

    btnPayCard.addEventListener("click", () => {
        btnPayCard.classList.add("active");
        btnPayPaypal.classList.remove("active");
        paymentCardForm.classList.remove("hidden");
        paymentPaypalArea.classList.add("hidden");
        checkoutState.paymentMethod = "card";
    });

    btnPayPaypal.addEventListener("click", () => {
        btnPayPaypal.classList.add("active");
        btnPayCard.classList.remove("active");
        paymentPaypalArea.classList.remove("hidden");
        paymentCardForm.classList.add("hidden");
        checkoutState.paymentMethod = "paypal";
    });

    // Back buttons
    document.getElementById("btnBackToShipping").addEventListener("click", () => {
        paymentArea.classList.add("hidden");
        shippingForm.classList.remove("hidden");
        tabPayment.style.color = "var(--text-muted)";
        tabShipping.style.color = "var(--accent-gold)";
    });
    
    document.getElementById("btnBackToShippingPaypal").addEventListener("click", () => {
        paymentArea.classList.add("hidden");
        shippingForm.classList.remove("hidden");
        tabPayment.style.color = "var(--text-muted)";
        tabShipping.style.color = "var(--accent-gold)";
    });

    // Format inputs expiration slash (MM/YY)
    const cardExpiryInput = document.getElementById("cardExpiry");
    cardExpiryInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 2) {
            value = value.substring(0, 2) + "/" + value.substring(2, 4);
        }
        e.target.value = value;
    });

    // Format card input numbers spacing (4111 2222...)
    const cardNumInput = document.getElementById("cardNum");
    cardNumInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        let formatted = "";
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) formatted += " ";
            formatted += value[i];
        }
        e.target.value = formatted;
    });

    // Phase 2 -> Phase 3 (Credit Card submit)
    paymentCardForm.addEventListener("submit", (e) => {
        e.preventDefault();
        proceedToReview();
    });

    // Phase 2 -> Phase 3 (PayPal/Apple Pay clicks)
    document.getElementById("btnSimulatePaypal").addEventListener("click", () => {
        checkoutState.paymentMethod = "PayPal";
        proceedToReview();
    });
    
    document.getElementById("btnSimulateApplePay").addEventListener("click", () => {
        checkoutState.paymentMethod = "Apple Pay";
        proceedToReview();
    });

    function proceedToReview() {
        paymentArea.classList.add("hidden");
        reviewArea.classList.remove("hidden");
        
        tabPayment.style.color = "var(--text-secondary)";
        tabConfirm.style.color = "var(--accent-gold)";
        
        // Populate Order Review
        document.getElementById("reviewDestName").textContent = checkoutState.name;
        document.getElementById("reviewDestAddress").textContent = `${checkoutState.address}, ${checkoutState.city} ${checkoutState.zip}, ${checkoutState.country}`;
        
        const methodText = checkoutState.shippingMethod === "express" ? "Express Delivery (DHL/FedEx)" : "Standard Insured Delivery";
        let paymentText = "";
        if (checkoutState.paymentMethod === "card") {
            const cardNum = document.getElementById("cardNum").value;
            const last4 = cardNum.substring(cardNum.length - 4) || "4444";
            paymentText = `Credit Card (ending in ${last4})`;
        } else {
            paymentText = checkoutState.paymentMethod;
        }
        document.getElementById("reviewMethodDetails").textContent = `${methodText} &bull; ${paymentText}`;
        
        // Render item list
        const reviewList = document.getElementById("reviewItemsList");
        reviewList.innerHTML = cart.map(item => `
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
                <span>${item.qty}x ${item.name} (${item.shape} &bull; ${item.length})</span>
                <span>${formatPrice(item.price * item.qty)}</span>
            </div>
        `).join("");
        
        // Price summaries
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const taxVal = subtotal * 0.20; // 20% taxes
        const totalVal = subtotal + checkoutState.shippingCost + taxVal;
        
        document.getElementById("reviewSubtotal").textContent = formatPrice(subtotal);
        document.getElementById("reviewShippingCost").textContent = checkoutState.shippingCost === 0 ? "FREE" : formatPrice(checkoutState.shippingCost);
        document.getElementById("reviewTax").textContent = formatPrice(taxVal);
        document.getElementById("reviewTotal").textContent = formatPrice(totalVal);
    }

    // Back to Payment
    document.getElementById("btnBackToPayment").addEventListener("click", () => {
        reviewArea.classList.add("hidden");
        paymentArea.classList.remove("hidden");
        tabConfirm.style.color = "var(--text-muted)";
        tabPayment.style.color = "var(--accent-gold)";
    });

    // Submit final order (Phase 3 -> Success)
    document.getElementById("btnPlaceOrder").addEventListener("click", () => {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const taxVal = subtotal * 0.20;
        const totalVal = subtotal + checkoutState.shippingCost + taxVal;
        const ref = "NL-" + Math.floor(10000 + Math.random() * 90000);

        const orderPayload = {
            orderId: ref,
            email: checkoutState.email,
            name: checkoutState.name,
            address: checkoutState.address,
            city: checkoutState.city,
            zip: checkoutState.zip,
            country: checkoutState.country,
            shippingMethod: checkoutState.shippingMethod,
            shippingCost: checkoutState.shippingCost,
            paymentMethod: checkoutState.paymentMethod,
            items: cart.map(i => ({
                productId: i.productId,
                name: i.name,
                price: i.price,
                qty: i.qty,
                shape: i.shape,
                length: i.length,
                sizing: i.sizing,
                artTier: i.artTier || "Solid Color",
                isCustomBuilder: i.isCustomBuilder
            })),
            subtotal: subtotal,
            tax: taxVal,
            total: totalVal
        };

        // Call backend API with fetch, fallback to offline local logic on error
        fetch(`${BACKEND_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderPayload)
        })
        .then(response => {
            if (!response.ok) throw new Error("Server error");
            return response.json();
        })
        .then(data => {
            console.log("Order persisted to backend:", data);
            displaySuccessState(ref);
        })
        .catch(err => {
            console.warn("Backend unavailable. Falling back to client local storage simulation.", err);
            // Save to offline order log in localStorage
            let offlineOrders = JSON.parse(localStorage.getItem("nailss_luxe_offline_orders") || "[]");
            offlineOrders.push(orderPayload);
            localStorage.setItem("nailss_luxe_offline_orders", JSON.stringify(offlineOrders));
            
            displaySuccessState(ref);
        });

        function displaySuccessState(refNum) {
            document.getElementById("successRefNum").textContent = refNum;
            
            // Est delivery date (+4 days)
            const date = new Date();
            date.setDate(date.getDate() + 4);
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            document.getElementById("successDeliveryDate").textContent = date.toLocaleDateString('en-US', options);
            
            // Hide review, show success
            reviewArea.classList.add("hidden");
            successArea.classList.remove("hidden");
            tabConfirm.style.color = "var(--text-secondary)";
            
            // Clear cart globally
            cart = [];
            saveCart();
            updateCartUI();
        }
    });

    document.getElementById("btnSuccessClose").addEventListener("click", () => {
        checkoutDrawer.classList.remove("active");
        cartOverlay.classList.remove("active");
        resetCheckoutDrawer();
        
        // Route back to home tab
        document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("active"));
        document.getElementById("home").classList.add("active");
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-target") === "home") {
                link.classList.add("active");
            }
        });
    });
}

function loadProductsFromBackend() {
    fetch(`${BACKEND_URL}/api/products`)
        .then(res => {
            if (!res.ok) throw new Error("Catalog fetch failed");
            return res.json();
        })
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                PRODUCTS_DATA = data;
                console.log("Loaded products catalog dynamically from backend:", PRODUCTS_DATA);
                renderProductGrid();
                renderBestsellers();
            }
        })
        .catch(err => {
            console.log("Using local offline products catalog:", err);
        });
}

// 16. RUN INITIALIZATIONS ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initCurrencySwitcher();
    initECommerce();
    initCustomBuilder();
    initCart();
    initBlog();
    initSupport();
    initWhatsApp();
    initSizingConverter();
    initReelsPlayer();
    initCheckoutFlow();
    initAuth();
    loadProductsFromBackend();
});

// 17. LUXURY AUTHENTICATION & PROFILE SYSTEM
function initAuth() {
    const authModal = document.getElementById("authModal");
    const authModalOverlay = document.getElementById("authModalOverlay");
    const authModalClose = document.getElementById("authModalClose");
    
    const accountTrigger = document.getElementById("accountTrigger");
    const mobileAccountLink = document.getElementById("mobileAccountLink");
    const userGreetingPill = document.getElementById("userGreetingPill");

    // Tabs
    const btnTabLogin = document.getElementById("btnTabLogin");
    const btnTabRegister = document.getElementById("btnTabRegister");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Views
    const authLoggedOutState = document.getElementById("authLoggedOutState");
    const authLoggedInState = document.getElementById("authLoggedInState");

    // Status elements
    const loginStatus = document.getElementById("loginStatus");
    const registerStatus = document.getElementById("registerStatus");

    // Logged In Dashboard elements
    const dashboardAvatar = document.getElementById("dashboardAvatar");
    const dashboardTitle = document.getElementById("dashboardTitle");
    const dashboardEmail = document.getElementById("dashboardEmail");
    const dashboardOrderList = document.getElementById("dashboardOrderList");
    const btnLogOut = document.getElementById("btnLogOut");

    // Checkout pre-fill references
    const coEmail = document.getElementById("coEmail");
    const coName = document.getElementById("coName");

    function updateUIState() {
        if (currentUser) {
            // User is logged in
            userGreetingPill.textContent = currentUser.name.split(' ')[0];
            userGreetingPill.style.display = "block";
            
            authLoggedOutState.style.display = "none";
            authLoggedInState.style.display = "block";
            
            dashboardAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
            dashboardTitle.textContent = `Bonjour, ${currentUser.name}!`;
            dashboardEmail.textContent = currentUser.email;

            // Pre-fill checkout fields if they exist
            if (coEmail) coEmail.value = currentUser.email;
            if (coName) coName.value = currentUser.name;
        } else {
            // User is logged out
            userGreetingPill.style.display = "none";
            userGreetingPill.textContent = "";
            
            authLoggedOutState.style.display = "block";
            authLoggedInState.style.display = "none";

            if (coEmail && coEmail.value === currentUser?.email) coEmail.value = "";
            if (coName && coName.value === currentUser?.name) coName.value = "";
        }
    }

    function toggleAuthModal(show = true) {
        if (show) {
            authModal.classList.add("active");
            if (currentUser) {
                fetchOrderHistory();
            }
        } else {
            authModal.classList.remove("active");
            // Clear message statuses
            loginStatus.textContent = "";
            registerStatus.textContent = "";
            loginForm.reset();
            registerForm.reset();
        }
    }

    function fetchOrderHistory() {
        if (!currentUser) return;
        dashboardOrderList.innerHTML = `<p style="font-size: 0.8rem; color: var(--text-muted); font-style: italic; text-align: center;">Loading order history...</p>`;
        
        fetch(`${BACKEND_URL}/api/orders/customer?email=${encodeURIComponent(currentUser.email)}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load orders");
                return res.json();
            })
            .then(orders => {
                if (!Array.isArray(orders) || orders.length === 0) {
                    dashboardOrderList.innerHTML = `<p style="font-size: 0.8rem; color: var(--text-muted); font-style: italic; text-align: center;">No orders placed yet. Design your bespoke set today! 💅</p>`;
                    return;
                }

                dashboardOrderList.innerHTML = orders.map(order => {
                    const date = new Date(order.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });

                    // Construct items description
                    const itemsDesc = order.items.map(item => `${item.qty}x ${item.name} (${item.shape}, ${item.length})`).join('<br>');
                    
                    return `
                        <div class="order-history-card">
                            <div class="order-card-header">
                                <span class="order-card-id">${order.orderId}</span>
                                <span class="order-card-date">${date}</span>
                            </div>
                            <div class="order-card-items">
                                ${itemsDesc}
                            </div>
                            <div class="order-card-footer">
                                <span class="order-card-status">Paid</span>
                                <span class="order-card-total">${formatPrice(order.total)}</span>
                            </div>
                        </div>
                    `;
                }).join("");
            })
            .catch(err => {
                console.error("Order history fetch error:", err);
                dashboardOrderList.innerHTML = `<p style="font-size: 0.8rem; color: #e57373; font-style: italic; text-align: center;">Unable to load order history.</p>`;
            });
    }

    // Tab Switch Events
    btnTabLogin.addEventListener("click", () => {
        btnTabLogin.classList.add("active");
        btnTabRegister.classList.remove("active");
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        loginStatus.textContent = "";
        registerStatus.textContent = "";
    });

    btnTabRegister.addEventListener("click", () => {
        btnTabRegister.classList.add("active");
        btnTabLogin.classList.remove("active");
        registerForm.style.display = "block";
        loginForm.style.display = "none";
        loginStatus.textContent = "";
        registerStatus.textContent = "";
    });

    // Toggle Modal Actions
    accountTrigger.addEventListener("click", () => toggleAuthModal(true));
    if (mobileAccountLink) {
        mobileAccountLink.addEventListener("click", (e) => {
            e.preventDefault();
            const mobileDrawer = document.getElementById("mobileDrawer");
            const drawerOverlay = document.getElementById("drawerOverlay");
            if (mobileDrawer) mobileDrawer.classList.remove("active");
            if (drawerOverlay) drawerOverlay.classList.remove("active");
            toggleAuthModal(true);
        });
    }

    authModalClose.addEventListener("click", () => toggleAuthModal(false));
    authModalOverlay.addEventListener("click", () => toggleAuthModal(false));

    // Submit Logic: Login Form
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        loginStatus.className = "form-status-message";
        loginStatus.style.color = "var(--text-secondary)";
        loginStatus.textContent = "Logging in...";

        fetch(`${BACKEND_URL}/api/auth/login`, {            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(errData => {
                    throw new Error(errData.error || "Authentication failed");
                });
            }
            return res.json();
        })
        .then(data => {
            if (data.success) {
                currentUser = data.user;
                localStorage.setItem('nailss_luxe_user', JSON.stringify(currentUser));
                updateUIState();
                loginStatus.className = "form-status-message success";
                loginStatus.style.color = "#81c784";
                loginStatus.textContent = "Login successful!";
                
                setTimeout(() => {
                    toggleAuthModal(false);
                }, 1000);
            }
        })
        .catch(err => {
            loginStatus.className = "form-status-message";
            loginStatus.style.color = "#e57373";
            loginStatus.textContent = err.message;
        });
    });

    // Submit Logic: Register Form
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const confirmPassword = document.getElementById("registerConfirmPassword").value;

        registerStatus.className = "form-status-message";
        registerStatus.style.color = "var(--text-secondary)";
        registerStatus.textContent = "Creating account...";

        if (password !== confirmPassword) {
            registerStatus.style.color = "#e57373";
            registerStatus.textContent = "Passwords do not match.";
            return;
        }

        fetch(`${BACKEND_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(errData => {
                    throw new Error(errData.error || "Registration failed");
                });
            }
            return res.json();
        })
        .then(data => {
            if (data.success) {
                registerStatus.className = "form-status-message success";
                registerStatus.style.color = "#81c784";
                registerStatus.textContent = "Registration successful! Logging in...";
                
                currentUser = data.user;
                localStorage.setItem('nailss_luxe_user', JSON.stringify(currentUser));
                updateUIState();
                
                setTimeout(() => {
                    toggleAuthModal(false);
                }, 1500);
            }
        })
        .catch(err => {
            registerStatus.className = "form-status-message";
            registerStatus.style.color = "#e57373";
            registerStatus.textContent = err.message;
        });
    });

    // Logout Logic
    btnLogOut.addEventListener("click", () => {
        currentUser = null;
        localStorage.removeItem('nailss_luxe_user');
        updateUIState();
        toggleAuthModal(false);
    });

    // Initial state check
    updateUIState();
}
