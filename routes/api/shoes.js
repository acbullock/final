const router = require("express").Router();
const shoeController = require("../../controllers/shoeController");

// Matches with "/api/books"
router.route("/")
  .get(shoeController.findAll)
  .post(shoeController.create)
  .put(shoeController.update);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(shoeController.findById)
  .put(shoeController.update)
  .delete(shoeController.remove);

module.exports = router;
