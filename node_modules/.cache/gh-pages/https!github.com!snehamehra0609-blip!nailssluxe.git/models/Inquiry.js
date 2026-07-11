const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
    inquiryId: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    orderRef: { type: String, default: 'N/A' },
    message: { type: String, required: true }
});

module.exports = mongoose.model('Inquiry', InquirySchema);
