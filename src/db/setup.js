const mongoose = require("mongoose");

const URL = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

const connectToDB = async () => {
	await mongoose.connect(`${URL}/${dbName}`);
	console.log("Connected to DB");
};

const disconnectFromDB = async () => {
	await mongoose.disconnect();
	console.log("Disconnected from DB");
};

module.exports = {
	connectToDB,
	disconnectFromDB,
};
