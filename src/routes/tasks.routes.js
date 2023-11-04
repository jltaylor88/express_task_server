const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/tasks.controller");

router.get("/", tasksController.get);
router.get("/:id", tasksController.getById);
router.post("/", tasksController.create);
router.patch("/:id", tasksController.update);
router.delete("/:id", tasksController.remove);

module.exports = router;
