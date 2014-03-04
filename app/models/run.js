'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// The schema defines the fields.
// REF: http://mongoosejs.com/docs/guide.html
var RunSchema = new Schema({
    date: {
        type: Date,
        default: new Date()
    },
    distance: {
        type: Number,
        required: true
    },
    time: {
        type: Number
    }
});

// Register the model with Mongoose.
mongoose.model('Run', RunSchema);