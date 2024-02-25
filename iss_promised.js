const request = require('request-promise-native');

const fetchMyIP = () => { //using request promise on the link to get the data
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const parsedIP = JSON.parse(body).ip; //parsing the data before using it
  return request(`http://ipwho.is/${parsedIP}`);
};

const fetchISSFlyOverTimes = (data) => {
  const { latitude, longitude } = JSON.parse(data); //parsing and taking lat and long values
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => { //chains the other funcs using promise
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      return JSON.parse(data).response; //final data which is sent to printPassTimes in index2
    });
};

module.exports = { nextISSTimesForMyLocation };