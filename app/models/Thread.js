var mongoose = require('mongoose');

// Define the thread Schema
var ThreadSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
        date: { type: Date, default: Date.now },
        lastReplyDate: { type: Date, default: Date.now },
        lastReplyAuthor: String,
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    }
);

// Update the last reply information
ThreadSchema.methods.updateLastReply = function(name) {
    this.lastReplyDate = Date.now;
    this.lastReplyAuthor = name;
};

var model = mongoose.model('Thread', ThreadSchema);

module.exports = model;