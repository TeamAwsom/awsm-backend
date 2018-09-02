const request = require('superagent');
const server = require('./../../lib/server');
require('jest');

describe('Testing free-trial-request route', () => {
  beforeAll(() => {
    process.env.PORT = 3000;
    server.start();
  });
  afterAll(() => {
    server.stop();
  });

  test('Making a POST call with no body will return error', () =>
    request
      .post(':3000/api/free-trial-request')
      .send()
      .catch(res => {
        expect(res.response.text).toBe('Bad Request body');
        expect(res.status).toBe(400);
      }));
  test('Making a POST call with correct body will return correct response', () =>
    request
      .post(':3000/api/free-trial-request')
      .type('application/json')
      .send(
        `{"instrument":"piano","style": "classical","experience": "beginner","ownInstrument":true,"address1":"123 Main Street","address2":"","city":"Seattle","state":"WA","zip":98101,"time":[{"from": "2018-12-03T15:00:00.000Z","to": "2018-12-03T16::00:00.000Z"},{"from":"2018-12-07T17:00:00.000Z","to":"2018-12-07T18:00:00.000Z"}],"allergies":"none","specialNeeds": "none"}`
      )
      .then(res => {
        expect(res.status).toBe(200);
      }));
});
