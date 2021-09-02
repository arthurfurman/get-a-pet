import { FC, useState } from "react";

const SignUp: FC = () => {
	const [email, setEmail] = useState("");
	const [firstName, setfirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [address, setAddress] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");

	const handleChange = (e: any): void => {
		switch (e.target.name) {
			case "email":
				setEmail(e.target.value);
				break;
			case "firstName":
				setfirstName(e.target.value);
				break;
			case "lastName":
				setlastName(e.target.value);
				break;
				case "address":
					setAddress(e.target.value);
					break;
			case "password":
				setPassword(e.target.value);
				break;
			case "repeat-password":
				setRepeatPassword(e.target.value);
				break;
		}
	};

	const handleSubmit = (e: any) => {
		if (password === repeatPassword) {
			fetch("http://localhost:3001/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, firstName, lastName, address, password }),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.error("Error from server:", error);
				});
		} else {
			alert("Passwords do not match");
		}

		e.preventDefault();
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						First name:
						<input type='text' name='firstName' value={firstName} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<label>
						Last name:
						<input type='text' name='lastName' value={lastName} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<label>
						Email:
						<input type='email' name='email' value={email} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<label>
						Address:
						<input type='text' name='address' value={address} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<label>
						Password:
						<input type='password' name='password' value={password} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<label>
						Repeat password:
						<input type='password' name='repeat-password' value={repeatPassword} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<input type='submit' value='Register' />
				</div>
			</form>
		</div>
	);
};

export default SignUp;
