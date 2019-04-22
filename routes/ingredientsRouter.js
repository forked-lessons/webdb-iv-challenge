const express = require('express');
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
const router = express.Router();
