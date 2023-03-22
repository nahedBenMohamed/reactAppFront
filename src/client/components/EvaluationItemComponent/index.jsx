import React, { useState } from 'react';
import EvaluationCardComponent from '../EvaluationCardComponent';
import EvaluationExtendedAnswerComponent from '../EvaluationExtendedAnswerComponent';
import EvaluationTableComponent from '../EvaluationTableComponent';
import PdssWarningMessageComponent from '../PdssWarningMessageComponent';

function EvaluationItemComponent({ score, t, index, handleClickTab }) {
	const [accordionContent, setAccordionContent] = useState([',']);
	const ShowAccordionContent = (e, id) => {
		e.preventDefault();
		if (accordionContent && accordionContent.includes(id)) {
			return setAccordionContent(accordionContent.filter(item => item !== id));
		}else {
			setAccordionContent([...accordionContent, id]);

		}
	};
	return (
		<div key={index} className={'grid-x grid-margin-x grid-margin-y ' + (score.visible === 'no' ? 'hide' : '')}>
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
						{score.append_text ? (
							<p
								dangerouslySetInnerHTML={{
									__html: t(`${score.label}`) + score.append_text
								}}
							></p>
						) : (
							<p> {t(`${score.label}`)}</p>
						)}

						{score.link && (
							<p className="button" onClick={e => handleClickTab(e, score.link.tabSelected, true)}>
								{t(`${score.link.label}`)}
							</p>
						)}
					</div>
				</div>
			) : null}
			{score.type == 'compact_values' ? (
				<>
					{score.values.map(value => {
						let raw_value;
						let decimals;
						if (value.decimals != undefined) {
							decimals = value.decimals ? value.decimals : 0;
							raw_value = value.tvalue; //|number_format(decimals,",")
						} else raw_value = value.raw_value;
						return (
							<div className={'cell ' + (value.width ? value.width : 'auto')} data-title={value.name}>
								<div className={'container ' + value.class}>
									<p className="value">
										<strong>
											{raw_value}
											{value.name === 'Vollständigkeit' ? '%' : ''}
										</strong>
									</p>
									<p className="label">{value.name}</p>
									{value.tvalue ? (
										<p className="overflow">
											T-WERT: <span className="tvalue">{value.tvalue}</span>
										</p>
									) : null}
								</div>
							</div>
						);
					})}
				</>
			) : null}
			{score.type === 'questions' ? (
				<div className="cell questions">
					{score.values.map(value => {
						return (
							<div className={`grid-x enum ${value.answer ? ' answered' : ''}`}>
								<div className="cell small-10">
									<p className="question">{t(`questions_analysis_${value.label}`)}</p>
								</div>
								<div className="cell small-2" data-question-id={value.id}>
									<div className="grid-x">
										<div className="cell small-6">
											<a
												className={`button correct ${
													value.answer == 'correct' ? ' selected' : ''
												} `}
											>
												<span className="entypo-check"></span>
											</a>
										</div>
										<div className="cell small-6">
											<a
												className={`button incorrect ${
													value.answer == 'incorrect' ? ' selected' : ''
												} `}
											>
												<span className="entypo-cancel"></span>
											</a>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			) : null}
			{score.type === 'answers' ? (
				<div className="cell classification">
					<label>Liste aller Antworten</label>
					<div className="legend">
						<p>
							<span className="green"></span>Vollständig
						</p>
						<p>
							<span className="red"></span>Unvollständig
						</p>
						<p>
							<span className="grey"></span>Elipse
						</p>
					</div>
					<div className="answers">
						<ul>
							<EvaluationExtendedAnswerComponent answers={score.values} t={t} />
						</ul>
					</div>
				</div>
			) : null}
			{score.type == 'text' ? (
				<div className="cell">
					<p>{t(`${score.label}`)}</p>
				</div>
			) : null}
			{score.type == 'accordion' ? (
				<div className="cell">
					<ul
						className="accordion values"
						data-accordion
						data-multi-expand="true"
						data-allow-all-closed="true"
					>
						{Object.entries(score.accordion).map(([key, value]) => {
							return (
								<li
									className={accordionContent && accordionContent.includes(key)  ? 'is-active accordion-item' : ' accordion-item'}
									onClick={e => ShowAccordionContent(e, key)}
									data-accordion-item
								>
									<a href="#" className="accordion-title">
										{key}
									</a>
									{accordionContent && accordionContent.includes(key) && (
										<div
											className="accordion-content"
											style={{ display: 'block' }}
											data-tab-content
										>
											{value.values ? (
												<EvaluationTableComponent t={t} score={value} accordion={true} />
											) : (
												<p className="padding">Bisher noch nicht implementiert</p>
											)}
										</div>
									)}
								</li>
							);
						})}
					</ul>
				</div>
			) : null}
		</div>
	);
}

export default EvaluationItemComponent;
