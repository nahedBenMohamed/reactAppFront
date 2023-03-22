import React from 'react';

function EvaluationExtendedAnswerComponent({ answers, t }) {
	answers &&
		answers.map(answer => {
			let additional_class = answer.additional[0]?.class;
			/* 	if (selected_answers && [answer.id].includes(selected_answers)) {
			additional_class = additional_class + ' selected';
		   } */
			return (
				<li
					className={`${additional_class !== '' ? additional_class : ''}`}
					data-id={answer.question_id}
					data-belonging={answer.belonging_id}
					id={answer.id}
				>
					<p>
						<span class="num">{answer.question_num}</span>
						<span class="text">{answer.answer}</span>
					</p>
					<select class="class">
						<option value="">Bitte wählen</option>8
						{['green', 'red', 'grey'].map(name => {
							return (
								<option
									value={name}
									className={answer.additional[0]?.class === name ? ' selected' : ''}
								>
									{t(`classes_${name}`)}
								</option>
							);
						})}
					</select>
					<select class="checks" multiple>
						{['1', '2'].map(name => {
							return (
								<option
									value={name}
									className={answer.additional[0]?.checks?.includes(name) ? ' selected' : ''}
								>
									{t(`checks_${name}`)}
								</option>
							);
						})}
					</select>
					<span class="reset entypo-back" title={t('title_reset')}></span>
				</li>
			);
		});
}

export default EvaluationExtendedAnswerComponent;
