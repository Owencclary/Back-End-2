// Vatriables for the express package and path package
const express = require('express')
const path = require('path');

// Makes server
const app = express()

// activates json
app.use(express.json())
app.use(express.static(__dirname + '/static'));

// Updates the HTML file with controller functions
app.get('/', (req, res) => {
    res.sendFile('static/index.html', {root: __dirname});
})

// initializes the get Houses object with all the functions
const { getHouse, createHouse, deleteHouse, updatePrices } = require('./controller');

// When these URLs get called these functions get run and pass in id to the controller.js
app.get('/api/houses', getHouse) 
app.post('/api/houses', createHouse)
app.delete('/api/houses/:id', deleteHouse)
app.put('/api/houses/:id', updatePrices)

// Runs the server on the port
app.listen(4000, () => console.log(`Server running on port 4000`))

