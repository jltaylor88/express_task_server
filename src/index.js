const { connectToDB } = require("./db/setup");

const main = async () => {
	await connectToDB();
};

main();
