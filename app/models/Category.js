// app/models/Category.js
var mongoose = require('mongoose');
var Thread = mongoose.model('Thread');

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
        recentThreads: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }],
        numberOfThreads: {
            type: Number,
            default: 0
        }
    }
);

CategorySchema.methods.incrementNumThreads = function(cb) {
    this.numberOfThreads++;
    this.save(cb);
};

// Middleware to remove threads
CategorySchema.pre('remove', function(next) {
    Thread.remove({ category: this._id }).exec();
    next();
})

var model = mongoose.model('Category', CategorySchema);

module.exports = model;