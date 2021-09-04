import { FC, useEffect } from "react";
import { Route, Switch } from "react-router";
import { connect } from "react-redux";
import "./App.css";

import Header from "./components/header/header";
import PetsContainer from "./components/pets-container/pets-container";
import SignIn from "./components/sign-in/sign-in";
import SignUp from "./components/sign-up/sign-up";
import AdminDashboard from "./components/admin-dashboard/admin-dashboard";

import { setPets } from "./redux/pets/pets.actions";

import { User } from "./API";

const App: FC = ({ currentUser, setPets }: any) => {

	useEffect(() => {
		fetch("http://localhost:3001/pets")
			.then((response) => response.json())
			.then((pets) => {
				setPets(pets)
			})
			.catch((error) => {
				console.error("Error from server:", error);
			});
  });

	return (
		<div className='App'>
			<Header />
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

				{currentUser?.isAdmin ? (
					<Route path='/admin'>
						<AdminDashboard/>
					</Route>
				) : null}

				<Route path='/'>{currentUser ? <PetsContainer /> : <PetsContainer />}</Route>
			</Switch>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { setPets })(App);
