const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    basePrice: { type: Number, required: true },
    shapes: [String],
    lengths: [String],
    styles: [String],
    finishes: [String],
    image: String,
    desc: String,
    nailColor: String,
    artStyle: String
});

module.exports = mongoose.model('Product', ProductSchema);
