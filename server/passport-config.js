const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User");

const authenticateUser = (email, password, done) => {
	User.findOne({ email: `${email}` }).populate("pets")
		.then((user) => {
			if (!user) {
				// user not found
				return done(null, false, { message: `Could not find a user with the Email ${email}` });
			}
			// user found, check password
			if (password !== user.password) {
				return done(null, false, { message: `Wrong Password` });
			}
			return done(null, user);
		})
		.catch((err) => done(null, false, { message: err }));
};

passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) =>
	User.findById(id, (err, user) => {
		done(err, user);
	})
);

module.exports = passport;
