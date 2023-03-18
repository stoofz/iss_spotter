//const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
//   return;
// });

// fetchCoordsByIP('8.8.8.8', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned Coordinates:', coords);
//   return;
// });

// fetchISSFlyOverTimes({ latitude: 37.3860517, longitude: -122.0838511 }, (error, array) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned data: ', array);
//   return;
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  nextPass(passTimes);
});


const nextPass = function(array) {
  for (const passTime of array) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(passTime.risetime);
    console.log(`Next pass at ${datetime} for ${passTime.duration} seconds!`);
  }
};