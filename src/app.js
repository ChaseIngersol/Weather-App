const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const currentWeather = require('./utils/currentWeather')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set ('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Chase Ingersol'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Chase Ingersol'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Chase Ingersol',
		helptext: 'Get help here.'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address){
		res.send({
			error: 'You must provide an address.'
		})
	} else{
		console.log(req.query.address)

		geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
			if (error) {
				return res.send({error})
			}
			console.log(latitude, longitude)
			console.log(location)

			currentWeather(latitude, longitude, (error, currentWeatherData, weatherMessage) => {
				if (error) {
					return res.send({error})
				}
				res.send({
					currentWeather: currentWeatherData,
					weatherMessage: weatherMessage,
					location,
					address: req.query.address
				})
			})
		})






		// res.send({
		// 	address: req.query.address,
		// 	forecast: 'Cloudy with a chance of meatballs',
		// 	location: 'Flavortown'
		// })
	}
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		res.send({
			error: 'You must provide a search term.'
		})
	} else {
		console.log(req.query.search)
		res.send({
			products: []
		})
	}	
})

app.get('/help/*', (req,res) => {
	res.render('404', {
		title: '404',
		name: 'Chase Ingersol',
		errorMsg: 'Help article not found.'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Chase Ingersol',
		errorMsg: 'Page not found.'
	})
})



//app.com
//app.com/help
//app.com/about

app.listen(port, () => {
	console.log('Server is up on port ' + port + '.')
})