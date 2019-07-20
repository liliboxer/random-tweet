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

  it('GET all tweets', async() => {
    const tweets = JSON.parse(JSON.stringify(await Tweet.create([
      { handle: 'maxthelion', text: 'i\'m not a cat, i\'m a lion. rawr' },
      { handle: 'maxthekitty', text: 'i\'m a kitty' },
      { handle: 'maxthecat', text: 'i guess i\'m a cat ' },
    ])));
    return request(app)
      .get('/api/v1/tweets')
      .then(res => {
        expect(res.body).toEqual(tweets);
      });
  });

  it('GET tweet by id', async() => {
    const tweet = JSON.parse(JSON.stringify(await Tweet.create(
      { handle: 'maxthekitty', text: 'i\'m a kitty' }
    )));
    return request(app)
      .get(`/api/v1/tweets/${tweet._id}`)
      .then(res => {
        expect(res.body).toEqual({ _id: expect.any(String), __v: 0, handle: 'maxthekitty', text: 'i\'m a kitty' });
      });
  });

  it('PATCH, update text only', async() => {
    const tweet = JSON.parse(JSON.stringify(await Tweet.create(
      { handle: 'maxthelion', text: 'i\'m not a cat, i\'m a lion. rawr' }
    )));
    return request(app)
      .patch(`/api/v1/tweets/${tweet._id}`)
      .send({ text: 'meow' })
      .then(res => {
        expect(res.body).toEqual({ _id: expect.any(String), __v: 0, handle: 'maxthelion', text: 'meow' });
      });
  });

  it('DELETE tweet', async() => {
    const tweet = JSON.parse(JSON.stringify(await Tweet.create(
      { handle: 'maxthelion', text: 'i\'m not a cat, i\'m a lion. rawr' }
    )));
    return request(app)
      .delete(`/api/v1/tweets/${tweet._id}`)
      .then(res => {
        expect(res.body).toEqual({ _id: expect.any(String), __v: 0, handle: 'maxthelion', text: 'i\'m not a cat, i\'m a lion. rawr' });
      });
  });
});
