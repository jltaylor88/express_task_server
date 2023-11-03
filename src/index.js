const express = require("express");
const User = require("./models/user");

require("./db/setup").connectToDB();

// Initialise the Express application and configure it to parse JSON in the request body
const app = express();
app.use(express.json());

// The get route for retrieving all users
app.get("/users", async (_req, res) => {
	try {
		const result = await User.find({});
		res.send(result);
	} catch (error) {
		res.status(400).send(error);
	}
});

// Listen for requests on port 3000
app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
