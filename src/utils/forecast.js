const request = require('request')

// forcasting using darksky
const forecast = (long, lat, callback) =>{
    const url = 'https://api.darksky.net/forecast/a86270848f6bc74af231739fae3e9de4/' + long + ',' + lat +'?units=si'
    request({url, json:true}, (error, {body}) =>{
        if (error) {
            callback('Unable to connect to weather service')
        } else if (body.error){
            callback('Unable to find location')
        } else {
            callback(undefined, body.daily.data[0].summary+
                ' It is currently '+ body.currently.temperature + 
                ' degrees outside. There is a '+ body.currently.precipProbability 
                + '% chance of rain.')
        }
    })
}

module.exports = forecast