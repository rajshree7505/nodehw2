const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usertype : { type: Number, default:1, enum:[1, 2] },
});

// Export the model correctly
const AdminModel = mongoose.model('Admin', adminSchema);
module.exports = AdminModel;
