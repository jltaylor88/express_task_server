const Task = require("../models/task");

const get = async (_req, res) => {
	try {
		const result = await Task.find({});
		res.send(result);
	} catch (error) {
		res.status(500).send(error);
	}
};

const getById = async (req, res) => {
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
};

const create = async (req, res) => {
	try {
		const task = new Task(req.body);
		const result = await task.save();
		res.status(201).send(result);
	} catch (error) {
		res.status(500).send(error);
	}
};

const allowedTaskUpdates = ["description", "completed"];
const update = async (req, res) => {
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
};

const remove = async (req, res) => {
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
};

module.exports = {
	get,
	getById,
	create,
	update,
	remove,
};
