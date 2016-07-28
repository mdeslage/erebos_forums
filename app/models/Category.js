// app/models/Category.js
var mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        permission_level: {
            type: Number,
            default: 1,
        },
        recentThreads: {
            type: mongoose.Schema.ObjectId,
            ref: 'Thread'
        },
        numberOfThreads: {
            type: Number,
            default: 0
        }
    }
);

CategorySchema.methods.incrementNumThreads = function() {
    this.numberOfThreads++;
};

var model = mongoose.model('Category', CategorySchema);

module.exports = model;