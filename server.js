const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const containerModel = require('./api/container.model');
const containerControllers = require('./api/container.controllers');
const app = express();

require('dotenv').config();
//const dataBaseURL = process.env.DATABASE;


const dataBaseURL =
   'mongodb+srv://carmen:pass123@recipes-q1fkv.mongodb.net/test?retryWrites=true&w=majority';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/containers', containerControllers.findAll);
app.get('/api/containers/:id', containerControllers.findById);
app.post('/api/containers', containerControllers.add);
app.put('/api/containers/:id', containerControllers.update);
app.delete('/api/containers/:id', containerControllers.delete);
app.get('/api/import', containerControllers.import);
app.get('/api/killall', containerControllers.killall);

//const PORT = process.env.PORT || 3001;
const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

mongoose
  .connect(dataBaseURL, { useNewUrlParser: true })
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
