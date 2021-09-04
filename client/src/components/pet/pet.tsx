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
};

const Pet: FC<PetProps> = ({_id, name, breed, description, dateFound, age, isAdopted, imageUrl}: PetProps): JSX.Element => {

	const clickHandler = () => {
		fetch("http://localhost:3001/follow-pet", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ _id }),
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
			<div className='background-image' onClick={clickHandler} style={{ backgroundImage: `url(${background})` }}></div>
		</div>
	);
}


export default Pet;
