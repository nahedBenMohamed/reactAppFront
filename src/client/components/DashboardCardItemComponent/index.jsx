import React from 'react';
import { Link } from 'react-router-dom';
import { NavListContainer } from '../../containers/NavListContainer';
import PdssIconBoxComponent from '../PdssIconBoxComponent';

function DashboardCardItemComponent({ card }) {
	return (
		<div className="cell large-4 medium-6">
			<div className="box">
				<PdssIconBoxComponent icon={card.icon} />
				<div className="padding">
					<NavListContainer additionalClass="option-list" navList={card.navList} />
					<p>
						<Link className="button" to={card.path}>
							{card.title}
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default DashboardCardItemComponent;
