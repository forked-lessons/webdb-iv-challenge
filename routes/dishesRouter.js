const express = require('express');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/recipe_book.db3'
  },
  useNullAsDefault: true,
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

// GET ALL DISHES

router.get('/', async (req, res) => {
  try {
    const dishes = await db.getDishes('dishes');
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL RECIPES

router.get('/recipes', async (req, res) => {
  try {
    const recipes = await db.getRecipes('recipes');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET DISH BY ID

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const dish = await db.getDish(id);
    res.status(200).json(dish);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET RECIPE BY DISH ID

router.get('/:id/recipes', async (req, res) => {
  try {
    const id = req.params.id;

    const recipe = await db.getRecipe(id);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET INGREDIENTS FOR A RECIPE
router.get('/:id/recipes/:recipeId', async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await db.getRecipe(id);
    const recipeId = req.params.recipeId;
    const ingredients = await db.getIngredients(recipeId);
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json(error);
  }
});
//ADD A DISH

router.post('/', async (req, res) => {
  try {
    const newDish = req.body;
    db.addDish(newDish);
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD A RECIPE

router.post('/:id/recipes', async (req, res) => {
  try {
    const id = req.params.id;
    const newRecipe = req.body;
    db.addRecipe(newRecipe);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
