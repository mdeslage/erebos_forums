// app/models/Comment.js
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true
        },
        reply_id: {
            type: mongoose.Schema.ObjectId,
            ref: 'Comment'
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

var model = mongoose.model('Comment', CommentSchema);

module.exports = model;