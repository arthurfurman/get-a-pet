import React, { FC } from "react";
import "./pet.scss";
import background from '../../images/sample.jpeg';

type PetProps = {
	title: string;
	imageUrl: string;
};

const Pet: FC<PetProps> = ({ imageUrl, title }: PetProps): JSX.Element => (
	<div className='pet'>
		<h1 className='title'>{title}</h1>
		<div className='background-image' style={{ backgroundImage: `url(${background})` }}></div>
	</div>
);

export default Pet;
