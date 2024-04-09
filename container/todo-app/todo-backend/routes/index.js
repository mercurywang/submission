const express = require('express');
const router = express.Router();

const configs = require('../util/config')

const Todo = require("../mongo/models/Todo")

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET todo by id */
router.get("/todos/:id", async(req, res)=>{
  const todo = await Todo.findById(req.params.id)
  if (todo) {
    res.json(todo)
  } else {
    res.status(404).end()
  }
})

/* PUT: update todo by id */
router.put("/todos/:id", async(req, res)=>{
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
  res.status(201).json(updated)
})

module.exports = router;
