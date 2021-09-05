const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./passport-config");
const path = require("path");

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

app.get("/loggeduser", (req, res) => {
	if (req.isAuthenticated()) {
		const { password, _id, __v, ...response } = req.user.toObject();
		res.json(response);
	} else {
		res.send(null);
	}
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

app.delete("/pets/:petId", (req, res) => {
	const petId = req.params.petId;
	Pet.findByIdAndRemove(petId).catch((err) => res.status(409).json(err));

	User.updateMany({}, { $pullAll: { pets: [petId] } })
		.then(() => res.send("OK"))
		.catch((err) => res.status(409).json(err));
});

app.post("/follow", (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { $addToSet: { pets: [req.body.petId] } }).catch((err) =>
		res.status(409).json(err)
	);

	Pet.findOneAndUpdate({ _id: req.body.petId }, { $addToSet: { users: [req.user._id] } })
		.then(() => res.send("OK"))
		.catch((err) => res.status(409).json(err));
});

app.post("/unfollow", (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { $pullAll: { pets: [req.body.petId] } }).catch((err) =>
		res.status(409).json(err)
	);

	Pet.findOneAndUpdate({ _id: req.body.petId }, { $pullAll: { users: [req.user._id] } })
		.then(() => res.send("OK"))
		.catch((err) => res.status(409).json(err));
});

app.get("/pets", (req, res) => {
	Pet.find({}).then((pets) => res.json(pets));
});

// new Pet({
// 	name: "Zazu",
// 	breed: "pitbull",
// 	description: "nice doggy",
// 	age: 1,
// }).save();

// new Pet({
// 	name: "Fifa",
// 	breed: "border collie",
// 	description: "very very nice doggy",
// 	age: 2.7,
// }).save();

// new Pet({
// 	name: "Pufa",
// 	breed: "mixed",
// 	description: "nice nice doggy",
// 	age: 7,
// }).save();

// new User({
// 	email: 'a@a',
// 	firstName: "a",
// 	lastName: "a",
// 	address: "a",
// 	password: "123",
// 	isAdmin: true,
// }).save();

// new User({
// 	email: "b@b",
// 	firstName: "b",
// 	lastName: "b",
// 	address: "b",
// 	password: "123",
// 	isAdmin: false,
// }).save();

app.post("/logout", (req, res) => {
	req.logOut();
	res.json({ loggedOut: true });
});

const clientBuildPath = path.dirname(__dirname) + "\\client\\build";
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
