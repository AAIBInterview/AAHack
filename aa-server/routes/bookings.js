const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Booking = require('../models/booking');

router.post('/addNewBooking', (req, res, err) => {
  const newBooking = new Booking({
    name: req.body.name,
  });
  Booking.addNewBooking(newBooking, (err, booking) => {
    if (err) {
      res.json({ "success": false, "message": "unable to add" });
    } else {
      res.json({ "success": true, "booking": booking });
    }
  });
});

router.get('/fetchAllBookings', (req, res, next) => {
  Booking.getAllBooking(req, (err, bookings) => {
    if (err) {
      res.json({ "success": false, "message": 'Unable to get booking' });
    } else {
      res.json({ "success": true, "bookings": bookings });
    }
  });
});

router.post('/updateBooking', function (req, res) {
  Booking.updateOneBooking(req, (err, result) => {
    if (err) {
      res.json({ "success": false, "message": "unable to update" });
    } else {
      res.json({ "success": true, "data": result });
    }
  });
});

router.get('/deletebooking/:id', function (req, res) {
  Booking.deleteOneBooking(req.params.id, function (err, result) {
      if (err) {
        console.log(err);
        res.json({ "success": false });
      } else {
        res.json({ "success": true });
      }
    })
});


module.exports = router;
