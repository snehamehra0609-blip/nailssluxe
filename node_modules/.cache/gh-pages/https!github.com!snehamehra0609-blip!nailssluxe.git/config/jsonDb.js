const fs = require('fs');
const path = require('path');

// Helper to get absolute path to JSON files in project root
const getFilePath = (filename) => {
    return path.join(__dirname, '..', filename);
};

// Safe JSON reading
const readJsonFile = (filename, defaultVal = []) => {
    try {
        const filePath = getFilePath(filename);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 4));
            return defaultVal;
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content || JSON.stringify(defaultVal));
    } catch (e) {
        console.error(`Error reading file ${filename}:`, e);
        return defaultVal;
    }
};

// Safe JSON writing
const writeJsonFile = (filename, data) => {
    try {
        const filePath = getFilePath(filename);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        return true;
    } catch (e) {
        console.error(`Error writing file ${filename}:`, e);
        return false;
    }
};

const formatUser = (userObj) => {
    if (!userObj) return null;
    return {
        ...userObj,
        _id: userObj.id || userObj._id
    };
};

// Inquiries API fallback
const saveInquiry = (inquiryData) => {
    const inquiries = readJsonFile('inquiries.json');
    inquiries.push({
        id: inquiryData.inquiryId,
        timestamp: new Date().toISOString(),
        name: inquiryData.name,
        email: inquiryData.email,
        orderRef: inquiryData.orderRef,
        message: inquiryData.message
    });
    return writeJsonFile('inquiries.json', inquiries);
};

// Orders API fallback
const saveOrder = (orderData) => {
    const orders = readJsonFile('orders.json');
    orders.push({
        orderId: orderData.orderId,
        timestamp: new Date().toISOString(),
        customer: orderData.customer,
        shippingMethod: orderData.shippingMethod,
        shippingCost: orderData.shippingCost,
        paymentMethod: orderData.paymentMethod,
        items: orderData.items,
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        total: orderData.total
    });
    return writeJsonFile('orders.json', orders);
};

const getCustomerOrders = (email) => {
    const orders = readJsonFile('orders.json');
    return orders
        .filter(order => order.customer && order.customer.email && order.customer.email.toLowerCase() === email.toLowerCase())
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Users API fallback
const saveUser = (userData) => {
    const users = readJsonFile('users.json');
    const newUser = {
        id: "usr_" + Date.now(),
        name: userData.name,
        email: userData.email.toLowerCase(),
        salt: userData.salt,
        password: userData.password,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    if (writeJsonFile('users.json', users)) {
        return formatUser(newUser);
    }
    return null;
};

const findUserByEmail = (email) => {
    const users = readJsonFile('users.json');
    const user = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
    return formatUser(user);
};

module.exports = {
    saveInquiry,
    saveOrder,
    getCustomerOrders,
    saveUser,
    findUserByEmail
};
