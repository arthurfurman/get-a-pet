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
			<div className='logo-container'>{/* TODO: add logo here */}</div>
			<div className='options-container'>
				<p className='greeting'>hello {currentUser ? currentUser.firstName : "guest"}</p>
				{currentUser?.isAdmin ? (
					<Link className='option' to='/admin'>
						Admin Dashboard
					</Link>
				) : null}

				<Link className='option' to='/'>
					Home
				</Link>
				<Link className='option' to='/gallery'>
					Gallery
				</Link>
				<Link className='option' to='/contact'>
					Contact us
				</Link>
				{currentUser ? (
					<Link className='option' to='/login' onClick={logOut}>
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
