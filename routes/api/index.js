const router = require("express").Router();
const shoeRoutes = require("./shoes");
const brandRoutes = require("./brands");
const loginRoutes = require("./login");

// Book routes
router.use("/brands", brandRoutes);
router.use("/shoes", shoeRoutes);
router.use("/login", loginRoutes);
module.exports = router;
