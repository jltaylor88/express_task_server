const DataAccess = require("./dataAccess");
const User = require("../models/user");

const usersDataAccess = new DataAccess(User);

module.exports = usersDataAccess;
