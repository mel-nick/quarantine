const mongoose = require('mongoose');

// Post Schema
const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    employee_name: {
        type: String,
        required: true
    },
    temp: {
        type: Number,
        required: true
    },
    city: {
        type: String
    },
    comment: {
        type: String
    },    
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String
    }
})

const Post = module.exports = mongoose.model('post', PostSchema);