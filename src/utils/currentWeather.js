const request = require('request')

const currentWeather = (latitude, longitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=f5193c7fa2c9ee5bca89af6609674e13&query=' + latitude + ',' + longitude + '&units=f'
	//console.log(chalk.magenta(url)) FOR DEBUGGING

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather services!', undefined)
		} else if (body.error) {
			callback('Unable to find location in weather services. Try another search.', undefined)
		} else {
			callback(undefined, {
				preciseLocation: body.location.name,
				region: body.location.region,
				country: body.location.country,
				observation_time: body.current.observation_time + ' UTC',
				temperature: body.current.temperature,
				weather_descriptions: body.current.weather_descriptions[0],
				wind_speed: body.current.wind_speed,
				wind_degree: body.current.wind_degree,
				pressure: body.current.pressure,
				pressureInHg: (body.current.pressure / 33.864).toFixed(2),
				precip: body.current.precip,
				humidity: body.current.humidity,
				visibility: body.current.visibility
			},
				' It is currently ' + body.current.weather_descriptions 
				+ ' and ' + body.current.temperature
				+ ' degrees out in ' + body.location.name + '.' 
				+ ' The humidity is ' + body.current.humidity + '%'
				+ ' and the current pressure is ' + body.current.pressure
				+ ' millibars, or ' + (body.current.pressure / 33.864).toFixed(2) + ' inHg.'
			)
		}
	})
}

module.exports = currentWeather