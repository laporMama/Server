const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	require('dotenv').config({ path: process.cwd() + '/.env' });
} else if (env === 'test') {
	require('dotenv').config({ path: process.cwd() + '/.env.test' });
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const router = require('./routes');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));