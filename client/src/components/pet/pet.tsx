import { FC } from "react";
import { connect } from "react-redux";
import "./pet.scss";
import background from "../../images/sample.jpeg";

type PetProps = {
	_id: string;
	name: string;
	breed: string;
	description: string;
	dateFound: string;
	age: number;
	isAdopted: boolean;
	imageUrl: string;
	currentUser: any;
};

const Pet: FC<PetProps> = ({
	_id,
	name,
	breed,
	description,
	dateFound,
	age,
	isAdopted,
	imageUrl,
	currentUser,
}: PetProps): JSX.Element => {
	const isLoggedIn: boolean = !!currentUser;
	const isFollowing: boolean = isLoggedIn && currentUser.pets.find((pet: any) => pet._id === _id);
	const clickHandler = () => {
		if (isLoggedIn) {
			fetch(`http://localhost:3001/${isFollowing ? "unfollow" : "follow"}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ petId: _id }),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.error("Error from server:", error);
				});
		} else {
			console.log("not logged in");
		}
	};

	return (
		<div className='pet'>
			<h1 className='name'>{name}</h1>
			<div className='background-image' style={{ backgroundImage: `url(${background})` }} />
			{isLoggedIn ? (
				<div className='follow-banner' onClick={clickHandler}>
					{isFollowing ? "Unfollow" : "Follow"}
				</div>
			) : null}
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Pet);
