// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/newsfeed/", function(req, res) {
    db.Post.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/characters/", function(req, res) {
    db.Character.findAll({})
    .then(function(dbCharacter){
      res.json(dbCharacter);
    });
  });

  // Get route for returning posts of a specific category
  app.get("/api/newsfeed/category/:category", function(req, res) {
    db.Post.findAll({
      where: {
        category: req.params.category
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/newsfeed/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

    app.get("/api/characters/:id", function(req, res) {
    db.Character.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbCharacter) {
        res.json(dbCharacter);
      });
  });

  // POST route for saving a new post
  app.post("/api/newsfeed", function(req, res) {
    console.log(req.body);
    db.Post.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.post("/api/characters", function(req, res) {
    console.log(req.body);
    db.Character.create({
      name: req.body.name,
      strength: req.body.strength,
      health: req.body.health
    })
      .then(function(dbCharacter) {
        res.json(dbCharacter);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/newsfeed/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.delete("/api/characters/:id", function(req, res) {
    db.Character.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbCharacter) {
        res.json(dbCharacter);
      });
  });


  // PUT route for updating posts
  app.put("/api/newsfeed", function(req, res) {
    db.Post.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
};
