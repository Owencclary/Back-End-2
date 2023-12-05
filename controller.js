
// Connects json
const houses = require('./db.json');

// Initializes a globalID for the number of houses
let globalID = 4

// Object containing house functions
module.exports = { 

    // Gets house data
    getHouse: (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(houses)
    },
    // Creates a house
    createHouse: (req, res) => {

        // deconstructs the req.body into address, price and imageURL
        const { address, price, imageURL } = req.body;

        // creates a new house with the deconstructed req.body
        const newHouse = {
            id: houses.length + 1,
            address,
            price,
            imageURL,
        }
    
        // Adds new house to array of houses
        houses.push(newHouse);

        // Increments globalID
        globalID++
    
        // Updates houses on the server
        res.status(200).json(houses);
    },

    // Deletes house
    deleteHouse: (req, res) => {

        // Sets the id to the request
        const { id } = req.params;

        // Sets index to the house at index of id
        let index = houses.findIndex(elem => elem.id === +req.params.id)

        // Removes house from 
        houses.splice(index, 1)

        // Decements globlID since there are less houses now
        globalID--

        // Updates server
        res.status(200).json(houses)
    },

    // Updates house prices
    updatePrices: (res, req) => {

        // Sets the input id to the req
        const { id } = req.params;
        const { type } = req.body;

        // Takes in the request and sets it to the index of the houses to find
        let index = houses.findIndex(elem => elem.id === +req.params.id)

        // Manipulates price weither the input was minus or plus
        if (type === 'minus') {
            houses[index].price -= 10000;
        } else if (type === 'plus') {
            houses[index].price += 10000;
        } else {
            // returns errors
            return res.status(400).json({ error: 'Invalid type. Use "minus" or "plus".' });
        }
        
        // returns new set of houses to the server
        res.status(200).json(houses);
    }
}