const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "admin"],
        required: true
    }
});

// Create the model
// model name is user model
const userModel = mongoose.model('userModel', userSchema);
// Export the model
module.exports = userModel;