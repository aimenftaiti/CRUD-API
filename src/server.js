const express = require('express');
const app = express();

// create a thing
app.post('/things', (req, res) => {
  const thing = {
    name: req.body.name
  };

  // save the thing to the db
  things.push(thing);

  res.status(201).json(thing);
});

// read all things
app.get('/things', (req, res) => {
  res.json(things);
});

// read a single thing
app.get('/things/:id', (req, res) => {
  const thing = things.find(t => t.id === parseInt(req.params.id));

  if (!thing) res.status(404).send('The thing with the given ID was not found.');
  res.json(thing);
});

// update a thing
app.put('/things/:id', (req, res) => {
  const thing = things.find(t => t.id === parseInt(req.params.id));

  if (!thing) res.status(404).send('The thing with the given ID was not found.');

  thing.name = req.body.name;
  res.json(thing);
});

// delete a thing
app.delete('/things/:id', (req, res) => {
  const thing = things.find(t => t.id === parseInt(req.params.id));

  if (!thing) res.status(404).send('The thing with the given ID was not found.');

  const index = things.indexOf(thing);
  things.splice(index, 1);

  res.send(thing);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));