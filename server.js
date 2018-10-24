const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
var now = new Date().toString()
var log = `${now}  ${req.method} ${req.url}`
console.log(log);   
fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
        console.log('Unable to append the server.log');
    }
});

next();
});

// app.use((req,res,next) =>{̥
//     res.render('maintenance.hbs')
// });
app.use(express.static(__dirname  + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>{
return text.toUpperCase();
});


app.get('/', (req , res ) => {
res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the WielandSolutions',
    currentYear: new Date().getFullYear()
});
});

app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
});
app.get('/bad',(req,res) =>{
   res.render('bad.hbs',{
errorMessage: 'page not found'
   });
    });
app.get('/help',(req,res)=>{
    res.render('help.hbs',{
        pageTitle: 'May I Help You',
        errorMessage: 'errorMessage'
    });
});

app.listen((3000), () => {
console.log('server started at port: 3000');
});
