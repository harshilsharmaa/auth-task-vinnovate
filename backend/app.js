const dotenv = require('dotenv');
dotenv.config({path: './.env'})
const express = require('express');
const app = express();

const connectDB = require('./db');
connectDB();

app.use(express.json());

const userRouter = require('./routes/user.route.js');

app.use('/api', userRouter);

module.exports = app;