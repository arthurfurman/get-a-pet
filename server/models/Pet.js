const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	breed: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	dateFound: {
		type: Date,
		required: true,
		default: Date.now,
	},
	age: {
		type: Number,
		required: true,
	},
	isAdopted: {
		type: Boolean,
		required: true,
		default: false,
	},
});

const Pet = mongoose.model("pet", petSchema);

module.exports = Pet;
