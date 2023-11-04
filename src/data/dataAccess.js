class DataAccess {
	constructor(model) {
		this.model = model;
	}

	async find(query) {
		return await this.model.find(query || {});
	}

	async findById(id) {
		return await this.model.findById(id);
	}

	async save(data) {
		const m = new this.model(data);
		return await m.save();
	}

	async updateById(id, updates) {
		return await this.model.findByIdAndUpdate(id, updates, {
			new: true,
			runValidators: true,
		});
	}

	async removeById(id) {
		return await this.model.findByIdAndDelete(id);
	}
}

module.exports = DataAccess;
