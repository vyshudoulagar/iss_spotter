const request = require("request");

const fetchMyIP = (callback) => {
  const url = 'https://api.ipify.org?format=json';

  request(url, (error, response, body) => {
    if (error) callback(error, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;

    callback(null, ip); //this ip is used by next func
  });
  // use request to fetch IP address from JSON API
};

const fetchCoordsByIP = (ip, callback) => { //ip is from previous func
  const url = `http://ipwho.is/${ip}`;

  request(url, (error, response, body) => {
    if (error) callback(error, null);

    const data = JSON.parse(body);
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = data;

    callback(null, { latitude, longitude }); //these values are passed to next func
  });
};

const fetchISSFlyOverTimes = (coords, callback) => { //coords from previous func
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = (callback) => { //chains the funcs using callback hell
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
      
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      
      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }
            
        callback(null, passTimes); //final value is passed to printPassTimes in index.js
      });
    });
  });
};

  
module.exports = { nextISSTimesForMyLocation };