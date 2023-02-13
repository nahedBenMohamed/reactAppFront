import React from 'react';
import DiagnosisAsideContainer from '../../containers/DiagnosisAsideContainer';

function DiagnosisAsidePage({ children, childList, selectChild, handleChange, diagnosisGroups }) {
	return (
		<div className="grid-x grid-margin-x">
			<div className="cell medium-4">
				<DiagnosisAsideContainer
					data={childList}
					selectedChild={selectChild}
					handleChange={handleChange}
					diagnosisGroups={diagnosisGroups}
				/>
			</div>
			{children}
		</div>
	);
}

export default DiagnosisAsidePage;
