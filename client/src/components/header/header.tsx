import React, { FC } from "react";
import "./header.scss";
import { User } from "../../API";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";

type HeaderProps = {
	currentUser: any;
	setCurrentUser: any;
};

const Header: FC<HeaderProps> = ({ currentUser, setCurrentUser }) => {
	const logOut = () => {
		fetch("http://localhost:3001/logout", {
			method: "POST",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.loggedOut) {
					setCurrentUser(null);
				}
			})
			.catch((error) => {
				console.error("Error from server:", error);
			});
	};

	return (
		<div className='header-container'>
			<p className='greeting'>hello {currentUser ? currentUser.firstName : "guest"}</p>
			<div className='options-container'>
				{currentUser ? (
					<Link className='option' to='/' onClick={logOut}>
						Logout
					</Link>
				) : (
					<Link className='option' to='/login'>
						Login
					</Link>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { setCurrentUser })(Header);
