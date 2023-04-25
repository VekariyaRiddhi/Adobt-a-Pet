const express = require('express');
const pets = require('./petList');

const app = express();

const PORT = 5000;

// Root route
app.get('/', (req, res) => {
  res.send(`
    <h1>Adopt a Pet!</h1>
    <p>Browse through the links below to find your new furry friend:</p>
    <ul>
      <li><a href="/animals/dogs">Dogs</a></li>
      <li><a href="/animals/cats">Cats</a></li>
      <li><a href="/animals/rabbits">Rabbits</a></li>
    </ul>
  `);
});

// Animals route
app.get('/animals/:pet_type', (req, res) => {
  const { pet_type } = req.params;
  const petsOfType = pets[pet_type];
  const petNames = petsOfType.map(pet => pet.name);

  res.send(`
    <h1>List of ${pet_type}</h1>
    <ul>
      ${petNames.map(name => `<li><a href="/animals/${pet_type}/${petNames.indexOf(name)}">${name}</a></li>`).join('')}
    </ul>
  `);
});

// Pet profile route
app.get('/animals/:pet_type/:pet_id', (req, res) => {
  const { pet_type, pet_id } = req.params;
  const pet = pets[pet_type][pet_id];

  res.send(`
    <h1>${pet.name}</h1>
    <img src="${pet.url}" alt="${pet.name}">
    <p>${pet.description}</p>
    <ul>
    <li>Breed: ${pet.breed}</li>
    <li>Age: ${pet.age}</li>
    </ul>
  `);
});

// Start server

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

