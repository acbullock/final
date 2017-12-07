const router = require("express").Router();
const loginController = require("../../controllers/loginController");


// Matches with "/api/books/:id"

  router
  .route("/")
  .put(loginController.update)
  .post(loginController.login);
module.exports = router;
