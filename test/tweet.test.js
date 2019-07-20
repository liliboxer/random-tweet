require('dotenv').config();
const request = require('supertest');
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const app = require('../lib/app');

const Tweet = require('../lib/models/Tweet');

describe('tweet routes', () => {
  
});