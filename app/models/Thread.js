// app/models/Thread.js
var mongoose = require('mongoose');

// Define the thread Schema
var ThreadSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        date: { type: Date, default: Date.now },
        body: String,
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        },
        views: { type: Number, default: 0 },
        replies: { type: Number, default: 0 },
        permission_level: { type: Number, default: 1}
    }
);

ThreadSchema.methods.incrementViews = function() {
    this.views++;
};

ThreadSchema.methods.incrementReplies = function() {
    this.replies++;
};

var model = mongoose.model('Thread', ThreadSchema);

module.exports = model;