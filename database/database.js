const config = require('../config.js');
const axios = require('axios');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const riseSettimes = new mongoose.Schema({
  city: String,
  state: String,
  date: String,
  moonrise: String,
  moonset: String,
  sunrise: String,
  sunset: String,
});

// for (var i = 0; i < 100; i++) {
//   var i = mongoose.model(i, riseSettimes);
// }
const time = mongoose.model('time', riseSettimes);

const saveTimes = (city, state) => {
  for (var i = 0; i < 100; i++) {
    var i = mongoose.model(i, riseSettimes);
  }
  console.log(city + ' ' + state);
  axios({
    method: 'get',
    url: 'https://api.ipgeolocation.io/astronomy?apiKey=' + `${config.API}` + '&location=' + city +',%20' + state + ',%20US'
  })
    .then(function (response) {
      time.findOne({
        city: response.data.location.city,
        state: response.data.location.state,
        date: response.data.date
      }, function(err, results) {
        if (err) {
          console.log(err);
        }
        if (!results) {
          var instance = new time({
            city: response.data.location.city,
            state: response.data.location.state,
            date: response.data.date,
            moonrise: response.data.moonrise,
            moonset: response.data.moonset,
            sunrise: response.data.sunrise,
            sunset: response.data.sunset,
          }).save((err, data) => {
            if (err) {
              return console.log(err)
            } else {
              console.log('Data saved sucessfully')
            }
          });
        } else {
          console.log('The data is in the repo already!')
        }
      })
    });
};

const getTimes = (city, state) => {
  var year = new Date().getFullYear();
  var month = ("0" + (new Date().getMonth() + 1)).slice(-2);
  var day = ("0" + new Date().getDate()).slice(-2);
  var date = year + '-' + month + '-' + day;
  console.log(city)
  console.log(state)
  console.log(date)
  return time.findOne({
      'city': city,
      'state': state,
      'time': date
    });
};


module.exports.getTimes = getTimes;
module.exports.saveTimes = saveTimes;