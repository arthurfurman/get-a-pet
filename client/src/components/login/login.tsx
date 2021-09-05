import { FC } from "react";
import SignIn from "../sign-in/sign-in";
import SignUp from "../sign-up/sign-up";

import "./login.scss";

const Login:FC = () => {
	return (
		<div className='login'>
			<SignIn />
			<SignUp />
		</div>
	);
};

export default Login;