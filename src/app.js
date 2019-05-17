// run using nodemon src/app.js -e js,hbs
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()
// Defines path for express config
const port = process.env.PORT || 3000

const PublicDirectoryPath = path.join(__dirname, '../public')
const ViewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// setting up handlebars and view location
app.set('view engine', 'hbs')
// setting the path for the hbs files in templates
app.set('views', ViewsPath)
hbs.registerPartials(partialsPath)

// sets up static directory to serve. It was removed since we are using handlebars
app.use(express.static(PublicDirectoryPath))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Surohit Tandon'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: "About me",
        name: "Surohit Tandon"
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        HelpText: "This is some helpful text...",
        title: 'Help page',
        name: 'Surohit Tandon'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must enter an address"
        })
    } 
    // settup a default object parameter for lattitide longitude and location so error can be run
    geocode(req.query.address, (error,{lattitide, longitude, location}={})=>{
        if (error){
            return res.send({error})
        } 
        forecast( lat = lattitide ,long = longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
          })
        })
        
})

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=> {
    res.render('error', {
        errorText: "Help article not found.",
        title: "Error page",
        name: "Surohit Tandon"
    })
})

app.get('*', (req,res)=> {
    res.render('error', {
        errorText: "Page not found.",
        title: "Error page",
        name: "Surohit Tandon"
    })
})

// for local
// app.list(3000, ())
app.listen(port, () => {
    console.log('Server is up on port' + port)
})