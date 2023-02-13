import React, { Fragment } from 'react';
import DiagnosisGroupComponent from '../../components/DiagnosisGroupComponent';
import DiagnosisGroupListComponent from '../../components/DiagnosisGroupListComponent';

function DiagnosisStatisticContainer({ diagnosisGroups }) {
	return (
		<div className="grid-x statistics">
			{diagnosisGroups &&
				diagnosisGroups.map((diagnostic_group, index) => {
					return (
						<Fragment key={index}>
							<DiagnosisGroupComponent key={index} diagnosisGroup={diagnostic_group} />
							<DiagnosisGroupListComponent key={diagnostic_group.id} diagnosisGroup={diagnostic_group} />
						</Fragment>
					);
				})}
		</div>
	);
}

export default DiagnosisStatisticContainer;
