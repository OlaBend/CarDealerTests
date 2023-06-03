const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('dotenv').config()
const carRoutes = require('./routes/cars');
require('./db');

app.use(bodyParser.json());

// Główna ścieżka 
app.use('/cars', carRoutes);

// Obsługa błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Wystąpił błąd serwera' });
});

mongoose.connect('mongodb+srv://student:smerfy13@cluster0.qg5uvqn.mongodb.net/')

app.use(express.json())

const router = require('./routes/cars')
app.use('/car', router)

app.listen(5000,() => console.log('Serwer pracuje na porcie 5000'))
