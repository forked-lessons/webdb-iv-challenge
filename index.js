const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dishesRouter = require('./routes/dishesRouter');
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

const port = process.env.PORT || 5000;

server.use('/api/dishes', dishesRouter);

server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
