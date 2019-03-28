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

const db = require('../data/db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const dishes = await db.getDishes('dishes');
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  // get the recipes from the database
  try {
    const id = req.params.id;
    const dish = await db.getDish(id);
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post('/', async (req, res) => {
  try {
    const newDish = req.body;
    db.addDish(newDish);
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
