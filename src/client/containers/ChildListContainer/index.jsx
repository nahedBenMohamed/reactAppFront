import React from 'react';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import ChildItemComponent from '../../components/ChildItemComponent';

function ChildListContainer(props) {
	const { children } = props;
	return (
		<ul className="items">
			{children.map((child, childIndex) => {
				return <ChildItemComponent key={childIndex} child={child} {...props} />;
			})}
		</ul>
	);
}

export default WithRouter(ChildListContainer);
