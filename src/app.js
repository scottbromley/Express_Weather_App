const express = require('express');
const path = require('path');
const hbs = require('hbs');

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


const geocode = require('./utils/geocode.js');
const weatherRequest = require('./utils/weatherRequest.js')

const port = porcess.env.PORT || 3000;

const app = express()


app.set('views', viewsPath);
app.set('view engine', 'hbs');
app.use(express.static(publicDirectory));
hbs.registerPartials(partialsPath)

app.get('', (req, res)=>{
    res.render('index', {
        title: "Homepage", 
        name: "Scott Bromley"
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "About Page", 
        name: "Scott Bromley", 
        content: "Information about the page!"
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: "Help Page", 
        content: "Helpful information can be found here..."
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, data)=> {
        if(error) {
            return res.send({
                error: error,
            })
        } else {
            weatherRequest(data.latitude, data.longitude, (weatherError, weatherData) => {
                if(weatherError){
                    return res.send({
                        error: weatherError,
                    })
                } else {
                    res.send(
                        {
                            search: req.query.address,
                            address: data.location,
                            temperature: weatherData.current.temperature,
                            wind_speed: weatherData.current.wind_speed,
                        }
                    )
                }
            })
        }
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        content: "Could not find the help > data page",
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        content: null,
    })
})

app.listen(port, () => {
    console.log("The app server has started on port " + port)
})