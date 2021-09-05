import { FC, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import "./App.css";

import Header from "./components/header/header";
import PetsContainer from "./components/pets-container/pets-container";
import Login from "./components/login/login";
import AdminDashboard from "./components/admin-dashboard/admin-dashboard";

import { setPets } from "./redux/pets/pets.actions";

import { User } from "./API";

const App: FC = ({ currentUser, setPets }: any) => {
	useEffect(() => {
		fetch("http://localhost:3001/pets")
			.then((response) => response.json())
			.then((pets) => {
				setPets(pets);
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
					{!currentUser ? (
						<Login />
					) : (
						<Redirect to='/' />
					)}
				</Route>

				{currentUser?.isAdmin ? (
					<Route path='/admin'>
						<AdminDashboard />
					</Route>
				) : null}

				<Route path='/'>
					<PetsContainer />
				</Route>
			</Switch>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { setPets })(App);
