import React, { useState } from 'react';
import EvaluationItemComponent from '../../components/EvaluationItemComponent';

function EvaluationListContainer({ scores, t, handleClickTab, session }) {
	return (

		<div className="tabs-panel is-active" id="evaluation">
			{scores &&
				scores.map((score, index) => {
					if (score.visible !== 'no')
					console.log("scores here ",score)
						return (
							<EvaluationItemComponent
								key={score.scoreName}
								score={score}
								t={t}
								session={session}
								index={index}
								handleClickTab={handleClickTab}
							/>
						);
				})}
		</div>
	);
}

export default EvaluationListContainer;
