const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    customer: {
        email: { type: String, required: true, lowercase: true },
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true }
    },
    shippingMethod: { type: String, required: true },
    shippingCost: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    items: [{
        id: String,
        name: String,
        price: Number,
        qty: Number,
        shape: String,
        length: String,
        sizeMode: String,
        presetSize: String,
        customSizes: [Number],
        artTier: String,
        artPriceAdd: Number,
        image: String
    }],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);
