import { FC, useState } from "react";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.actions";

const SignIn: FC = ({ setCurrentUser }: any) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleChange = (e: any): void => {
		switch (e.target.name) {
			case "email":
				setEmail(e.target.value);
				break;
			case "password":
				setPassword(e.target.value);
				break;
		}
	};

	const handleSubmit = (e: any) => {
		fetch("http://localhost:3001/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})
			.then((response) => response.json())
			.then((user) => {
				setCurrentUser(user)
			})
			.catch((error) => {
				console.error("Error from server:", error);
			});

		e.preventDefault();
	};

	return (
		<div className='sign-in'>
			<h1>Sign in</h1>
			<form
				onSubmit={handleSubmit}
			>
				<div>
					<label>
						Email:
						<input type='text' name='email' value={email} onChange={handleChange} required/>
					</label>
				</div>
				<div>
					<label>
						Password:
						<input type='password' name='password' value={password} onChange={handleChange} required/>
					</label>
				</div>
				<div>
					<input type='submit' value='Login' />
				</div>
			</form>
		</div>
	);
};

export default connect(null, {setCurrentUser})(SignIn);
