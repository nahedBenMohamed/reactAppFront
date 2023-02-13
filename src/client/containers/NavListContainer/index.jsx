import React from 'react';
import { navLinkIsActive } from '../../../shared/helpers/properties';
import NavItemComponent from '../../components/NavItemComponent';

export const NavListContainer = ({ navList, additionalClass }) => {
	return (
		<ul className={additionalClass ? additionalClass : 'clearfix'}>
			{navList?.map((item, index) => (
				<li key={index} className={item?.extraClasses + ' ' + navLinkIsActive(item)}>
					<NavItemComponent {...item} />
				</li>
			))}
		</ul>
	);
};
