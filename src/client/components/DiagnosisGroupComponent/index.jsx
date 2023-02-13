import React from 'react';
import { getPercent } from '../../../shared/helpers/properties';

function DiagnosisGroupComponent({ diagnosisGroup }) {
	return (
		<div className="cell group">
			<div className="grid-x">
				<div className="cell small-7">
					<p className="name">{diagnosisGroup.name} </p>
				</div>
				<div className="cell small-5">
					<p className="process">
						<span className="status">{getPercent(diagnosisGroup)}%</span>
						<span className="bar">
							<span className="width" style={{ width: getPercent(diagnosisGroup) + '%' }}></span>
						</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default DiagnosisGroupComponent;
