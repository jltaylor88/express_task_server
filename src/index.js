const express = require("express");
const User = require("./models/user");
const Task = require("./models/task");

require("./db/setup").connectToDB();
const usersRouter = require("./routes/users.routes");

// Initialise the Express application and configure it to parse JSON in the request body
const app = express();
app.use(express.json());

// Set up the user routes
app.use("/users", usersRouter);

// TASKS
// The post route for creating a new task
app.post("/tasks", async (req, res) => {
	try {
		const task = new Task(req.body);
		const result = await task.save();
		res.status(201).send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

// The get route for retrieving all tasks
app.get("/tasks", async (_req, res) => {
	try {
		const result = await Task.find({});
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
});

// The get route for retrieving a single task by its id
app.get("/tasks/:id", async (req, res) => {
	// Get the id from the request parameters
	const id = req.params.id;
	try {
		const result = await Task.findById(id);
		if (!result) {
			res.status(404).send();
		} else {
			res.send(result);
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

const allowedTaskUpdates = ["description", "completed"];
// The patch route for updating a task by its id
app.patch("/tasks/:id", async (req, res) => {
	if (!req.body) {
		return res.status(400).send({ error: "No updates provided" });
	}

	const updates = Object.keys(req.body);
	const isValidOperation = updates.every(update =>
		allowedTaskUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates" });
	}

	// Get the ID from the request parameters
	const id = req.params.id;
	try {
		const result = await Task.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!result) {
			res.status(404).send();
		} else {
			res.send(result);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

// The delete route for deleting a task bu its ID
app.delete("/tasks/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const result = await Task.findByIdAndDelete(id);
		if (!result) {
			res.status(404).send();
		} else {
			res.send(result);
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

// Listen for requests on port 3000
app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
