import React from 'react';
import ChildListContainer from '../ChildListContainer';

function ChildBodyListContainer(props) {
	const { data, t } = props;
	if (data.total === 0) return <div className="padding">{t('child_data_empty')} </div>;
	return (
		<div className="grid-x" id="children">
			<div className="cell large-12">{data && <ChildListContainer children={data.data} {...props} />}</div>
		</div>
	);
}

export default ChildBodyListContainer;
