import React from 'react';

import EvaluationAsideContainer from '../../containers/EvaluationAsideContainer';

function EvaluationAsidePage({
	children,
	childList,
	selectedChild,
	handleChange,
	analysesList,
	t,
	selectedDiagnosis,
	HandleScrollToTop
}) {
	return (
		<div className="grid-x grid-margin-x">
			<div className="cell medium-4">
				<EvaluationAsideContainer
					t={t}
					data={childList}
					selectedChild={selectedChild}
					handleChange={handleChange}
					analysesList={analysesList}
					selectedDiagnosis={selectedDiagnosis}
					HandleScrollToTop={HandleScrollToTop}
				/>
			</div>
			{children}
		</div>
	);
}
export default EvaluationAsidePage;
