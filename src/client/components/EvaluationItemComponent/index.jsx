import React from 'react';
import EvaluationCardComponent from '../EvaluationCardComponent';
import EvaluationTableComponent from '../EvaluationTableComponent';
import PdssWarningMessageComponent from '../PdssWarningMessageComponent';

function EvaluationItemComponent({ score, t, index, handleClickTab }) {
	return (
		<div key={index} className={'grid-x grid-margin-x grid-margin-y'}>
			<div className="cell headline">
				<p>
					<strong>{score.scoreName} </strong>
				</p>
			</div>
			{score.type === 'values' ? (
				<>
					{score.values &&
						Object.entries(score.values).map(([key, value], index) => {
							let raw_value = value;
							let decimals = 0;
							if (key === 'raw_value') {
								decimals = score.decimals ? score.decimals : 0;
								raw_value = Math.trunc(value);
							}
							return (
								<EvaluationCardComponent
									t={t}
									key={index}
									label={key}
									score={score}
									raw_value={raw_value}
								/>
							);
						})}
					<div className="cell">
						<PdssWarningMessageComponent
							message={
								<p
									dangerouslySetInnerHTML={{
										__html: t(`score_interpretation_${score.interpretation}`)
									}}
								/>
							}
						/>
					</div>
				</>
			) : null}
			{score.type === 'table' ? <EvaluationTableComponent t={t} score={score} /> : null}
			{score.type === 'message' ? (
				<div className="cell">
					<div className={'callout ' + (score.class !== undefined ? score.class : 'warning')}>
						<p>{t(`${score.label}`)}</p>
						{score.link && (
							<p className="button" onClick={e => handleClickTab(e, score.link.tabSelected, true)}>
								{t(`${score.link.label}`)}
							</p>
						)}
					</div>
				</div>
			) : null}
		</div>
	);
}

export default EvaluationItemComponent;
