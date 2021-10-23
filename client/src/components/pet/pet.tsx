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
	isFollowing: boolean;
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
	isFollowing,
	currentUser,
}: PetProps): JSX.Element => {
	const clickHandler = () => {
		if (!!currentUser) {
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
		<div className='pet' onClick={clickHandler}>
			<h1 className='name'>{name}</h1>
			<div className='background-image' style={{ backgroundImage: `url(${background})` }} />
			<div className='follow-banner'>{isFollowing ? "Unfollow" : "Follow"}</div>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Pet);
