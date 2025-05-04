const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes'); 

const app = express();


app.use(bodyParser.json({ limit: '10mb' }));


app.use(cors());
app.use(bodyParser.json());


app.use('/api/v1', routes);

module.exports = app;
