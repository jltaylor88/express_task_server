const User = require("../models/user");

const get = async (_req, res) => {
	console.log("HERE");
	try {
		const result = await User.find({});
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
};

const getById = async (req, res) => {
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
		res.status(500).send(error);
	}
};

const create = async (req, res) => {
	try {
		const user = new User(req.body);
		const result = await user.save();
		res.status(201).send(result);
	} catch (error) {
		res.status(500).send(error);
	}
};

const allowedUserUpdates = ["name", "email", "password"];
const update = async (req, res) => {
	if (!req.body) {
		return res.status(400).send({ error: "No updates provided" });
	}

	const updates = Object.keys(req.body);
	const isValidOperation = updates.every(update =>
		allowedUserUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates" });
	}

	// Get the ID parameter from the URL
	const id = req.params.id;
	try {
		const result = await User.findByIdAndUpdate(id, req.body, {
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
};

const remove = async (req, res) => {
	// Get the ID from the URL
	const id = req.params.id;
	try {
		const result = await User.findByIdAndDelete(id);
		if (!result) {
			res.status(404).send();
		} else {
			res.send(result);
		}
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	get,
	getById,
	create,
	update,
	remove,
};
