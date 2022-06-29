require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { json, urlencoded } = require('body-parser');
const ConnectRouter = require('./routes/main-router')
const app = express()

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.options('*', cors());
app.get('/', function (req, res) {
  res.json({
    messaggio: 'Link-Inim'
  }).send()
});

ConnectRouter(app);

app.listen(3000);