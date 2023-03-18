const request = require('request');


const fetchMyIP = function(callback) {
  
  const api = `https://api.ipify.org?format=json`;

  request(api, function(err, response, body) {
    if (err) {
      return callback(err, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const data = JSON.parse(body);
    return callback(null, data.ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  
  const api = `http://ipwho.is/${ip}`;

  const coords = {};

  request(api, function(err, response, body) {
    if (err) {
      return callback(err, null);
    }

    const data = JSON.parse(body);

    if (!data.success) {
      const msg = `Success ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      return callback(Error(msg), null);
    }

    coords.latitude = data.latitude;
    coords.longitude = data.longitude;
    return callback(null, coords);
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  
  const lat = coords.latitude;
  const lon = coords.longitude;

  const api = `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`;

  request(api, function(err, response, body) {
    if (err) {
      return callback(err, null);
    }

    const data = JSON.parse(body);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} for ${api}`;
      return callback(Error(msg), null);
    }

    return callback(null, data.response);
  });
};


const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, array) => {
        if (error) {
          return callback(error, null);
        }
        
        callback(error, array);

      });
    });
  });
};

//module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

module.exports = { nextISSTimesForMyLocation };