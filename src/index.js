const express = require("express");
const User = require("./models/user");

require("./db/setup").connectToDB();

// Initialise the Express application and configure it to parse JSON in the request body
const app = express();
app.use(express.json());

// The post route for creating a new user
app.post("/users", async (req, res) => {
	try {
		const user = new User(req.body);
		const result = await user.save();
		res.status(201).send(result);
	} catch (error) {
		res.status(400).send(error);
	}
});

// The route for fetching a single user by their id
app.get("/users/:id", async (req, res) => {
	// Get the id from the request parameters
	const id = req.params.id;
	try {
		const result = await User.findById(id);
		if (!result) {
			return res.status(404).send();
		} else {
			res.send(result);
		}
	} catch (error) {
		res.status(400).send(error);
	}
});

// The get route for retrieving all users
app.get("/users", async (_req, res) => {
	try {
		const result = await User.find({});
		res.send(result);
	} catch (error) {
		res.status(400).send(error);
	}
});

// The patch route for updating a user by their id

// The delete route for deleting a user by their id

// Listen for requests on port 3000
app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
