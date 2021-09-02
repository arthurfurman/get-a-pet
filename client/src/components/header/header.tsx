import React, { FC } from "react";
import "./header.scss";
import { User } from "../../API";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

type HeaderProps = {
	currentUser: any;
};

const Header: FC<HeaderProps> = ({ currentUser }) => {
	return (
		<div className='header-container'>
			<div className='logo-container'>{/* TODO: add logo here */}</div>
			<div className='options-container'>
				<p className='greeting'>hello {currentUser ? currentUser.firstName : "guest"}</p>
				<Link className='option' to='/'>
					Home
				</Link>
				<Link className='option' to='/gallery'>
					Gallery
				</Link>
				<Link className='option' to='/contact'>
					Contact us
				</Link>
				<Link className='option' to='/login'>
					Login
				</Link>
			</div>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
  currentUser: state.user.currentUser,
})

export default connect(mapStateToProps)(Header);
