import React from 'react';

import EvaluationAsideContainer from '../../containers/EvaluationAsideContainer';

function EvaluationAsidePage({ children, childList, handleChange, analysesList, t, HandleScrollToTop }) {
	return (
		<div className="grid-x grid-margin-x">
			<div className="cell medium-4">
				<EvaluationAsideContainer
					t={t}
					data={childList}
					handleChange={handleChange}
					analysesList={analysesList}
					HandleScrollToTop={HandleScrollToTop}
				/>
			</div>
			{children}
		</div>
	);
}
export default EvaluationAsidePage;
