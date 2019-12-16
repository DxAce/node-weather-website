const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoidWRvMTEiLCJhIjoiY2p4MGtjczdrMGwyczQ5cG9haXQyczk0eCJ9.WTXnr-U4bj_Jhpd173skxg&limit=1'
    
    request({ url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to location', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode