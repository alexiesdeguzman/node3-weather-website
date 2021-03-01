const path = require('path');
const chalk = require('chalk'); 
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

//===============DEFINE  PATHS FOR EXPRESS CONFIGURATION===============================================
const pubDirectPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

//===============HANDLE BARS SETUP AND VIEWS LOCATION==================================================
app.set('view engine', 'hbs'); //to acquire hbs engine
app.set('views', viewsPath); // views path
hbs.registerPartials(partialsPath);
//===============STATIC PATH CONFIG. STATIC DIRECTORY===============================================
app.use(express.static(pubDirectPath)); // main path

////===================HOME PAGE=========================================================================================================
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lex De Guzman'
    })
})
////===================ABOUT PAGE=========================================================================================================

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Lex De Guzman'
    })
})

////===================HELP PAGE=========================================================================================================

app.get('/help', (req,res) =>{
    res.render('help', {
        helpText: 'Helpful Text',
        title: 'Help',
        name: 'Lex De Guzman'
    })
})

////===================WEATHER PAGE=========================================================================================================

app.get('/weather', (req,res) =>{
   // console.log(req.query.address);
    if(!req.query.address){
        return res.send({
             error: 'You must provide an address'
         })
     }
     geocode(req.query.address, (error, {latitude,longitude, location} = {}) =>{
         if(error){
             return res.send({error});
         }
         forecast(latitude,longitude, (error, forecastData) =>{
             if(error){
                 return res.send({ error });
             }
             res.send({
                 forecast: forecastData,
                 location,
                 address: req.query.address
             })
         })
     })
 
})
////===================QUERY PAGE=========================================================================================================
app.get('/products', (req,res) => {

    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})


////===================404 ERROR PAGE=========================================================================================================
app.get('/help/*', (req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Lex De Guzman',
        errorText: 'Help article not found.'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title: '404',
        name: 'Lex De Guzman',
        errorText: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})