const express = require("express");

require("./db/setup").connectToDB();
const usersRouter = require("./routes/users.routes");
const tasksRouter = require("./routes/tasks.routes");

// Initialise the Express application and configure it to parse JSON in the request body
const app = express();
app.use(express.json());

// Set up the user routes
app.use("/users", usersRouter);

// Set up the task routes
app.use("/tasks", tasksRouter);

// Listen for requests on port 3000
app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
