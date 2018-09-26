const request = require('superagent');
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

require('dotenv').config({ path: `${__dirname}/../test.env` });

const server = require('./../../lib/server');
const Student = require('./../../schemas/student');
const sample1 = require('./../sample/samplePost.json');
const sample2 = require('./../sample/samplePostMissingAddress');
const sample3 = require('./../sample/samplePostMissingHasIntrument.json');
const sample4 = require('./../sample/samplePostMissingAvailability.json');
require('jest');

describe('Testing free-trial-request route', () => {
  const testIdsArray = [];
  const { PORT } = process.env;
  beforeAll(() => {
    return server.start().then(tests => {
      console.log('Server has started in the tests');
      return tests;
    });
  });
  afterAll(() => {
    testIdsArray.map(id => {
      return Student.findOneAndDelete({ _id: id }).catch(err => {
        return console.error(err);
      });
    });
    return server
      .stop()
      .then(() => {
        return mongoose.disconnect();
      })
      .catch(err => {
        return console.error(err);
      });
  });

  test('Making a POST call with no body will return error', () => {
    return request
      .post(`:${PORT}/api/free-trial-request`)
      .send({})
      .catch(res => {
        expect(res.response.text).toBe(
          'Bad Request: Request must include body'
        );
        expect(res.status).toBe(400);
      });
  });

  test('Making a POST call with correct body will return correct response', () => {
    return request
      .post(`:${PORT}/api/free-trial-request`)
      .type('application/json')
      .send(sample1)
      .then(res => {
        testIdsArray.push(res.body._id);
        return res;
      })
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  test('Making a POST call with body missing required property, addressOne', () => {
    return request
      .post(`:${PORT}/api/free-trial-request`)
      .type('application/json')
      .send(sample2)
      .catch(res => {
        expect(res.response.text).toBe(
          'Bad Request: Request body missing required properties'
        );
        expect(res.status).toBe(400);
      });
  });

  test('Making a POST call with body missing required property, hasInstrument', () => {
    return request
      .post(`:${PORT}/api/free-trial-request`)
      .type('application/json')
      .send(sample3)
      .catch(res => {
        expect(res.response.text).toBe(
          'Bad Request: Request body missing required properties'
        );
        expect(res.status).toBe(400);
      });
  });

  test('Making a POST call with body missing required property, availability', () => {
    return request
      .post(`:${PORT}/api/free-trial-request`)
      .type('application/json')
      .send(sample4)
      .catch(res => {
        expect(res.response.text).toBe(
          'Bad Request: Request body missing required properties'
        );
        expect(res.status).toBe(400);
      });
  });
});
