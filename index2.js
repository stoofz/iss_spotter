// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss_promised");
const { nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(function(body) {
//     console.log(body);
//   });

nextISSTimesForMyLocation()
  .then(function(passTimes) {
    nextPass(passTimes);
  })
  .catch(function(error) {
    console.log("It didn't work: ", error.message);
  });


const nextPass = function(array) {
  for (const passTime of array) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passTime.risetime);
    console.log(`Next pass at ${datetime} for ${passTime.duration} seconds!`);
  }
};