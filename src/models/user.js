const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		validator: value => {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		},
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
		validator: value => {
			if (value.includes("password")) {
				throw new Error("Password cannot contain the word 'password'");
			}

			// Throw an error if the password does not include at least one number, one lowercase letter, and one uppercase letter and one special character
			// Create the regular expression
			const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/;
			// Test the password against the regular expression
			if (!regex.test(value)) {
				throw new Error(
					"Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character"
				);
			}
		},
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
