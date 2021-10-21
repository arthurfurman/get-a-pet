import { FC } from "react";
import "./admin-dashboard.scss";
import AddPet from "../add-pet/add-pet";
import PetsContainerAdmin from "../pets-container-admin/pets-container-admin";

const AdminDashboard: FC = () => {
	return (
		<div className='admin-dashboard'>
      <h1>Admin Dashboard</h1>
			<AddPet/>
			<PetsContainerAdmin/>
		</div>
	);
};

export default AdminDashboard;
