// app/models/Thread.js
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

// Define the thread Schema
var ThreadSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectIdca,
            ref: 'User'
        },
        date: { type: Date, default: Date.now },
        body: String,
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        category: {
            type: mongoose.Schema.Types.ObjectId,
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

// Middleware to remove comments
ThreadSchema.pre('remove', function(next) {
    Comment.remove({ thread: this._id }).exec();
    next();
})

var model = mongoose.model('Thread', ThreadSchema);

module.exports = model;