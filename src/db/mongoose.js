const mongoose = require("mongoose");

const URL = "mongodb://127.0.0.1:27017";
const dbName = "task-manager-api";

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
		min: [0, "Age must be a positive number"],
	},
});

const me = new User({
	name: "Jason",
	age: 35,
});

const Task = mongoose.model("Task", {
	description: {
		type: String,
		required: true,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const task = new Task({
	description: "Learn the Mongoose library",
	completed: false,
});

const main = async () => {
	await mongoose.connect(`${URL}/${dbName}`);
	console.log("Connected to DB");

	try {
		const result = await task.save();
		console.log(result);
	} catch (error) {
		console.log("Could not save");
		const errors = error.errors;
		for (const key in errors) {
			const element = errors[key];
			console.log(element.message);
		}
	}

	try {
		await mongoose.disconnect();
		console.log("Disconnected from DB");
	} catch (error) {
		console.log("Could not disconnect");
	}
};

main();
