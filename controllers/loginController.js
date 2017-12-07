const db = require("../models");


// Defining methods for the booksController
module.exports = {
  login: function(req, res) {
    
    db.User
    .findOne(req.body)
    .then(user =>{

      res.json(user)
    } )
    .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate( {username:req.body.username, password:req.body.password} , req.body)
      .then(dbModel =>{console.log(dbModel); res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  }
};
