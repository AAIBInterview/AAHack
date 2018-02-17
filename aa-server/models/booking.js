const mongoose = require('mongoose');
const defaultData = require('./booking.json');
const BookingSchema = mongoose.Schema({
    author: { type: String },
    country: { type: String },
    imageLink: { type: String },
    language: { type: String },
    link: { type: String },
    pages: { type: Number },
    title: { type: String },
    year: { type: Number },
});
const Booking = mongoose.model('Booking', BookingSchema);

const populateDB = function () {
    Booking.create(defaultData, function (err, small) {
        if (err) return handleError(err);
        console.log("Data Populated");
    });
}
module.exports.checkForDB = function () {
    Booking.count(function (err, count) {
        if (!err && count === 0) {
            populateDB();
        }
    });
}


module.exports.addNewBooking = function (newBooking, callback) {
    newBooking.save(callback);
}

module.exports.getAllBooking = function (callback) {
    let query = { }
    Booking.find(query, callback);
}

module.exports.deleteOneBooking = function (id, callback) {
    const query = { _id: id }
    Booking.remove(query, callback);
}

module.exports.updateOneBooking = function (req, callback) {
    Booking.findByIdAndUpdate(req.body.bookId, {
        $inc: { searchCount : 1 }
    }, callback);
}

