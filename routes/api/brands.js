const router = require("express").Router();
const brandController = require("../../controllers/brandController");


// Matches with "/api/books/:id"

  router
  .route("/:brand")
  .get(brandController.findByBrand);
module.exports = router;
