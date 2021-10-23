import { FC } from "react";
import { connect } from "react-redux";
import Pet from "../pet/pet";
import "./pets-container.scss";

const PetsContainer: FC = ({ pets, currentUser }: any) => {
	return (
		<div>
			{currentUser ? (
				<div className='following'>
					<h2>Following</h2>
          <div className='pets-container'>
          {currentUser.pets.map((pet: any, index: number) => (
						<Pet key={index} {...pet} isFollowing imageUrl='../../images/sample.jpeg' />
					))}
          </div>
				</div>
			) : null}


			<div className='all-pets'>
				<h2>All pets</h2>
				<div className='pets-container'>
					{pets.pets.map((pet: any, index: number) => (
						<Pet key={index} {...pet} isFollowing={false} imageUrl='../../images/sample.jpeg' />
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
