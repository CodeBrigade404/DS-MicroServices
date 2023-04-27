const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  //payment
  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });

  //product
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });

  //order
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.message);
  });
  //customer Service
  axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Listening on 4010');
});
