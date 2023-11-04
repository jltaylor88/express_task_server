const DataAccess = require("./dataAccess");
const Task = require("../models/task");

const tasksDataAccess = new DataAccess(Task);

module.exports = tasksDataAccess;
