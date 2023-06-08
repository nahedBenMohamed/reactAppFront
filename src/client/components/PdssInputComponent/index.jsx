/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';

function PdssInputComponent({
	disabled,
	label,
	clickToAction,
	changeAction,
	value,
	type,
	iconClassName,
	additionalClass,
	display,
	id,
	placeholder
}) {
	return display ? (
		<div className={(additionalClass ? additionalClass : 'cell medium-4') + (disabled ? ' disabled' : '')}>
			{label ? <p className="label">{label}</p> : null}
			<div className="input-group" id={id ? id : 'child_search'}>
				<input
					className="input-group-field"
					type={type}
					value={value}
					placeholder={placeholder ? placeholder : ''}
					onChange={e => {
						if (!disabled) changeAction && changeAction(e);
					}}
				/>
				<div className="input-group-button">
					<a
						className="button"
						onClick={e => {
							if (!disabled) clickToAction && clickToAction(e, value);
						}}
					>
						<span className={`entypo-${iconClassName}`}></span>
					</a>
				</div>
			</div>
		</div>
	) : null;
}
PdssInputComponent.prototype = {
	label: PropTypes.string,
	iconClassName: PropTypes.string
};

PdssInputComponent.DefaultPropTypes = {
	title: ''
};

export default PdssInputComponent;
