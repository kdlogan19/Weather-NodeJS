const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'KD'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'KD'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Please open an issue on github repo, if you need help with something.',
        title: 'Help',
        name: 'KD'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send(req.query.address + 'Address is not reachable')
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) =>{
        if(error) {
            return res.send({
                error: 'Not accessible'
            })
        }
        else{
            forecast(latitude,longitude, (error, {sky,temp, humidity}) => {
                // console.log("result in app" + longitude + "   " + latitude + " " + location + sky + 'end')
                return res.send({
                    sky, temp, location, humidity            
                })
            })  
        }
    })
    return
    res.send({
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})