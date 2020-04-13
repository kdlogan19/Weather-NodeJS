const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' + longitude + '&appid=e8018c9d8aa720372313922b6d39498f'
    
    request({ url, json: true }, (error, res) => {      
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (res.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                sky: res.body.weather[0].main,
                temp: res.body.main.temp,
                location: res.body.name
            })
        }
    })
}

module.exports = forecast