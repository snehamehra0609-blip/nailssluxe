require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Import Mongoose Models
const Product = require('./models/Product');
const Order = require('./models/Order');
const Inquiry = require('./models/Inquiry');

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. ADVANCED CORS CONFIGURATION (MUST BE FIRST)
// ==========================================
app.use(cors({
    origin: 'https://snehamehra0609-blip.github.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Explicit interceptor for preflight OPTIONS handshakes
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://snehamehra0609-blip.github.io');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    return res.sendStatus(200);
});

// ==========================================
// 2. STANDARD MIDDLEWARE
// ==========================================
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Paths to local JSON databases
const inquiriesPath = path.join(__dirname, 'inquiries.json');
const ordersPath = path.join(__dirname, 'orders.json');

// Helper to read JSON file safely
function readJsonFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            return [];
        }
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data || '[]');
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
        return [];
    }
}

// Helper to write JSON file safely
function writeJsonFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf8');
        return true;
    } catch (err) {
        console.error(`Error writing ${filePath}:`, err);
        return false;
    }
}

// Simulated local product database for seeding and fallback
const PRODUCTS_DATABASE = [
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

// Mongoose Connection Logic
let isDbConnected = false;

async function connectDatabase() {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
        console.warn("WARNING: MONGODB_URI environment variable is missing.");
        return;
    }
    try {
        await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
        isDbConnected = true;
        console.log("Successfully connected to MongoDB.");
        await seedProducts();
    } catch (err) {
        console.error(`Database Connection Error: ${err.message}`);
    }
}

async function seedProducts() {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(PRODUCTS_DATABASE);
            console.log("Database successfully seeded with default products.");
        }
    } catch (err) {
        console.error("Failed to seed default products into MongoDB:", err);
    }
}

// ==========================================
// 3. API ENDPOINTS
// ==========================================

app.post('/api/inquiries', async (req, res) => {
    const { name, email, orderRef, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const inquiryId = "inq_" + Date.now();
    const newInquiry = { id: inquiryId, timestamp: new Date().toISOString(), name, email: email.toLowerCase(), orderRef: orderRef || "N/A", message };

    const inquiries = readJsonFile(inquiriesPath);
    inquiries.push(newInquiry);
    writeJsonFile(inquiriesPath, inquiries);

    if (isDbConnected) {
        try {
            const dbInquiry = new Inquiry({ inquiryId, name, email: email.toLowerCase(), orderRef: orderRef || "N/A", message });
            await dbInquiry.save();
        } catch (err) {
            console.error("Failed to save inquiry to MongoDB:", err.message);
        }
    }
    res.status(201).json({ success: true, message: "Inquiry saved successfully", inquiryId });
});

app.post('/api/orders', async (req, res) => {
    const { orderId, email, name, address, city, zip, country, shippingMethod, shippingCost, paymentMethod, items, subtotal, tax, total } = req.body;
    if (!email || !name || !address || !items || !items.length) {
        return res.status(400).json({ error: "Invalid order details" });
    }
    const finalOrderId = orderId || ("NL-" + Math.floor(10000 + Math.random() * 90000));
    const orderData = { orderId: finalOrderId, timestamp: new Date().toISOString(), customer: { email: email.toLowerCase(), name, address, city, zip, country }, shippingMethod, shippingCost, paymentMethod, items, subtotal, tax, total };

    const orders = readJsonFile(ordersPath);
    orders.push(orderData);
    writeJsonFile(ordersPath, orders);

    if (isDbConnected) {
        try {
            const dbOrder = new Order(orderData);
            await dbOrder.save();
        } catch (err) {
            console.error("Failed to save order to MongoDB:", err.message);
        }
    }
    res.status(201).json({ success: true, message: "Order processed successfully", orderId: finalOrderId });
});

app.get('/api/products', async (req, res) => {
    if (isDbConnected) {
        try {
            const products = await Product.find({});
            return res.json(products);
        } catch (err) {
            console.error("Error fetching products from MongoDB:", err.message);
        }
    }
    res.json(PRODUCTS_DATABASE);
});

app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    res.status(201).json({
        success: true,
        user: { id: "usr_" + Math.random().toString(36).substr(2, 9), name, email: email.toLowerCase() }
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }
    res.json({
        success: true,
        token: "auth_tok_" + Math.random().toString(36).substr(2, 9),
        user: { id: "usr_mock123", name: "Mock User", email: email.toLowerCase() }
    });
});

app.get('/api/orders/customer', async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: "Email parameter is required" });
    }
    if (isDbConnected) {
        try {
            const customerOrders = await Order.find({ "customer.email": email.toLowerCase() }).sort({ timestamp: -1 });
            return res.json(customerOrders);
        } catch (err) {
            console.error("Error reading orders from MongoDB:", err.message);
        }
    }
    const orders = readJsonFile(ordersPath);
    const filteredOrders = orders
        .filter(order => order.customer && order.customer.email && order.customer.email.toLowerCase() === email.toLowerCase())
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    res.json(filteredOrders);
});

// ==========================================
// 4. WILDCARD FALLBACK (MUST BE AT THE VERY BOTTOM)
// ==========================================
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Express server running locally at http://localhost:${PORT}`);
    });
});