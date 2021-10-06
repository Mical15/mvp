const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 2828;
const database = require(__dirname + '/../database/database.js')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: true }));

app.post('/get', async (req, res) => {
  let thing = await database.getTimes(req.body.city, req.body.state)
  .then((results) => {
    console.log('get time ' + results);
    res.send(results);
  })
  .catch(function (error) {
    console.log(error);
  });
});

app.post('/', (req, res) => {
  console.log('POST request sucessful ' + req.body.city);
  database.saveTimes(req.body.city, req.body.state)
  res.end()
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
})