// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   fetchCoordsByIP(ip, (error, coords) => {
//     if (error) {
//       console.log('It did not work!', error);
//       return;
//     }

//     fetchISSFlyOverTimes(coords, (error, passTimes) => {
//       if (error) {
//         console.log("It didn't work!", error);
//         return;
//       }
//       console.log("It worked! Returned flyover times:", passTimes);
//     });
//   });
// });

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = (passTimes) => {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});