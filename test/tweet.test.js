require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');

const Tweet = require('../lib/models/Tweet');

describe('tweet routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('POST a tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({ handle: 'maxthecat', text: 'i\'m a cat, meow!' })
      .then(res => {
        expect(res.body).toEqual({ _id: expect.any(String), __v: 0, handle: 'maxthecat', text: 'i\'m a cat, meow!' });
      });
  });

});
