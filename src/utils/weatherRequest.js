const request = require('request');


const weatherRequest = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=3489495414fa1ead4b6d3ba3d997f93e&query=" + latitude + "," + longitude + "&units=m"

    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback("Could not connect to the weather API!", undefined);
        } if(response.body.error) {
            callback("Unable to find the weather at this location!", undefined);
        } else {
            callback(undefined, response.body);
        }
    })

}

module.exports = weatherRequest;