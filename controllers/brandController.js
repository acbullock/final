const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findByBrand: function(req, res) {
      db.Shoe
      .find({brand:req.params.brand})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      
  }
};
