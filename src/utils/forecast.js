const request = require("request")

const forecast = (lat, long, place, callback) => {
    const url = "https://api.darksky.net/forecast/56bd6638c2a9912fd44f344d2e00e701/" + lat + "," + long + "?units=auto"
    request({
            url,
            json: true,
        },
        (error, {
            body
        } = {}) => {
            if (error) {
                callback("Unable to connect to weather services", undefined)
            } else if (body.error) {
                callback("Unable to find the location", undefined)
            } else {
                callback(undefined, {
                    summary: body.daily.data[0].summary,
                    temp: body.currently.temperature,
                    prob: body.currently.precipProbability,
                    place,
                    visibility: body.currently.visibility,
                })
            }
        }
    )
}

module.exports = forecast