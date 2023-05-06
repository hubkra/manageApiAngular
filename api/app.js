const express = require("express");
const app = express();
app.use(express.json());
const { mongoose } = require("./db/mongoose");

// Load in the mongoose models
const { List, Task } = require("./db/models");

/* ROUTE HANDLERS */


// CORS OPTIONS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  


/* LIST ROUTES */

/**
 * GET /lists
 * Purpose: Get all list items
 */
app.get("/lists", (req, res) => {
  List.find({})
    .then((lists) => {
      res.send(lists);
    })
    .catch((e) => {
      res.send(e);
    });
});

/**
 * POST /lists
 * Purpose: Create a list
 */
app.post("/lists", (req, res) => {
  console.log(req.body);
  let title = req.body.title;

  if (!title) {
    return res.status(400).send("Title is required");
  }

  let newList = new List({
    title,
  });

  newList
    .save()
    .then((listDoc) => {
      res.set("Content-Type", "application/json");
      res.send(listDoc);
    })
    .catch((e) => {
      console.log("There is an error creating");
      console.log(e);
      res.status(400).send(e);
    });
});

/**
 * PATCH /lists/:id
 * Purpose: Update a specified list
 */
app.patch("/lists/:id", (req, res) => {
  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.send({message:'Project name updated successfully'})
  });
});

/**
 * DELETE /lists/:id
 * Purpose: Delete a list
 */
app.delete("/lists/:id", (req, res) => {
  List.findOneAndRemove({
    _id: req.params.id,
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

/**
 * GET /lists/:listID/tasks
 * Purpose: Get all task in specified list
 */
app.get("/lists/:listId/tasks", (req, res) => {
  Task.find({
    _listId: req.params.listId,
  }).then((tasks) => {
    res.send(tasks);
  });
});


/**
 * GET /lists/:listId/tasks/:taskID
 * Purpose: Get a one task in specified list
 */
app.get("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOne({
    _id: req.params.taskID,
    _listId: req.params.listId,
  }).then((task) => {
    res.send(task);
  });
});

/**
 * POST/lists/:listId/tasks
 * Purpose: Post  a new  task in specified list
 */

app.post("/lists/:listId/tasks", (req, res) => {
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId,
  });
  newTask.save().then((newTaskDoc) => {
    res.send(newTaskDoc);
  });
})

/**
 * PATCH lists/:listId/tasks/:tasksId
 * Purpose: Update a task in specified list
 */
app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      _listId: req.params.listId,
    },
    {
      $set: req.body,
    }
  ).then(() => {
    res.send({message: 'Task updated successfully'});
  });
});

/**
 * DELETE lists/:listId/tasks/:tasksId
 * Purpose: DELETE a task in specified list
 */
app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOneAndRemove({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((removedTaskDoc) => {
    res.send(removedTaskDoc);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
