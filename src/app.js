const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  //TODO
  //Validate URL
  //Validate if "techs" is an array

  const repo = {id: uuid(), title, url, techs, likes: 0};

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id }  = request.params;
  const { title, url, techs } = request.body;
  
  //TODO  
  //Test for valid repository identifier(uuid)
  //Validate URL
  //Validate if "techs" is an array

  const repoIndex = repositories.findIndex( repo => repo.id === id);

  if( repoIndex < 0 ) {
    return response.status(400).json( {error: "Repository not found"});
  }

  const repo = {
    id: repositories[repoIndex].id, 
    title, 
    url, 
    techs,
    likes: repositories[repoIndex].likes
  }

  repositories[repoIndex] = repo;

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  //TODO    
  //Test for valid repository identifier(uuid)

  const repoIndex = repositories.findIndex( repo => repo.id === id);

  if( repoIndex < 0 ) {
    return response.status(400).json( {error: "Repository not found"});
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  //TODO    
  //Test for valid repository identifier(uuid)

  const repoIndex = repositories.findIndex( repo => repo.id === id);

  if( repoIndex < 0 ) {
    return response.status(400).json( {error: "Repository not found"});
  }

  repositories[repoIndex].likes += 1;

  return response.json(repositories[repoIndex]);

});

module.exports = app;
