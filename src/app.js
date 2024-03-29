const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//define paths for express comfig
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join (__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
//setup static directory to serve
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Udo Joiart'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Me'
    })
})

app.get('/help', (rew, res) => {
    res.render('help', {
        helpText: 'this is some helpful text.',
        title: 'Help',
        name: 'Udo'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
             error: 'Provide an address'
         })
     } 
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
        
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
     })
    })
    })
     })




app.get('/products', (req, res) => {
    if(!req.query.search) {
       return res.send({
            error: 'Provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: '404 Help',
        name: 'Udo Joiart',
        errorMessage: 'Help page not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: "udo Joiart",
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})
