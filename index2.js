const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index'); // using it from index.js

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes); //passing the data to printPassTimes to get an elaborated data
  })
  .catch((error) => { //if there are errors
    console.log("It didn't work:", error.message);
  });