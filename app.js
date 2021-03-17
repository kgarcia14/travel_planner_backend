'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 3333;

const cors = require('cors');

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`server is running at http://${hostname}:${port}`)
});


const rootController = require('./routes/index');
const plansController = require('./routes/plans');


app.use('/', rootController);
app.use('/plans', plansController);