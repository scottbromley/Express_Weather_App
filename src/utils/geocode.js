const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2NvdHRicm9tbGV5MTciLCJhIjoiY2t6bnB1dmdhMDY4dTMxcW1qcWU1MHVmNCJ9.-o1qWqDGVRbJ_w-p3oeM_w&limit=1"

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback("Could not connect to the Geocoding API!", undefined)
        } else if (response.body.features.length === 0 ){
            callback("Could not find any locations!", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            })
        }
    })

}

module.exports = geocode;