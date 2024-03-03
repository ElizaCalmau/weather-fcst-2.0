const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const TripModel = require('./models/TripModel')

const app = express()

app.use(cors());
app.use(express.json())

mongoose.connect('mongodb+srv://elizabethcalmau:GR05SDBqvnAOpebx@cluster0.lficidf.mongodb.net/trips?retryWrites=true&w=majority&appName=Cluster0')

app.get('/getCities', (req, res) => {
    TripModel.find({})
    .then((trips) => {
        res.json(trips)
    })
    .catch((err) => {
        res.json(err)
    })
})

app.post('/addCity', async (req, res) => {
    const city = req.body;
    const newCity = new TripModel(city);
    await newCity.save();
    res.json(city)
})


app.listen(3001, () => {
    console.log('The server is running on port 3001')
})