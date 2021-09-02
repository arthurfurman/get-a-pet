const LocalStrategy = require("passport-local").Strategy;

const initialize = (passport, getUserByEmail, getUserById) => {
	const authenticateUser = async (email, password, done) => {
		try {
			const user = await getUserByEmail(email);
			if (user === null) {
				return done(null, false, { message: `Could not find a user with the Email ${email}` });
			} else {
				if (password === user.password) {
					return done(null, user);
				} else {
					return done(null, false, { message: `Wrong Password` });
				}
			}
		} catch (e) {
			done(e);
		}
	};
	passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
	passport.serializeUser((user, done) => done(null, user._id));
	passport.deserializeUser( (id, done) => {
		const user =  getUserById(id);
		done(null, user);
	});
};

module.exports = initialize;
