// app/models/Comment.js
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true
        },
        reply_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        date: {
            type: Date,
            default: Date.now
        },
        thread: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    }
);

var model = mongoose.model('Comment', CommentSchema);

module.exports = model;