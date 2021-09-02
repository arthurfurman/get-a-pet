import React, { FC, useState } from "react";
import { Route, Switch } from "react-router";
import { connect } from "react-redux";
import "./App.css";

import Header from "./components/header/header";
import PetsContainer from "./components/pets-container/pets-container";
import SignIn from "./components/sign-in/sign-in";
import SignUp from "./components/sign-up/sign-up";

import { User } from "./API";

const App: FC = () => {
	const [user, setUser] = useState<User>({ username: "guest", isAdmin: false });

	return (
		<div className='App'>
			<Header/>
			<Switch>
				<Route path='/login'>
					<div className='login'>
						<SignIn />
						<SignUp />
					</div>
				</Route>

				<Route path='/gallery'>
					<p>gallery</p>
				</Route>

				<Route path='/contact'>
					<p>contact</p>
				</Route>
				<Route path='/'>{user.username !== "guest" ? <PetsContainer /> : <PetsContainer />}</Route>
			</Switch>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(App);
