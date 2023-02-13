import React from 'react';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { useOutletContextHook } from '../../../shared/helpers/hooks/useOutletContextHook';
import PdssFormComponent from '../../components/PdssFormComponent';

function CreateChildPage(props) {
	useOutletContextHook(props.t('child_headline'), false);

	return (
		<div className="padding">
			<PdssFormComponent {...props} />
		</div>
	);
}

export default WithRouter(CreateChildPage);
