const mongoose = require('mongoose')

const TripSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    startDate: {
        type: Number,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    }
})

const TripModel = mongoose.model('cities', TripSchema);

module.exports = TripModel; 