const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    table:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending',
    },
    guestCount: {
        type: Number,
        required: true,
    },
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;