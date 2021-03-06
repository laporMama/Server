/* istanbul ignore next line */const env = process.env.NODE_ENV || 'development';

/* istanbul ignore next */if (env === 'development' || env === 'test') {
	require('dotenv').config({ path: process.cwd() + '/.env' });
}

const { addDailyCron, addWeeklyCron } = require('./helpers/queue');
// addDailyCron();
// addWeeklyCron();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler.js');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);
app.use(errorHandler);

module.exports = app;