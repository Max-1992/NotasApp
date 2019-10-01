const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    }
});

module.exports = model('Note', noteSchema);