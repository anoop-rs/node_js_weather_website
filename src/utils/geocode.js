const request = require("request")
const geoCode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW5vb3AtcnZuIiwiYSI6ImNrMm43Y3Q3dDA0NWQzb29jNmJjcTk2azUifQ.o3TGh5_FXpA_S9of0BS_Ug&limit=1"
    request({
            url,
            json: true,
        },
        (error, {
            body
        } = {}) => {
            if (error) {
                callback("Unable to connect to the location services", undefined)
            } else if (body.features.length === 0) {
                callback("Unable to find the location", undefined)
            } else {
                callback(undefined, {
                    lat: body.features[0].center[1],
                    long: body.features[0].center[0],
                    place: body.features[0].place_name
                })
            }
        })
}

module.exports = geoCode