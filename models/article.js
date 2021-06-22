const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const articleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('article', articleSchema);