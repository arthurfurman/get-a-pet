const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const initializePassport = require("./passport-config");

const port = 3001;

let usersCollection;
let petsCollection;
MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, (err, client) => {
	usersCollection = client.db("get-a-pet").collection("users");
	petsCollection = client.db("get-a-pet").collection("pets");
	console.log("Connected successfully to database");
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(
	session({
		secret: "my-super-secret-key",
		resave: false,
		saveUninitialized: true,
		cookie: {},
	})
);

const getUserByEmail = async (email) => {
	return await usersCollection.findOne({ email: `${email}` });
};

const getUserById =  (id) => {
	// return await usersCollection.findOne({ _id: `${id}` });
  return {username: "hi"}
};

initializePassport(passport, getUserByEmail, getUserById);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
	res.send("HELLLOOOOOOOOOOOOO");
});

app.post(
	"/login",
	passport.authenticate("local"),
	(req, res) => res.json({ pets: req.user.pets, firstName: req.user.firstName })
);

// app.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	const password = req.body.password;
// 	usersCollection.find({ email: `${email}` }).toArray((err, result) => {
// 		if (result.length === 0) {
// 			// if no such user - BAD REQUEST
// 			res.status(400);
// 			res.send("Sorry, but there is no such user..");
// 		} else {
// 			if (password !== result[0].password) {
// 				res.status(401);
// 				res.send("Incorrect password");
// 			} else {
// 				// if the password match - send the 'user' object
// 				delete result[0]["password"];
// 				delete result[0]["_id"];
// 				res.json(result[0]);
// 			}
// 		}
// 	});
// });

app.post("/register", async (req, res) => {
	try {
		const email = req.body.email;
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const address = req.body.address;
		const password = req.body.password;
		usersCollection.find({ email: `${email}` }).toArray((err, result) => {
			if (result.length !== 0) {
				res.status(409);
				res.send("user already exists");
			} else {
				try {
					usersCollection.insertOne({
						email: `${email}`,
						firstName: `${firstName}`,
						lastName: `${lastName}`,
						address: `${address}`,
						password: `${password}`,
						isAdmin: false,
					});
					res.send("user added successfully");
				} catch {
					res.status(500);
					res.send("Failed to add user");
				}
			}
		});
	} catch {
		res.status(500);
		res.send("General failure");
	}
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
