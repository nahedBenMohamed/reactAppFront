import React from 'react';

export default function PdssOptionCheckBoxComponent({ defaultValue, id, label, name }) {
	return (
			<li>
				<input type="checkbox" defaultValue={defaultValue} id={id} defaultChecked />
				<label htmlFor={label}>{name}</label>
			</li>
	);
}
