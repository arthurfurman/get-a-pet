// mongo db
const mongoose = require("mongoose");
const User = require("./models/User");

const DB_NAME = "get-a-pet";
const MONGO_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;

module.exports = () =>
	mongoose
		.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(console.log(`MongoDB connected ${MONGO_URI}`))
		.then(User.exists({ isAdmin: true }).then((result) => {
			if (!result) {
				new User({
					email: "admin@admin.com",
					firstName: "admin",
					lastName: "admin",
					address: "admin",
					password: "admin",
					isAdmin: true,
				}).save();
			}
		}))
		.catch((err) => {
			console.error("Shutting down due to fatal db error during connect!", err);
		});
