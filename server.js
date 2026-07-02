require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');

const connectDB = require('./config/db');
const User = require('./models/User');
const Order = require('./models/Order');
const Inquiry = require('./models/Inquiry');
const Product = require('./models/Product');
const jsonDb = require('./config/jsonDb');

let useJsonFallback = false;

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static frontend files (html, css, js, assets)
app.use(express.static(path.join(__dirname)));

// Simulated local product database for seeding
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

// Seed database with default products if empty
const seedProducts = async () => {
    try {
        const count = await Product.countDocuments();
        if (count === 0) {
            await Product.insertMany(PRODUCTS_DATABASE);
            console.log("Database successfully seeded with default products.");
        }
    } catch (e) {
        console.error("Failed to seed products database:", e);
    }
};

// API: Get products catalog from MongoDB
app.get('/api/products', async (req, res) => {
    try {
        if (useJsonFallback) {
            return res.json(PRODUCTS_DATABASE);
        }
        const products = await Product.find({});
        res.json(products);
    } catch (e) {
        console.error("Error fetching products:", e);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// API: Save support inquiry to MongoDB
app.post('/api/inquiries', async (req, res) => {
    const { name, email, orderRef, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields (name, email, message)" });
    }
    
    try {
        const inquiryId = "inq_" + Date.now();
        if (useJsonFallback) {
            jsonDb.saveInquiry({ inquiryId, name, email, orderRef, message });
            return res.status(201).json({ success: true, message: "Inquiry saved successfully", inquiryId });
        }
        const newInquiry = new Inquiry({
            inquiryId,
            name,
            email: email.toLowerCase(),
            orderRef: orderRef || "N/A",
            message
        });
        
        await newInquiry.save();
        res.status(201).json({ success: true, message: "Inquiry saved successfully", inquiryId });
    } catch (e) {
        console.error("Error saving inquiry:", e);
        res.status(500).json({ error: "Failed to persist inquiry to database storage" });
    }
});

// API: Save order invoice to MongoDB
app.post('/api/orders', async (req, res) => {
    const {
        orderId,
        email,
        name,
        address,
        city,
        zip,
        country,
        shippingMethod,
        shippingCost,
        paymentMethod,
        items,
        subtotal,
        tax,
        total
    } = req.body;
    
    if (!email || !name || !address || !items || !items.length) {
        return res.status(400).json({ error: "Invalid order details or empty shopping bag" });
    }
    
    try {
        const finalOrderId = orderId || ("NL-" + Math.floor(10000 + Math.random() * 90000));
        const orderData = {
            orderId: finalOrderId,
            customer: {
                email: email.toLowerCase(),
                name,
                address,
                city,
                zip,
                country
            },
            shippingMethod,
            shippingCost,
            paymentMethod,
            items,
            subtotal,
            tax,
            total
        };
        if (useJsonFallback) {
            jsonDb.saveOrder(orderData);
            return res.status(201).json({ success: true, message: "Order processed successfully", orderId: finalOrderId });
        }
        const newOrder = new Order(orderData);
        await newOrder.save();
        res.status(201).json({ success: true, message: "Order processed successfully", orderId: finalOrderId });
    } catch (e) {
        console.error("Error saving order:", e);
        res.status(500).json({ error: "Failed to process order invoices in database storage" });
    }
});

// Password hashing helper
function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
}

// API: Register User in MongoDB
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields (name, email, password)" });
    }

    try {
        // Check if email already registered
        let exists;
        if (useJsonFallback) {
            exists = jsonDb.findUserByEmail(email);
        } else {
            exists = await User.findOne({ email: email.toLowerCase() });
        }
        if (exists) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = hashPassword(password, salt);

        if (useJsonFallback) {
            const newUser = jsonDb.saveUser({
                name,
                email: email.toLowerCase(),
                salt,
                password: hashedPassword
            });
            return res.status(201).json({
                success: true,
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email
                }
            });
        }

        const newUser = new User({
            name,
            email: email.toLowerCase(),
            salt,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (e) {
        console.error("Error saving user:", e);
        res.status(500).json({ error: "Failed to persist registration data" });
    }
});

// API: Login User in MongoDB
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }

    try {
        let user;
        if (useJsonFallback) {
            user = jsonDb.findUserByEmail(email);
        } else {
            user = await User.findOne({ email: email.toLowerCase() });
        }
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const checkHash = hashPassword(password, user.salt);
        if (checkHash !== user.password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Mock token
        const token = "auth_tok_" + crypto.randomBytes(16).toString('hex');

        res.json({
            success: true,
            token: token,
            user: {
                id: user._id || user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (e) {
        console.error("Error logging in user:", e);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// API: Get customer order history from MongoDB
app.get('/api/orders/customer', async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ error: "Email query parameter is required" });
    }

    try {
        if (useJsonFallback) {
            const customerOrders = jsonDb.getCustomerOrders(email);
            return res.json(customerOrders);
        }
        const customerOrders = await Order.find({ "customer.email": email.toLowerCase() })
                                           .sort({ timestamp: -1 });
        res.json(customerOrders);
    } catch (e) {
        console.error("Error reading orders from database:", e);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Connect to Database and start server
connectDB()
    .then(() => {
        console.log("Using MongoDB storage.");
        seedProducts();
    })
    .catch((err) => {
        console.warn("MongoDB connection failed. Falling back to local JSON database storage.");
        useJsonFallback = true;
    })
    .finally(() => {
        app.listen(PORT, () => {
            console.log(`Nailss Luxe backend service running locally at http://localhost:${PORT}`);
        });
    });