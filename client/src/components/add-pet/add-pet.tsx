import { FC, useState } from "react";
import { connect } from "react-redux";
import { addPet } from "../../redux/pets/pets.actions";

const AddPet: FC = () => {
	const [name, setName] = useState("");
	const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
	const [description, setDescription] = useState("");
	const [dateFound, setDateFound] = useState("");
  const [photo, setPhoto] = useState<any>();

	const handleChange = (e: any): void => {
		switch (e.target.name) {
			case "name":
				setName(e.target.value);
				break;
			case "breed":
				setBreed(e.target.value);
				break;
      case "age":
				setAge(e.target.value);
				break;
			case "description":
				setDescription(e.target.value);
				break;
			case "dateFound":
				setDateFound(e.target.value);
				break;
      case "photo":
				setPhoto(e.target.files[0]);
				break;
		}
	};

	const handleSubmit = (e: any) => {
		fetch("http://localhost:3001/add-pet", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, breed, age, description, dateFound }),
		})
			.then((response) => response.json())
			.then((data) => {
				addPet(data);
			})
			.catch((error) => {
				console.error("Error from server:", error);
			});

		e.preventDefault();
	};

	return (
		<div className='add-pet'>
			<h2>Add pet</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Name:
						<input type='text' name='name' value={name} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<label>
						Breed:
						<input type='text' name='breed' value={breed} onChange={handleChange} required />
					</label>
				</div>
        <div>
					<label>
						Age:
						<input type='number' name='age' value={age} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<label>
						Description:
						<input type='text' name='description' value={description} onChange={handleChange} required />
					</label>
				</div>
				<div>
					<label>
						Date found:
						<input type='date' name='dateFound' value={dateFound} onChange={handleChange} required />
					</label>
				</div>
        <div>
					<label>
						Photo:
						<input type='file' name='photo' onChange={handleChange} required />
					</label>
				</div>
				<div>
					<input type='submit' value='Add' />
				</div>
			</form>
		</div>
	);
};

export default connect(null, {addPet})(AddPet);
