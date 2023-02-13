import React from 'react';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const NavItemComponent = ({
	title,
	path,
	parentId,
	icon,
	textIcons,
	children,
	extraClasses,
	className,
	action,
	currentRouter: { navigate }
}) => {
	return (
		<Link className={className ? className : ''} id={parentId} to={path} onClick={e => action && action(e)}>
			{textIcons ? children : <span className={'entypo entypo-' + icon}></span>}

			{title}
		</Link>
	);
};

NavItemComponent.prototype = {
	title: PropTypes.string,
	iconClassName: PropTypes.string,
	path: PropTypes.string
};

NavItemComponent.DefaultPropTypes = {
	title: '',
	path: ''
};

export default WithRouter(NavItemComponent);
