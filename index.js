const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/recipe_book.db3'
  },
  useNullAsDefault: true, // needed for sqlite
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seeds'
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done);
    }
  }
};

const db = knex(knexConfig);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(201).json('API ONLINE');
});

server.get('/api/dishes', async (req, res) => {
  // get the dishes from the database
  try {
    const dishes = await db('dishes'); // all the records from the table
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/dishes/:id', async (req, res) => {
  // get the recipes from the database
  try {
    const recipe = await db('recipes')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/dishes/:id/ingredients', async (req, res) => {
  // get the recipes from the database
  try {
    const recipe = await db('recipes')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
