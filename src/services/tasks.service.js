const tasksDAL = require("../data/tasks.dataAccess");

const get = async () => {
	return await tasksDAL.find();
};

const getById = async id => {
	return await tasksDAL.findById(id);
};

const create = async userData => {
	return await tasksDAL.save(userData);
};

const updateById = async (id, updates) => {
	return await tasksDAL.updateById(id, updates);
};

const removeById = async id => {
	return await tasksDAL.removeById(id);
};

module.exports = {
	get,
	getById,
	create,
	updateById,
	removeById,
};
