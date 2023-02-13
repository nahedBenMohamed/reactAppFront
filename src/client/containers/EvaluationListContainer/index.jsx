import React from 'react';
import EvaluationItemComponent from '../../components/EvaluationItemComponent';

function EvaluationListContainer({ scores, t, handleClickTab }) {
	return (
		<div className="tabs-panel is-active" id="evaluation">
			{scores &&
				scores.map((score, index) => {
					if (score.visible !== 'no')
						return (
							<EvaluationItemComponent
								key={score.scoreName + '_' + index}
								score={score}
								t={t}
								index={index}
								handleClickTab={handleClickTab}
							/>
						);
				})}
		</div>
	);
}

export default EvaluationListContainer;
