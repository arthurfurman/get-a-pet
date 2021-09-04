const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./passport-config");
const path = require("path");
const fs = require("fs");

const connectToMongo = require("./db");
connectToMongo();

const User = require("./models/User");
const Pet = require("./models/Pet");

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	session({
		secret: "my-super-secret-key",
		resave: false,
		saveUninitialized: true,
		cookie: {},
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/login", passport.authenticate("local"), (req, res) => {
	const { password, _id, __v, ...response } = req.user.toObject();
	res.json(response);
});

app.post("/register", (req, res) => {
	try {
		const { email, firstName, lastName, address, password } = req.body;
		User.findOne({ email: `${email}` }).then((result) => {
			if (result) {
				res.status(409);
				res.send("user already exists");
			} else {
				new User({
					email: `${email}`,
					firstName: `${firstName}`,
					lastName: `${lastName}`,
					address: `${address}`,
					password: `${password}`,
					isAdmin: false,
				})
					.save()
					.then((user) => res.json(user))
					.catch((err) => res.status(409).json(err));
			}
		});
	} catch {
		res.status(500);
		res.send("General failure");
	}
});

app.post("/add-pet", (req, res) => {
	const { name, breed, age, description, dateFound } = req.body;
	new Pet({ name, breed, age, description, dateFound })
		.save()
		.then((pet) => res.json(pet))
		.catch((err) => res.status(409).json(err));
});

app.post("/follow-pet", (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { $push: { pets: { _id: req.body._id } } }, { new: true })
		.then(() => res.send("OK"))
		.catch((err) => res.status(409).json(err));
});

// app.post("/add-file", (req, res) => {
// 	const { file } = req.body;
//   fs.writeFile("/tmp/test", file, function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
//     res.send("OK");
// });

// });

app.get("/pets", (req, res) => {
	Pet.find({}).then((pets) => res.json(pets));
});

// new Pet({
// 	name: "Zazu",
// 	breed: `pitbull`,
// 	description: `nice doggy`,
//     age: 1
// }).save();

// new Pet({
// 	name: "Fifa",
// 	breed: "border collie",
// 	description: "very very nice doggy",
//   age: 2.7
// }).save();

// new Pet({
// 	name: "Pufa",
// 	breed: "mixed",
// 	description: "nice nice doggy",
// }).save();

app.post("/logout", (req, res) => {
	req.logOut();
	res.json({ loggedOut: true });
});

// TODO: place build path in env
const clientBuildPath = "C:\\Users\\Arthur\\Projects\\get-a-pet\\client\\build";
if (clientBuildPath) {
	const static = express.static(clientBuildPath);

	console.log(`Hosting static content from ${clientBuildPath}`);
	app.use((req, res, next) => {
		console.log(`Resolving static url ${req.url}`);

		// prevent the server from intercepting requests in case we use react router
		if (req.url.startsWith("/static") || req.url === "/favicon.ico" || req.url === "/manifest.json") {
			console.log(`Serving static content ${req.url}`);
			return static(req, res, next);
		}

		console.log(`Serving react index.html to allow react router to do its thing -- ${req.url}`);
		res.sendFile(path.join(clientBuildPath, "index.html"));
	});
}

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	next();
}

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
