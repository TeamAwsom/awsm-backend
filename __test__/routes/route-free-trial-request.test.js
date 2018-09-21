const request = require('superagent');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
require('dotenv').config({ path: `${__dirname}/../test.env` });
const server = require('./../../lib/server');
const sample1 = require('./../sample/samplePost.json');
require('jest');

describe('Testing free-trial-request route', () => {
  beforeAll(() =>
    server.start().then(tests => {
      console.log('Server has started in the tests');
      return tests;
    }));
  afterAll(() =>
    server
      .stop()
      .then(() => mongoose.disconnect())
      .catch(err => console.error(err)));

  test('Making a POST call with correct body will return correct response', () =>
    request
      .post(':5000/api/free-trial-request')
      .type('application/json')
      .send(sample1)
      .then(res => {
        expect(res.status).toBe(200);
      }));

  test('Making a POST call with no body will return error', () =>
    request
      .post(':5000/api/free-trial-request')
      .send({})
      .catch(res => {
        expect(res.response.text).toBe(
          'Bad Request: Request must include body'
        );
        expect(res.status).toBe(400);
      }));
});
