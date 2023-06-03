const mongoose = require('mongoose');

beforeAll((done) => {
    mongoose.connection.on('error', (error) => console.error(error));
    mongoose.connection.once('open', () => {
      console.log('Połączono z bazą danych');
      done();
    });
  });
  