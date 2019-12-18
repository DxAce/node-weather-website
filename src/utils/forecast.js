const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c670a09ea5e6244cbb34694b3559a92d/' + latitude + ',' + longitude + '?units=si&lang=ro'
    request ({url, json:true}, (error, {body}) => {
        if (error) {
            callback('unable to connect', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' it is currently ' + body.currently.temperature + ' degrees out. With the high off ' + body.daily.data[0].temperatureHigh + ' and low ' + body.daily.data[0].temperatureLow + ' degrees. there is a ' + body.currently.precipProbability + '% chance of rain.')
           
        }
    })
}

module.exports = forecast