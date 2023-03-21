/* Import of express and the fs module of node */
const fs = require('fs');
const express = require('express');

/* Creation of an Express instance using the express() function */
const app = express();

/* Setting up the port for the listener to be active on */
const PORT = process.env.PORT || 8080;

/* Setting up the express.json() middleware for use in the API */
app.use(express.json());

/* An array of cars to simulate a database for the purposes of this exercise */
const carsArray = [
    {
        id: '1',
        make: 'Mercedes-Benz',
        model: 'A-class',
        seats: '5'
    },
    {
        id: '2',
        make: 'Land Rover',
        model: 'Defender 90',
        seats: '6'
    },
    {
        id: '3',
        make: 'Renault',
        model: 'Captur',
        seats: '5'
    },
    {
        id: '4',
        make: 'Porsche',
        model: 'Almeira',
        seats: '5'
    }
];

/* Helper function to delete a car from the array after a delete request */
const deleteCar = (carId) => {
   carsArray.forEach((car, index) => {
       if (car.id === carId) {
           carsArray.splice(index, 1);
       }
   })
}

/* Helper function to update the model or seat number on specific cars ids */
const updateDetails = (carIdToUpdate, propertyObjectToUpdate) => {

    for (const car of carsArray) {
        if (car.id === carIdToUpdate) {
            for (const propertyName in propertyObjectToUpdate[0]) {
                car[propertyName] = propertyObjectToUpdate[0][propertyName]            }
        }
    }
}

/* GET request to send back an array of the cars upon connecting to the endpoint */
app.get('/api', (req, res) => {
    res.send(carsArray);
})

/* POST request to add a car to the array from the JSON data in the body of the request */
app.post('/api', (req, res) => {
    const car = req.body
    carsArray.push(car[0]);
    console.log(carsArray);
    res.send('Car added to cars array');
})

/* DELETE request to delete car from array based on its id number from the url */
app.delete('/api/:id', (req, res) => {
    const idToDelete = req.params.id;
    deleteCar(idToDelete)
    res.send(`Car id ${idToDelete} was deleted.`);
})

/* PUT request to update any details on any given car identified by its id. */
app.put('/api/:id', (req, res) => {
    const carIdToUpdate = req.params.id;
    const propertyObjectToUpdate = req.body;
    updateDetails(carIdToUpdate, propertyObjectToUpdate)
    res.send(`Car id ${carIdToUpdate} was updated`)
})

/* Setting up a listener on the active port */
app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`);
})
