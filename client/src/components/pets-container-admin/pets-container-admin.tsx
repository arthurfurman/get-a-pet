import { FC } from "react";
import { connect } from "react-redux";
import PetAdmin from "../pet-admin/pet-admin";
import "./pets-container-admin.scss";

const PetsContainerAdmin: FC = ({ pets }: any) => {
	return (
		<div>
			<div className='all-pets'>
				<h2>Modify pets</h2>
				<div className='pets-container-admin'>
					{pets.pets.map((pet: any, index: number) => (
						<PetAdmin key={index} {...pet} imageUrl='../../images/sample.jpeg' />
					))}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	pets: state.pets,
});

export default connect(mapStateToProps)(PetsContainerAdmin);
