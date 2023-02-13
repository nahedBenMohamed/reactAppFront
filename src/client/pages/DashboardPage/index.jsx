import React from 'react';

import { useOutletContextHook } from '../../../shared/helpers/hooks/useOutletContextHook';
import DashboardCardListContainer from '../../containers/DashboardCardListContainer';

export default function DashboardPage(props) {
	useOutletContextHook(props.t('dashboard'), true);

	return (
		<div className="content" id="dashboard">
			<div className="grid-container">
				<DashboardCardListContainer t={props.t} />
			</div>
		</div>
	);
}
