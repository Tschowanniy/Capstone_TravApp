// Setup empty JS object to act as endpoint for all routes
projectData = {};
cityPicture = {};

// Require Express to run server and routes
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



// Start up an instance of app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));
dotenv.config();

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})


// Setting uo the API to pixabay:
// Pixabay API example https://pixabay.com/api/?key=29415427-e8aa82c582805c855e84f7435&image_type=photo&category=places&q=Munich
const pixaBaseUrl = 'https://pixabay.com/api/?key='; 
const pixaUrlAdd = '&image_type=photo&category=places&q=';

let cityEntered = [];
app.post('/pixaapi', async (req, res) => {
    cityEntered = req.body.pixCity;
    const pixaApiURL = pixaBaseUrl + process.env.API_KEY_PIXABAY + pixaUrlAdd + cityEntered;
    const fetchedFromAPI = await fetch(pixaApiURL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data),
        res.send(data)
    })
    }    
)

// Setting uo the API to pixabay:
// Pixabay API example http://api.geonames.org/searchJSON?q=London&maxRows=1&username=tschowanniy
const geoNamesBaseUrl = 'http://api.geonames.org/searchJSON?q='; 
const geoNamesUrlAdd = '&maxRows=1&username=';

let geocity= [];
app.post('/geoapi', async (req, res) => {
    geocity = req.body.latLong;
    const geoNameApiURL = geoNamesBaseUrl + geocity + geoNamesUrlAdd + process.env.API_KEY_GEONAMES;
    console.log(geoNameApiURL);
    const fetchedFromAPI = await fetch(geoNameApiURL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data),
        res.send(data)
    })
    }    
)

// Setting uo the API to pixabay:
// Pixabay API example https://api.weatherbit.io/v2.0/normals?lat=35.5&lon=-75.5&start_day=02-02&end_day=02-04&tp=daily&key=930daa1d702842e0a2d9cd221bdcdce5
const weatherBitBaseUrl = 'https://api.weatherbit.io/v2.0/normals?lat='; 
const weatherBitUrlAdd = '&tp=daily&key=';

//let weatherdata= [];
app.post('/weatherapi', async (req, res) => {
    //weatherdata = [req.body.lat, req.body.lng, req.body.from, req.body.to ];
    const weatherBitApiURL = weatherBitBaseUrl + req.body.lat +'&lon='+ req.body.lng + '&start_day=' + req.body.from + '&end_day='  +  req.body.to + weatherBitUrlAdd + process.env.API_KEY_WEATHERBIT;
    console.log(weatherBitApiURL);
    const fetchedFromAPI = await fetch(weatherBitApiURL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data),
        res.send(data)
    })
    }    
)

// Setup Server -- as also done in: Node & Express Environment → 6. Creating a Local Server I
const port = 3000;
const server = app.listen(port, () => {
    console.log('server is up and running'),
        console.log(`running on localhost: ${port}`)
});


