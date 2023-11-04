const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");

router.post("/", usersController.create);
router.get("/", usersController.get);
router.get("/:id", usersController.getById);
router.patch("/:id", usersController.update);
router.delete("/:id", usersController.remove);

module.exports = router;
