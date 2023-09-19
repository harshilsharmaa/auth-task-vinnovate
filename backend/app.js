const dotenv = require('dotenv');
dotenv.config({path: './.env'})
const express = require('express');
const app = express();
const cors = require('cors');
const cookie_parser = require('cookie-parser');

const connectDB = require('./db');
connectDB();

app.use(express.json());
app.use(cookie_parser());
app.use(cors({origin:"*", credentials:true}))

const userRouter = require('./routes/user.route.js');

app.use('/api', userRouter);

module.exports = app;