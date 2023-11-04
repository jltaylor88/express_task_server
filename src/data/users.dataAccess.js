const User = require("../models/user");

const find = async query => {
	return await User.find(query || {});
};

const findById = async id => {
	return await User.findById(id);
};

const save = async userData => {
	const user = new User(userData);
	return await user.save();
};

const updateById = async (id, updates) => {
	return await User.findByIdAndUpdate(id, updates, {
		new: true,
		runValidators: true,
	});
};

const removeById = async id => {
	return await User.findByIdAndDelete(id);
};

module.exports = {
	find,
	findById,
	save,
	updateById,
	removeById,
};
