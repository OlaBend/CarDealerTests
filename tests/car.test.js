const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const car = require('../models/car');
const router = require('../routes/cars');
const server = require('../server'); 


beforeEach(() => {
  jest.clearAllMocks(); 
});

// Testowanie endpointu GET '/'
describe('GET /cars', () => {
  it('should return all cars', async () => {
    const carData = [{ marka: 'Toyota', cena: 10000, rok_produkcji: 2010 }];
    car.find = jest.fn().mockResolvedValue(carData);

    const response = await request(app).get('/cars');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(carData);
    expect(car.find).toHaveBeenCalledTimes(1);
  });

  it('should return 404 with error message if an error occurs', async () => {
    car.find = jest.fn().mockRejectedValue({ wiadomosc: 'Błąd' });

    const response = await request(app).get('/cars');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ wiadomosc: 'Błąd' });
    expect(car.find).toHaveBeenCalledTimes(1);
  });
});

// Testowanie endpointu GET '/:id'
describe('GET /cars/:id', () => {
  it('should return the car with the specified id', async () => {
    const carData = { marka: 'Toyota', cena: 10000, rok_produkcji: 2010 };
    car.findById = jest.fn().mockResolvedValue(carData);

    const response = await request(app).get('/cars/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(carData);
    expect(car.findById).toHaveBeenCalledTimes(1);
    expect(car.findById).toHaveBeenCalledWith('1');
  });

  it('should return 404 with error message if car is not found', async () => {
    car.findById = jest.fn().mockResolvedValue(null);

    const response = await request(app).get('/cars/1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ wiadomosc: 'Pojawił się błąd' });
    expect(car.findById).toHaveBeenCalledTimes(1);
    expect(car.findById).toHaveBeenCalledWith('1');
  });

  it('should return 404 with error message if an error occurs', async () => {
    car.findById = jest.fn().mockRejectedValue({ wiadomosc: 'Błąd' });

    const response = await request(app).get('/cars/1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ wiadomosc: 'Błąd' });
    expect(car.findById).toHaveBeenCalledTimes(1);
    expect(car.findById).toHaveBeenCalledWith('1');
  });
});

// Testowanie endpointu POST '/'
describe('POST /cars', () => {
  it('should create a new car', async () => {
    const carData = { marka: 'Toyota', cena: 10000, rok_produkcji: 2010 };
    const savedCar = { _id: '1', ...carData };
    car.prototype.save = jest.fn().mockResolvedValue(savedCar);

    const response = await request(app)
      .post('/cars')
      .send(carData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(savedCar);
    expect(car.prototype.save).toHaveBeenCalledTimes(1);
    expect(car.prototype.save).toHaveBeenCalledWith();
  });

  it('should return 404 with error message if an error occurs', async () => {
    const carData = { marka: 'Toyota', cena: 10000, rok_produkcji: 2010 };
    car.prototype.save = jest.fn().mockRejectedValue({ wiadomosc: 'Błąd' });

    const response = await request(app)
      .post('/cars')
      .send(carData);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ wiadomosc: 'Błąd' });
    expect(car.prototype.save).toHaveBeenCalledTimes(1);
    expect(car.prototype.save).toHaveBeenCalledWith();
  });
});

// Testowanie endpointu PATCH '/:id'
describe('PATCH /cars/:id', () => {
  it('should update the car with the specified id', async () => {
    const carData = { marka: 'Toyota', cena: 10000, rok_produkcji: 2010 };
    const updatedCar = { _id: '1', ...carData };
    const reqBody = { marka: 'Honda' };
    car.prototype.save = jest.fn().mockResolvedValue(updatedCar);

    const response = await request(app)
      .patch('/cars/1')
      .send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedCar);
    expect(car.prototype.save).toHaveBeenCalledTimes(1);
    expect(car.prototype.save).toHaveBeenCalledWith();
    expect(res.car.marka).toBe('Honda');
    expect(res.car.cena).toBe(10000);
    expect(res.car.rok_produkcji).toBe(2010);
  });

  it('should return 404 with error message if an error occurs', async () => {
    const reqBody = { marka: 'Honda' };
    car.prototype.save = jest.fn().mockRejectedValue({ wiadomosc: 'Błąd' });

    const response = await request(app)
      .patch('/cars/1')
      .send(reqBody);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ wiadomosc: 'Błąd' });
    expect(car.prototype.save).toHaveBeenCalledTimes(1);
    expect(car.prototype.save).toHaveBeenCalledWith();
  });
});

// Testowanie endpointu DELETE '/:id'
describe('DELETE /cars/:id', () => {
  it('should delete the car with the specified id', async () => {
    const carData = { marka: 'Toyota', cena: 10000, rok_produkcji: 2010 };
    const removedCar = { _id: '1', ...carData };
    car.prototype.remove = jest.fn().mockResolvedValue(removedCar);

    const response = await request(app).delete('/cars/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(removedCar);
    expect(car.prototype.remove).toHaveBeenCalledTimes(1);
    expect(car.prototype.remove).toHaveBeenCalledWith();
  });

  it('should return 404 with error message if an error occurs', async () => {
    car.prototype.remove = jest.fn().mockRejectedValue({ wiadomosc: 'Błąd' });

    const response = await request(app).delete('/cars/1');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ wiadomosc: 'Błąd' });
    expect(car.prototype.remove).toHaveBeenCalledTimes(1);
    expect(car.prototype.remove).toHaveBeenCalledWith();
  });
});
