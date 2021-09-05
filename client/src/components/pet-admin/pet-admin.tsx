import { FC, useState } from "react";
import "./pet-admin.scss";
import EditPet from "../edit-pet/edit-pet";

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

const PetAdmin: FC<PetProps> = ({
	_id,
	name,
	breed,
	description,
	dateFound,
	age,
	isAdopted,
	imageUrl,
}: PetProps): JSX.Element => {
	const [isEditing, setIsEditing] = useState(false);
	const toggleEditing = () => {
		setIsEditing((prevState) => !prevState);
	};
	const removeHandler = () => {
		fetch(`http://localhost:3001/pets/${_id}`, {
			method: "DELETE",
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("Error from server:", error);
			});
	};

	return (
		<div className='pet-admin'>
			{isEditing ? (
				<div>
					<EditPet />
					<button onClick={toggleEditing}>Cancel</button>
				</div>
			) : (
				<div className='pet-item'>
					<span className='name'>{name}</span>
					<div className='buttons-container'>
						<button onClick={toggleEditing}>Edit</button>
						<button onClick={removeHandler}>Remove</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default PetAdmin;
