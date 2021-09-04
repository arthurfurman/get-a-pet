import { FC } from "react";
import { connect } from "react-redux";
import Pet from "../pet/pet";
import "./pets-container.scss";

const PetsContainer: FC = ({ pets, currentUser }: any) => {
	return (
		<div>
			{currentUser ? (
				<div className='following'>
					<h1>Followed by {currentUser.firstName}</h1>
          <div className='pets-container'>
          {currentUser.pets.map((pet: any) => (
						<Pet {...pet} imageUrl='../../images/sample.jpeg' />
					))}
          </div>
				</div>
			) : null}
			<div className='all-pets'>
				<h1>All pets</h1>
				<div className='pets-container'>
					{pets.pets.map((pet: any) => (
						<Pet {...pet} imageUrl='../../images/sample.jpeg' />
					))}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	pets: state.pets,
	currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PetsContainer);
