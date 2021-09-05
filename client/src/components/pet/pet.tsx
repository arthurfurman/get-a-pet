import React, { FC } from "react";
import "./pet.scss";
import background from '../../images/sample.jpeg';

type PetProps = {
	_id: string;
	name: string;
	breed: string;
	description: string;
	dateFound: string;
	age: number;
	isAdopted: boolean;
	imageUrl: string;
	isFollowing: boolean;
	isLoggedIn: boolean;
};

const Pet: FC<PetProps> = ({_id, name, breed, description, dateFound, age, isAdopted, imageUrl, isFollowing, isLoggedIn}: PetProps): JSX.Element => {

	const clickHandler = () => {
		fetch(`http://localhost:3001/${isFollowing ? 'unfollow' : 'follow'}`, {
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
	}

	return (
		<div className='pet'>
			<h1 className='name'>{name}</h1>
			<div className='background-image' onClick={isLoggedIn ? clickHandler : undefined } style={{ backgroundImage: `url(${background})` }}></div>
			<button className="follow-banner">{isFollowing ? "unfollow" : "follow"}</button>
		</div>
	);
}


export default Pet;
