const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4")

// const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

function validateRespositoryId(req, res, next) {
  const { id } = req.params;

  if(!isUuid(id)) {
    return res.status(400).json({ error: 'Invalid Id!' });
  }

  return next();
}

const repositories = [];

app.use('/repositories/:id', validateRespositoryId);

app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return res.json(repository);
});

app.put("/repositories/:id", (req, res) => {
  // TODO
});

app.delete("/repositories/:id", (req, res) => {
  // TODO
});

app.post("/repositories/:id/like", (req, res) => {
  // TODO
});

module.exports = app;
