const request = require('request');
const chalk = require('chalk'); 

const forecast = (latitude, longitude,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=6f161702ff871393c3d20e298f89b06c&query='+ latitude +','+ longitude +'&units=m'; 
    request({url: url, json: true},(error, {body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined);
        }else if(body.error){
            callback('Unable to find location', undefined);
        }else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The chance of rain is probably '+ body.current.precip + '% and the humidity is '+ body.current.humidity + '%.');
        }
    })
}

module.exports = forecast;
