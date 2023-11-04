const usersDAL = require("../data/users.dataAccess");

const get = async () => {
	return await usersDAL.find();
};

const getById = async id => {
	return await usersDAL.findById(id);
};

const create = async userData => {
	return await usersDAL.save(userData);
};

const updateById = async (id, updates) => {
	return await usersDAL.updateById(id, updates);
};

const removeById = async id => {
	return await usersDAL.removeById(id);
};

module.exports = {
	get,
	getById,
	create,
	updateById,
	removeById,
};
