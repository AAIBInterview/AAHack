const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const redis = require('redis');
const cron = require('node-cron');
const mongoose = require('mongoose');

const app = require('express')();
const config = require('./config/database');
const Booking = require('./models/booking');
// Connect To Database
mongoose.connect(config.dbUrl+config.dbName);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB');
  Booking.checkForDB();
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const users = require('./routes/users');
const bookings = require('./routes/bookings');
// Port Number
const NODE_PORT = process.env.PORT || 3000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/bookings', bookings);


// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// app.get('*', (req, res) => {
//   console.log(req);
//   console.log("error");
// });

// Start Server
app.listen(NODE_PORT, () => {
  console.log('Node Server started');
});
// const client = redis.createClient(REDIS_PORT);

// client.on('connect', function() {
//   console.log('Redis client is connected');
// });

// cron.schedule('5 0 * * 1', function(){
//   client.exists('some key', function(err, reply) {
//     if (reply === 1) {
//       client.del('some key', function(err, reply) {
//         console.log(reply);
//         // client.set('some key', 'some value');
//       });
//     } else {
//       // client.set('some key', 'some value');
//     }
//   });
// });

// function cache(req, res, next) {
//   // client.get(org, function (err, data) {
//   //     if (err) throw err;

//   //     if (data != null) {
//   //         res.send(respond(org, data));
//   //     } else {
//   //         next();
//   //     }
//   // });
// }
