const mongoose = require('mongoose');

const schema = new mongoose.Schema({})

module.exports = {
    blogSchema: mongoose.model('', schema)
}